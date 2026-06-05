---
name: solid-principles
description: Apply SOLID design principles (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion) when writing, refactoring, or reviewing TypeScript/JavaScript classes, services, and modules.
---

# Skill: Princípios SOLID na Programação

## Descrição
Esta skill tem como objetivo educar e exemplificar os princípios SOLID de design de software, promovendo a escrita de código mais limpo, manutenível e escalável. Cada princípio será explicado em detalhes, acompanhado de exemplos práticos em **Python e TypeScript** para ilustrar sua aplicação correta e as consequências de sua violação.

## O que são os Princípios SOLID?
SOLID é um acrônimo para cinco princípios de design de software que visam tornar os designs de software mais compreensíveis, flexíveis e manuteníveis. Eles foram popularizados por Robert C. Martin (também conhecido como Uncle Bob).

## Estrutura da Skill
Esta skill abordará os seguintes princípios:

1.  **S**ingle Responsibility Principle (SRP) - Princípio da Responsabilidade Única
2.  **O**pen/Closed Principle (OCP) - Princípio Aberto/Fechado
3.  **L**iskov Substitution Principle (LSP) - Princípio da Substituição de Liskov
4.  **I**nterface Segregation Principle (ISP) - Princípio da Segregação de Interfaces
5.  **D**ependency Inversion Principle (DIP) - Princípio da Inversão de Dependência

## 1. Single Responsibility Principle (SRP) - Princípio da Responsabilidade Única

### Definição
"Uma classe deve ter apenas uma razão para mudar."

Isso significa que cada classe ou módulo deve ter uma, e apenas uma, responsabilidade. Uma responsabilidade é definida como uma "razão para mudar". Se uma classe tem mais de uma responsabilidade, ela terá mais de uma razão para mudar, o que a torna mais complexa, difícil de manter e mais propensa a bugs quando uma dessas responsabilidades muda.

### Benefícios
*   **Coesão:** Aumenta a coesão da classe, pois todas as suas funções estão estritamente relacionadas a uma única responsabilidade.
*   **Acoplamento Fraco:** Reduz o acoplamento entre as partes do sistema, pois mudanças em uma responsabilidade não afetam outras responsabilidades contidas em outras classes.
*   **Testabilidade:** Facilita a escrita de testes unitários, pois cada classe tem um foco claro.
*   **Manutenibilidade:** Torna o código mais fácil de entender e manter, pois as responsabilidades são bem definidas e isoladas.

### Exemplo em Python e TypeScript
Consulte os arquivos `~/.pi/agent/skills/solid-principles-skill/srp_examples.py` e `~/.pi/agent/skills/solid-principles-skill/srp_examples.ts` para ver exemplos práticos.

## 2. Open/Closed Principle (OCP) - Princípio Aberto/Fechado

### Definição
"Entidades de software (classes, módulos, funções, etc.) devem ser abertas para extensão, mas fechadas para modificação."

Isso significa que você deve ser capaz de estender o comportamento de um módulo sem precisar modificar seu código-fonte. Quando novas funcionalidades são adicionadas, em vez de alterar o código existente, você deve adicionar um novo código. Isso é geralmente alcançado através do uso de abstrações (interfaces ou classes abstratas) e polimorfismo.

### Benefícios
*   **Estabilidade:** O código existente, que já foi testado e está em produção, permanece intocado, reduzindo o risco de introduzir novos bugs.
*   **Flexibilidade:** Facilita a adição de novas funcionalidades, pois não há necessidade de reescrever ou modificar componentes existentes.
*   **Reusabilidade:** Promove a criação de componentes genéricos e reutilizáveis.
*   **Manutenibilidade:** Melhora a manutenibilidade, pois as mudanças são localizadas e novas funcionalidades não afetam o código antigo.

### Exemplo em Python e TypeScript
Consulte os arquivos `~/.pi/agent/skills/solid-principles-skill/ocp_examples.py` e `~/.pi/agent/skills/solid-principles-skill/ocp_examples.ts` para ver exemplos práticos.

## 3. Liskov Substitution Principle (LSP) - Princípio da Substituição de Liskov

### Definição
"Funções que usam ponteiros ou referências para classes base devem ser capazes de usar objetos das classes derivadas sem saber disso."

Mais simplesmente, se `S` é um subtipo de `T`, então objetos do tipo `T` em um programa podem ser substituídos por objetos do tipo `S` sem alterar nenhuma das propriedades desejáveis desse programa (corretude, desempenho de tarefas, etc.).

Isso significa que uma classe derivada deve ser completamente substituível por sua classe base. Se uma subclasse modifica o comportamento de forma que a classe base esperaria algo diferente, ela viola o LSP, levando a bugs inesperados.

### Benefícios
*   **Robustez:** Garante que o sistema se comporte conforme o esperado, mesmo com subtipos, prevenindo efeitos colaterais inesperados.
*   **Reusabilidade:** Promove hierarquias de classes bem projetadas que podem ser estendidas e reutilizadas com confiança.
*   **Manutenibilidade:** Torna o código mais fácil de manter, pois as subclasses não quebram o contrato da superclasse.
*   **Extensibilidade:** Facilita a introdução de novos subtipos sem a necessidade de modificar o código cliente existente.

### Exemplo em Python e TypeScript
Consulte os arquivos `~/.pi/agent/skills/solid-principles-skill/lsp_examples.py` e `~/.pi/agent/skills/solid-principles-skill/lsp_examples.ts` para ver exemplos práticos.

