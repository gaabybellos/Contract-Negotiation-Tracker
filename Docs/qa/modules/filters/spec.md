# Spec - Filters

## CNT-FLT-001 - Filter Clauses By Status

### Related Case

`Docs/qa/modules/filters/cases.md#cnt-flt-001---filter-clauses-by-status`

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

