# srp_examples.py

# =============================================================================
# Single Responsibility Principle (SRP) - Princípio da Responsabilidade Única
# =============================================================================

# Definição: "Uma classe deve ter apenas uma razão para mudar."
# Isso significa que cada classe ou módulo deve ter uma, e apenas uma, responsabilidade.

# -----------------------------------------------------------------------------
# Exemplo RUIM: Violação do SRP
# Uma classe com múltiplas responsabilidades
# -----------------------------------------------------------------------------

class Order:
    def __init__(self, customer_name, items):
        self.customer_name = customer_name
        self.items = items
        self.total_price = sum(item['price'] * item['quantity'] for item in items)

    def calculate_total(self):
        # Responsabilidade 1: Cálculo do total
        return self.total_price

    def save_order(self):
        # Responsabilidade 2: Persistência de dados
        print(f"Salvando pedido para {self.customer_name} com total de R${self.total_price:.2f} no banco de dados...")
        # Lógica para salvar no banco de dados
        pass

    def send_confirmation_email(self):
        # Responsabilidade 3: Envio de notificações
        print(f"Enviando e-mail de confirmação para {self.customer_name} sobre o pedido de R${self.total_price:.2f}...")
        # Lógica para enviar e-mail
        pass

# Problemas:
# - Se a lógica de cálculo mudar, a classe Order muda.
# - Se a forma de salvar o pedido mudar (ex: para um arquivo ou API), a classe Order muda.
# - Se o método de envio de e-mail mudar, a classe Order muda.
# A classe Order tem três razões para mudar, violando o SRP.

# Exemplo de uso da classe Order com violação
print("--- Exemplo RUIM (Violação do SRP) ---")
order1 = Order("Alice", [{"name": "Laptop", "price": 1200, "quantity": 1}, {"name": "Mouse", "price": 25, "quantity": 2}])
print(f"Total do pedido de {order1.customer_name}: R${order1.calculate_total():.2f}")
order1.save_order()
order1.send_confirmation_email()
print("-" * 40)


# -----------------------------------------------------------------------------
# Exemplo BOM: Aplicação do SRP
# Dividindo responsabilidades em classes separadas
# -----------------------------------------------------------------------------

class Order:
    def __init__(self, customer_name, items):
        self.customer_name = customer_name
        self.items = items
        self.total_price = sum(item['price'] * item['quantity'] for item in items)

    def get_total_price(self):
        # Esta classe agora é responsável apenas por representar o pedido e seu estado.
        # O cálculo do total pode ser uma responsabilidade separada ou parte intrínseca do objeto
        # se não houver lógica de negócio complexa para isso.
        # Aqui, mantive como um getter simples para o total já calculado.
        return self.total_price

class OrderRepository:
    def save(self, order):
        # Responsabilidade: Persistência de pedidos
        print(f"Salvando pedido para {order.customer_name} com total de R${order.get_total_price():.2f} no banco de dados...")
        # Lógica para salvar no banco de dados
        pass

class EmailService:
    def send_confirmation_email(self, order):
        # Responsabilidade: Envio de e-mails
        print(f"Enviando e-mail de confirmação para {order.customer_name} sobre o pedido de R${order.get_total_price():.2f}...")
        # Lógica para enviar e-mail
        pass

# Benefícios:
# - A classe Order tem apenas a responsabilidade de gerenciar os dados do pedido.
# - A classe OrderRepository tem a responsabilidade única de persistir pedidos.
# - A classe EmailService tem a responsabilidade única de enviar e-mails.
# Cada classe tem apenas uma razão para mudar.

# Exemplo de uso das classes com SRP
print("\n--- Exemplo BOM (Aplicação do SRP) ---")
order2 = Order("Bob", [{"name": "Teclado", "price": 150, "quantity": 1}, {"name": "Monitor", "price": 300, "quantity": 1}])
print(f"Total do pedido de {order2.customer_name}: R${order2.get_total_price():.2f}")

order_repo = OrderRepository()
order_repo.save(order2)

email_service = EmailService()
email_service.send_confirmation_email(order2)
print("-" * 40)
