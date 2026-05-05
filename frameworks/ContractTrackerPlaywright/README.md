# Contract Tracker Playwright E2E Tests

This is the dedicated internal Playwright test repository for the Contract Negotiation Tracker product.
It follows the QA AI First methodology.

## Structure
- `specs/`: Automation specifications
- `support/`: Reusable helpers (storage, selectors, data)
- `tests/`: Executable E2E specs

## Commands
- `pnpm test`: Run all tests headlessly
- `pnpm test:ui`: Run tests in UI mode
- `pnpm report`: Show test report

Note: Playwright MCP is used as inspection/debugging support, but CLI is the reproducible execution path.
