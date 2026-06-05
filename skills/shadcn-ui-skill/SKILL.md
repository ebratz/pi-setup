---
name: shadcn-ui
description: shadcn/ui component usage, customization, theming, accessibility, and UX best practices for React apps using Tailwind CSS and Radix UI primitives.
---

# Skill: shadcn/ui e UX

## Descrição
Esta skill fornece informações e exemplos sobre `shadcn/ui`, uma coleção de componentes de UI re-utilizáveis e acessíveis para React, construídos com Tailwind CSS e Radix UI. A skill abordará como usar, personalizar e estender esses componentes para criar interfaces de usuário modernas e eficientes, com foco em boas práticas de User Experience (UX).

Serão explorados tópicos como a instalação, configuração, uso de componentes específicos, theming, acessibilidade e a filosofia por trás do `shadcn/ui` que o diferencia de outras bibliotecas de componentes.

## O que é shadcn/ui?
`shadcn/ui` não é uma biblioteca de componentes tradicional que você instala como uma dependência. Em vez disso, é uma coleção de componentes que você "copia e cola" diretamente em seu projeto. Isso oferece total controle sobre o código dos componentes, permitindo personalização profunda, otimização de performance e integração perfeita com seu sistema de design.

### Principais Características e Benefícios:
*   **BYOC (Bring Your Own Components):** Você possui o código. Isso significa que você pode personalizá-los como quiser, sem as limitações de uma biblioteca de terceiros.
*   **Construído com Radix UI e Tailwind CSS:**
    *   **Radix UI:** Fornece primitivos de UI sem estilo e acessíveis para criar componentes de alta qualidade, garantindo acessibilidade (WAI-ARIA) por padrão.
    *   **Tailwind CSS:** Uma abordagem de "utility-first" para estilização, permitindo criar designs personalizados rapidamente e de forma consistente.
*   **Foco em Acessibilidade:** Os componentes são projetados com acessibilidade em mente desde o início, seguindo as diretrizes WAI-ARIA.
*   **Flexibilidade:** Adapta-se a qualquer design system. Não há um estilo "padrão" imposto, você constrói o seu.
*   **Integração com TypeScript:** Totalmente tipado, o que melhora a experiência do desenvolvedor e a segurança do código.
*   **Ferramentas Integradas:** Várias ferramentas populares são recomendadas para trabalhar com `shadcn/ui`, como `next-themes` para theming e `react-hook-form` para formulários.

## UX (User Experience) com shadcn/ui
Embora `shadcn/ui` forneça os blocos de construção, a boa UX depende de como esses componentes são aplicados. A skill também abordará princípios de UX, como:
*   **Consistência:** Manter um design uniforme em toda a aplicação.
*   **Feedback:** Informar o usuário sobre o estado das interações.
*   **Acessibilidade:** Garantir que a aplicação possa ser usada por todos.
*   **Intuitividade:** Designar interfaces fáceis de entender e usar.
*   **Performance:** Tempos de carregamento rápidos e interações fluidas.

## Como Acionar a Skill
Esta skill é acionada quando você faz perguntas ou solicitações relacionadas a:
*   "shadcn/ui" ou "shadcn"
*   "Componentes de UI para React"
*   "Tailwind CSS com React"
*   "Radix UI", "Acessibilidade em UI"
*   "User Experience (UX) em desenvolvimento web"
*   "Como usar shadcn/ui"
*   "Personalizar componentes shadcn"

### Exemplos de Perguntas que Acionam a Skill:
*   "O que é shadcn/ui e como eu o instalo?"
*   "Me dê um exemplo de como usar o componente Button do shadcn/ui."
*   "Como faço para personalizar o tema da minha aplicação com shadcn/ui e Tailwind CSS?"
*   "Explique a importância da acessibilidade ao usar bibliotecas de UI como shadcn/ui."
*   "Como integrar shadcn/ui com React Hook Form?"

## Exemplo de Interação
**Usuário:** "Como instalo o shadcn/ui em um projeto Next.js com TypeScript e Tailwind CSS?"

**Agente (usando esta skill):**
"Para instalar o `shadcn/ui` em um projeto Next.js com TypeScript e Tailwind CSS, você geralmente segue estes passos:

1.  **Configure seu projeto Next.js:** Certifique-se de que você já tem um projeto Next.js com TypeScript e Tailwind CSS configurados.
2.  **Inicialize o `shadcn/ui` CLI:** Execute `npx shadcn-ui@latest init` no seu terminal. O CLI fará algumas perguntas sobre seu projeto, como o estilo base, a configuração de cores, e onde seus componentes estarão localizados (`components/ui` é comum).
3.  **Adicione componentes:** Use o comando `npx shadcn-ui@latest add <component-name>` para adicionar componentes específicos ao seu projeto. Por exemplo, `npx shadcn-ui@latest add button` adicionará o componente Button à sua pasta `components/ui`.

Este processo copia o código-fonte dos componentes diretamente para o seu projeto, dando-lhe total controle para modificá-los. Certifique-se de ter o `tailwindcss` configurado corretamente para que os estilos sejam aplicados.

Para um exemplo de uso de um componente específico, como o Button, ou para saber mais sobre personalização, apenas me diga!"
