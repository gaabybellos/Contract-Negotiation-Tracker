# Spec - Versions

## CNT-VER-001 - Save A Clause Version Snapshot

### Related Case

`Docs/qa/modules/versions/cases.md#cnt-ver-001---save-a-clause-version-snapshot`

### Automation Scope

Future E2E coverage for saving a version snapshot from a clause with 3-text data.

### Setup And Cleanup

- Seed one contract and one clause with baseline, their position, and our position.
- Clear contract localStorage after the test.
- Keep round and party values deterministic.

### Preferred Selectors

- Prefer role/name selectors for Compare, Versions tab, Version label, Party select, Round input, and Save Version.
- Use version label as a supporting assertion.
- Inspect localStorage for snapshot fields.

### Steps

1. Navigate to the prepared clause.
2. Open comparison.
3. Open Versions tab.
4. Fill version label.
5. Select party and round.
6. Save version.
7. Assert the version appears.
8. Assert localStorage snapshot shape.

### Assertions

- Version count increases.
- Version label appears in the UI.
- Snapshot includes `baselineText`, `theirPosition`, `ourPosition`, `round`, `party`, `label`, and `timestamp`.
- Original clause text remains unchanged.

### Risks

- Known type mismatch between `ClauseVersion` and `ComparisonModal.tsx` must be fixed before automation.
- Restore should not be included in this first case unless snapshot saving is stable.

### Readiness Status

Status: blocked until compile blockers are fixed.

