// isp_examples.ts

// =============================================================================
// Interface Segregation Principle (ISP) - Princípio da Segregação de Interfaces
// =============================================================================

// Definição: "Clientes não devem ser forçados a depender de interfaces que não usam."
// Em outras palavras, interfaces grandes e monolíticas devem ser divididas em interfaces menores e mais específicas.

// -----------------------------------------------------------------------------
// Exemplo RUIM: Violação do ISP
// Uma interface "gorda" que força classes a implementar métodos irrelevantes.
// -----------------------------------------------------------------------------

interface WorkerBad {
    work(): string;
    eat(): string;
    sleep(): string;
}

class HumanWorkerBad implements WorkerBad {
    work(): string {
        return "Trabalhando como humano...";
    }

    eat(): string {
        return "Comendo comida...";
    }

    sleep(): string {
        return "Dormindo por 8 horas...";
    }
}

class RobotWorkerBad implements WorkerBad {
    work(): string {
        return "Trabalhando como robô...";
    }

    eat(): string {
        // Robôs não comem da mesma forma que humanos, mas são forçados a implementar.
        // Isso é uma violação do ISP.
        throw new Error("Robôs não comem");
    }

    sleep(): string {
        // Robôs não dormem, mas são forçados a implementar.
        // Isso é uma violação do ISP.
        throw new Error("Robôs não dormem");
    }
}

function manageWorkerBad(worker: WorkerBad): void {
    console.log(`${worker.constructor.name}: ${worker.work()}`);
    try {
        console.log(`${worker.constructor.name}: ${worker.eat()}`);
    } catch (e: any) {
        console.log(`${worker.constructor.name}: Erro ao comer - ${e.message}`);
    }
    try {
        console.log(`${worker.constructor.name}: ${worker.sleep()}`);
    } catch (e: any) {
        console.log(`${worker.constructor.name}: Erro ao dormir - ${e.message}`);
    }
}

console.log("--- Exemplo RUIM (Violação do ISP) [TypeScript] ---");
const humanWorkerBad = new HumanWorkerBad();
const robotWorkerBad = new RobotWorkerBad();

manageWorkerBad(humanWorkerBad);
console.log("\n");
manageWorkerBad(robotWorkerBad);
console.log("-" .repeat(40));


// -----------------------------------------------------------------------------
// Exemplo BOM: Aplicação do ISP
// Segregando a interface em partes menores e mais específicas.
// -----------------------------------------------------------------------------

interface Workable {
    work(): string;
}

interface Feedable {
    eat(): string;
}

interface Sleepable {
    sleep(): string;
}

class HumanWorkerGood implements Workable, Feedable, Sleepable {
    work(): string {
        return "Trabalhando como humano de forma eficiente...";
    }

    eat(): string {
        return "Comendo refeição nutritiva...";
    }

    sleep(): string {
        return "Tirando uma soneca restauradora...";
    }
}

class RobotWorkerGood implements Workable {
    work(): string {
        return "Trabalhando como robô sem parar...";
    }
    // Robôs não precisam implementar eat() nem sleep() aqui.
}

// Gerenciadores específicos para cada capacidade
function manageWorkable(worker: Workable): void {
    console.log(`${worker.constructor.name}: ${worker.work()}`);
}

function manageFeedable(worker: Feedable): void {
    console.log(`${worker.constructor.name}: ${worker.eat()}`);
}

function manageSleepable(worker: Sleepable): void {
    console.log(`${worker.constructor.name}: ${worker.sleep()}`);
}

console.log("\n--- Exemplo BOM (Aplicação do ISP) [TypeScript] ---");
const humanWorkerGood = new HumanWorkerGood();
const robotWorkerGood = new RobotWorkerGood();

manageWorkable(humanWorkerGood);
manageFeedable(humanWorkerGood);
manageSleepable(humanWorkerGood);
console.log("\n");
manageWorkable(robotWorkerGood);
// Não tentamos chamar eat() ou sleep() em um RobotWorkerGood, pois ele não implementa essas interfaces.
// Isso respeita o ISP.
console.log("-" .repeat(40));
