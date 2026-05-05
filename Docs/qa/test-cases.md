# Test Cases

This file consolidates the first planned QA cases for Contract Negotiation Tracker. Module-specific copies live under `Docs/qa/modules/<module>/cases.md`.

## CNT-CTR-001 - Create A Contract With Valid Data And Persist It After Reload

Domain: contracts  
Module: contracts  
Priority: High  
Type: Functional, Regression  
Layer: Future E2E  
Status: Planned

### Objective

Verify that a user can create a contract with valid data, make it the active contract, and keep it available after a browser reload.

### Preconditions

- The application is running in a browser.
- localStorage is clean or reset for contract-related keys.
- Current TypeScript compile blockers are known and tracked separately before future automation.

### Test Data

- Contract name: `QA Services Agreement`
- Counterparty: `Acme Legal Operations`
- Description: `Synthetic contract created for QA planning`
- Paper source: `Our Paper`

### Steps

1. Open the application.
2. Start the new contract flow from the empty state or header.
3. Fill in contract name, counterparty, description, and paper source.
4. Submit the form.
5. Confirm the created contract is active.
6. Reload the browser.
7. Confirm the same contract is still available and active or selectable.

### Expected Result

- The contract is created with the provided data.
- The contract becomes the active contract.
- The contract has active status and an initial timeline event.
- After reload, the contract data remains available from localStorage.

### UI Observables

- New contract dialog or form is visible.
- Created contract name appears in the active contract area.
- Contract status bar or header reflects the selected contract.
- Clause area is available after contract creation.

### Technical Evidence

- README: describes multi-contract tracking and creating a first contract.
- Docs: `Docs/qa/main-flows.md` describes the Create Contract flow.
- Code: `client/src/hooks/useContracts.ts`, `client/src/types/index.ts`, `client/src/pages/Home.tsx`.
- localStorage: `negotiation-tracker-contracts`, `negotiation-tracker-contracts-version`.

### localStorage Expectations

- `negotiation-tracker-contracts` contains a contract with the provided name and counterparty.
- The contract contains an empty `items` array and a `timeline` entry for creation.
- `negotiation-tracker-contracts-version` exists.

### Automation Link

- Consolidated spec: `Docs/qa/automation-specs.md#cnt-ctr-001---create-a-contract-with-valid-data-and-persist-it-after-reload`
- Module spec: `Docs/qa/modules/contracts/spec.md#cnt-ctr-001---create-a-contract-with-valid-data-and-persist-it-after-reload`
- Future test: not created in this phase.

### Known Limitations

- Stable selectors and accessible names must be confirmed during future UI validation.
- Browser automation should wait until current compile blockers are fixed.

## CNT-CLA-001 - Add A Clause With baselineText, theirPosition, And ourPosition

Domain: clauses  
Module: clauses  
Priority: High  
Type: Functional, Regression  
Layer: Future E2E  
Status: Planned

### Objective

Verify that a user can add a clause using the implemented 3-text model and that all three text fields are persisted.

### Preconditions

- A valid active contract exists.
- localStorage is clean or controlled.
- Paper source is known because it changes field labels.

### Test Data

- Clause number: `5.1`
- Topic: `Limitation of Liability`
- Issue: `Counterparty requests uncapped liability`
- Baseline text: `Each party's total liability is limited to fees paid in the twelve months before the claim.`
- Their position: `Supplier's liability is uncapped for all claims.`
- Our position: `Liability remains capped except for confidentiality, data protection, and willful misconduct.`
- Round: `1`
- Status: `In Discussion`
- Priority: `High`
- Owner: `Legal`
- Risk level: `high`

### Steps

1. Open a contract.
2. Click Add Clause.
3. Fill clause number, topic, round, status, priority, owner, risk level, issue, and rationale if needed.
4. Fill `baselineText`, `theirPosition`, and `ourPosition`.
5. Save the clause.
6. Confirm the clause appears in the clause list.
7. Open the clause view or edit flow.
8. Confirm the three text fields were saved.
9. Reload the browser and confirm the clause remains.

### Expected Result

- A new clause is added to the active contract.
- The three text values are stored without being swapped or dropped.
- Clause metadata is stored with the clause.
- Reload does not remove the clause.

### UI Observables

- Add Clause form opens.
- Dynamic labels reflect the selected paper source.
- Saved clause appears in the clause table.
- View or edit modal shows baseline, counterparty position, and our position.

### Technical Evidence

- README: describes clause-by-clause tracking and the 3-text model.
- Docs: `Docs/3-text-model-analysis.md`, `Docs/qa/modules/clauses/discovery.md`.
- Code: `client/src/components/ClauseForm.tsx`, `client/src/hooks/useContracts.ts`, `client/src/types/index.ts`.
- localStorage: `negotiation-tracker-contracts`.

### localStorage Expectations

