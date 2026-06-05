# lsp_examples.py

# =============================================================================
# Liskov Substitution Principle (LSP) - Princípio da Substituição de Liskov
# =============================================================================

# Definição: "Funções que usam ponteiros ou referências para classes base devem ser capazes de usar objetos das classes derivadas sem saber disso."
# Mais simplesmente, se S é um subtipo de T, então objetos do tipo T em um programa podem ser substituídos por objetos do tipo S sem alterar nenhuma das propriedades desejáveis desse programa.

# -----------------------------------------------------------------------------
# Exemplo RUIM: Violação do LSP
# Um subtipo que não pode ser substituído por seu tipo base sem quebrar o cliente.
# -----------------------------------------------------------------------------

class Bird:
    def fly(self):
        return "Voando alto!"

class Ostrich(Bird):
    def fly(self):
        # Avestruzes não voam, mas esta implementação é forçada a ter um método fly.
        # Isso viola o LSP porque um Ostrich não pode substituir um Bird no contexto de voo.
        raise NotImplementedError("Avestruzes não podem voar")

def make_bird_fly(bird: Bird):
    try:
        print(f"{type(bird).__name__}: {bird.fly()}")
    except NotImplementedError as e:
        print(f"{type(bird).__name__}: Erro ao tentar voar - {e}")

print("--- Exemplo RUIM (Violação do LSP) ---")
bird1 = Bird()
ostrich1 = Ostrich()

make_bird_fly(bird1)    # OK
make_bird_fly(ostrich1) # Quebra o cliente com um erro inesperado se não for tratado
print("-" * 40)


# -----------------------------------------------------------------------------
# Exemplo BOM: Aplicação do LSP
# Redesenhando a hierarquia para que subtipos sejam substituíveis.
# -----------------------------------------------------------------------------

from abc import ABC, abstractmethod

class Flyable(ABC):
    @abstractmethod
    def fly(self):
        pass

class BirdGood(ABC):
    # Classe base mais genérica para pássaros, sem assumir que todos voam.
    pass

class Eagle(BirdGood, Flyable):
    def fly(self):
        return "Águia voando majestosamente!"

class Penguin(BirdGood):
    def swim(self):
        return "Pinguim nadando graciosamente!"

# Funções que esperam pássaros que voam podem usar a interface Flyable
def make_flying_bird_fly(bird: Flyable):
    print(f"{type(bird).__name__}: {bird.fly()}")

# Funções que lidam com pássaros em geral (sem assumir voo) podem usar BirdGood
def describe_bird(bird: BirdGood):
    if isinstance(bird, Flyable):
        print(f"{type(bird).__name__} pode voar.")
    else:
        print(f"{type(bird).__name__} é um pássaro, mas não foi projetado para voar neste contexto.")
    if isinstance(bird, Penguin):
        print(f"{type(bird).__name__}: {bird.swim()}")

print("\n--- Exemplo BOM (Aplicação do LSP) ---")
eagle1 = Eagle()
penguin1 = Penguin()

make_flying_bird_fly(eagle1) # OK
# make_flying_bird_fly(penguin1) # Isso daria um erro de tipo em um sistema tipado, ou em tempo de execução se não fosse um Flyable

describe_bird(eagle1)
describe_bird(penguin1)
print("-" * 40)
