# Cases - Versions

## CNT-VER-001 - Save A Clause Version Snapshot

Domain: versions  
Module: versions  
Priority: High  
Type: Functional, Regression  
Layer: Future E2E  
Status: Planned

### Objective

Verify that a user can save a version snapshot for a clause and that the snapshot preserves the implemented 3-text model with round and party metadata.

### Preconditions

- A contract exists with one clause containing `baselineText`, `theirPosition`, and `ourPosition`.
- The comparison modal or version history UI is available.
- TypeScript compile blockers involving `ClauseVersion` and `ComparisonModal.tsx` are fixed before automation execution.

### Test Data

- Version label: `Round 1 - Their Proposal`
- Party: `Their Proposal`
- Round: `1`
- Baseline text: `Confidential information must be protected for three years.`
- Their position: `Confidential information must be protected for one year.`
- Our position: `Confidential information must be protected for five years.`

### Steps

1. Open the clause comparison or version history UI.
2. Navigate to the Versions tab.
3. Enter the version label.
4. Select party attribution.
5. Set or confirm the round.
6. Save the version.
7. Confirm the version appears in the version list.
8. Expand or view the saved version details.

### Expected Result

- A new version appears in the clause version history.
- The version includes label, round, party, timestamp, and status if available.
- The version preserves baseline, counterparty position, and our position.

### UI Observables

- Versions tab is visible.
- Save Version action is available.
- Version list count increases.
- Version detail displays the three text snapshots.
- Round and party badges are visible when provided.

### Technical Evidence

- README: describes version history, round tracking, party attribution, and restore.
- Docs: `Docs/qa/modules/versions/discovery.md`.
- Code: `client/src/hooks/useVersionHistory.ts`, `client/src/components/ComparisonModal.tsx`, `client/src/types/index.ts`.
- localStorage: `negotiation-tracker-contracts`.

### localStorage Expectations

- The relevant clause item in `negotiation-tracker-contracts` contains a `versions` array.
- The new version contains `baselineText`, `theirPosition`, `ourPosition`, `round`, `party`, `label`, and `timestamp`.

### Automation Link

- Spec: `Docs/qa/modules/versions/spec.md#cnt-ver-001---save-a-clause-version-snapshot`
- Future test: not created in this phase.

### Known Limitations

- Compile blockers indicate a mismatch between UI references and the current `ClauseVersion` type.
- Restore behavior should be covered by a separate case after snapshot saving is stable.

