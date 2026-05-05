# Specs - Filters

This file summarises the automation spec for clause filtering.
The full spec lives in `Docs/qa/modules/filters/spec.md` and `Docs/qa/automation-specs.md`.

## Coverage

| Case ID | Layer | File | Status |
|---|---|---|---|
| CNT-FLT-001 | E2E | not yet implemented | Planned — backlog |

## CNT-FLT-001 Summary

Seed a contract with three clauses using different statuses (`In Discussion`, `Agreed`, `Blocked`).
Select the `Agreed` status filter, confirm only the matching clause is visible.
Clear the filter, confirm all clauses are visible again.

Setup: seed contracts with clauses via localStorage before navigating; clear after test.

Key assertions:
- only the filtered clause is visible when filter is active;
- non-matching clauses are hidden;
- clearing filter restores the full clause list;
- localStorage contract data is not mutated by filtering.

Known risk: filter control implementation (dropdown vs button group) must be confirmed against live UI.
