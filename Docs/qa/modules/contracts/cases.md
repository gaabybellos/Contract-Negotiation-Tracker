# Cases - Contracts

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
- Docs: `Docs/qa/main-flows.md`, `Docs/qa/modules/contracts/discovery.md`.
- Code: `client/src/hooks/useContracts.ts`, `client/src/types/index.ts`, `client/src/pages/Home.tsx`.
- localStorage: `negotiation-tracker-contracts`, `negotiation-tracker-contracts-version`.

### localStorage Expectations

- `negotiation-tracker-contracts` contains a contract with the provided name and counterparty.
- The contract contains an empty `items` array and a `timeline` entry for creation.
- `negotiation-tracker-contracts-version` exists.

### Automation Link

- Spec: `Docs/qa/modules/contracts/spec.md#cnt-ctr-001---create-a-contract-with-valid-data-and-persist-it-after-reload`
- Future test: not created in this phase.

### Known Limitations

- Stable selectors and accessible names must be confirmed during future UI validation.
- Browser automation should wait until current compile blockers are fixed.

