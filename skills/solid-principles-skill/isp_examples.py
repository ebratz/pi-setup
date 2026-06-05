# isp_examples.py

# =============================================================================
# Interface Segregation Principle (ISP) - Princípio da Segregação de Interfaces
# =============================================================================

# Definição: "Clientes não devem ser forçados a depender de interfaces que não usam."
# Em outras palavras, interfaces grandes e monolíticas devem ser divididas em interfaces menores e mais específicas.

# -----------------------------------------------------------------------------
# Exemplo RUIM: Violação do ISP
# Uma interface "gorda" que força classes a implementar métodos irrelevantes.
# -----------------------------------------------------------------------------

from abc import ABC, abstractmethod

class WorkerBad(ABC):
    @abstractmethod
    def work(self):
        pass

    @abstractmethod
    def eat(self):
        pass

    @abstractmethod
    def sleep(self):
        pass

class HumanWorkerBad(WorkerBad):
    def work(self):
        return "Trabalhando como humano..."

    def eat(self):
        return "Comendo comida..."

    def sleep(self):
        return "Dormindo por 8 horas..."

class RobotWorkerBad(WorkerBad):
    def work(self):
        return "Trabalhando como robô..."

    def eat(self):
        # Robôs não comem da mesma forma que humanos, mas são forçados a implementar.
        # Isso é uma violação do ISP.
        raise NotImplementedError("Robôs não comem")

    def sleep(self):
        # Robôs não dormem, mas são forçados a implementar.
        # Isso é uma violação do ISP.
        raise NotImplementedError("Robôs não dormem")

def manage_worker_bad(worker: WorkerBad):
    print(f"{type(worker).__name__}: {worker.work()}")
    try:
        print(f"{type(worker).__name__}: {worker.eat()}")
    except NotImplementedError as e:
        print(f"{type(worker).__name__}: Erro ao comer - {e}")
    try:
        print(f"{type(worker).__name__}: {worker.sleep()}")
    except NotImplementedError as e:
        print(f"{type(worker).__name__}: Erro ao dormir - {e}")

print("--- Exemplo RUIM (Violação do ISP) ---")
human_worker_bad = HumanWorkerBad()
robot_worker_bad = RobotWorkerBad()

manage_worker_bad(human_worker_bad)
print("\n")
manage_worker_bad(robot_worker_bad)
print("-" * 40)


# -----------------------------------------------------------------------------
# Exemplo BOM: Aplicação do ISP
# Segregando a interface em partes menores e mais específicas.
# -----------------------------------------------------------------------------

class Workable(ABC):
    @abstractmethod
    def work(self):
        pass

class Feedable(ABC):
    @abstractmethod
    def eat(self):
        pass

class Sleepable(ABC):
    @abstractmethod
    def sleep(self):
        pass

class HumanWorkerGood(Workable, Feedable, Sleepable):
    def work(self):
        return "Trabalhando como humano de forma eficiente..."

    def eat(self):
        return "Comendo refeição nutritiva..."

    def sleep(self):
        return "Tirando uma soneca restauradora..."

class RobotWorkerGood(Workable):
    def work(self):
        return "Trabalhando como robô sem parar..."

# Gerenciadores específicos para cada capacidade
def manage_workable(worker: Workable):
    print(f"{type(worker).__name__}: {worker.work()}")

def manage_feedable(worker: Feedable):
    print(f"{type(worker).__name__}: {worker.eat()}")

def manage_sleepable(worker: Sleepable):
    print(f"{type(worker).__name__}: {worker.sleep()}")

print("\n--- Exemplo BOM (Aplicação do ISP) ---")
human_worker_good = HumanWorkerGood()
robot_worker_good = RobotWorkerGood()

manage_workable(human_worker_good)
manage_feedable(human_worker_good)
manage_sleepable(human_worker_good)
print("\n")
manage_workable(robot_worker_good)
# Não tentamos chamar eat() ou sleep() em um RobotWorkerGood, pois ele não implementa essas interfaces.
# Isso respeita o ISP.
print("-" * 40)
