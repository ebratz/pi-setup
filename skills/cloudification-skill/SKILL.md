---
name: cloudification
description: SAP Cloudification Repository knowledge — classifies SAP APIs as "released" (ABAP Cloud compatible), "classicAPI" (allowed with Clean Core Private), or "noAPI" (must be replaced with successors). Based on SAP's official abap-atc-cr-cv-s4hc repository from https://github.com/SAP/abap-atc-cr-cv-s4hc.
---

# Skill: SAP Cloudification (Clean Core API Classification)

## Description
This skill provides knowledge from SAP's official [Cloudification Repository](https://github.com/SAP/abap-atc-cr-cv-s4hc) — the definitive source for classifying SAP APIs by their cloud-readiness. It defines which SAP-delivered objects (classes, function modules, CDS views, interfaces) can be used in ABAP Cloud development, which are "classic APIs" allowed for Clean Core Private Cloud, and which are not released and must be replaced with successors.

## When to Use This Skill
Trigger this skill when:
- Evaluating if custom code uses SAP APIs compatible with ABAP Cloud
- Checking "Usage of Released APIs" for Clean Core assessment
- Planning cloud migration — identifying "noAPI" objects that need replacement
- Validating custom code against the Cloudification Repository
- Cross-referencing custom code SAP API calls with cloud-readiness status

## API Classification States

The repository classifies every SAP object with one of three states:

| State | Meaning | Cloud Compatible? |
|-------|---------|-------------------|
| **`released`** | SAP-released API for ABAP Cloud | ✅ Fully compatible |
| **`classicAPI`** | Allowed in Clean Core Private Cloud model | ✅ Allowed (Private Cloud only) |
| **`noAPI`** | Not released — must be replaced | ❌ Must migrate to successor |

## Object Types Classified
- `CLAS` — ABAP Classes
- `FUGR` — Function Groups (containing Function Modules)
- `DDLS` — CDS Views / Data Definitions
- `INTF` — Interfaces

## Key Labels
- `remote-enabled` — RFC/BAPI callable
- `transactional-consistent` — Supports transactional consistency (LUW-safe)

## How to Check Custom Code

1. Extract all CALL FUNCTION, NEW (class), and CDS references from custom code
2. Look up each SAP API in the `objectClassifications_SAP.json` file
3. Flag any usage of `"state":"noAPI"` objects — these must be migrated to successors
4. Flag any usage of `"state":"classicAPI"` objects — these are allowed only for Private Cloud

## ATC Check Integration

SAP Note references for enabling ATC checks:
- **3284711** — ATC Check for GitHub Repo (Cloud ERP)
- **3449860** — Classic APIs support for SAP Cloud ERP Private
- **3565942** — NEW "Usage of APIs" and "Allowed Enhancement Technologies" check
- **3377462** — Fix error in ATC Check
- **3507814** — Own released objects support
- **3489660** — UI5 ABAP Repository with ABAP for Cloud Development

## Data Source URLs
- Cloud ERP: `https://raw.githubusercontent.com/SAP/abap-atc-cr-cv-s4hc/main/src/objectReleaseInfoLatest.json`
- Cloud ERP Private: `https://raw.githubusercontent.com/SAP/abap-atc-cr-cv-s4hc/main/src/objectReleaseInfo_PCELatest.json`
- Clean Core Classification: `https://raw.githubusercontent.com/SAP/abap-atc-cr-cv-s4hc/main/src/objectClassifications_SAP.json`

## Common "noAPI" → Successor Patterns

When an object has `"state":"noAPI"`, the repository provides `"successors"` — replacement objects:

- Old class → New BAPI Function Module (e.g., `CF_REBD_BUILDING` → `BAPI_RE_BU_GET_DETAIL`)
- Deprecated class → New class (e.g., `CL_BCS` → `CL_BCS_MAIL_MESSAGE`)
- Old CDS view → New CDS view (e.g., `I_EARMARKEDFUNDS` → `I_EARMARKEDFUNDSDOCUMENT`)
- Old Interface → New Class (e.g., `IF_OO_CLASS_INCL_NAMING` → `CL_OO_CLASSNAME_SERVICE`)

## How to Evaluate Custom Code

For each SAP API call in custom code:
1. Extract the object name (function group for FMs, class name for NEW/CREATE OBJECT)
2. Look up in the classification JSON
3. Classify:
   - `released`/`classicAPI` → OK for Private Cloud, may need review for Public Cloud
   - `noAPI` → MUST BE REPLACED — use the listed successors
4. Count and categorize all APIs by state
