// ocp_examples.ts

// =============================================================================
// Open/Closed Principle (OCP) - Princípio Aberto/Fechado
// =============================================================================

// Definição: "Entidades de software (classes, módulos, funções, etc.) devem ser abertas para extensão, mas fechadas para modificação."
// Isso significa que você deve ser capaz de estender o comportamento de um módulo sem precisar modificar seu código-fonte.

// -----------------------------------------------------------------------------
// Exemplo RUIM: Violação do OCP
// A classe `AreaCalculatorBad` precisa ser modificada toda vez que uma nova forma é adicionada.
// -----------------------------------------------------------------------------

class RectangleBad {
    constructor(public width: number, public height: number) {}
}

class CircleBad {
    constructor(public radius: number) {}
}

class AreaCalculatorBad {
    calculateArea(shapes: (RectangleBad | CircleBad)[]): number {
        let totalArea = 0;
        for (const shape of shapes) {
            if (shape instanceof RectangleBad) {
                totalArea += shape.width * shape.height;
            } else if (shape instanceof CircleBad) {
                totalArea += Math.PI * shape.radius ** 2;
            }
            // Problema: Se adicionarmos um novo tipo de forma (ex: Triangle),
            // precisaremos modificar esta classe `AreaCalculatorBad`.
            // Isso viola o OCP, pois a classe não está fechada para modificação.
        }
        return totalArea;
    }
}

console.log("--- Exemplo RUIM (Violação do OCP) [TypeScript] ---");
const rectangleBad1 = new RectangleBad(10, 5);
const circleBad1 = new CircleBad(7);

const calculatorBad = new AreaCalculatorBad();
console.log(`Área total: ${calculatorBad.calculateArea([rectangleBad1, circleBad1]).toFixed(2)}`);

// Imagine que precisamos adicionar um Triângulo. Teríamos que editar AreaCalculatorBad.
class TriangleBad {
    constructor(public base: number, public height: number) {}
}

// Para suportar TriangleBad, teríamos que modificar AreaCalculatorBad, adicionando um 'else if'
// Isso é indesejável em um sistema grande e já testado.
console.log("-" .repeat(40));


// -----------------------------------------------------------------------------
// Exemplo BOM: Aplicação do OCP
// Usando uma interface para permitir extensão sem modificação.
// -----------------------------------------------------------------------------

interface Shape {
    area(): number;
}

class RectangleGood implements Shape {
    constructor(public width: number, public height: number) {}

    area(): number {
        return this.width * this.height;
    }
}

class CircleGood implements Shape {
    constructor(public radius: number) {}

    area(): number {
        return Math.PI * this.radius ** 2;
    }
}

class TriangleGood implements Shape {
    constructor(public base: number, public height: number) {}

    area(): number {
        return 0.5 * this.base * this.height;
    }
}

class AreaCalculatorGood {
    calculateArea(shapes: Shape[]): number {
        let totalArea = 0;
        for (const shape of shapes) {
            totalArea += shape.area();
        }
        return totalArea;
    }
}

console.log("\n--- Exemplo BOM (Aplicação do OCP) [TypeScript] ---");
const rectangleGood2 = new RectangleGood(10, 5);
const circleGood2 = new CircleGood(7);
const triangleGood1 = new TriangleGood(10, 4);

const calculatorGood = new AreaCalculatorGood();
console.log(`Área total: ${calculatorGood.calculateArea([rectangleGood2, circleGood2, triangleGood1]).toFixed(2)}`);

// Benefícios:
// - Se adicionarmos um novo tipo de forma (ex: Square), não precisamos modificar
//   AreaCalculatorGood. Apenas criamos uma nova classe Square que implementa a interface Shape
//   e implementa o método 'area()'.
// - A classe AreaCalculatorGood está 'fechada para modificação', mas 'aberta para extensão'.
console.log("-" .repeat(40));
