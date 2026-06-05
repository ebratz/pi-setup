---
name: sap-clean-core
description: SAP Clean Core framework — principles, categories, dimension-based assessment, tier classification (T1 on-stack, T2 side-by-side, T3 developer), extensibility rules (key user, on-stack, side-by-side), cloud readiness criteria, and remediation categorization. Based on SAP S/4HANA Clean Core extensibility methodology.
---

# Skill: SAP Clean Core Framework

## Description
Defines the SAP Clean Core framework for S/4HANA Cloud and Private Cloud. Used to categorize and assess custom objects along clean core dimensions: ABAP language compliance, API usage, extensibility tier classification, and cloud readiness.

## When to Use
- Categorizing custom objects by Clean Core compliance dimension
- Classifying extensions into Tier 1 (on-stack ABAP Cloud), Tier 2 (side-by-side/BTP), Tier 3 (developer extensibility)
- Assessing cloud readiness of custom ABAP code
- Building clean core remediation roadmaps
- Validating that custom code follows Clean Core principles

---

## Clean Core Principles

SAP's **Clean Core** strategy aims to keep the digital core (S/4HANA) free of modifications and tightly-coupled custom code, enabling:

1. **Seamless Upgrades** — no upgrade impact from custom code
2. **Cloud Readiness** — code runs on any SAP cloud deployment model
3. **Innovation Speed** — decoupled extensions evolve independently
4. **Standard Compliance** — use only released SAP APIs and extension points

## Five Dimensions of Clean Core Assessment

| Dimension | What It Evaluates | Key Tool |
|-----------|-------------------|----------|
| **1. ABAP Language Version** | Code uses ABAP Cloud language scope (no dynpro, no list, no deprecated SQL) | ATC Check "ABAP Language Version" |
| **2. SAP API Usage** | Only released SAP APIs / classic APIs used | ATC Check "Usage of Released APIs" (Cloudification) |
| **3. Extensibility Tier** | Extensions follow the right tier pattern (T1/T2/T3) | Architecture Review |
| **4. Code Quality** | Clean ABAP styleguide compliance | Code Review (abap-skill) |
| **5. Upgrade Safety** | No modifications to SAP objects, no kernel patches | ATC Check + System Analysis |

---

## Extensibility Tier Classification (T1-T2-T3)

### Tier 1 — On-Stack / ABAP Cloud Extensions (keeping it clean)
**What:** Custom code written ON the S/4HANA stack using the ABAP Cloud language.
**Allowed:**
- ABAP classes (CLAS), interfaces (INTF)
- CDS views (DDLS), behavior definitions (BDEF)
- Released SAP APIs and BAPIs
- Fiori elements / RAP (ABAP RESTful Application Programming Model)
- Custom business objects

**Restrictions:**
- NO dynpros (screens)
- NO list processing (WRITE, ALV Classic)
- NO FORMs or function modules (use classes)
- NO direct table reads (use CDS views or released APIs)
- NO deprecated Open SQL syntax

**Typical objects:** RAP business objects, custom CDS views, behavior implementations, service bindings

### Tier 2 — Side-by-Side Extensions (decoupled, next-gen)
**What:** Extensions running OUTSIDE the S/4HANA core, on SAP BTP or other platforms.
**Characteristics:**
- Uses public SAP APIs (OData, SOAP, REST)
- Built on SAP BTP (Cloud Foundry, Kyma, ABAP Environment)
- Event-driven (SAP Event Mesh, SAP Integration Suite)
- Independent lifecycle, scaling, deployment

**Typical objects:** CAP services, Fiori Elements apps on BTP, workflow extensions, AI/ML integrations

### Tier 3 — Developer Extensibility / Classic Extensions (transitional)
**What:** Traditional ABAP custom code that needs migration to T1/T2.
**Patterns to remediate:**
- Dynpro-based transactions (SE38, SE80)
- Classic BDC / batch input
- FORM routines and function groups
- Direct database access
- Custom SAP GUI transactions
- Excel integration via ALSM_EXCEL_TO_INTERNAL_TABLE
- Email via SO_NEW_DOCUMENT_SEND_API1

**Goal:** Migrate T3 → T1 (or T2) over time

---

## Extensibility Types (SAP's 3-type model)

| Type | Who | Where | Access |
|------|-----|-------|--------|
| **Key User** | Business user / functional consultant | SAP Fiori UI adaptation, custom fields, custom logic via "Custom Business Objects" app | No ABAP needed |
| **On-Stack Developer** | ABAP developer | Eclipse ADT — within S/4HANA stack using ABAP Cloud | Released APIs only |
| **Side-by-Side** | Full-stack developer | SAP BTP — any language/framework | All public SAP APIs |

---

## Clean Core Categorization — How to Classify Custom Objects

