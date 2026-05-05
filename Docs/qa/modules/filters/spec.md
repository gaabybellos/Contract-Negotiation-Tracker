# Automation Spec - Filters Module

---

## CNT-FLT-001 - Search Filter Applies to Text Fields

### Related Case

`Docs/qa/modules/filters/cases.md` — CNT-FLT-001

### Automation Objective

Verify that the search input filters the clause table by matching text across issue, rationale, and position fields (theirPosition). Verify that clearing the search restores all rows.

### Layer

Future E2E — Playwright

### Data And Setup

- One contract created fresh for the test.
- Three clauses with distinct, non-overlapping searchable text:
  - Clause 1.1: issue contains "Liability exposure"
  - Clause 2.1: rationale contains "Indemnification obligation"
  - Clause 3.1: theirPosition contains "Net 60"
- No clause text should overlap across the three search terms.

### Reset And Cleanup

- Clear all localStorage before the test via `clearLocalStorage(page)`.
- Reload the page to start from a clean state.
- No cleanup after the test is needed; the next test's `beforeEach` handles it.

### Preferred Selectors

- Search input: `page.getByPlaceholder('Search clauses...')`
- Table rows: `page.locator('tbody tr')`
- Clause number cells: `page.getByText('<number>')` — reliable because test data ensures clause numbers do not appear in other columns.

### Automated Steps

1. Navigate to `/` and clear localStorage.
2. Create a contract.
3. Add clause 1.1 with issue "Liability exposure must be capped".
4. Add clause 2.1 with rationale "Indemnification obligation must be bilateral".
5. Add clause 3.1 with theirPosition "Net 60 payment terms are required by counterparty".
6. Fill search input with "Liability exposure" — assert only 1.1 is visible.
7. Clear search — assert all three rows are visible.
8. Fill search with "Indemnification obligation" — assert only 2.1 is visible.
9. Clear search — assert all three rows are visible.
10. Fill search with "Net 60" — assert only 3.1 is visible.
11. Clear search — assert all three rows are visible.

### Assertions

- Matching clause number is visible; non-matching clause numbers are not visible after each search step.
- All three clause numbers are visible after each clear.
- Table row count is not asserted directly; visibility of clause numbers is sufficient.

### Technical Risks

- `getByText` with a short clause number like "1.1" could match other elements if any field value contains the same string. Mitigated by choosing test data that does not repeat clause numbers in other fields.
- The search filter runs in memory (React useMemo); no debounce is expected so assertions can run immediately after fill.

### Readiness

Status: `ready`

---

## CNT-FLT-002 - DashboardStats Status Card Click Updates Filter

### Related Case

`Docs/qa/modules/filters/cases.md` — CNT-FLT-002

### Automation Objective

Verify that clicking a status card in DashboardStats applies the corresponding status filter to the table and that the DashboardStats totals remain unchanged (they are based on raw items, not filtered items).

### Layer

Future E2E — Playwright

### Data And Setup

- One contract with three clauses at different statuses:
  - Clause 1.1: status "In Discussion"
  - Clause 2.1: status "Agreed"
  - Clause 3.1: status "No Changes" (default)

### Reset And Cleanup

- Clear all localStorage before the test via `clearLocalStorage(page)`.
- Reload to start from a clean state.

### Preferred Selectors

- DashboardStats section: `page.locator('[data-tour="dashboard-stats"]')`
- Status card: `page.locator('[data-tour="dashboard-stats"] .cursor-pointer').filter({ hasText: 'In Discussion' })`
- Table rows: `page.locator('tbody tr')`
- FilterBar Clear button: `page.getByRole('button', { name: /clear/i })`

### Automated Steps

1. Navigate to `/` and clear localStorage.
2. Create a contract.
3. Add clause 1.1 with status "In Discussion".
4. Add clause 2.1 with status "Agreed".
5. Add clause 3.1 (default "No Changes").
6. Assert table shows 3 rows.
7. Click the "In Discussion" card in DashboardStats.
8. Assert table shows 1 row (clause 1.1 only).
9. Assert clause 2.1 number is not visible.
10. Assert DashboardStats section still shows the value "3" for Total Clauses.
11. Click FilterBar Clear button.
12. Assert table shows 3 rows again.

### Assertions

- Row count drops from 3 to 1 after clicking the status card.
- Only the matching clause number is visible in the table.
- `[data-tour="dashboard-stats"]` still contains "3" (Total Clauses count unchanged).
- Row count returns to 3 after clearing.

### Technical Risks

- `onStatusFilter` prop must be wired in the parent component; if missing, the card click has no effect. Verify this integration before marking the test as passing.
- `.cursor-pointer` class is conditionally applied when `isClickable` is true; if `onStatusFilter` is not passed, the class is absent and the locator will not match.

### Readiness

