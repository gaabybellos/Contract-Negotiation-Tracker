# Cases - Comparison

## CNT-CMP-001 - Compare Baseline Against Counterparty Position

Domain: comparison  
Module: comparison  
Priority: High  
Type: Functional, Regression  
Layer: Future Unit + Future E2E  
Status: Planned

### Objective

Verify that the comparison modal can compare `baselineText` against `theirPosition` and display meaningful diff output and statistics.

### Preconditions

- A contract exists with a clause containing different `baselineText` and `theirPosition`.
- Comparison modal can be opened from the clause row or view.
- Current TypeScript compile blockers related to `ComparisonModal.tsx` are fixed before automation execution.

### Test Data

- Baseline text: `Payment is due within thirty days of invoice receipt.`
- Their position: `Payment is due within sixty days of invoice receipt.`
- Expected semantic difference: `thirty` removed and `sixty` added.

### Steps

1. Open a contract with the prepared clause.
2. Open the comparison action for that clause.
3. Select the Baseline vs Theirs comparison pair.
4. Review inline diff mode.
5. Switch to side-by-side mode.
6. Review diff statistics.

### Expected Result

- Comparison modal opens for the selected clause.
- Baseline vs Theirs is available as a comparison pair.
- The diff highlights removed and added terms.
- Diff statistics show added, removed, and unchanged words.
- Side-by-side mode shows the baseline and counterparty position in separate panels.

### UI Observables

- Modal title includes clause information.
- Comparison pair controls are visible.
- Inline and Side by Side view controls are visible.
- Added and removed text is visually distinguished.
- Diff statistic badges are visible.

### Technical Evidence

- README: describes visual comparison, side-by-side comparison, track changes, and diff statistics.
- Docs: `Docs/qa/modules/comparison/discovery.md`.
- Code: `client/src/components/ComparisonModal.tsx`, `client/src/lib/textDiff.ts`.
- localStorage: clause source data comes from `negotiation-tracker-contracts`.

### localStorage Expectations

- No new localStorage record is required by opening comparison.
- The comparison reads `baselineText` and `theirPosition` from the active contract clause.

### Automation Link

- Spec: `Docs/qa/modules/comparison/spec.md#cnt-cmp-001---compare-baseline-against-counterparty-position`
- Future test: not created in this phase.

### Known Limitations

- `ComparisonModal.tsx` currently has known compile-blocker categories and should be fixed before browser automation.
- Unit coverage for `textDiff` should be planned separately before or alongside E2E.
- Exact diff tokenization should be confirmed before writing strict assertions.

