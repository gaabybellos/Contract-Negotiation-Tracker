# Spec - Comparison

## CNT-CMP-001 - Compare Baseline Against Counterparty Position

### Related Case

`Docs/qa/modules/comparison/cases.md#cnt-cmp-001---compare-baseline-against-counterparty-position`

### Automation Scope

Future unit coverage for `textDiff` and future E2E coverage for the comparison modal using Baseline vs Theirs.

### Setup And Cleanup

- Seed a contract and clause with known baseline and counterparty text differences.
- Clear contract localStorage after the test.
- Use deterministic text with one clear changed word.

### Preferred Selectors

- Prefer role/name selectors for Compare, Comparison tab, Baseline vs Theirs, Inline, Side by Side, and Redlines.
- Use visible statistic labels for added, removed, and unchanged counts.
- Use localStorage or seeded data to avoid relying on table text truncation.

### Steps

1. Navigate to the prepared clause.
2. Open comparison.
3. Select Baseline vs Theirs.
4. Assert inline diff output.
5. Switch to Side by Side.
6. Assert both panels are visible.
7. Assert statistics are shown.

### Assertions

- Comparison modal opens for the selected clause.
- Added and removed terms are visually represented.
- Side-by-side panel labels match the selected pair.
- Diff statistics are non-empty and consistent with the test data.

### Risks

- `ComparisonModal.tsx` has known compile-blocker categories.
- Exact diff tokenization may make strict word-count assertions brittle.
- Unit test planning for `textDiff` should define expected token behavior.

### Readiness Status

Status: blocked until compile blockers are fixed; partial for future unit spec once expected diff tokenization is confirmed.

