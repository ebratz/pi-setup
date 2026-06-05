---
name: clean-architecture
description: Apply Clean Architecture / Hexagonal / Ports-and-Adapters when designing systems, modules, or features — entities, use cases, adapters, repository pattern, anti-corruption layers, and layering decisions. Use when the work involves business rules, persistence, or third-party integrations.
---

# Skill: Clean Architecture

## Descrição
Esta skill tem como objetivo educar e exemplificar os princípios da Clean Architecture (Arquitetura Limpa), popularizada por Robert C. Martin (Uncle Bob). A Clean Architecture visa criar sistemas de software que são independentes de frameworks, testáveis, independentes de UI, independentes de banco de dados e independentes de qualquer agência externa. Ela é focada na separação de preocupações através de camadas concêntricas, onde as dependências fluem apenas para dentro.

Serão fornecidos exemplos práticos em **Python e TypeScript** para ilustrar como aplicar esses princípios e construir uma arquitetura robusta e manutenível.

## O que é Clean Architecture?
A Clean Architecture organiza o código em camadas concêntricas, com as regras de negócio mais importantes no centro e as preocupações técnicas (frameworks, bancos de dados, UIs) nas camadas mais externas. A regra fundamental é a **Regra de Dependência**: As dependências de código-fonte só podem apontar para dentro. Nada em um círculo interno pode saber sobre algo em um círculo externo.

### Camadas Principais da Clean Architecture:
1.  **Entidades (Entities):** Contêm as regras de negócio mais gerais e de alto nível. São objetos que encapsulam as regras de negócio de toda a empresa.
2.  **Casos de Uso (Use Cases / Interactors):** Contêm as regras de negócio específicas da aplicação. Orquestram o fluxo de dados de e para as Entidades, e direcionam as Entidades para alcançar os objetivos dos casos de uso.
3.  **Adaptadores de Interface (Interface Adapters):** Convertem dados do formato mais conveniente para os casos de uso e entidades, para o formato mais conveniente para as interfaces externas (UI, Banco de Dados, Web).
    *   **Controladores (Controllers):** Recebem a entrada da UI/Web e a traduzem para um formato que os Casos de Uso entendem.
    *   **Presenters:** Preparam os dados dos Casos de Uso para exibição na UI/Web.
    *   **Gateways (e Interfaces de Repositório):** Abstraem a interação com bancos de dados, APIs externas ou outros serviços. Os Casos de Uso definem as interfaces que os Gateways devem implementar, e as camadas externas implementam essas interfaces.
4.  **Frameworks e Drivers (Frameworks & Drivers):** A camada mais externa, onde ficam os detalhes como o banco de dados, o framework web, a UI, etc. É a camada onde as implementações concretas dos adaptadores e interfaces são realizadas.

## Benefícios da Clean Architecture
*   **Independência:** O código do núcleo do negócio é independente de frameworks, bancos de dados e UI.
*   **Testabilidade:** Facilita a escrita de testes unitários para as regras de negócio sem depender de infraestrutura externa.
*   **Flexibilidade:** Permite trocar componentes externos (banco de dados, UI) com facilidade.
*   **Manutenibilidade:** O código é mais organizado, com responsabilidades claras, tornando-o mais fácil de entender e manter.

## Como Acionar a Skill
Esta skill é acionada quando você faz perguntas ou solicitações relacionadas a:
*   "Clean Architecture" ou "Arquitetura Limpa"
*   "Padrões de arquitetura de software"
*   "Estrutura de projetos robusta"
*   "Separação de preocupações em software"
*   "Independência de framework/banco de dados/UI"

### Exemplos de Perguntas que Acionam a Skill:
*   "O que é Clean Architecture e por que ela é importante?"
*   "Explique as camadas da Clean Architecture."
*   "Me dê um exemplo de Clean Architecture em Python para registro de usuário."
*   "Como implemento Casos de Uso em TypeScript com Clean Architecture?"
*   "Qual a diferença entre Entidades e Casos de Uso?"

## Exemplo de Interação
**Usuário:** "Me dê um exemplo de Clean Architecture em Python para registro de usuário, mostrando as camadas principais."

**Agente (usando esta skill):**
"A Clean Architecture foca em separar as preocupações do seu software em camadas bem definidas. Para um registro de usuário, teríamos:

1.  **Entidade:** `User` (regras de negócio básicas do usuário).
2.  **Caso de Uso:** `RegisterUserUseCase` (lógica de negócio para registrar um novo usuário).
3.  **Adaptadores de Interface:** `UserRepository` (interface de persistência), `SQLUserRepository` (implementação), `UserController` (entrada da web), `UserPresenter` (saída).
4.  **Frameworks & Drivers:** Um framework web (ex: Flask) e um banco de dados (ex: SQLite).

Consulte o arquivo `~/.pi/agent/skills/clean-architecture-skill/user_registration_examples.py` para ver um exemplo completo em Python de registro de usuário que demonstra essas camadas.

Para ver o exemplo em TypeScript ou explorar outros aspectos da Clean Architecture, apenas me diga!"
