---
name: abap
description: Clean ABAP patterns for writing maintainable, testable, high-quality ABAP code. Covers naming, language constructs, OO design, error handling, testing, and formatting — based on SAP's Clean ABAP styleguide with examples and anti-patterns.
---

# Skill: Clean ABAP

## Description
This skill provides comprehensive guidance for writing clean, maintainable, and testable ABAP code based on [SAP's Clean ABAP styleguide](https://github.com/SAP/styleguides/blob/main/clean-abap/CleanABAP.md). It covers every major aspect of ABAP development with concrete do/don't examples, ABAP-specific patterns, and links to underlying principles from Clean Code.

The guide is an adoption of [Robert C. Martin's _Clean Code_](https://www.oreilly.com/library/view/clean-code/9780136083238/) for the ABAP programming language.

## When to Use This Skill
Trigger this skill when the user asks about:
- "How to write clean ABAP code"
- "ABAP best practices" or "ABAP code review"
- "Refactoring ABAP" or "ABAP legacy code"
- "ABAP naming conventions"
- "ABAP OO design patterns"
- "ABAP error handling" or "ABAP exceptions"
- "ABAP unit testing" or "ABAP test classes"
- "ABAP formatting" or "ABAP style guide"
- "Clean Core ABAP" or "ABAP Cloud ready"
- "How to improve ABAP code quality"

## Skill Structure
Each sub-file covers one pillar of clean ABAP programming:

| Pillar | Sub-File | Topics |
|--------|----------|--------|
| **Methodology** | [methodology.md](methodology.md) | Getting started, refactoring legacy code, automated checks, relating to other guides |
| **Naming** | [naming.md](naming.md) | Descriptive names, snake_case, abbreviations, nouns/verbs, noise words, encodings |
| **Language** | [language.md](language.md) | Legacy awareness, performance, OO vs procedural, functional constructs, obsolete elements |
| **Variables & Types** | [variables-and-types.md](variables-and-types.md) | Constants, inline declarations, table types, strings, Booleans, ENUMs |
| **Control Flow** | [control-flow.md](control-flow.md) | Conditions, If statements, CASE, nesting depth, regular expressions |
| **Classes** | [classes.md](classes.md) | Objects vs static, composition vs inheritance, scope, constructors, singletons |
| **Methods** | [methods.md](methods.md) | Calls, parameters, method body, control flow, object orientation |
| **Error Handling** | [error-handling.md](error-handling.md) | Messages, return codes, class-based exceptions, throwing, catching |
| **Comments** | [comments.md](comments.md) | Code vs comments, ABAP Doc, TODO/FIXME, pragmas, design documentation |
| **Formatting** | [formatting.md](formatting.md) | Consistency, line length, blank lines, indentation, parameter alignment |
| **Testing** | [testing.md](testing.md) | Test principles, test classes, dependency injection, assertions, test data |

## Quick Reference: Top 10 Rules

1. **Use descriptive, pronounceable names** in `snake_case` — no Hungarian notation prefixes
2. **Prefer inline declarations** (`DATA(name) = ...`) over up-front `DATA:` blocks
3. **Prefer objects to static classes** — use composition over inheritance
4. **Methods do one thing, stay small** (3-5 statements), aim for <3 IMPORTING parameters
5. **Use class-based exceptions** (`CX_STATIC_CHECK` for manageable, `CX_NO_CHECK` for unrecoverable)
6. **Prefer functional calls** over procedural `CALL METHOD` — omit `RECEIVING`, `EXPORTING`
7. **Use the right table type** — `HASHED` for large read-only, `SORTED` for sorted, `STANDARD` for small
8. **Express intent in code, not comments** — comments explain WHY, not WHAT
9. **Prefer `CASE` to `ELSE IF`**, keep nesting depth low, conditions positive
10. **Write testable code** — test against interfaces, use given-when-then, dependency inversion

## Automated Checking Tools
- [code pal for ABAP](https://github.com/SAP/code-pal-for-abap) — SAP's official Clean ABAP checker
- [abaplint](https://github.com/abaplint/abaplint) — open source linter, works without SAP system
- [abapOpenChecks](https://github.com/larshp/abapOpenChecks) — Code Inspector checks collection
- ABAP Test Cockpit (ATC) — built-in SAP quality checks
- Code Inspector / Extended Check / Checkman — SAP standard tools
