# dip_examples.py

# =============================================================================
# Dependency Inversion Principle (DIP) - Princípio da Inversão de Dependência
# =============================================================================

# Definição:
# 1. "Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações."
# 2. "Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações."

# -----------------------------------------------------------------------------
# Exemplo RUIM: Violação do DIP
# Módulo de alto nível (`ReportGeneratorBad`) depende de um módulo de baixo nível (`DatabaseServiceBad`).
# -----------------------------------------------------------------------------

class DatabaseServiceBad:
    def get_data(self):
        print("DatabaseServiceBad: Obtendo dados diretamente do banco de dados.")
        return [{"id": 1, "value": "data1"}, {"id": 2, "value": "data2"}]

class ReportGeneratorBad:
    def __init__(self):
        # Módulo de alto nível (ReportGeneratorBad) depende diretamente do módulo de baixo nível (DatabaseServiceBad).
        # Isso cria um acoplamento forte. Se a forma de obter dados mudar (ex: de uma API), 
        # ReportGeneratorBad precisará ser modificado.
        self.db_service = DatabaseServiceBad()

    def generate_report(self):
        data = self.db_service.get_data()
        print(f"ReportGeneratorBad: Gerando relatório com dados: {data}")
        # Lógica para gerar o relatório

print("--- Exemplo RUIM (Violação do DIP) ---")
report_generator_bad = ReportGeneratorBad()
report_generator_bad.generate_report()
print("-" * 40)


# -----------------------------------------------------------------------------
# Exemplo BOM: Aplicação do DIP
# Módulos de alto e baixo nível dependem de uma abstração (interface).
# -----------------------------------------------------------------------------

from abc import ABC, abstractmethod

# Abstração para o serviço de dados
class DataService(ABC):
    @abstractmethod
    def get_data(self):
        pass

# Módulo de baixo nível (implementação concreta) depende da abstração
class DatabaseServiceGood(DataService):
    def get_data(self):
        print("DatabaseServiceGood: Obtendo dados do banco de dados.")
        return [{"id": 101, "value": "dataA"}, {"id": 102, "value": "dataB"}]

# Outra implementação de baixo nível que também depende da abstração
class APIServiceGood(DataService):
    def get_data(self):
        print("APIServiceGood: Obtendo dados de uma API externa.")
        return [{"id": 201, "value": "api_dataX"}, {"id": 202, "value": "api_dataY"}]

# Módulo de alto nível (`ReportGeneratorGood`) depende da abstração, não da implementação concreta.
class ReportGeneratorGood:
    def __init__(self, data_service: DataService):
        # Injeção de dependência: o ReportGeneratorGood não sabe qual é a implementação concreta,
        # apenas que é um DataService.
        self.data_service = data_service

    def generate_report(self):
        data = self.data_service.get_data()
        print(f"ReportGeneratorGood: Gerando relatório com dados: {data}")
        # Lógica para gerar o relatório

print("\n--- Exemplo BOM (Aplicação do DIP) ---")

# Usando o serviço de banco de dados
db_service_good = DatabaseServiceGood()
report_generator_with_db = ReportGeneratorGood(db_service_good)
report_generator_with_db.generate_report()

print("\n")

# Usando o serviço de API (o ReportGeneratorGood não precisou ser modificado!)
api_service_good = APIServiceGood()
report_generator_with_api = ReportGeneratorGood(api_service_good)
report_generator_with_api.generate_report()
print("-" * 40)
