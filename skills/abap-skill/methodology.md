# Clean ABAP — Methodology

## Getting Started with Clean Code

If you are new to Clean Code, first read [Robert C. Martin's _Clean Code_](https://www.oreilly.com/library/view/clean-code/9780136083238/). The [Clean Code Developer initiative](https://clean-code-developer.com/) provides a didactically smooth stepwise introduction.

**Recommended learning order** (easiest to hardest):

1. **Start with:** [Booleans](variables-and-types.md#booleans), [Conditions](control-flow.md#conditions), [Ifs](control-flow.md#if-statements) — easily understood, broadly accepted.
2. **Then:** [Methods](methods.md) — especially "Do one thing, do it well, do it only" and "Keep methods small" — these tremendously improve overall code structure.
3. **Later (more controversial):** [Comments](comments.md), [Names](naming.md), [Formatting](formatting.md) — can lead to near-religious disputes. Only address after the team has seen proof of Clean Code's positive effects.

## Refactoring Legacy Code

For legacy projects with tons of code you cannot or do not want to change, the most rewarding topics are: Booleans, Conditions, Ifs, and Methods — they can be applied to new code without conflicts.

**Avoid mixing styles** within the same development object during refactoring:
- Don't mix `REF TO` and `FIELD-SYMBOL` when looping
- Don't mix `NEW` and `CREATE OBJECT` for constructors
- Don't mix `RETURNING` and `EXPORTING` in single-parameter methods
- Don't mix inline and up-front declarations in the same method

If the legacy code uses up-front declarations exclusively and a full refactoring to inline declarations isn't feasible, stick with the legacy style rather than mixing.

### Four-Step Refactoring Plan

1. **Get the team aboard.** Communicate the new style, get agreement on a small undisputed subset, evolve from there.
2. **Boy scout rule.** _Always leave the code you edit a little cleaner than you found it._ Spend a couple of minutes extra — improvements accumulate over time.
3. **Build clean islands.** Periodically pick a small object or component and make it clean in all aspects. These demonstrate the benefit and form tested home bases for further refactoring.
4. **Talk about it.** Hold code reviews, info sessions, or discussion boards to enable the team to grow a common understanding.

## Automated Checking Tools

| Tool | What It Does | SAP System Required? |
|------|-------------|---------------------|
| [code pal for ABAP](https://github.com/SAP/code-pal-for-abap) | SAP's official Clean ABAP checker — comprehensive suite | Yes |
| [abaplint](https://github.com/abaplint/abaplint) | Open source reimplementation of ABAP parser, works on serialized code (abapGit) | No |
| [abapOpenChecks](https://github.com/larshp/abapOpenChecks) | Open source Code Inspector checks | Yes |
| ATC / Code Inspector / Checkman | SAP standard quality tools | Yes |
| Extended Check | Syntax + extended program check | Yes |

**abaplint** offers multiple integrations: GitHub Actions, Jenkins, text editors, etc. It covers many antipatterns and can check formatting and code conventions without needing an SAP system.

## Relating to Other Guides

- **ABAP Programming Guidelines** (SAP Help) — mostly compatible; deviations indicated and always in the spirit of cleaner code.
- **DSAG's Recommendations for ABAP Development** — Clean ABAP is more precise in most details.
- **SAP internal teams** — Since publication, Clean ABAP has become a reference for many of SAP's in-house development teams, including the several hundred coders working on S/4HANA.

## How to Disagree

This guide is written for readers already acquainted with Clean Code, with a strong focus on applying it _specifically to ABAP_. If you disagree with something, read the background first via the linked sections.

**One pillar of Clean Code**: _the team rules_. Give things a fair chance before discarding them. See [CONTRIBUTING.md](https://github.com/SAP/styleguides/blob/main/CONTRIBUTING.md) for ways to change the guide or deviate in minor details.
