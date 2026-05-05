# AGENTS.md - Contract Negotiation Tracker

This repository uses a standalone QA AI First workflow for the Contract Negotiation Tracker product.

## Product Role

Contract Negotiation Tracker is a web application for managing contract negotiations. It supports contracts, clauses, a 3-text negotiation model, comparison, version history, templates, playbook guidance, timeline events, import/export, filters, settings, and browser localStorage persistence.

## Official QA Flow

All new automation must follow this sequence:

```text
qa-cycle -> project-discovery -> test-planner -> test-generator -> test-runner -> test-healer
```

Rules:

- Do not create automated tests before discovery, documented cases, and automation specs exist.
- Do not automate a flow without a documented test case.
- Do not use test healing to change product behavior or invent business rules.
- Record known limitations and assumptions.
- Keep generated QA repository content in English.

## Playwright MCP Usage

Playwright MCP is the preferred browser automation surface when an agent needs to inspect the running application, explore real UI behavior, capture evidence, generate or validate locators, debug Playwright flows, or classify browser-level failures.

Rules:

- Playwright MCP supports discovery, validation, locator inspection, and debugging; it does not replace documented cases or automation specs.
- test-generator may use Playwright MCP to validate selectors and user flows after cases and specs exist.
- test-runner may use Playwright MCP evidence to classify failures.
- test-healer may use Playwright MCP only after a failure is classified as technical test breakage.
- CLI execution remains the fallback and the reproducible path for local/CI commands.

## Minimum Traceability

Every automated flow should connect:

1. Discovery in `Docs/qa/reverse-engineering.md`, `Docs/qa/main-flows.md`, or a module `discovery.md`.
2. Test case in `Docs/qa/test-cases.md` or a module `casos.md`.
3. Automation spec in `Docs/qa/automation-specs.md` or a module `spec.md`.
4. Future executable test in the appropriate test layer.
5. Execution report in `Docs/qa/executions/` when relevant.

## Routing Document

Agents must consult `Docs/qa/module-map.md` before writing module discovery, cases, or specs. New modules must be added to the map before module-level files are created.

## Required Templates

Use:

- `Docs/qa/templates/template-test-case.md`
- `Docs/qa/templates/template-automation-spec.md`
- `Docs/qa/templates/template-execution-report.md`

## Test ID Pattern

Use:

```text
CNT-<DOMAIN>-<MODULE>-<ID>
```

Initial prefixes:

- `CNT-CTR`: contracts
- `CNT-CLA`: clauses
- `CNT-CMP`: comparison
- `CNT-FLT`: filters
- `CNT-VER`: versions and rounds
- `CNT-TPL`: templates
- `CNT-IMP`: import
- `CNT-EXP`: export
- `CNT-TML`: timeline
- `CNT-PBK`: playbook
- `CNT-SET`: settings

## Current Phase Boundary

This phase creates governance and documentation only. It does not install dependencies, create Playwright files, create executable tests, or fix existing TypeScript errors.

