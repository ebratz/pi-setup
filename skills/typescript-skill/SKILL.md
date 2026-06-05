---
name: typescript
description: TypeScript type system, generics, discriminated unions, utility types, strict mode, interfaces vs types, and patterns for writing robust, type-safe code in modern TypeScript projects.
---

# Skill: TypeScript

## Descrição
Esta skill fornece informações detalhadas e exemplos práticos sobre TypeScript, a linguagem de programação que é um superconjunto tipado de JavaScript. Ela aborda os principais conceitos, benefícios, sintaxe e padrões de uso do TypeScript para ajudar desenvolvedores a escrever código mais robusto, escalável e de fácil manutenção.

Serão explorados tópicos como sistemas de tipos, interfaces, tipos genéricos, classes, módulos e a integração com ecossistemas JavaScript modernos.

## O que é TypeScript?
TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft. É um superconjunto sintático estrito de JavaScript e adiciona tipagem estática opcional à linguagem. Isso significa que qualquer código JavaScript válido também é um código TypeScript válido, e você pode adicionar tipos para melhorar a robustez do seu código.

### Principais Características e Benefícios:
*   **Tipagem Estática:** Permite definir os tipos de variáveis, parâmetros de função e retornos, capturando erros antes da execução.
*   **Melhor Manutenibilidade:** Com tipos claros, o código se torna mais fácil de entender e modificar, especialmente em projetos grandes e complexos.
*   **Produtividade do Desenvolvedor:** Oferece autocompletar, refatoração e verificação de erros em tempo real através de IDEs compatíveis (como VS Code).
*   **Escalabilidade:** Ideal para construir aplicações de grande escala, onde a consistência e a robustez são cruciais.
*   **Recursos Modernos do JavaScript:** Suporta todas as funcionalidades mais recentes do ECMAScript, permitindo o uso de sintaxe moderna com a segurança de tipos.
*   **Compilação para JavaScript:** O código TypeScript é compilado para JavaScript, tornando-o compatível com qualquer navegador ou ambiente JavaScript.

## Como Acionar a Skill
Esta skill é acionada quando você faz perguntas ou solicitações relacionadas a:
*   "TypeScript"
*   "Tipagem estática em JavaScript"
*   "Como usar interfaces/tipos em TypeScript"
*   "Diferenças entre JavaScript e TypeScript"
*   "Exemplo de código TypeScript"
*   "Melhores práticas TypeScript"

### Exemplos de Perguntas que Acionam a Skill:
*   "O que é uma interface em TypeScript? Me dê um exemplo."
*   "Como usar tipos genéricos em TypeScript?"
*   "Explique a diferença entre `type` e `interface` em TypeScript."
*   "Quero um exemplo de uma classe em TypeScript com tipagem."
*   "Como configurar um projeto TypeScript básico?"

## Exemplo de Interação
**Usuário:** "O que é uma interface em TypeScript e como eu a uso?"

**Agente (usando esta skill):**
"Em TypeScript, uma `interface` é um poderoso recurso para definir o 'formato' que um objeto deve ter. Ela serve como um contrato, garantindo que qualquer objeto que 'implemente' essa interface terá as propriedades e métodos especificados, com os tipos corretos.

Interfaces são puramente um conceito em tempo de desenvolvimento (design-time); elas não geram código JavaScript no final, sendo úteis para a verificação de tipos e para documentar a estrutura dos seus dados.

### Exemplo de Interface:
Consulte o arquivo `~/.pi/agent/skills/typescript-skill/typescript_basics_examples.ts` para ver exemplos práticos de interfaces e outros conceitos básicos de TypeScript.

Para explorar outros conceitos de TypeScript, apenas me diga!"