## 4. Interface Segregation Principle (ISP) - Princípio da Segregação de Interfaces

### Definição
"Clientes não devem ser forçados a depender de interfaces que não usam."

Em outras palavras, interfaces grandes e monolíticas devem ser divididas em interfaces menores e mais específicas. Isso significa que uma classe não deve ser forçada a implementar métodos que ela não precisa ou não faz sentido para ela. O ISP visa evitar que classes implementem interfaces "gordas", ou seja, interfaces com muitos métodos, alguns dos quais podem ser irrelevantes para a classe.

### Benefícios
*   **Menos Acoplamento:** Clientes dependem apenas dos métodos que realmente usam, reduzindo o acoplamento desnecessário.
*   **Maior Coesão:** Interfaces menores são mais coesas, com métodos mais relacionados entre si.
*   **Flexibilidade:** Permite que as classes implementem apenas as partes da funcionalidade que são relevantes para elas.
*   **Manutenibilidade:** Torna o sistema mais fácil de manter, pois mudanças em uma parte da interface não afetam clientes que não usam essa parte.

### Exemplo em Python e TypeScript
Consulte os arquivos `~/.pi/agent/skills/solid-principles-skill/isp_examples.py` e `~/.pi/agent/skills/solid-principles-skill/isp_examples.ts` para ver exemplos práticos.

## 5. Dependency Inversion Principle (DIP) - Princípio da Inversão de Dependência

### Definição
1.  "Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações."
2.  "Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações."

O DIP sugere que o software deve ser projetado de forma que as dependências sejam invertidas. Em vez de módulos de alto nível (que contêm a lógica de negócios principal) dependerem de módulos de baixo nível (que lidam com detalhes de implementação, como banco de dados ou serviços de rede), ambos devem depender de abstrações (interfaces ou classes abstratas). Isso reduz o acoplamento e aumenta a flexibilidade.

### Benefícios
*   **Flexibilidade e Reusabilidade:** Facilita a mudança de detalhes de implementação (módulos de baixo nível) sem afetar a lógica de negócios (módulos de alto nível).
*   **Testabilidade:** Permite que os módulos de alto nível sejam testados isoladamente, substituindo dependências reais por mocks ou stubs que implementam as abstrações.
*   **Acoplamento Fraco:** Reduz o acoplamento entre os módulos, tornando o sistema mais modular e fácil de manter.
*   **Extensibilidade:** Simplifica a adição de novas implementações de baixo nível sem modificar o código de alto nível.

### Exemplo em Python e TypeScript
Consulte os arquivos `~/.pi/agent/skills/solid-principles-skill/dip_examples.py` e `~/.pi/agent/skills/solid-principles-skill/dip_examples.ts` para ver exemplos práticos.

## Como Acionar a Skill
Esta skill é acionada automaticamente quando você faz perguntas ou solicitações relacionadas aos princípios SOLID de programação, design de software, código limpo, manutenção de software ou escalabilidade.

### Exemplos de Perguntas que Acionam a Skill:
*   "O que são os princípios SOLID?"
*   "Explique o Princípio da Responsabilidade Única (SRP)."
*   "Me dê um exemplo bom do OCP em Python."
*   "Como o LSP me ajuda a escrever código mais robusto?"
*   "Quero ver um exemplo ruim do DIP em TypeScript."
*   "Qual a diferença entre ISP e DIP?"
*   "Preciso de exemplos de código limpo seguindo o SOLID."

## Interagindo com a Skill
Uma vez acionada, a skill pode:
*   **Explicar cada princípio SOLID** em detalhes.
*   **Fornecer exemplos de código** em Python ou TypeScript, ilustrando a aplicação correta (BOM) e a violação (RUIM) de cada princípio.
*   **Comparar e contrastar princípios** quando aplicável.

## Exemplo de Interação
**Usuário:** "Explique o Princípio Aberto/Fechado e me dê um exemplo bom em Python."

**Agente (usando esta skill):**
"O Princípio Aberto/Fechado (OCP) afirma que entidades de software (classes, módulos, funções, etc.) devem ser abertas para extensão, mas fechadas para modificação.

Isso significa que você deve ser capaz de estender o comportamento de um módulo sem precisar modificar seu código-fonte. Quando novas funcionalidades são adicionadas, em vez de alterar o código existente, você deve adicionar um novo código. Isso é geralmente alcançado através do uso de abstrações (interfaces ou classes abstratas) e polimorfismo.

**Benefícios:** Estabilidade, Flexibilidade, Reusabilidade, Manutenibilidade.

Aqui está um exemplo BOM do OCP em Python:

```python
# ocp_examples.py (Trecho do arquivo)
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class RectangleGood(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class CircleGood(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

class AreaCalculatorGood:
    def calculate_area(self, shapes: list[Shape]):
        total_area = 0
        for shape in shapes:
            total_area += shape.area()
        return total_area

# Exemplo de uso:
rectangle2 = RectangleGood(10, 5)
circle2 = CircleGood(7)
calculator_good = AreaCalculatorGood()
print(f"Área total: {calculator_good.calculate_area([rectangle2, circle2]):.2f}")
```

Para ver o exemplo completo ou em TypeScript, ou para explorar outro princípio, apenas me diga!"
