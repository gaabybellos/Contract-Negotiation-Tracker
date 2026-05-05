# Specs - Versions

This file summarises the automation spec for version history.
The full spec lives in `Docs/qa/modules/versions/spec.md` and `Docs/qa/automation-specs.md`.

## Coverage

| Case ID | Layer | File | Status |
|---|---|---|---|
| CNT-VER-001 | E2E | not yet implemented | Planned — backlog |

## CNT-VER-001 Summary

Seed a contract and clause with all three text fields populated.
Open the comparison modal, navigate to the Versions tab, fill version label and party, save the version.
Confirm the version appears in the version list and inspect localStorage for the snapshot shape.

Setup: seed contract and clause via localStorage; clear after test.

Key assertions:
- version count increases after save;
- version label visible in the version list;
- localStorage snapshot includes `baselineText`, `theirPosition`, `ourPosition`, `round`, `party`, `label`, and `timestamp`;
- original clause text is unchanged after snapshot.

Known risk: type mismatch between `ClauseVersion` shape and `ComparisonModal.tsx` references must be resolved before this test can be considered stable.
