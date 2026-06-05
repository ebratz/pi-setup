---
name: git-commit
description: Conventional Commits specification and best practices. Use this skill whenever the user asks to commit, generate commit messages, or mentions git commit. Covers types, scopes, breaking changes, and message formatting following the Conventional Commits standard.
---

# Skill: Git Commit — Conventional Commits

Esta skill deve ser carregada **sempre que o comando `git commit` for necessário**, seja para gerar mensagens de commit, revisar commits existentes, ou sugerir formatação.

## Especificação Conventional Commits

A especificação [Conventional Commits](https://www.conventionalcommits.org/) define um formato padronizado para mensagens de commit.

### Formato

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé(s) opcional(is)]
```

### Tipos (Types)

| Tipo | Uso |
|------|-----|
| `feat` | Nova funcionalidade (MINOR version) |
| `fix` | Correção de bug (PATCH version) |
| `docs` | Documentação (README, comentários, etc.) |
| `style` | Formatação, espaçamento, ponto-e-vírgula (sem alteração de lógica) |
| `refactor` | Refatoração de código (nem fix, nem feat) |
| `perf` | Melhoria de performance |
| `test` | Adição ou correção de testes |
| `chore` | Tarefas de manutenção, build, dependências |
| `ci` | Configuração de CI/CD |
| `build` | Alterações no sistema de build ou dependências externas |

### Escopo (Scope) — Opcional

Um substantivo entre parênteses que descreve a área afetada:

```
feat(auth): add OAuth2 login flow
fix(api): handle null response from /users endpoint
refactor(coms): simplify room join handler
```

### Breaking Changes

Indicar com `!` após o tipo/escopo **OU** com `BREAKING CHANGE:` no rodapé:

```
feat!: drop support for Node 16

refactor(api)!: remove deprecated /v1/users endpoint
```

```
feat: migrate to new auth system

BREAKING CHANGE: removes old JWT format, tokens must be regenerated
```

### Corpo (Body) — Opcional

Explicação detalhada da **motivação** e do **contexto** da mudança. Separado do título por uma linha em branco.

### Rodapé (Footer) — Opcional

- `BREAKING CHANGE:` — breaking changes
- `Closes #123` — referência a issues
- `Reviewed-by:` — revisor
- `Co-authored-by:` — co-autor

## Regras Práticas

1. **Título em inglês**, no imperativo, máximo ~72 caracteres
2. **Sempre usar tipo correto** — se houver dúvida, prefira `chore`
3. **Um commit por mudança lógica** — não misture feat + fix no mesmo commit
4. **Corpo opcional, mas recomendado** para mudanças não triviais
5. **Nunca commitar arquivos de build, node_modules, .env, ou arquivos gerados**

## Exemplos

```bash
# Simples
feat: add user registration endpoint

# Com escopo
fix(db): resolve connection leak in pool

# Com corpo
feat(api): add pagination to list users endpoint

Implements cursor-based pagination using the `after` and `limit`
query parameters. Default limit is 20, max 100.

# Breaking change
feat(api)!: remove support for legacy v1 tokens

BREAKING CHANGE: All clients must migrate to v2 JWT format.

# Multi-line descrição
refactor(auth): extract token validation into separate service

Moves JWT parsing and validation logic out of the middleware
into a dedicated TokenService for better testability.

Closes #456
```

## Como usar esta skill

Ao receber um pedido de commit:

1. Analise `git diff --stat` e `git diff` para entender as mudanças
2. Agrupe mudanças relacionadas em commits separados se necessário
3. Gere a mensagem no formato Conventional Commits
4. Execute `git add` e `git commit -m "<mensagem>"` ou use `git commit -m "<título>" -m "<corpo>"`
5. Confirme com o usuário antes de executar se houver dúvidas

## Anti-padrões (NÃO usar)

- ❌ `git commit -m "fix"` ou `git commit -m "update"`
- ❌ `git commit -m "WIP"`
- ❌ `git commit -m "fixed bug"`
- ❌ `git commit -m "changes"` + `git add -A` sem revisar o que está sendo commitado
- ❌ Mensagens em português como `feat: adiciona endpoint de login`
