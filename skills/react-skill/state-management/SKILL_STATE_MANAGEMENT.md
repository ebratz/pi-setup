# Sub-Skill: React Gerenciamento de Estado

## Descrição
Esta sub-skill explora as diversas abordagens para gerenciamento de estado em aplicações React. O estado é o coração de qualquer aplicação interativa, e saber como gerenciá-lo de forma eficaz é crucial para construir UIs reativas e manuteníveis. Serão abordados desde o estado local de componentes até soluções de estado global.

### Tópicos Abordados:
*   **Estado Local de Componentes:**
    *   `useState` Hook: O método mais comum para adicionar estado a componentes funcionais.
    *   `useReducer` Hook: Uma alternativa ao `useState` para lógica de estado mais complexa, semelhante ao Redux.

*   **Gerenciamento de Estado Global:**
    *   **Context API:** Uma forma nativa do React de compartilhar estado (ou qualquer valor) através da árvore de componentes sem precisar passar props manualmente em cada nível (prop drilling).
    *   **Bibliotecas Externas (Mencionado):** Uma breve introdução a bibliotecas populares como Redux e Zustand, que oferecem soluções mais robustas para gerenciamento de estado global em aplicações muito grandes ou complexas.

## Exemplos em TypeScript (com React)
Consulte os arquivos de exemplo para ver a aplicação desses conceitos:
*   `~/.pi/agent/skills/react-skill/state-management/usestate_example.tsx` (Já existe como `react_counter_example.tsx` e será movido/adaptado)
*   `~/.pi/agent/skills/react-skill/state-management/usereducer_example.tsx`
*   `~/.pi/agent/skills/react-skill/state-management/context_api_example.tsx`

## Como Acionar esta Sub-Skill
Esta sub-skill é acionada quando você faz perguntas ou solicitações sobre gerenciamento de estado em React:
*   "Gerenciamento de estado React", "useState", "useReducer"
*   "Context API React", "Estado global React"
*   "Redux", "Zustand"
*   "Prop drilling React"

## Exemplo de Interação
**Usuário:** "Explique o `useReducer` e me dê um exemplo em React com TypeScript."

**Agente (usando esta skill):**
"O `useReducer` é um Hook do React que é uma alternativa ao `useState` para gerenciar o estado de componentes. Ele é particularmente útil para lógica de estado mais complexa que envolve múltiplas sub-partes ou quando o próximo estado depende do estado anterior. Ele é inspirado no padrão Redux.

Você define uma função `reducer` que recebe o estado atual e uma `action`, e retorna o próximo estado. O `useReducer` retorna o estado atual e uma função `dispatch` para enviar ações ao reducer.

### Exemplo de `useReducer` para um Contador Complexo:
Consulte o arquivo `~/.pi/agent/skills/react-skill/state-management/usereducer_example.tsx` para ver um exemplo prático."
