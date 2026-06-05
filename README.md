# pi-setup

Recursos do **Pi Coding Agent** — extensões, skills, temas e configurações.

## Estrutura

```
├── extensions/
│   ├── coms/                # Comunicação peer-to-peer entre agentes
│   ├── ask-user-question.ts # Perguntas ao usuário durante execução
│   └── web-fetch/           # Busca de conteúdo web (HTML, PDF)
├── skills/                  # 10 skills especializadas
├── themes/                  # Temas para o TUI
├── configs/                 # Configurações (settings, modelos, etc.)
└── package.json             # Manifesto do pacote pi
```

## Instalação

```bash
pi install git:github.com/ebratz/pi-setup
```

## Desenvolvimento

Para desenvolver localmente com o Pi carregando direto da fonte:

```bash
git clone git@github.com:ebratz/pi-setup.git ~/projects/pi-setup
pi install ~/projects/pi-setup
```

Edite os arquivos no repo, rode `/reload` no Pi e pronto. Depois é só commitar e dar push.

## Recursos

### Extensions

| Extensão | Descrição |
|----------|-----------|
| `coms` | Comunicação peer-to-peer entre agentes Pi (delegate tasks, compartilhar contexto) |
| `ask-user-question` | Ferramenta para fazer perguntas ao usuário durante a execução |
| `web-fetch` | Busca e extrai conteúdo de páginas web (HTML, PDF, texto) |

### Skills

| Skill | Descrição |
|-------|-----------|
| `abap-skill` | Clean ABAP patterns — SAP Clean ABAP styleguide |
| `clean-architecture-skill` | Clean Architecture / Hexagonal / Ports-and-Adapters |
| `cloudification-skill` | SAP Cloudification Repository — API classification |
| `find-skills` | Descoberta e instalação de skills do Pi Agent |
| `react-skill` | React patterns, hooks, performance, TypeScript |
| `sap-clean-core` | SAP Clean Core framework — extensibility methodology |
| `shadcn-ui-skill` | shadcn/ui components, theming, accessibility |
| `solid-principles-skill` | SOLID design principles |
| `tanstack-skill` | TanStack Query, Router, Table, Form, Start |
| `typescript-skill` | TypeScript type system, generics, patterns |
| `git-commit` | Conventional Commits — mensagens de commit padronizadas |

### Themes

*Em breve*

### Configs

*Em breve*
