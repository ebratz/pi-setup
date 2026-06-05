---
name: git-commit
description: Conventional Commits specification, Git tags, release management, and GitHub Actions. Use this skill whenever the user asks to commit, tag a release, create GitHub Actions workflows, or automate releases with semantic versioning.
---

# Skill: Git — Conventional Commits, Tags, Releases e GitHub Actions

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

## Git Tags e Release Management

Tags marcam pontos específicos no histórico do Git, tipicamente usadas para releases versionadas.

### Semantic Versioning (SemVer)

Conventional Commits + SemVer = automação de versionamento:

| Commit type | SemVer bump |
|-------------|-------------|
| `fix:` | **PATCH** (1.0.0 → 1.0.1) |
| `feat:` | **MINOR** (1.0.0 → 1.1.0) |
| `feat!:` / `BREAKING CHANGE:` | **MAJOR** (1.0.0 → 2.0.0) |

Formato: `v<MAJOR>.<MINOR>.<PATCH>` (ex: `v1.2.3`)

### Criando Tags

```bash
# Tag anotada (recomendado para releases)
git tag -a v1.0.0 -m "chore(release): v1.0.0"

# Tag leve (apenas referência)
git tag v1.0.0

# Tag em commit específico
git tag -a v1.0.0 <commit-hash> -m "chore(release): v1.0.0"

# Push da tag
git push origin v1.0.0

# Push de todas as tags
git push --tags
```

### Gerenciamento de Tags

```bash
# Listar tags
git tag -l

# Listar tags com padrão
git tag -l "v1.*"

# Mostrar detalhes da tag
git show v1.0.0

# Deletar tag local
git tag -d v1.0.0

# Deletar tag remota
git push origin --delete v1.0.0

# Fazer checkout de uma tag (modo detached HEAD)
git checkout v1.0.0
```

### Fluxo de Release

```bash
# 1. Garantir que está na branch certa e atualizada
git checkout main
git pull origin main

# 2. Determinar a nova versão baseada nos commits desde a última tag
git describe --tags --abbrev=0   # última tag

# 3. Criar a tag anotada
git tag -a v1.1.0 -m "chore(release): v1.1.0

Features:
- feat(api): add user pagination
- feat(auth): add OAuth2 support

Bug Fixes:
- fix(db): resolve connection leak
"

# 4. Push commits + tags
git push origin main
git push origin v1.1.0
```

### Changelog Automatizado

Ferramentas que geram changelog a partir de Conventional Commits:

| Ferramenta | Comando |
|------------|---------|
| `standard-version` | `npx standard-version` |
| `semantic-release` | `npx semantic-release` |
| `git-cliff` | `git cliff -o CHANGELOG.md` |

### Tags de Pré-release

```bash
# Alpha
git tag -a v2.0.0-alpha.1 -m "chore(release): v2.0.0-alpha.1"

# Beta
git tag -a v2.0.0-beta.1 -m "chore(release): v2.0.0-beta.1"

# Release candidate
git tag -a v2.0.0-rc.1 -m "chore(release): v2.0.0-rc.1"
```

## GitHub Actions

GitHub Actions automatiza workflows de CI/CD diretamente no repositório. Arquivos YAML em `.github/workflows/`.

### Estrutura Básica

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
```

### Eventos de Trigger

| Evento | Quando dispara |
|--------|---------------|
| `push` | Push para qualquer branch |
| `pull_request` | PR aberto, atualizado, reaberto |
| `tags` / `create` | Nova tag criada |
| `schedule` | Cron schedule (`cron: "0 0 * * *"`) |
| `workflow_dispatch` | Manualmente via UI |
| `release` | Release publicado/editado |

### Release Workflow (Conventional Commits)

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate changelog
        uses: orhun/git-cliff-action@v4
        with:
          args: --latest --strip all
        env:
          OUTPUT: CHANGELOG.md

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          body_path: CHANGELOG.md
          generate_release_notes: true
```

### Auto-versionamento com semantic-release

```yaml
# .github/workflows/semantic-release.yml
name: Semantic Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm test
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx semantic-release
```

### CI com Testes + Build

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  lint-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm test

  build:
    needs: lint-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

### Secrets e Variáveis

```yaml
# Usar secrets
env:
  NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

# Variáveis de ambiente
export NODE_ENV: production
```

Secrets são configurados em: **Settings → Secrets and variables → Actions**

### Matrix Build (multi-plataforma)

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [18, 20, 22]
runs-on: ${{ matrix.os }}
```

### Cache de dependências

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: "npm"          # cache automático do node_modules
```

### Regras para GitHub Actions

1. **Sempre usar `actions/checkout@v4`** como primeiro step
2. **Pin actions por hash SHA** em produção para segurança
3. **Usar `permissions:`** para princípio de menor privilégio
4. **Testar localmente** com [`act`](https://github.com/nektos/act) antes de push
5. **Workflows devem ser idempotentes** — rodar 2x não deve quebrar
6. **Secrets nunca em log** — use `::add-mask::` para valores sensíveis
7. **Timeout** — defina `timeout-minutes` para evitar workflows zumbis

## Como usar esta skill

Ao receber um pedido de commit:

1. Analise `git diff --stat` e `git diff` para entender as mudanças
2. Agrupe mudanças relacionadas em commits separados se necessário
3. Gere a mensagem no formato Conventional Commits
4. Execute `git add` e `git commit -m "<mensagem>"` ou use `git commit -m "<título>" -m "<corpo>"`
5. Confirme com o usuário antes de executar se houver dúvidas

Ao receber um pedido de release/tag:

1. Verifique commits desde a última tag: `git log $(git describe --tags --abbrev=0)..HEAD --oneline`
2. Determine o bump (patch/minor/major) baseado nos tipos de commit
3. Crie a tag anotada com mensagem descritiva
4. Push da tag + branch
5. Se configurado, GitHub Actions cuidará do release

Ao criar/editar GitHub Actions:

1. Sempre crie o arquivo em `.github/workflows/nome.yml`
2. Use `actions/checkout@v4` como primeiro step
3. Defina `permissions:` explícitas
4. Teste o workflow com `push` para branch de feature primeiro
5. Adicione `workflow_dispatch` para permitir execução manual
6. Nunca hardcode secrets — use `${{ secrets.NOME }}`