Status: `ready`

---

## CNT-FLT-003 - Combining Multiple Dropdown Filters

### Related Case

`Docs/qa/modules/filters/cases.md` — CNT-FLT-003

### Automation Objective

Verify that combining the Status and Priority filter dropdowns in the FilterBar intersects results (logical AND), and that the Clear button resets both filters simultaneously.

### Layer

Future E2E — Playwright

### Data And Setup

- One contract with three clauses:
  - Clause 1.1: status "Blocked", priority "High"
  - Clause 2.1: status "Blocked", priority "Low"
  - Clause 3.1: status "Agreed", priority "High"

### Reset And Cleanup

- Clear all localStorage before the test via `clearLocalStorage(page)`.
- Reload to start from a clean state.

### Preferred Selectors

- Status filter combobox: `page.getByRole('combobox').filter({ hasText: 'All Statuses' })`
- Priority filter combobox: `page.getByRole('combobox').filter({ hasText: 'All Priorities' })`
- Select options: `page.getByRole('option', { name: '<value>' })`
- Table rows: `page.locator('tbody tr')`
- FilterBar Clear button: `page.getByRole('button', { name: /clear/i })`

### Automated Steps

1. Navigate to `/` and clear localStorage.
2. Create a contract.
3. Add clause 1.1 with status "Blocked" and priority "High".
4. Add clause 2.1 with status "Blocked" and priority "Low".
5. Add clause 3.1 with status "Agreed" and priority "High".
6. Set Status filter to "Blocked" → assert 2 rows (1.1 and 2.1).
7. Set Priority filter to "High" → assert 1 row (1.1 only).
8. Assert clause 2.1 is not visible.
9. Click Clear button → assert 3 rows visible again.
10. Assert the Clear button disappears after clicking.

### Assertions

- After Status = "Blocked": table has 2 rows.
- After adding Priority = "High": table has 1 row.
- The surviving row contains "1.1".
- After Clear: table has 3 rows and the Clear button is no longer visible.

### Technical Risks

- shadcn/ui Select components render their dropdown content in a portal. Ensure the option locator finds the element in the DOM after the trigger is clicked before asserting.
- If `formOptions.priorities` does not include "Low", the clause creation step for "Low" priority would fail at the form level. Verify the priority list in `defaultFormOptions` contains "Low".

### Readiness

Status: `ready`

---

## CNT-FLT-004 - Clause Number Column Natural Sorting

### Related Case

`Docs/qa/modules/filters/cases.md` — CNT-FLT-004

### Automation Objective

Verify that clicking the "Clause #" column header sorts clause numbers using natural numeric order (2.1 before 10.1), not lexicographic order (which would place 10.1 before 2.1).

### Layer

Future E2E — Playwright

### Data And Setup

- One contract with three clauses added in a non-sorted order:
  - Clause 10.1 added first
  - Clause 2.1 added second
  - Clause 1.1 added third
- Adding them out of natural order ensures the unsorted state differs from the sorted result.

### Reset And Cleanup

- Clear all localStorage before the test via `clearLocalStorage(page)`.
- Reload to start from a clean state.

### Preferred Selectors

- Column header sort button: `page.locator('th button').filter({ hasText: 'Clause #' })`
- Table rows: `page.locator('tbody tr')`
- Row at position: `rows.first()`, `rows.nth(1)`, `rows.last()`

### Automated Steps

1. Navigate to `/` and clear localStorage.
2. Create a contract.
3. Add clause 10.1 (topic "Ten", issue "Ten issue").
4. Add clause 2.1 (topic "Two", issue "Two issue").
5. Add clause 1.1 (topic "One", issue "One issue").
6. Click the "Clause #" column header button to sort ascending.
7. Assert first row contains "1.1", second row contains "2.1", last row contains "10.1".
8. Click the "Clause #" column header button again to sort descending.
9. Assert first row contains "10.1", second row contains "2.1", last row contains "1.1".

### Assertions

- Ascending sort: row order is 1.1 → 2.1 → 10.1 (natural numeric, not lexicographic).
- Descending sort: row order is 10.1 → 2.1 → 1.1.
- Row 2 (index 1) contains "2.1" in both directions, confirming 2.1 is between 1.1 and 10.1.

### Technical Risks

- `toContainText` on a row checks the entire row text, not just the clause number cell. If topics or issues contain the matching number, the assertion could produce a false positive. Mitigated by choosing topics and issues that do not contain clause numbers.
- The column header sort button is a plain `<button>` inside a `<th>`. If the column is not visible (toggled off via column config), the locator will not find it. The default column config has clauseNumber visible.

### Readiness

Status: `ready`

---

## CNT-FLT-005 - Add Custom Owner Persists in LocalStorage

### Related Case

`Docs/qa/modules/filters/cases.md` — CNT-FLT-005