### Category A: Clean Core Ready ✅
- ABAP Cloud language compliant (no ATC errors)
- Uses only released APIs
- T1 or T2 architecture
- No dynpro, no list processing, no classic UI
- OO design, RAP-based

### Category B: Clean Core Compatible (Private Cloud) ⚠️
- Uses classicAPI (allowed in Private Cloud)
- Some procedural patterns but maintainable
- No direct SAP modifications
- Requires minor refactoring for Clean Core Ready

### Category C: Requires Refactoring 🟠
- Has ATC warnings, not errors
- Uses some deprecated patterns (FORMs, function groups)
- SY fields usage but manageable
- Migrate to OO + released APIs

### Category D: Clean Core Violation — Remediate Now 🔴
- ATC errors (ABAP Language Version violations)
- Uses noAPI / unreleased SAP APIs
- Dynpro, list processing, classic ALV
- Direct database access without CDS
- All-dimension violations, monolithic procedural code
- Clone families with multiple suffixes (_CONS, _PA, _OLD)
- Hardcoded strings, no i18n, dead code, Hungarian prefixes
- Web Service legacy functions (WS_*)
- Requires major rewrite or complete rewrite

---

## Clean Core Remediation Priorities

| Priority | What | Category |
|----------|------|----------|
| **P0 — Critical** | ATC errors blocking cloud, noAPI usage, list processing, dynpro | D → must fix to proceed |
| **P1 — High** | FORMs refactoring, SY fields removal, classicAPI → releasedAPI migration | C → high impact |
| **P2 — Medium** | Hardcoded strings → text elements, performance issues, Hungarian notation | B → quality improvement |
| **P3 — Low** | Code formatting, naming conventions, dead code removal | A → polish |

---

## Dimension Scoring Matrix

For each custom object, score 0-10 across 5 dimensions:

| Dimension | 0-2 (Critical) | 3-5 (Poor) | 6-7 (Acceptable) | 8-10 (Clean Core Ready) |
|-----------|---------------|-----------|-------------------|------------------------|
| ABAP Language Version | >10 ATC errors | 5-10 errors | 1-4 errors/warnings | 0 violations |
| SAP API Usage | Uses noAPI | Uses classicAPI heavily | Uses classicAPI minimally | All released APIs |
| Extensibility Tier | T3 classic dynpro | T3 with no dynpro | Mixed T1/T3 | T1 or T2 |
| Code Quality | Score <2/10 | 2-4/10 | 5-7/10 | 8-10/10 |
| Upgrade Safety | SAP modifications | Shared includes | Own namespace, clean | Fully decoupled |

**Overall Clean Core Score = average of 5 dimensions**

---

## Assessment Keywords

When categorizing an object, look for these patterns:

**Clean Core Ready signals:**
- `CLASS ... DEFINITION PUBLIC` — OO design
- `@EndUserText.label` — CDS annotations
- `cl_` prefix — class prefix
- RAP framework keywords (behavior, implementation, managed)

**Clean Core violations:**
- `REPORT` / `PROGRAM` — classic report (T3)
- `CALL SCREEN` — dynpro
- `WRITE:` / `ULINE` / `NEW-LINE` — list processing (no cloud)
- `FORM ... ENDFORM` — subroutine
- `TABLES:` — classic table work area
- `OCCURS 0 WITH HEADER LINE` — obsolete
- `CALL TRANSACTION` — classic BDC
- `DATA: BEGIN OF ... OCCURS` — internal table with header
- `INSERT ... FROM TABLE` / `MODIFY ... FROM TABLE` — direct DB
- `SY-TABIX`, `SY-SUBRC`, `SY-DATUM` — system fields (ABAP Cloud restriction)
- `CREATE OBJECT` → use `NEW` operator
- `GET PARAMETER` / `SET PARAMETER` — SAP memory, no cloud

---

## ATC Check Integration

| ATC Check | Clean Core Dimension | SAP Note |
|-----------|---------------------|----------|
| ABAP Language Version (Syntax) | Dimension 1 | 3284711, 3565942 |
| Usage of APIs (Cloudification) | Dimension 2 | 3284711, 3565942 |
| Unreleased APIs (Object Classification) | Dimension 2 | 3449860 |
| Extended Program Check (SLIN) | Dimension 4 | Standard SLIN |
| Modification Check | Dimension 5 | Multiple |

---

## Data Source References

- SAP Cloudification Repository: https://github.com/SAP/abap-atc-cr-cv-s4hc
- SAP Clean ABAP Styleguide: https://github.com/SAP/styleguides/tree/main/clean-abap
- SAP Clean Core Learning Journey: SAP Learning Hub "Implementing Clean Core for SAP S/4HANA Cloud"
- ATC Quick Fixes + Clean Core: SAP Note 3565942
- Key User Extensibility: SAP Help → S/4HANA Cloud → Extensibility → Key User
