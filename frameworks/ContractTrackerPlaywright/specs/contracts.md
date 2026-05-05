# Specs - Contracts

This file summarises the automation spec for contract management.
The full spec lives in `Docs/qa/modules/contracts/spec.md` and `Docs/qa/automation-specs.md`.

## Covered by tests

| Case ID | Test file | Status |
|---|---|---|
| CNT-CTR-001 | `tests/contract-crud.spec.ts` | Implemented |

## CNT-CTR-001 Summary

Create a contract with valid data, confirm it is active, reload the page, confirm data persists in localStorage.

Setup: clear `negotiation-tracker-contracts` and `negotiation-tracker-contracts-version` before the test.

Key assertions:
- contract name visible in the active contract area;
- clause area visible after contract creation;
- contract data in `negotiation-tracker-contracts` after reload.