- The active contract in `negotiation-tracker-contracts` contains one `items` entry.
- The clause item contains `baselineText`, `theirPosition`, and `ourPosition` with the entered values.
- The clause includes metadata such as status, priority, owner, risk level, and current round.

### Automation Link

- Consolidated spec: `Docs/qa/automation-specs.md#cnt-cla-001---add-a-clause-with-baselinetext-theirposition-and-ourposition`
- Module spec: `Docs/qa/modules/clauses/spec.md#cnt-cla-001---add-a-clause-with-baselinetext-theirposition-and-ourposition`
- Future test: not created in this phase.

### Known Limitations

- Required field behavior should be confirmed at runtime.
- Table columns and accessible controls need locator validation.
- Current compile blockers should be fixed before Playwright automation.

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

- Consolidated spec: `Docs/qa/automation-specs.md#cnt-cmp-001---compare-baseline-against-counterparty-position`
- Module spec: `Docs/qa/modules/comparison/spec.md#cnt-cmp-001---compare-baseline-against-counterparty-position`
- Future test: not created in this phase.

### Known Limitations

- `ComparisonModal.tsx` currently has known compile-blocker categories and should be fixed before browser automation.
- Unit coverage for `textDiff` should be planned separately before or alongside E2E.
- Exact diff tokenization should be confirmed before writing strict assertions.

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

- Consolidated spec: `Docs/qa/automation-specs.md#cnt-flt-001---filter-clauses-by-status`
- Module spec: `Docs/qa/modules/filters/spec.md#cnt-flt-001---filter-clauses-by-status`
- Future test: not created in this phase.

### Known Limitations

- Selector strategy for filter controls must be confirmed.
- Dashboard-driven status filtering should be covered by a separate case if behavior differs from FilterBar.

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

- Consolidated spec: `Docs/qa/automation-specs.md#cnt-ver-001---save-a-clause-version-snapshot`
- Module spec: `Docs/qa/modules/versions/spec.md#cnt-ver-001---save-a-clause-version-snapshot`
- Future test: not created in this phase.

### Known Limitations

- Compile blockers indicate a mismatch between UI references and the current `ClauseVersion` type.
- Restore behavior should be covered by a separate case after snapshot saving is stable.

## CNT-TPL-001 - Create A Contract From A Template

Domain: templates  
Module: templates  
Priority: Medium  
Type: Functional, Regression  
Layer: Future E2E  
Status: Planned

### Objective

Verify that a user can create a contract from a template and that template clauses map into contract clauses with expected 3-text defaults.

### Preconditions

- At least one template exists with one or more template clauses.
- Template flow is reachable from the application header or template library.
- localStorage is clean or controlled.

### Test Data

- Template name: `QA SaaS Template`
- Template clause number: `9.1`
- Template clause topic: `Confidentiality`
- Template baseline text: `Each party must protect confidential information.`
- New contract name: `QA Template-Based Agreement`
- Counterparty: `Beta Procurement`

### Steps

1. Open the template library.
2. Create or select the prepared template.
3. Start the create-contract-from-template flow.
4. Fill the new contract name and counterparty.
5. Submit the flow.
6. Open the new contract.
7. Confirm the template clause appears as a contract clause.
8. Confirm the clause has expected 3-text defaults.

### Expected Result

- A new contract is created from the selected template.
- The contract uses paper source `ours` when created from a template.
- Template clauses are copied into contract clauses.
- Template baseline text maps to contract `baselineText`.
- Initial `theirPosition` starts from the baseline and `ourPosition` is empty or follows the implementation rule.

### UI Observables

- Template library is visible.
- Template card or row is visible.
- Create-from-template action is available.
- New contract appears as active or selectable.
- Clause table shows the template-derived clause.

### Technical Evidence

- README: describes template-based contracts and template management.
- Docs: `Docs/qa/modules/templates/discovery.md`.
- Code: `client/src/hooks/useTemplates.ts`, `client/src/hooks/useContracts.ts`, `client/src/components/TemplatesPage.tsx`, `client/src/components/NewContractFromTemplateDialog.tsx`.
- localStorage: `negotiation-tracker-templates`, `negotiation-tracker-contracts`.

### localStorage Expectations

- `negotiation-tracker-templates` contains the source template when manually created.
- `negotiation-tracker-contracts` contains the new contract.
- The new contract contains an `items` entry derived from the template clause.
- The derived clause includes `templateId` and `templateClauseId` when created through `createContractFromTemplate`.

### Automation Link

- Consolidated spec: `Docs/qa/automation-specs.md#cnt-tpl-001---create-a-contract-from-a-template`
- Module spec: `Docs/qa/modules/templates/spec.md#cnt-tpl-001---create-a-contract-from-a-template`
- Future test: not created in this phase.

### Known Limitations

- The exact UI path for creating a contract from template must be confirmed during runtime exploration.
- Template type mismatches are included in current compile blocker risks.

