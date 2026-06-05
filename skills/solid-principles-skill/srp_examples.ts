// srp_examples.ts

// =============================================================================
// Single Responsibility Principle (SRP) - Princípio da Responsabilidade Única
// =============================================================================

// Definição: "Uma classe deve ter apenas uma razão para mudar."
// Isso significa que cada classe ou módulo deve ter uma, e apenas uma, responsabilidade.

// -----------------------------------------------------------------------------
// Exemplo RUIM: Violação do SRP
// Uma classe com múltiplas responsabilidades
// -----------------------------------------------------------------------------

interface Item {
    name: string;
    price: number;
    quantity: number;
}

class OrderBad {
    customerName: string;
    items: Item[];
    totalPrice: number;

    constructor(customerName: string, items: Item[]) {
        this.customerName = customerName;
        this.items = items;
        this.totalPrice = this.calculateTotal();
    }

    private calculateTotal(): number {
        // Responsabilidade 1: Cálculo do total
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    saveOrder(): void {
        // Responsabilidade 2: Persistência de dados
        console.log(`Salvando pedido para ${this.customerName} com total de R$${this.totalPrice.toFixed(2)} no banco de dados...`);
        // Lógica para salvar no banco de dados
    }

    sendConfirmationEmail(): void {
        // Responsabilidade 3: Envio de notificações
        console.log(`Enviando e-mail de confirmação para ${this.customerName} sobre o pedido de R$${this.totalPrice.toFixed(2)}...`);
        // Lógica para enviar e-mail
    }
}

// Problemas:
// - Se a lógica de cálculo mudar, a classe OrderBad muda.
// - Se a forma de salvar o pedido mudar (ex: para um arquivo ou API), a classe OrderBad muda.
// - Se o método de envio de e-mail mudar, a classe OrderBad muda.
// A classe OrderBad tem três razões para mudar, violando o SRP.

// Exemplo de uso da classe OrderBad com violação
console.log("--- Exemplo RUIM (Violação do SRP) [TypeScript] ---");
const orderBad1 = new OrderBad("Alice", [
    { name: "Laptop", price: 1200, quantity: 1 },
    { name: "Mouse", price: 25, quantity: 2 }
]);
console.log(`Total do pedido de ${orderBad1.customerName}: R$${orderBad1.totalPrice.toFixed(2)}`);
orderBad1.saveOrder();
orderBad1.sendConfirmationEmail();
console.log("-" .repeat(40));


// -----------------------------------------------------------------------------
// Exemplo BOM: Aplicação do SRP
// Dividindo responsabilidades em classes separadas
// -----------------------------------------------------------------------------

class OrderGood {
    customerName: string;
    items: Item[];
    totalPrice: number;

    constructor(customerName: string, items: Item[]) {
        this.customerName = customerName;
        this.items = items;
        this.totalPrice = this.calculateTotal();
    }

    private calculateTotal(): number {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTotalPrice(): number {
        // Esta classe agora é responsável apenas por representar o pedido e seu estado.
        return this.totalPrice;
    }
}

class OrderRepository {
    save(order: OrderGood): void {
        // Responsabilidade: Persistência de pedidos
        console.log(`Salvando pedido para ${order.customerName} com total de R$${order.getTotalPrice().toFixed(2)} no banco de dados...`);
        // Lógica para salvar no banco de dados
    }
}

class EmailService {
    sendConfirmationEmail(order: OrderGood): void {
        // Responsabilidade: Envio de e-mails
        console.log(`Enviando e-mail de confirmação para ${order.customerName} sobre o pedido de R$${order.getTotalPrice().toFixed(2)}...`);
        // Lógica para enviar e-mail
    }
}

// Benefícios:
// - A classe OrderGood tem apenas a responsabilidade de gerenciar os dados do pedido.
// - A classe OrderRepository tem a responsabilidade única de persistir pedidos.
// - A classe EmailService tem a responsabilidade única de enviar e-mails.
// Cada classe tem apenas uma razão para mudar.

// Exemplo de uso das classes com SRP
console.log("\n--- Exemplo BOM (Aplicação do SRP) [TypeScript] ---");
const orderGood2 = new OrderGood("Bob", [
    { name: "Teclado", price: 150, quantity: 1 },
    { name: "Monitor", price: 300, quantity: 1 }
]);
console.log(`Total do pedido de ${orderGood2.customerName}: R$${orderGood2.getTotalPrice().toFixed(2)}`);

const orderRepo = new OrderRepository();
orderRepo.save(orderGood2);

const emailService = new EmailService();
emailService.sendConfirmationEmail(orderGood2);
console.log("-" .repeat(40));
