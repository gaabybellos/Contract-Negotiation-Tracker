# Specs - Comparison

This file summarises the automation spec for textual comparison.
The full spec lives in `Docs/qa/modules/comparison/spec.md` and `Docs/qa/automation-specs.md`.

## Coverage layers

| Case ID | Layer | File | Status |
|---|---|---|---|
| CNT-CMP-001 | Unit | `client/src/lib/textDiff.test.ts` | Passing |
| CNT-CMP-001 | E2E | `tests/clause-3text-comparison.spec.ts` | Implemented — selector validation pending |

## CNT-CMP-001 Summary

### Unit layer

`textDiff.ts` exports `computeDiff` and `getDiffStats`.
Tests verify added, removed, and unchanged word detection and the statistics output shape.
Run with: `npx vitest run client/src/lib/textDiff.test.ts` from the project root.

### E2E layer

Seed a clause with known `baselineText` and `theirPosition` directly via localStorage.
Open the comparison modal, confirm the Baseline vs Theirs pair is available, confirm diff statistics are visible.

Setup: seed clause via `page.evaluate` after contract is created; clear localStorage after test.

Key assertions:
- comparison modal opens for the seeded clause;
- comparison pair options are visible;
- diff statistics section is non-empty.

Known risk: the compare button may be an icon-only button without an accessible label.
Selector must be confirmed against the live UI with browser inspection.
