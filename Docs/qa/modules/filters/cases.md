# Cases - Filters

## CNT-FLT-001 - Filter Clauses By Status

Domain: filters  
Module: filters  
Priority: Medium  
Type: Functional, Regression  
Layer: Future E2E  
Status: Planned

### Objective

Verify that status filtering limits the visible clause list to clauses matching the selected status.

### Preconditions

- A contract exists with at least three clauses using different statuses.
- Filter controls are available.
- localStorage is controlled for deterministic data.

### Test Data

- Clause A: status `In Discussion`
- Clause B: status `Agreed`
- Clause C: status `Blocked`
- Filter value: `Agreed`

### Steps

1. Open a contract with the prepared clauses.
2. Confirm all clauses are visible before filtering.
3. Open the status filter.
4. Select `Agreed`.
5. Observe the clause list.
6. Clear the filter or select all statuses.
7. Confirm all clauses are visible again.

### Expected Result

- Only clauses with status `Agreed` are visible when the filter is active.
- Clauses with other statuses are hidden.
- Clearing the filter restores the full clause list.

### UI Observables

- Filter bar is visible.
- Status filter control shows the selected value.
- Clause table row count changes after filtering.
- Dashboard status filter behavior may also update or align with the table.

### Technical Evidence

- README: describes smart filtering and quick filters.
- Docs: `Docs/qa/modules/filters/discovery.md`.
- Code: `client/src/contexts/NegotiationContext.tsx`, `client/src/components/FilterBar.tsx`, `client/src/components/ClauseTable.tsx`.
- localStorage: clause data source is `negotiation-tracker-contracts`.

### localStorage Expectations

- Filtering does not need to mutate `negotiation-tracker-contracts`.
- Filter state is UI state unless future discovery finds persisted filter preferences.

### Automation Link

- Spec: `Docs/qa/modules/filters/spec.md#cnt-flt-001---filter-clauses-by-status`
- Future test: not created in this phase.

### Known Limitations

- Selector strategy for filter controls must be confirmed.
- Dashboard-driven status filtering should be covered by a separate case if behavior differs from FilterBar.

