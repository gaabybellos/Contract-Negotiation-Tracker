# Discovery - Filters

**Domain and Module:** Contract Negotiation Tracker - Filters

**Flow Objective:** Reverse engineer how the application filters, sorts, and summarizes clause items within the active contract, and understand the components responsible for these functions.

## Code Evidence
- `client/src/contexts/NegotiationContext.tsx` holds `filterState` and `sortState`, and computes `filteredItems` dynamically from `activeContract.items`.
- `client/src/components/FilterBar.tsx` exposes the UI to manipulate `filterState` and triggers data export functionalities. It also allows adding custom owners dynamically.
- `client/src/components/ClauseTable.tsx` consumes `filteredItems`, renders columns based on `visibleColumns`, triggers sorting on header click, and displays an empty state when `filteredItems` is empty.
- `client/src/components/DashboardStats.tsx` computes statistics using `activeContract.items` (the raw list, not `filteredItems`) and allows clicking on status cards to set the status filter via an `onStatusFilter` callback.

## Central Functional Rules (Facts)
- The `search` field acts as a broad text filter that looks for case-insensitive matches across `clauseNumber`, `issue`, `baselineText`, `theirPosition`, `ourPosition`, and `rationale`.
- Filter parameters support combining multiple criteria: `status`, `priority`, `owner`, `impactCategory`, and `riskLevel`.
- Sorting is limited to a single column at a time, toggling between ascending and descending. 
- Sorting for `clauseNumber` explicitly uses natural numeric string comparison (`localeCompare` with `numeric: true`), ensuring "2.1" comes before "10.1".
- `DashboardStats` computations are independent of the current filter state. The dashboard always shows the statistics for the entire contract.
- Clicking on a `DashboardStats` card sets the `status` filter to the card's value.

## Data and LocalStorage Involved
- Filter and sort configurations are ephemeral (kept in React memory via `useState`) and do not persist across reloads.
- `negotiation-tracker-owners` is stored in `localStorage` to persist custom owners added through the FilterBar.

## UI Observables
- A "Clear Filters" button appears dynamically in the `FilterBar` when any filter parameter deviates from its default state.
- Table headers display `ChevronUp` or `ChevronDown` icons to indicate the active sort column and direction.
- An empty state (an image with specific placeholder text) is shown when active filters result in zero matching clauses.

## Risks
- **State Loss:** Since filters and sorting states are not synchronized with the URL parameters or `localStorage`, any page refresh will reset the user's filtered view to the default state.
- **Data Scaling:** Adding numerous custom owners could bloat the `negotiation-tracker-owners` key in `localStorage` and make the owner dropdown difficult to navigate over time.

## Gaps (Inferences)
- **Dashboard Synchronization:** Because the DashboardStats are based on all contract items, filtering the table does not update the dashboard numbers. Users might incorrectly assume the stats reflect their current filtered view.
- **Link Sharing:** The inability to serialize filters into the URL prevents users from sharing a link to a specific filtered list of clauses.
