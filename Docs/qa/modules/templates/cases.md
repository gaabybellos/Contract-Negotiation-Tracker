# Cases - Templates

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

- Spec: `Docs/qa/modules/templates/spec.md#cnt-tpl-001---create-a-contract-from-a-template`
- Future test: not created in this phase.

### Known Limitations

- The exact UI path for creating a contract from template must be confirmed during runtime exploration.
- Template type mismatches are included in current compile blocker risks.

