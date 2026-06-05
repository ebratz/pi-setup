// lsp_examples.ts

// =============================================================================
// Liskov Substitution Principle (LSP) - Princípio da Substituição de Liskov
// =============================================================================

// Definição: "Funções que usam ponteiros ou referências para classes base devem ser capazes de usar objetos das classes derivadas sem saber disso."
// Mais simplesmente, se S é um subtipo de T, então objetos do tipo T em um programa podem ser substituídos por objetos do tipo S sem alterar nenhuma das propriedades desejáveis desse programa.

// -----------------------------------------------------------------------------
// Exemplo RUIM: Violação do LSP
// Um subtipo que não pode ser substituído por seu tipo base sem quebrar o cliente.
// -----------------------------------------------------------------------------

class BirdBad {
    fly(): string {
        return "Voando alto!";
    }
}

class OstrichBad extends BirdBad {
    fly(): string {
        // Avestruzes não voam, mas esta implementação é forçada a ter um método fly.
        // Isso viola o LSP porque um OstrichBad não pode substituir um BirdBad no contexto de voo.
        throw new Error("Avestruzes não podem voar");
    }
}

function makeBirdFlyBad(bird: BirdBad): void {
    try {
        console.log(`${bird.constructor.name}: ${bird.fly()}`);
    } catch (e: any) {
        console.log(`${bird.constructor.name}: Erro ao tentar voar - ${e.message}`);
    }
}

console.log("--- Exemplo RUIM (Violação do LSP) [TypeScript] ---");
const birdBad1 = new BirdBad();
const ostrichBad1 = new OstrichBad();

makeBirdFlyBad(birdBad1);    // OK
makeBirdFlyBad(ostrichBad1); // Quebra o cliente com um erro inesperado se não for tratado
console.log("-" .repeat(40));


// -----------------------------------------------------------------------------
// Exemplo BOM: Aplicação do LSP
// Redesenhando a hierarquia para que subtipos sejam substituíveis.
// -----------------------------------------------------------------------------

interface Flyable {
    fly(): string;
}

// Uma classe base mais genérica para pássaros, sem assumir que todos voam.
abstract class BirdGood {
    abstract describe(): string;
}

class EagleGood extends BirdGood implements Flyable {
    describe(): string {
        return "Águia";
    }
    fly(): string {
        return "Águia voando majestosamente!";
    }
}

class PenguinGood extends BirdGood {
    describe(): string {
        return "Pinguim";
    }
    swim(): string {
        return "Pinguim nadando graciosamente!";
    }
}

// Funções que esperam pássaros que voam podem usar a interface Flyable
function makeFlyingBirdFlyGood(bird: Flyable): void {
    console.log(`${bird.constructor.name}: ${bird.fly()}`);
}

// Funções que lidam com pássaros em geral (sem assumir voo) podem usar BirdGood
function describeBirdGood(bird: BirdGood): void {
    console.log(`${bird.describe()} é um pássaro.`);
    if ((bird as any).fly) {
        console.log(`${bird.describe()} pode voar.`);
    }
    if (bird instanceof PenguinGood) {
        console.log(`${bird.describe()}: ${bird.swim()}`);
    }
}

console.log("\n--- Exemplo BOM (Aplicação do LSP) [TypeScript] ---");
const eagleGood1 = new EagleGood();
const penguinGood1 = new PenguinGood();

makeFlyingBirdFlyGood(eagleGood1); // OK
// makeFlyingBirdFlyGood(penguinGood1); // Isso daria um erro de tipo em TypeScript, pois PenguinGood não implementa Flyable

describeBirdGood(eagleGood1);
describeBirdGood(penguinGood1);
console.log("-" .repeat(40));
