// typescript_basics_examples.ts

// =============================================================================
// TypeScript Basics - Exemplos Fundamentais
// =============================================================================

console.log("--- TypeScript Basics Examples ---");

// -----------------------------------------------------------------------------
// 1. Tipagem Estática Básica
//    - Definindo tipos para variáveis.
// -----------------------------------------------------------------------------

let userName: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let hobbies: string[] = ["reading", "hiking"];
let scores: Array<number> = [95, 88, 72];

console.log(`
1. Tipagem Estática Básica:
  Name: ${userName}, Type: ${typeof userName}
  Age: ${age}, Type: ${typeof age}
  Is Active: ${isActive}, Type: ${typeof isActive}
  Hobbies: ${hobbies.join(", ")}, Type: ${typeof hobbies}
`);

// userName = 123; // Erro de tipo: Type 'number' is not assignable to type 'string'.

// -----------------------------------------------------------------------------
// 2. Interfaces
//    - Definindo o "contrato" para a forma de um objeto.
// -----------------------------------------------------------------------------

interface Person {
    firstName: string;
    lastName: string;
    age?: number; // Propriedade opcional
    greet(): string; // Método que retorna uma string
}

class Employee implements Person {
    firstName: string;
    lastName: string;
    age?: number;

    constructor(firstName: string, lastName: string, age?: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    greet(): string {
        return `Hello, my name is ${this.firstName} ${this.lastName}.`;
    }
}

const person1: Person = new Employee("John", "Doe", 45);
console.log(`
2. Interfaces:
  ${person1.greet()}
  Person age: ${person1.age}
`);

// Objeto literal que implementa a interface
const anotherPerson: Person = {
    firstName: "Jane",
    lastName: "Smith",
    greet() {
        return `Greetings from ${this.firstName} ${this.lastName}.`;
    }
};
console.log(`  ${anotherPerson.greet()}
`);

// -----------------------------------------------------------------------------
// 3. Tipos Personalizados (Type Aliases)
//    - Criando um novo nome para um tipo existente ou uma união de tipos.
// -----------------------------------------------------------------------------

type ID = string | number;
type Status = "active" | "inactive" | "pending";

let userId: ID = "abc-123";
userId = 456;

let userStatus: Status = "active";
// userStatus = "blocked"; // Erro de tipo: Type '"blocked"' is not assignable to type 'Status'.

console.log(`
3. Tipos Personalizados (Type Aliases):
  User ID: ${userId}
  User Status: ${userStatus}
`);

// -----------------------------------------------------------------------------
// 4. Funções com Tipagem
//    - Definindo tipos para parâmetros e retornos de funções.
// -----------------------------------------------------------------------------

function add(a: number, b: number): number {
    return a + b;
}

const concatenateStrings = (str1: string, str2: string): string => {
    return str1 + str2;
};

console.log(`
4. Funções com Tipagem:
  Sum: ${add(10, 20)}
  Concatenated: ${concatenateStrings("Hello", " TypeScript")}
`);

// -----------------------------------------------------------------------------
// 5. Tipos Genéricos
//    - Escrevendo componentes que funcionam com qualquer tipo, mantendo a segurança de tipo.
// -----------------------------------------------------------------------------

function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString"); // type of output1 is string
let output2 = identity<number>(100);

console.log(`
5. Tipos Genéricos:
  Identity (string): ${output1}, Type: ${typeof output1}
  Identity (number): ${output2}, Type: ${typeof output2}
`);

console.log("------------------------------------");
