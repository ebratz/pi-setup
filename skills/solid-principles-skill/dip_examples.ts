// dip_examples.ts

// =============================================================================
// Dependency Inversion Principle (DIP) - Princípio da Inversão de Dependência
// =============================================================================

// Definição:
// 1. "Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações."
// 2. "Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações."

// -----------------------------------------------------------------------------
// Exemplo RUIM: Violação do DIP
// Módulo de alto nível (`ReportGeneratorBad`) depende de um módulo de baixo nível (`DatabaseServiceBad`).
// -----------------------------------------------------------------------------

class DatabaseServiceBad {
    getData(): { id: number; value: string }[] {
        console.log("DatabaseServiceBad: Obtendo dados diretamente do banco de dados.");
        return [{ id: 1, value: "data1" }, { id: 2, value: "data2" }];
    }
}

class ReportGeneratorBad {
    private dbService: DatabaseServiceBad;

    constructor() {
        // Módulo de alto nível (ReportGeneratorBad) depende diretamente do módulo de baixo nível (DatabaseServiceBad).
        // Isso cria um acoplamento forte. Se a forma de obter dados mudar (ex: de uma API), 
        // ReportGeneratorBad precisará ser modificado.
        this.dbService = new DatabaseServiceBad();
    }

    generateReport(): void {
        const data = this.dbService.getData();
        console.log(`ReportGeneratorBad: Gerando relatório com dados: ${JSON.stringify(data)}`);
        // Lógica para gerar o relatório
    }
}

console.log("--- Exemplo RUIM (Violação do DIP) [TypeScript] ---");
const reportGeneratorBad = new ReportGeneratorBad();
reportGeneratorBad.generateReport();
console.log("-" .repeat(40));


// -----------------------------------------------------------------------------
// Exemplo BOM: Aplicação do DIP
// Módulos de alto e baixo nível dependem de uma abstração (interface).
// -----------------------------------------------------------------------------

// Abstração para o serviço de dados
interface DataService {
    getData(): { id: number; value: string }[];
}

// Módulo de baixo nível (implementação concreta) depende da abstração
class DatabaseServiceGood implements DataService {
    getData(): { id: number; value: string }[] {
        console.log("DatabaseServiceGood: Obtendo dados do banco de dados.");
        return [{ id: 101, value: "dataA" }, { id: 102, value: "dataB" }];
    }
}

// Outra implementação de baixo nível que também depende da abstração
class APIServiceGood implements DataService {
    getData(): { id: number; value: string }[] {
        console.log("APIServiceGood: Obtendo dados de uma API externa.");
        return [{ id: 201, value: "api_dataX" }, { id: 202, value: "api_dataY" }];
    }
}

// Módulo de alto nível (`ReportGeneratorGood`) depende da abstração, não da implementação concreta.
class ReportGeneratorGood {
    private dataService: DataService;

    constructor(dataService: DataService) {
        // Injeção de dependência: o ReportGeneratorGood não sabe qual é a implementação concreta,
        // apenas que é um DataService.
        this.dataService = dataService;
    }

    generateReport(): void {
        const data = this.dataService.getData();
        console.log(`ReportGeneratorGood: Gerando relatório com dados: ${JSON.stringify(data)}`);
        // Lógica para gerar o relatório
    }
}

console.log("\n--- Exemplo BOM (Aplicacão do DIP) [TypeScript] ---");

// Usando o serviço de banco de dados
const dbServiceGood = new DatabaseServiceGood();
const reportGeneratorWithDb = new ReportGeneratorGood(dbServiceGood);
reportGeneratorWithDb.generateReport();

console.log("\n");

// Usando o serviço de API (o ReportGeneratorGood não precisou ser modificado!)
const apiServiceGood = new APIServiceGood();
const reportGeneratorWithApi = new ReportGeneratorGood(apiServiceGood);
reportGeneratorWithApi.generateReport();
console.log("-" .repeat(40));
