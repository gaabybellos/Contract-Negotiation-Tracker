# Technical Reading Reference

Use this reading order for technical discovery:

1. `README.md` for product promise and user-facing features.
2. `Docs/3-text-model-analysis.md` for model rationale.
3. `package.json` for stack, scripts, package manager, and test dependencies.
4. `client/src/types/index.ts` for entities and enums.
5. `client/src/contexts/NegotiationContext.tsx` for global state and exposed actions.
6. `client/src/hooks/useContracts.ts` for contract, clause, timeline, import, and persistence behavior.
7. `client/src/hooks/useTemplates.ts` for template persistence and CRUD.
8. `client/src/hooks/usePlaybook.ts` for playbook behavior.
9. `client/src/hooks/useVersionHistory.ts` for snapshots, rounds, and restore.
10. `client/src/pages/Home.tsx` and relevant components for observable UI flows.

Record facts, inferences, and gaps separately.
