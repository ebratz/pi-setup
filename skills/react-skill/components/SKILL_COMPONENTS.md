# Sub-Skill: React Componentes Avançados

## Descrição
Esta sub-skill explora técnicas e padrões avançados para a construção e organização de componentes React, indo além dos fundamentos básicos. Serão abordados componentes de classe (para compatibilidade e projetos legados), Higher-Order Components (HOCs) e Render Props, que são padrões para reuso de lógica de componentes.

## Componentes React Além do Básico
Enquanto os componentes funcionais com Hooks são a abordagem moderna e preferida, entender outras formas de construir e reutilizar a lógica de componentes é crucial para trabalhar com bases de código existentes e para ter um conhecimento completo do ecossistema React.

### Tópicos Abordados:
*   **Componentes de Classe:**
    *   Como definir estado interno (`this.state`).
    *   Métodos de ciclo de vida (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`).
    *   Uso de `this.props` e `this.setState`.
    *   **Nota:** Embora ainda válidos, componentes de classe são menos utilizados em projetos novos devido à simplicidade e poder dos Hooks.

*   **Higher-Order Components (HOCs):**
    *   Um HOC é uma função que recebe um componente e retorna um novo componente com props adicionais ou lógica aprimorada.
    *   Padrão para reuso de lógica de componente e abstração de preocupações.
    *   Exemplo: `withAuth`, `withLoading`.

*   **Render Props:**
    *   Um padrão onde um componente recebe uma função `render` (ou qualquer outra prop que seja uma função) que ele invoca com seus próprios dados.
    *   Outra forma de compartilhar lógica e comportamento entre componentes de forma flexível.
    *   Exemplo: Um componente `MouseTracker` que passa a posição do mouse para uma função render prop.

## Exemplos em TypeScript (com React)
Consulte os arquivos de exemplo para ver a aplicação desses conceitos:
*   `~/.pi/agent/skills/react-skill/components/class_component_example.tsx`
*   `~/.pi/agent/skills/react-skill/components/hoc_example.tsx`
*   `~/.pi/agent/skills/react-skill/components/render_props_example.tsx`

## Como Acionar esta Sub-Skill
Esta sub-skill é acionada quando você faz perguntas ou solicitações sobre técnicas avançadas de componentes React:
*   "Componentes de classe React"
*   "Higher-Order Components (HOCs)"
*   "Padrão Render Props em React"
*   "Reuso de lógica de componente React"

## Exemplo de Interação
**Usuário:** "Explique os Higher-Order Components (HOCs) e me dê um exemplo."

**Agente (usando esta skill):**
"Higher-Order Components (HOCs) são um padrão avançado no React para reuso de lógica de componentes. Um HOC é, essencialmente, uma função que recebe um componente como argumento e retorna um novo componente aprimorado.

Eles são úteis para compartilhar funcionalidades comuns, como lógica de autenticação, carregamento de dados ou gerenciamento de estado, entre vários componentes sem duplicar código.

**Sintaxe Comum:** `const EnhancedComponent = higherOrderComponent(WrappedComponent);`

### Exemplo Conceitual de um HOC `withLoading`:
Consulte o arquivo `~/.pi/agent/skills/react-skill/components/hoc_example.tsx` para ver um exemplo prático."
