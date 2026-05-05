---
name: project-discovery
description: Reverse engineer Contract Negotiation Tracker before planning or automating tests.
---

# Project Discovery

## Purpose

Use this skill to understand the real product before creating test cases, automation specs, or executable tests.

## Required Sources

- `README.md`
- `package.json`
- `Docs/3-text-model-analysis.md`
- `Docs/qa/module-map.md`
- `client/src/types/index.ts`
- `client/src/hooks/useContracts.ts`
- `client/src/hooks/useTemplates.ts`
- `client/src/hooks/usePlaybook.ts`
- `client/src/hooks/useVersionHistory.ts`
- `client/src/contexts/NegotiationContext.tsx`
- `client/src/pages/Home.tsx`

## Method

- Map product domains and user flows.
- Cross-check README, Docs, TypeScript types, hooks, context, UI components, and localStorage.
- Treat the existing 3-text model as implemented behavior and a QA-critical risk.
- Separate fact, inference, and gap.
- Identify observable UI behavior and future automation hooks.

## Do Not

- Do not create executable tests.
- Do not fix product bugs.
- Do not replace the test planner.
- Do not invent business rules without evidence.

## Minimum Output

- domain;
- module;
- flow analyzed;
- flow objective;
- entities involved;
- main fields and actions;
- relevant modals and components;
- localStorage keys;
- risks;
- gaps;
- suggested next cases.
