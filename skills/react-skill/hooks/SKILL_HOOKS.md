# Sub-Skill: React Hooks

## Descrição
Esta sub-skill explora em profundidade os React Hooks, um recurso introduzido no React 16.8 que permite usar estado e outros recursos do React em componentes funcionais, sem a necessidade de escrever classes. Os Hooks revolucionaram a forma como escrevemos componentes React, tornando-os mais concisos, legíveis e fáceis de testar e reutilizar.

### Tópicos Abordados:
*   **Hooks Básicos:**
    *   `useState`: Adiciona estado a componentes funcionais.
    *   `useEffect`: Realiza efeitos colaterais em componentes funcionais (e.g., fetching de dados, manipulação direta do DOM, subscriptions).
    *   `useContext`: Consome um Contexto do React, permitindo acessar dados globais na árvore de componentes.
    *   `useReducer`: Uma alternativa ao `useState` para lógica de estado mais complexa (discutido mais a fundo na sub-skill de Gerenciamento de Estado).

*   **Hooks Adicionais e de Performance:**
    *   `useRef`: Cria referências mutáveis que persistem entre renderizações, sem causar re-renderizações.
    *   `useCallback`: Memoriza funções para evitar recriações desnecessárias, útil para otimização de performance.
    *   `useMemo`: Memoriza valores computados para evitar re-cálculos caros, também para otimização de performance.

*   **Custom Hooks:**
    *   Como criar seus próprios Hooks para reutilizar lógica de estado e comportamento entre componentes.
    *   Princípio de "separar sua lógica da sua UI".

## Exemplos em TypeScript (com React)
Consulte os arquivos de exemplo para ver a aplicação desses conceitos:
*   `~/.pi/agent/skills/react-skill/hooks/react_counter_example.tsx` (para `useState`)
*   `~/.pi/agent/skills/react-skill/hooks/useeffect_example.tsx`
*   `~/.pi/agent/skills/react-skill/hooks/useref_example.tsx`
*   `~/.pi/agent/skills/react-skill/hooks/custom_hook_example.tsx`
*   Para `useContext` e `useReducer`, consulte `~/.pi/agent/skills/react-skill/state-management/`.
*   Para `useCallback` e `useMemo`, consulte `~/.pi/agent/skills/react-skill/performance/`.

## Como Acionar esta Sub-Skill
Esta sub-skill é acionada quando você faz perguntas ou solicitações sobre Hooks React:
*   "React Hooks", "useState", "useEffect", "useContext", "useReducer", "useRef", "useCallback", "useMemo"
*   "Custom Hooks React"
*   "Ciclo de vida com Hooks"

## Exemplo de Interação
**Usuário:** "Explique o `useEffect` e me dê um exemplo de como usá-lo para buscar dados."

**Agente (usando esta skill):**
"O Hook `useEffect` no React permite que você realize "efeitos colaterais" em componentes funcionais. Efeitos colaterais são operações que afetam o mundo exterior ou que precisam ser sincronizadas com o ciclo de vida do componente, como fetching de dados, manipulação direta do DOM, subscriptions, ou timers.

A função que você passa para `useEffect` é executada após cada renderização do componente. Você pode controlar quando essa função é executada usando o array de dependências (segundo argumento do `useEffect`). Se o array estiver vazio `([])`, o efeito é executado apenas uma vez, após a montagem. Se for omitido, ele é executado a cada renderização. Se contiver variáveis, o efeito é executado quando essas variáveis mudam.

### Exemplo de `useEffect` para Fetching de Dados:
Consulte o arquivo `~/.pi/agent/skills/react-skill/hooks/useeffect_example.tsx` para ver um exemplo prático."
