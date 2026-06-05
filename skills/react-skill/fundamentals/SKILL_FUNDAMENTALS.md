# Sub-Skill: React Fundamentos

## Descrição
Esta sub-skill aborda os conceitos fundamentais do React, a biblioteca JavaScript para construção de interfaces de usuário. Ela é o ponto de partida para entender como o React funciona e como construir as bases de uma aplicação.

Serão explicados os conceitos de Virtual DOM, fluxo de dados unidirecional, JSX e a diferença entre componentes funcionais e de classe (embora o foco moderno seja em funcionais).

## O que são os Fundamentos do React?
Os fundamentos do React são os blocos de construção essenciais para qualquer desenvolvedor que queira criar aplicações com a biblioteca. Entender esses conceitos é crucial antes de se aprofundar em tópicos mais avançados.

### Principais Conceitos:
*   **Virtual DOM:** Uma representação leve do DOM real que o React mantém na memória. O React compara o Virtual DOM anterior com o atual para identificar as mudanças mínimas necessárias no DOM real, otimizando a performance.
*   **JSX (JavaScript XML):** Uma extensão de sintaxe para JavaScript que permite escrever estruturas de UI diretamente dentro do código JavaScript. Ele não é obrigatório, mas é altamente recomendado por tornar o código mais legível e expressivo.
*   **Fluxo de Dados Unidirecional (Unidirectional Data Flow):** No React, os dados fluem principalmente de componentes pai para componentes filho através de props. Isso torna o estado da aplicação mais previsível e fácil de depurar.
*   **Componentes:** São os blocos de construção do React. Eles são peças independentes e reutilizáveis de UI. Existem dois tipos principais:
    *   **Componentes Funcionais:** Funções JavaScript que retornam elementos React (JSX). Com a introdução dos Hooks, tornaram-se o tipo preferido de componente.
    *   **Componentes de Classe:** Classes JavaScript que estendem `React.Component` e possuem métodos de ciclo de vida e seu próprio estado interno. Menos comuns em projetos modernos com Hooks.

## Exemplos em TypeScript (com React)
Consulte os arquivos de exemplo para ver a aplicação desses conceitos:
*   `~/.pi/agent/skills/react-skill/fundamentals/jsx_example.tsx`
*   `~/.pi/agent/skills/react-skill/fundamentals/functional_component_example.tsx`

## Como Acionar esta Sub-Skill
Esta sub-skill é acionada quando você faz perguntas ou solicitações sobre os fundamentos do React:
*   "Fundamentos do React", "O que é JSX?"
*   "Virtual DOM", "Fluxo de dados em React"
*   "Componentes funcionais vs de classe"

## Exemplo de Interação
**Usuário:** "Explique o que é JSX no React."

**Agente (usando esta skill):**
"JSX, ou JavaScript XML, é uma extensão de sintaxe para JavaScript que permite escrever a estrutura da UI de forma muito semelhante ao HTML dentro do seu código JavaScript. É como se você estivesse descrevendo a aparência da sua interface diretamente onde a lógica do componente reside.

Por exemplo, em vez de criar elementos do DOM usando `document.createElement('div')`, com JSX você pode escrever `<div>Hello, React!</div>` diretamente no seu arquivo JavaScript/TypeScript. O JSX é então "transpilado" (por ferramentas como Babel) para chamadas a `React.createElement()` que o navegador entende.

Ele não é obrigatório, mas torna o código muito mais legível e expressivo, especialmente para interfaces complexas.

Consulte o arquivo `~/.pi/agent/skills/react-skill/fundamentals/jsx_example.tsx` para ver um exemplo prático."
