# QA AI First Knowledge Base

This folder contains the standalone QA structure for Contract Negotiation Tracker.

## Purpose

The goal is to make QA work traceable before automation starts. The repository should show how product understanding becomes test cases, how test cases become automation specs, and how future execution results are classified.

## Official Flow

```text
qa-cycle -> project-discovery -> test-planner -> test-generator -> test-runner -> test-healer
```

## Core Rule

No executable automated test should be created before there is:

1. discovery;
2. a documented test case;
3. an automation spec;
4. a clear execution and reporting path.

## Routing

Use `Docs/qa/module-map.md` before writing module artifacts.

## Phase Boundary

This phase created governance and documentation only. It intentionally did not install dependencies, create Playwright files, create executable tests, or fix current TypeScript errors.

