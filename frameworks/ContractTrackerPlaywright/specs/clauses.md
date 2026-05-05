# Specs - Clauses

This file summarises the automation spec for clause management and the 3-text model.
The full spec lives in `Docs/qa/modules/clauses/spec.md` and `Docs/qa/automation-specs.md`.

## Covered by tests

| Case ID | Test file | Status |
|---|---|---|
| CNT-CLA-001 | `tests/clause-3text-comparison.spec.ts` | Implemented — selector validation pending |

## CNT-CLA-001 Summary

Add a clause with `baselineText`, `theirPosition`, and `ourPosition` using the 3-text model form.
Confirm the clause appears in the table, reload, confirm persistence, inspect localStorage for exact field values.

Setup: create one active contract via UI; clear localStorage before the test.

Key assertions:
- clause number visible in the clause table after saving;
- localStorage clause item contains exact `baselineText`, `theirPosition`, and `ourPosition`;
- data remains after page reload.

Known risk: form field labels depend on paper source (`Our Paper` vs `Their Paper`).
Selector validation against the live UI is required before the test can be considered stable.
