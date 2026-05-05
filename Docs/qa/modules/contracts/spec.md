# Spec - Contracts

## CNT-CTR-001 - Create A Contract With Valid Data And Persist It After Reload

### Related Case

`Docs/qa/modules/contracts/cases.md#cnt-ctr-001---create-a-contract-with-valid-data-and-persist-it-after-reload`

### Automation Scope

Future E2E coverage for contract creation, active contract display, and persistence after reload.

### Setup And Cleanup

- Start the app in a clean browser context.
- Before the test, clear `negotiation-tracker-contracts` and `negotiation-tracker-contracts-version`.
- After the test, clear contract-related keys.

### Preferred Selectors

- Prefer role/name selectors for Create Contract, dialog fields, Paper Source options, and submit button.
- Use stable text selectors for the created contract name only as supporting assertions.
- Add test IDs later only if accessible selectors are not stable.

### Steps

1. Navigate to the application.
2. Open Create Contract.
3. Fill contract fields.
4. Select `Our Paper`.
5. Submit.
6. Assert active contract UI.
7. Reload.
8. Assert persisted contract UI and localStorage data.

### Assertions

- Contract name and counterparty appear in the UI.
- Contract is stored in `negotiation-tracker-contracts`.
- Contract has status `active`, paper source `ours`, and one creation timeline event.
- Data remains after reload.

### Risks

- Accessible names must be validated.
- localStorage version logic may reset data if version keys are not managed correctly.
- Compile blockers should be fixed before running browser automation.

### Readiness Status

Status: blocked until compile blockers are fixed and selectors are validated.

