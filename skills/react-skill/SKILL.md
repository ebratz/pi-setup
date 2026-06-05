---
name: react
description: React patterns, hooks, component composition, performance optimization (memo, useCallback, useMemo), Context API, and best practices for building SPAs and UI components with TypeScript.
---

# Skill: React

## Descrição
Esta skill fornece informações abrangentes e exemplos práticos sobre React (também conhecido como React.js ou ReactJS), uma biblioteca JavaScript declarativa, eficiente e flexível para a construção de interfaces de usuário. Ela cobre os fundamentos do React, incluindo componentes (funcionais e de classe), estado, props, ciclo de vida, Hooks e o uso com TypeScript. Além dos conceitos básicos, a skill explora técnicas avançadas de desenvolvimento, como **composição de componentes, gerenciamento de estado global (Context API, Redux/Zustand), otimização de performance (memoization com `React.memo`, `useCallback`, `useMemo`), criação de Custom Hooks e padrões de renderização**.

O objetivo é auxiliar desenvolvedores na criação de SPAs (Single Page Applications) e na compreensão das melhores práticas do ecossistema React, capacitando-os a construir aplicações robustas, escaláveis e de alta performance.

## O que é React?
React é uma biblioteca JavaScript de código aberto para a construção de interfaces de usuário ou componentes de UI. Desenvolvido pelo Facebook (agora Meta), o React permite que os desenvolvedores criem UIs complexas a partir de "componentes" pequenos e isolados. Seu principal objetivo é ser eficiente na atualização e renderização de componentes na web, utilizando um Virtual DOM.

### Principais Características e Benefícios:
*   **Baseado em Componentes:** Permite construir UIs complexas a partir de pequenas peças isoladas e reutilizáveis, promovendo **composição, reusabilidade e manutenibilidade**.
*   **Declarativo:** Descreva como sua UI deve parecer em um determinado estado, e o React se encarrega de atualizar o DOM real para corresponder.
*   **Virtual DOM:** Melhora o desempenho ao renderizar apenas as partes da UI que realmente mudaram, em vez de redesenhar tudo, com opções de **otimização como `React.memo`, `useCallback` e `useMemo`**.
*   **Unidirecional Data Flow:** O fluxo de dados em React é geralmente unidirecional (do pai para o filho), o que torna o estado mais previsível e fácil de depurar, complementado por **Context API para estado global**.
*   **Hooks:** Introduzidos no React 16.8, permitem usar estado e outros recursos do React em componentes funcionais, sem a necessidade de escrever classes, facilitando a **criação de Custom Hooks para lógica reutilizável**.
*   **Grande Ecossistema:** Possui uma vasta comunidade, muitas bibliotecas complementares e ferramentas para **gerenciamento de estado (Redux, Zustand), roteamento e outras necessidades**.
*   **Pode ser Usado com TypeScript:** A tipagem estática do TypeScript se integra muito bem com o React, melhorando a segurança e a manutenibilidade do código.

## Como Acionar a Skill
Esta skill é acionada quando você faz perguntas ou solicitações relacionadas a:
*   "React" ou "React.js" ou "ReactJS"
*   "Componentes React" (funcionais, de classe, HOCs, Render Props)
*   "Hooks React" (useState, useEffect, useContext, useReducer, useCallback, useMemo, custom hooks)
*   "Gerenciamento de estado em React" (Context API, Redux, Zustand)
*   "Props em React", "Composição de componentes React"
*   "Ciclo de vida de componentes React"
*   "Otimização de performance em React" (React.memo, useCallback, useMemo)
*   "Padrões de renderização em React"
*   "Exemplo de código React", "SPA com React"

### Exemplos de Perguntas que Acionam a Skill:
*   "O que são componentes funcionais e Hooks em React? Me dê um exemplo de `useState`."
*   "Como passar dados entre componentes pai e filho usando props no React?"
*   "Quero ver um exemplo de um componente React com TypeScript."
*   "Explique o `useEffect` e quando usá-lo."
*   "Como criar um novo projeto React?"
*   "Explique a composição de componentes no React."
*   "Quando devo usar `useCallback` ou `useMemo` para otimizar a performance?"
*   "Como gerenciar estado global usando Context API ou Redux?"
*   "Crie um Custom Hook para debounce."

## Exemplo de Interação
**Usuário:** "Me dê um exemplo de um componente de contador simples usando `useState` em React com TypeScript."

**Agente (usando esta skill):**
"Claro! O `useState` é um dos Hooks mais fundamentais do React, permitindo que você adicione estado a componentes funcionais. Combinado com TypeScript, você pode tipar seu estado para maior segurança.

### Exemplo de Componente Contador com `useState` e TypeScript:
Consulte o arquivo `~/.pi/agent/skills/react-skill/react_counter_example.tsx` para ver um exemplo prático.

Para explorar outros Hooks, gerenciamento de estado ou outras funcionalidades do React, apenas me diga!"
