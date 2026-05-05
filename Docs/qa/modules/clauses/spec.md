# Spec - Clauses

## CNT-CLA-001 - Add A Clause With baselineText, theirPosition, And ourPosition

### Related Case

`Docs/qa/modules/clauses/cases.md#cnt-cla-001---add-a-clause-with-baselinetext-theirposition-and-ourposition`

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

