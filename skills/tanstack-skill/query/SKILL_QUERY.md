# Skill: TanStack Query (anteriormente React Query)

## Descrição
Esta skill foca especificamente no **TanStack Query**, uma biblioteca essencial para o gerenciamento de estado de servidor (server state) em aplicações web. Ela aborda como buscar, armazenar em cache, sincronizar e atualizar dados de forma assíncrona, simplificando significativamente a complexidade de lidar com APIs e otimizações de performance.

Serão explorados conceitos como `useQuery`, `useMutation`, caching inteligente, invalidação de cache, otimismo de UI, `stale-while-revalidate` e tratamento de erros, com exemplos práticos em **Python e TypeScript** (com foco em integração React).

## O que é TanStack Query?
TanStack Query (conhecido popularmente como React Query quando usado com React) é uma biblioteca poderosa para gerenciar requisições assíncronas, caching e sincronização de dados de servidor em sua aplicação. Ele abstrai grande parte da complexidade de manipular dados remotos, fornecendo hooks e utilitários que tornam o processo mais declarativo e eficiente.

### Principais Conceitos e Benefícios:
*   **`useQuery`:** O hook principal para buscar dados. Ele gerencia o estado de carregamento, sucesso, erro e o cache dos dados.
*   **`useMutation`:** Para enviar dados para o servidor (POST, PUT, DELETE) e gerenciar o estado da mutação, incluindo otimismo de UI e invalidação de cache.
*   **Caching e Sincronização:** Automaticamente armazena em cache e sincroniza os dados, garantindo que a UI esteja sempre atualizada com o estado do servidor.
*   **`stale-while-revalidate`:** Uma estratégia eficiente de caching onde dados "stale" (antigos) são exibidos enquanto uma nova requisição é feita em segundo plano para revalidar e atualizar o cache.
*   **Refetching Automático:** Dados são re-buscados automaticamente em foco de janela, reconexão de rede ou quando a cada certo tempo.
*   **Otimismo de UI:** Permite atualizar a UI imediatamente após uma mutação, assumindo que a requisição terá sucesso, e revertendo em caso de falha.
*   **Tratamento de Erros:** Mecanismos robustos para lidar com erros de requisição e exibi-los ao usuário.
*   **Devtools:** Ferramentas de desenvolvimento dedicadas que ajudam a visualizar o estado do cache e depurar requisições.

## Exemplo em TypeScript (com React)
Consulte o arquivo `~/.pi/agent/skills/tanstack-skill/query/tanstack_query_example.tsx` para ver um exemplo prático de uso do `useQuery` para buscar dados de uma API.

## Exemplo em Python (Conceitual)
Para uma demonstração conceitual em Python sobre como os princípios de caching e revalidação funcionariam, consulte o arquivo `~/.pi/agent/skills/tanstack-skill/query/tanstack_query_conceptual_example.py`.

## Como Acionar esta Sub-Skill
Esta sub-skill é acionada quando você faz perguntas ou solicitações específicas sobre TanStack Query:
*   "TanStack Query", "React Query"
*   "Como buscar dados com useQuery?"
*   "Explique `useMutation` no React Query."
*   "Caching de dados com TanStack Query."

## Exemplo de Interação
**Usuário:** "Me dê um exemplo básico de como usar TanStack Query para buscar dados de uma API em um componente React com TypeScript."

**Agente (usando esta skill):**
"Certamente! TanStack Query simplifica muito a obtenção e o gerenciamento de dados de servidor. Aqui está um exemplo básico de como buscar uma lista de posts usando o hook `useQuery`:

### Exemplo de TanStack Query (React Query) com `useQuery`:
```typescript
// tanstack_query_example.tsx (Trecho do arquivo)
import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const PostsList: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Carregando posts...</div>;
  if (isError) return <div>Ocorreu um erro: {error?.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
```

Para ver o exemplo completo ou explorar como isso seria conceitualmente em Python, apenas me diga!"