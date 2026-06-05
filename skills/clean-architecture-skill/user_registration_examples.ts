// user_registration_examples.ts

// =============================================================================
// Clean Architecture - Exemplo de Registro de Usuário (TypeScript)
// =============================================================================

// Este exemplo demonstra a aplicação da Clean Architecture para um caso de uso
// de registro de usuário, separando o código em camadas concêntricas.

// =============================================================================
// 1. Camada de Entidades (Entities) - Regras de Negócio Corporativas
//    - Objetos que encapsulam regras de negócio de alto nível e gerais.
//    - Independente de qualquer camada externa.
// =============================================================================

class User {
    public userId?: string;

    constructor(public username: string, public email: string, public passwordHash: string, userId?: string) {
        this.userId = userId;
    }

    public isValidEmail(): boolean {
        // Exemplo de regra de negócio da entidade: validação de email simples
        return this.email.includes("@") && this.email.includes(".");
    }
}

// =============================================================================
// 2. Camada de Casos de Uso (Use Cases / Interactors) - Regras de Negócio da Aplicação
//    - Contém a lógica de negócio específica da aplicação.
//    - Orquestra entidades e interage com adaptadores de interface através de interfaces.
//    - Depende apenas de Entidades e Abstrações (interfaces) de Repositórios/Gateways.
// =============================================================================

// Abstrações (interfaces) que os casos de uso definem e as camadas externas implementam.

interface UserRepository {
    getUserByUsername(username: string): User | undefined;
    getUserByEmail(email: string): User | undefined;
    saveUser(user: User): User;
}

interface UserRegistrationOutputPort {
    presentSuccess(user: User): void;
    presentError(message: string): void;
}

class RegisterUserRequest {
    constructor(public username: string, public email: string, public password: string) {}
}

class RegisterUserUseCase {
    private userRepository: UserRepository;
    private outputPort: UserRegistrationOutputPort;

    constructor(userRepository: UserRepository, outputPort: UserRegistrationOutputPort) {
        this.userRepository = userRepository;
        this.outputPort = outputPort;
    }

    public execute(request: RegisterUserRequest): void {
        if (!request.username || !request.email || !request.password) {
            this.outputPort.presentError("Todos os campos são obrigatórios.");
            return;
        }

        if (this.userRepository.getUserByUsername(request.username)) {
            this.outputPort.presentError("Nome de usuário já existe.");
            return;
        }

        if (this.userRepository.getUserByEmail(request.email)) {
            this.outputPort.presentError("Email já cadastrado.");
            return;
        }

        // Regra de negócio da entidade: validação de email
        const tempUserForValidation = new User(request.username, request.email, "");
        if (!tempUserForValidation.isValidEmail()) {
            this.outputPort.presentError("Formato de email inválido.");
            return;
        }

        // Em um cenário real, a senha seria hashada aqui.
        const passwordHash = `hashed_${request.password}`;
        const newUser = new User(request.username, request.email, passwordHash);

        const savedUser = this.userRepository.saveUser(newUser);
        this.outputPort.presentSuccess(savedUser);
    }
}

// =============================================================================
// 3. Camada de Adaptadores de Interface (Interface Adapters)
//    - Converte dados entre o formato das camadas internas e externas.
//    - Contém implementações concretas das interfaces definidas pelos Casos de Uso.
// =============================================================================

// Implementação do Repositório (Gateway) - Simulação em memória
class InMemoryUserRepository implements UserRepository {
    private users: { [id: string]: User } = {};
    private nextId: number = 1;

    public getUserByUsername(username: string): User | undefined {
        for (const userId in this.users) {
            if (this.users[userId].username === username) {
                return this.users[userId];
            }
        }
        return undefined;
    }

    public getUserByEmail(email: string): User | undefined {
        for (const userId in this.users) {
            if (this.users[userId].email === email) {
                return this.users[userId];
            }
        }
        return undefined;
    }

    public saveUser(user: User): User {
        if (!user.userId) {
            user.userId = String(this.nextId++);
        }
        this.users[user.userId] = user;
        return user;
    }
}

// Presenter - Prepara a saída para a UI/Web
class UserRegistrationWebPresenter implements UserRegistrationOutputPort {
    public viewModel: any = {};

    public presentSuccess(user: User): void {
        this.viewModel = {
            status: "success",
            message: `Usuário ${user.username} registrado com sucesso!`,
            userId: user.userId,
            username: user.username,
            email: user.email
        };
    }

    public presentError(message: string): void {
        this.viewModel = {
            status: "error",
            message: message
        };
    }
}

// Controlador - Lida com a entrada da UI/Web
class UserRegistrationController {
    private registerUserUseCase: RegisterUserUseCase;
    private presenter: UserRegistrationWebPresenter;

    constructor(registerUserUseCase: RegisterUserUseCase, presenter: UserRegistrationWebPresenter) {
        this.registerUserUseCase = registerUserUseCase;
        this.presenter = presenter;
    }

    public registerUser(data: { username?: string; email?: string; password?: string }): any {
        const request = new RegisterUserRequest(data.username || "", data.email || "", data.password || "");
        this.registerUserUseCase.execute(request);
        return this.presenter.viewModel;
    }
}

// =============================================================================
// 4. Camada de Frameworks e Drivers (Frameworks & Drivers)
//    - Detalhes de implementação: UI, Banco de Dados, Web Frameworks.
//    - Depende de todas as camadas internas.
// =============================================================================

// Exemplo de Aplicação (simulando um framework web)
function runApplication(): void {
    console.log("--- Clean Architecture: Exemplo de Registro de Usuário (TypeScript) ---");

    // Injeção de dependências: as camadas externas constroem e conectam as internas
    const userRepository = new InMemoryUserRepository();
    const presenter = new UserRegistrationWebPresenter();
    const registerUserUseCase = new RegisterUserUseCase(userRepository, presenter);
    const controller = new UserRegistrationController(registerUserUseCase, presenter);

    // Simulação de requisição de registro (válida)
    console.log("\n>>> Tentando registrar Alice...");
    const userDataAlice = { username: "alice_user_ts", email: "alice_ts@example.com", password: "senha123" };
    const responseAlice = controller.registerUser(userDataAlice);
    console.log(`Resposta da aplicação: ${JSON.stringify(responseAlice)}`);

    // Simulação de requisição de registro (usuário já existente)
    console.log("\n>>> Tentando registrar Alice novamente (deve falhar)...");
    const responseAliceAgain = controller.registerUser(userDataAlice);
    console.log(`Resposta da aplicação: ${JSON.stringify(responseAliceAgain)}`);

    // Simulação de requisição de registro (email inválido)
    console.log("\n>>> Tentando registrar Bob com email inválido (deve falhar)...");
    const userDataBobInvalidEmail = { username: "bob_user_ts", email: "bob@example", password: "senha456" };
    const responseBobInvalidEmail = controller.registerUser(userDataBobInvalidEmail);
    console.log(`Resposta da aplicação: ${JSON.stringify(responseBobInvalidEmail)}`);

    // Simulação de requisição de registro (válida)
    console.log("\n>>> Tentando registrar Charlie...");
    const userDataCharlie = { username: "charlie_user_ts", email: "charlie_ts@example.com", password: "senha789" };
    const responseCharlie = controller.registerUser(userDataCharlie);
    console.log(`Resposta da aplicação: ${JSON.stringify(responseCharlie)}`);

    console.log("\n--- Fim do Exemplo ---");
}

runApplication();
