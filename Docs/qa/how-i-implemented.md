# How I Implemented The QA Structure

## Context

Contract Negotiation Tracker already had a substantial product implementation, including the 3-text model for contract clause negotiation. The QA work therefore starts by documenting existing behavior and risks instead of rediscovering the 3-text model as if it were missing.

## What This Phase Created

This phase intentionally created structure only, not tests.

Created areas:

- `AGENTS.md` for repository-level QA governance;
- `.codex/agents/` with the QA AI First agent contracts;
- `.claude/agents/` with materially synchronized agent contracts;
- `skills/project-discovery/` for reverse-engineering guidance;
- `skills/qa-automation/` for future automation guidance;
- `Docs/qa/` as the QA knowledge base;
- `Docs/qa/templates/` for test case, automation spec, and execution report templates;
- `Docs/qa/modules/` for module-level discovery, cases, and specs;
- `Docs/qa/executions/` for future execution reports.

## Why This Structure

The structure enforces the path:

```text
discovery -> test case -> automation spec -> future test -> execution report
```

This reduces the risk of automating behavior before the product is understood.

## How Modules Were Defined

Modules were derived from the README, existing Docs, TypeScript types, custom hooks, context, and major UI components.

Initial modules:

- contracts;
- clauses;
- comparison;
- filters;
- versions;
- templates;
- import/export;
- timeline;
- playbook;
- settings.

## Final Phase Updates

During the final phase, the QA structure was expanded to include active execution:

- installed and configured Playwright testing framework isolated in `frameworks/ContractTrackerPlaywright`;
- implemented E2E tests for `contract-crud.spec.ts` (CNT-CTR-001) and `clause-3text-comparison.spec.ts` (CNT-CLA-001, CNT-CMP-001);
- implemented unit tests for text diffing in `client/src/lib/textDiff.test.ts`;
- successfully ran tests and generated execution reports in `Docs/qa/executions/`.

Note: TypeScript errors identified during static analysis (`pnpm check`) in `ComparisonModal.tsx` and `sampleData.ts` were properly classified as product type mismatches and documented without blocking the UI E2E test execution.

