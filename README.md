# pi-setup

Recursos do **Pi Coding Agent** — extensões, skills, temas e configurações.

## Estrutura

```
├── extensions/     # Extensões do Pi Agent
│   └── coms/       # Comunicação peer-to-peer entre agentes
├── skills/         # Skills (instruções especializadas)
├── themes/         # Temas para o TUI
├── configs/        # Configurações (settings, modelos, etc.)
└── package.json    # Manifesto do pacote pi
```

## Instalação

```bash
pi install git:github.com/ebratz/pi-setup
```

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

### Themes

*Em breve*

### Configs

*Em breve*
