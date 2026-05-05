# Automation Specs

This file consolidates planned automation specs for the first QA cycle. No executable tests are created in this step.

## CNT-CTR-001 - Create A Contract With Valid Data And Persist It After Reload

### Related Case

`CNT-CTR-001` in `Docs/qa/test-cases.md` and `Docs/qa/modules/contracts/cases.md`.

### Automation Scope

Future E2E coverage for contract creation, active contract display, and persistence after reload.

### Setup And Cleanup

- Start the app in a clean browser context.
- Before the test, clear `negotiation-tracker-contracts` and `negotiation-tracker-contracts-version`.
- After the test, clear contract-related keys to avoid cross-test state.

### Preferred Selectors

- Prefer role/name selectors for Create Contract, dialog fields, Paper Source options, and submit button.
- Use stable text selectors for the created contract name only as supporting assertions.
- Add test IDs later only if accessible selectors are not stable.

### Steps

1. Navigate to the application.
2. Open Create Contract.
3. Fill contract fields.
4. Select `Our Paper`.
5. Submit.
6. Assert active contract UI.
7. Reload.
8. Assert persisted contract UI and localStorage data.

### Assertions

- Contract name and counterparty appear in the UI.
- Contract is stored in `negotiation-tracker-contracts`.
- Contract has status `active`, paper source `ours`, and one creation timeline event.
- Data remains after reload.

### Risks

- Accessible names must be validated.
- localStorage version logic may reset data if version keys are not managed correctly.
- Compile blockers should be fixed before running browser automation.

### Readiness Status

Status: blocked until compile blockers are fixed and selectors are validated.

## CNT-CLA-001 - Add A Clause With baselineText, theirPosition, And ourPosition

### Related Case

`CNT-CLA-001` in `Docs/qa/test-cases.md` and `Docs/qa/modules/clauses/cases.md`.

### Automation Scope

Future E2E coverage for adding a clause with the implemented 3-text model and validating persistence.

### Setup And Cleanup

- Seed or create one active contract.
- Clear `negotiation-tracker-contracts` before and after the test.
- Keep paper source explicit to control field labels.

### Preferred Selectors

- Prefer role/name selectors for Add Clause, textareas, selects, and save action.
- Prefer labels for `baselineText`, `theirPosition`, and `ourPosition`.
- Validate dynamic labels for paper source before strict locator use.

### Steps

1. Navigate to the active contract.
2. Open Add Clause.
3. Fill metadata and 3-text fields.
4. Save.
5. Assert the clause appears in the table.
6. Open view or edit mode.
7. Assert the three text values.
8. Reload and assert persistence.

### Assertions

- Clause is visible after saving.
- localStorage clause item contains exact `baselineText`, `theirPosition`, and `ourPosition`.
- Clause metadata matches the test data.
- Data remains after reload.

### Risks

- Required field validation must be confirmed.
- Table output may truncate text, so full text assertions may need view/edit modal or localStorage inspection.
- Compile blockers should be fixed before browser automation.

### Readiness Status

Status: blocked until compile blockers are fixed and form selectors are validated.

## CNT-CMP-001 - Compare Baseline Against Counterparty Position

### Related Case

`CNT-CMP-001` in `Docs/qa/test-cases.md` and `Docs/qa/modules/comparison/cases.md`.

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

## CNT-FLT-001 - Filter Clauses By Status

### Related Case

`CNT-FLT-001` in `Docs/qa/test-cases.md` and `Docs/qa/modules/filters/cases.md`.

### Automation Scope

Future E2E coverage for status filtering and restoring the unfiltered clause list.

### Setup And Cleanup

- Seed one contract with clauses using `In Discussion`, `Agreed`, and `Blocked`.
- Clear contract localStorage after the test.
- Avoid relying on sample data because version resets may change it.

### Preferred Selectors

- Prefer role/name selectors for status filter controls.
- Use unique clause numbers or issue text for row visibility assertions.
- Prefer table row assertions if the table has accessible row structure.

### Steps

1. Navigate to the prepared contract.
2. Assert all seeded clauses are visible.
3. Select status `Agreed`.
4. Assert only the agreed clause is visible.
5. Clear the filter.
6. Assert all seeded clauses are visible again.

### Assertions

- Filter control reflects `Agreed`.
- Matching clause remains visible.
- Non-matching clauses are hidden.
- Clearing filter restores all clauses.
- localStorage contract data is not changed by filtering.

### Risks

- Filter control implementation may require locator validation.
- Dashboard status filters and FilterBar status filters may need separate automation coverage.

### Readiness Status

Status: blocked until compile blockers are fixed and filter selectors are validated.

## CNT-VER-001 - Save A Clause Version Snapshot

### Related Case

`CNT-VER-001` in `Docs/qa/test-cases.md` and `Docs/qa/modules/versions/cases.md`.

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

## CNT-TPL-001 - Create A Contract From A Template

### Related Case

`CNT-TPL-001` in `Docs/qa/test-cases.md` and `Docs/qa/modules/templates/cases.md`.

### Automation Scope

Future E2E coverage for creating a contract from a template and validating clause mapping.

### Setup And Cleanup

- Seed or create one template with one template clause.
- Clear `negotiation-tracker-templates`, `negotiation-tracker-templates-version`, `negotiation-tracker-contracts`, and `negotiation-tracker-contracts-version` before and after the test.
- Prefer direct UI creation in E2E if stable; use localStorage seeding only if setup becomes too slow or brittle.

### Preferred Selectors

- Prefer role/name selectors for Templates, New Template, Create From Template, contract name, counterparty, and submit actions.
- Use template and contract names as supporting assertions.
- Validate exact flow with Playwright MCP before implementation.

### Steps

1. Open template library.
2. Create or select a prepared template.
3. Start contract creation from template.
4. Fill new contract data.
5. Submit.
6. Open the created contract.
7. Assert template-derived clause exists.
8. Assert 3-text field mapping in localStorage.

### Assertions

- New contract exists in `negotiation-tracker-contracts`.
- Contract paper source is `ours`.
- Derived clause includes template baseline text.
- Derived clause includes `templateId` and `templateClauseId` when created through the contract-from-template hook.
- `theirPosition` and `ourPosition` follow the implementation rule.

### Risks

- Exact UI route for contract-from-template must be confirmed.
- Template-related compile blocker categories should be fixed before automation.
- Document import should remain out of this first template case.

### Readiness Status

Status: blocked until compile blockers are fixed and the template-to-contract UI path is validated.

