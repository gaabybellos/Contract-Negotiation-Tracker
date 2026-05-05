# Cases - Clauses

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

- Spec: `Docs/qa/modules/clauses/spec.md#cnt-cla-001---add-a-clause-with-baselinetext-theirposition-and-ourposition`
- Future test: not created in this phase.

### Known Limitations

- Required field behavior should be confirmed at runtime.
- Table columns and accessible controls need locator validation.
- Current compile blockers should be fixed before Playwright automation.

