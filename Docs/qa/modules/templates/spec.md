# Spec - Templates

## CNT-TPL-001 - Create A Contract From A Template

### Related Case

`Docs/qa/modules/templates/cases.md#cnt-tpl-001---create-a-contract-from-a-template`

### Automation Scope

Future E2E coverage for creating a contract from a template and validating clause mapping.

### Setup And Cleanup

- Seed or create one template with one template clause.
- Clear `negotiation-tracker-templates`, `negotiation-tracker-templates-version`, `negotiation-tracker-contracts`, and `negotiation-tracker-contracts-version` before and after the test.
- Prefer direct UI creation in E2E if stable; use localStorage seeding only if setup becomes too slow or brittle.

### Preferred Selectors

- Prefer role/name selectors for Templates, New Template, Create From Template, contract name, counterparty, and submit actions.
- Use template and contract names as supporting assertions.
- Validate exact flow with Playwright MCP before implementation.

### Steps

1. Open template library.
2. Create or select a prepared template.
3. Start contract creation from template.
4. Fill new contract data.
5. Submit.
6. Open the created contract.
7. Assert template-derived clause exists.
8. Assert 3-text field mapping in localStorage.

### Assertions

- New contract exists in `negotiation-tracker-contracts`.
- Contract paper source is `ours`.
- Derived clause includes template baseline text.
- Derived clause includes `templateId` and `templateClauseId` when created through the contract-from-template hook.
- `theirPosition` and `ourPosition` follow the implementation rule.

### Risks

- Exact UI route for contract-from-template must be confirmed.
- Template-related compile blocker categories should be fixed before automation.
- Document import should remain out of this first template case.

### Readiness Status

Status: blocked until compile blockers are fixed and the template-to-contract UI path is validated.

