# user_registration_examples.py

# =============================================================================
# Clean Architecture - Exemplo de Registro de Usuário (Python)
# =============================================================================

# Este exemplo demonstra a aplicação da Clean Architecture para um caso de uso
# de registro de usuário, separando o código em camadas concêntricas.

from abc import ABC, abstractmethod

# =============================================================================
# 1. Camada de Entidades (Entities) - Regras de Negócio Corporativas
#    - Objetos que encapsulam regras de negócio de alto nível e gerais.
#    - Independente de qualquer camada externa.
# =============================================================================

class User:
    def __init__(self, username: str, email: str, password_hash: str, user_id: str = None):
        self.user_id = user_id # Pode ser gerado na persistência
        self.username = username
        self.email = email
        self.password_hash = password_hash

    def is_valid_email(self) -> bool:
        # Exemplo de regra de negócio da entidade: validação de email simples
        return "@" in self.email and "." in self.email

# =============================================================================
# 2. Camada de Casos de Uso (Use Cases / Interactors) - Regras de Negócio da Aplicação
#    - Contém a lógica de negócio específica da aplicação.
#    - Orquestra entidades e interage com adaptadores de interface através de interfaces.
#    - Depende apenas de Entidades e Abstrações (interfaces) de Repositórios/Gateways.
# =============================================================================

# Abstrações (interfaces) que os casos de uso definem e as camadas externas implementam.

class UserRepository(ABC):
    @abstractmethod
    def get_user_by_username(self, username: str) -> User | None:
        pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> User | None:
        pass

    @abstractmethod
    def save_user(self, user: User) -> User:
        pass

class UserRegistrationOutputPort(ABC):
    @abstractmethod
    def present_success(self, user: User):
        pass

    @abstractmethod
    def present_error(self, message: str):
        pass

class RegisterUserRequest:
    def __init__(self, username: str, email: str, password: str):
        self.username = username
        self.email = email
        self.password = password

class RegisterUserUseCase:
    def __init__(self, user_repository: UserRepository, output_port: UserRegistrationOutputPort):
        self.user_repository = user_repository
        self.output_port = output_port

    def execute(self, request: RegisterUserRequest):
        if not request.username or not request.email or not request.password:
            self.output_port.present_error("Todos os campos são obrigatórios.")
            return

        if self.user_repository.get_user_by_username(request.username):
            self.output_port.present_error("Nome de usuário já existe.")
            return

        if self.user_repository.get_user_by_email(request.email):
            self.output_port.present_error("Email já cadastrado.")
            return

        # Regra de negócio da entidade: validação de email
        if not User(request.username, request.email, "").is_valid_email():
            self.output_port.present_error("Formato de email inválido.")
            return

        # Em um cenário real, a senha seria hashada aqui.
        password_hash = f"hashed_{request.password}"
        new_user = User(request.username, request.email, password_hash)

        saved_user = self.user_repository.save_user(new_user)
        self.output_port.present_success(saved_user)

# =============================================================================
# 3. Camada de Adaptadores de Interface (Interface Adapters)
#    - Converte dados entre o formato das camadas internas e externas.
#    - Contém implementações concretas das interfaces definidas pelos Casos de Uso.
# =============================================================================

# Implementação do Repositório (Gateway) - Simulação em memória
class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self.users: dict[str, User] = {}
        self._next_id = 1

    def get_user_by_username(self, username: str) -> User | None:
        for user in self.users.values():
            if user.username == username:
                return user
        return None

    def get_user_by_email(self, email: str) -> User | None:
        for user in self.users.values():
            if user.email == email:
                return user
        return None

    def save_user(self, user: User) -> User:
        if not user.user_id:
            user.user_id = str(self._next_id)
            self._next_id += 1
        self.users[user.user_id] = user
        return user

# Presenter - Prepara a saída para a UI/Web
class UserRegistrationWebPresenter(UserRegistrationOutputPort):
    def __init__(self):
        self.view_model = {}

    def present_success(self, user: User):
        self.view_model = {
            "status": "success",
            "message": f"Usuário {user.username} registrado com sucesso!",
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email
        }

    def present_error(self, message: str):
        self.view_model = {
            "status": "error",
            "message": message
        }

# Controlador - Lida com a entrada da UI/Web
class UserRegistrationController:
    def __init__(self, register_user_use_case: RegisterUserUseCase, presenter: UserRegistrationWebPresenter):
        self.register_user_use_case = register_user_use_case
        self.presenter = presenter

    def register_user(self, data: dict):
        request = RegisterUserRequest(data.get("username"), data.get("email"), data.get("password"))
        self.register_user_use_case.execute(request)
        return self.presenter.view_model

# =============================================================================
# 4. Camada de Frameworks e Drivers (Frameworks & Drivers)
#    - Detalhes de implementação: UI, Banco de Dados, Web Frameworks.
#    - Depende de todas as camadas internas.
# =============================================================================

# Exemplo de Aplicação (simulando um framework web)
def run_application():
    print("--- Clean Architecture: Exemplo de Registro de Usuário (Python) ---")

    # Injeção de dependências: as camadas externas constroem e conectam as internas
    user_repository = InMemoryUserRepository()
    presenter = UserRegistrationWebPresenter()
    register_user_use_case = RegisterUserUseCase(user_repository, presenter)
    controller = UserRegistrationController(register_user_use_case, presenter)

    # Simulação de requisição de registro (válida)
    print("\n>>> Tentando registrar Alice...")
    user_data_alice = {"username": "alice_user", "email": "alice@example.com", "password": "senha123"}
    response_alice = controller.register_user(user_data_alice)
    print(f"Resposta da aplicação: {response_alice}")

    # Simulação de requisição de registro (usuário já existente)
    print("\n>>> Tentando registrar Alice novamente (deve falhar)...")
    response_alice_again = controller.register_user(user_data_alice)
    print(f"Resposta da aplicação: {response_alice_again}")

    # Simulação de requisição de registro (email inválido)
    print("\n>>> Tentando registrar Bob com email inválido (deve falhar)...")
    user_data_bob_invalid_email = {"username": "bob_user", "email": "bob@example", "password": "senha456"}
    response_bob_invalid_email = controller.register_user(user_data_bob_invalid_email)
    print(f"Resposta da aplicação: {response_bob_invalid_email}")

    # Simulação de requisição de registro (válida)
    print("\n>>> Tentando registrar Charlie...")
    user_data_charlie = {"username": "charlie_user", "email": "charlie@example.com", "password": "senha789"}
    response_charlie = controller.register_user(user_data_charlie)
    print(f"Resposta da aplicação: {response_charlie}")

    print("\n--- Fim do Exemplo ---")

if __name__ == "__main__":
    run_application()
