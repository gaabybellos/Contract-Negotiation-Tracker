# Discovery - Contracts

## Current Facts

- Contracts are typed in `client/src/types/index.ts`.
- Contract CRUD and persistence are handled by `client/src/hooks/useContracts.ts`.
- New contracts include name, counterparty, description, paper source, status, ball-in-court, timestamps, items, and timeline.
- Contracts persist in `negotiation-tracker-contracts`.

## Risks

- Contract state is localStorage-based and requires deterministic reset for future automation.
- Paper source affects clause labels and the 3-text model interpretation.

## Gaps

- Confirm accessible names and stable selectors during future automation discovery.

