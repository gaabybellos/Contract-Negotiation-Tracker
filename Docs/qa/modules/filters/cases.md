# Test Cases - Filters Module

## [CNT-FLT-001] Search Filter Applies to Text Fields

Domain: `filters`  
Module: `filters`  
Priority: `High`  
Type: `Functional`  
Layer: `Future E2E`  
Status: `Ready`

### Objective

Verify that typing in the search bar correctly filters the table by searching across issue, rationale, and 3-text fields (baseline, their position, our position).

### Preconditions

1. A contract is active.
2. The contract has multiple clauses with distinct text in their issue, rationale, and position fields.

### Test Data

- Clause A: Issue contains "Liability"
- Clause B: Rationale contains "Indemnification"
- Clause C: Their Position contains "Net 60"

### Steps

1. Enter "Liability" into the search bar.
2. Clear the search bar.
3. Enter "Indemnification" into the search bar.
4. Clear the search bar.
5. Enter "Net 60" into the search bar.

### Expected Result

1. Only Clause A should be displayed when searching "Liability".
2. All clauses should be displayed when cleared.
3. Only Clause B should be displayed when searching "Indemnification".
4. Only Clause C should be displayed when searching "Net 60".

### Observables

- A "Clear Filters" button (X icon) should appear in the search bar when text is entered.
- The table row count updates immediately as text is typed.

### Technical Evidence

- Code: `client/src/contexts/NegotiationContext.tsx` (filteredItems memo computes search against multiple string fields).

---

## [CNT-FLT-002] DashboardStats Status Card Click Updates Filter

Domain: `filters`  
Module: `filters`  
Priority: `High`  
Type: `Functional`  
Layer: `Future E2E`  
Status: `Ready`

### Objective

Verify that clicking on a status card within the DashboardStats applies the corresponding status filter to the table and updates the FilterBar dropdown.

### Preconditions

1. A contract is active.
2. The contract has clauses in various statuses (e.g., "In Discussion", "Agreed").

### Test Data

- Clauses with "In Discussion" status.

### Steps

1. Locate the "In Discussion" card in the DashboardStats.
2. Click the "In Discussion" card.

### Expected Result

1. The FilterBar Status dropdown should change to "In Discussion".
2. The ClauseTable should only display rows with the "In Discussion" status.
3. The DashboardStats card for "In Discussion" should show an active state (border color change).
4. The DashboardStats counts should remain the total counts for the contract, regardless of the filter.

### Observables

- The `onStatusFilter` callback executes and updates the `status` in `filterState`.

### Technical Evidence

- Code: `client/src/components/DashboardStats.tsx` (handleClick triggers onStatusFilter), `client/src/components/FilterBar.tsx`.

---

## [CNT-FLT-003] Combining Multiple Dropdown Filters

Domain: `filters`  
Module: `filters`  
Priority: `Medium`  
Type: `Functional`  
Layer: `Future E2E`  
Status: `Ready`

### Objective

Verify that combining multiple filter parameters (Status and Risk Level) correctly intersects the results.

### Preconditions

1. A contract is active.
2. At least one clause exists with Status "Blocked" and Risk "High".
3. Other clauses exist with only one or neither of these attributes.

### Steps

1. Set the Status dropdown in the FilterBar to "Blocked".
2. Set the Risk Level dropdown in the FilterBar to "High".
3. Click the "Clear Filters" button that appears.

### Expected Result

1. After step 1, only "Blocked" clauses are visible.
2. After step 2, only clauses that are BOTH "Blocked" and "High" risk are visible.
3. After step 3, all filters are reset to "All" and all clauses become visible again.

### Observables

- The Clear Filters button is visible when any filter is active and disappears when clicked.

### Technical Evidence

- Code: `client/src/contexts/NegotiationContext.tsx` (filters are chained in `filteredItems` memo).

---

## [CNT-FLT-004] Clause Number Column Natural Sorting

Domain: `filters`  
Module: `filters`  
Priority: `Medium`  
Type: `Functional`  
Layer: `Future E2E`  
Status: `Ready`

### Objective

Verify that sorting by the Clause Number column correctly applies natural numeric sorting rather than standard alphabetical sorting (e.g., "2.1" comes before "10.1").

### Preconditions

1. A contract is active.
2. Clauses exist with numbers "1.1", "2.1", and "10.1".

### Steps

1. Click the "Clause Number" column header to sort ascending.
2. Click the "Clause Number" column header again to sort descending.

### Expected Result

1. For ascending, the order must be "1.1", "2.1", "10.1".
2. For descending, the order must be "10.1", "2.1", "1.1".

### Observables

- The header displays a ChevronUp or ChevronDown icon based on the active sort direction.

### Technical Evidence

- Code: `client/src/contexts/NegotiationContext.tsx` (uses `localeCompare` with `numeric: true`).

---

## [CNT-FLT-005] Add Custom Owner Persists in LocalStorage

Domain: `filters`  
Module: `filters`  
Priority: `High`  
Type: `Functional`  
Layer: `Future E2E`  
Status: `Ready`

### Objective

Verify that adding a custom owner through the FilterBar updates the owner options and persists the new owner across application reloads.

### Preconditions

1. A contract is active.

### Test Data

- Custom Owner Name: "External Counsel"

### Steps

1. Open the Owner dropdown in the FilterBar.
2. Select "Add new...".
3. Enter "External Counsel" in the dialog and save.
4. Verify the new owner is selected in the dropdown.
5. Reload the browser page.
6. Open the Owner dropdown again.

### Expected Result

1. "External Counsel" is immediately available and selected.
2. After reload, "External Counsel" remains available as an option in the Owner dropdown.

### Observables

- LocalStorage key `negotiation-tracker-owners` is updated with the new JSON array.

### Technical Evidence

- Code: `client/src/contexts/NegotiationContext.tsx` (reads/writes `OWNERS_STORAGE_KEY`), `client/src/components/FilterBar.tsx`.
- LocalStorage: `negotiation-tracker-owners`

---

## [CNT-FLT-006] Empty State Display for Zero Results

Domain: `filters`  
Module: `filters`  
Priority: `Low`  
Type: `Functional`  
Layer: `Future E2E`  
Status: `Ready`

### Objective

Verify that a clear empty state message is shown when active filters yield no results, preventing the table from appearing broken.

### Preconditions

1. A contract is active with existing clauses.

### Steps

1. Apply a filter combination guaranteed to return no results (e.g., search for a gibberish string like "xyz123abc").

### Expected Result

1. The ClauseTable rows disappear.
2. The empty state graphic and message "Try adjusting your filters to see more results." are displayed.

### Technical Evidence

- Code: `client/src/components/ClauseTable.tsx` (renders specific empty state block when `filteredItems.length === 0`).