### Automation Objective

Verify that a new owner added through the FilterBar owner dropdown is immediately available as an option and persists in localStorage so it survives a page reload.

### Layer

Future E2E — Playwright

### Data And Setup

- One contract (owner dropdown only appears when a contract is active).
- New owner name: "External Counsel".
- `negotiation-tracker-owners` localStorage key must start empty (handled by `clearLocalStorage`).

### Reset And Cleanup

- Clear all localStorage before the test via `clearLocalStorage(page)`.
- Reload to start from a clean state.
- After the test, the owner persists in localStorage; the next `beforeEach` clears it.

### Preferred Selectors

- Owner filter combobox: `page.getByRole('combobox').filter({ hasText: 'All Owners' })`
- "Add new..." option: `page.getByRole('option', { name: /add new/i })`
- Dialog: `page.getByRole('dialog')`
- Owner name input: `page.fill('#new-owner-name', ...)`
- Add Owner button: `page.getByRole('button', { name: 'Add Owner' })`
- Option after adding: `page.getByRole('option', { name: 'External Counsel' })`

### Automated Steps

1. Navigate to `/` and clear localStorage.
2. Create a contract.
3. Click the Owner filter combobox (showing "All Owners").
4. Click "Add new..." option.
5. Assert the Add New Owner dialog is visible.
6. Fill `#new-owner-name` with "External Counsel".
7. Click "Add Owner".
8. Assert the dialog closes.
9. Evaluate `localStorage.getItem('negotiation-tracker-owners')` and assert it contains "External Counsel".
10. Open the Owner filter combobox again and assert "External Counsel" appears as an option.
11. Press Escape to close the dropdown.
12. Reload the page and wait for `networkidle`.
13. Open the Owner filter combobox again.
14. Assert "External Counsel" is still present as an option.

### Assertions

- Dialog appears when "Add new..." is clicked.
- Dialog closes after "Add Owner" is clicked.
- `negotiation-tracker-owners` in localStorage contains the new owner name.
- The owner option is available in the dropdown before reload.
- The owner option is still available after reload.

### Technical Risks

- After adding an owner, the Select's value does not change (it stays "All Owners"). The combobox must be re-opened manually to verify the option.
- If the "Add new..." option uses a special sentinel value (`__add_new__`), the Select `onValueChange` fires but does not update `filterState`. The owner is only stored in React state and localStorage via `addOwner`. This is expected behavior.
- After reload, the `NegotiationContext` reads `negotiation-tracker-owners` from localStorage on initialization. If that read fails silently, the owner would not appear. This would be a product bug, not a test issue.

### Readiness

Status: `ready`

---

## CNT-FLT-006 - Empty State Display for Zero Results

### Related Case

`Docs/qa/modules/filters/cases.md` — CNT-FLT-006

### Automation Objective

Verify that when active filters produce no matching clauses, the empty state graphic and message are shown instead of an empty table body. Verify that clearing the filter restores the clause row.

### Layer

Future E2E — Playwright

### Data And Setup

- One contract with one clause.
- Search term that guarantees no match: "xyz123abc_notfound".

### Reset And Cleanup

- Clear all localStorage before the test via `clearLocalStorage(page)`.
- Reload to start from a clean state.

### Preferred Selectors

- Search input: `page.getByPlaceholder('Search clauses...')`
- Empty state heading: `page.getByText('No clauses found')`
- Empty state detail: `page.getByText('Try adjusting your filters to see more results.')`
- Clause number after restore: `page.getByText('1.1')`

### Automated Steps

1. Navigate to `/` and clear localStorage.
2. Create a contract.
3. Add clause 1.1 with topic "Test Clause" and issue "Test issue summary".
4. Assert clause 1.1 is visible.
5. Fill search input with "xyz123abc_notfound".
6. Assert "No clauses found" heading is visible.
7. Assert "Try adjusting your filters to see more results." is visible.
8. Assert clause 1.1 is not visible.
9. Clear the search input.
10. Assert clause 1.1 is visible again.
11. Assert "No clauses found" is no longer visible.

### Assertions

- When filter produces zero results: empty state heading and detail text appear.
- Clause row is not present during empty state.
- After clearing the search: clause row reappears and empty state disappears.
- The empty state text distinguishes between "no clauses exist" and "filters are active" — this test specifically exercises the filter-induced empty state path.

### Technical Risks

- The empty state has two distinct messages depending on whether `activeContract.items.length === 0` or `filteredItems.length === 0`. This test requires at least one clause to exist so the filter-specific message is shown. If the clause is not created correctly, the wrong empty state message would appear.
- The search filter runs synchronously in React (useMemo), so no async wait between typing and asserting should be needed beyond Playwright's default retry.

### Readiness

Status: `ready`
