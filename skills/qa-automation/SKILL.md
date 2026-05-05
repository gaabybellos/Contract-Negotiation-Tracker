---
name: qa-automation
description: Guide future automation work for Contract Negotiation Tracker after discovery, cases, and specs exist.
---

# QA Automation

## Purpose

Use this skill only after discovery, test cases, and automation specs are documented.

## Rules

- Do not create executable tests without traceability.
- Do not install dependencies during documentation-only phases.
- Do not create Playwright files until the automation phase is explicitly started.
- Prefer accessible selectors and stable product behavior.
- Keep test data synthetic.
- Document localStorage setup and cleanup.

## Automation Readiness Checklist

- Discovery exists.
- Test case exists.
- Automation spec exists.
- Current compile blockers are understood or resolved.
- Test data and reset strategy are defined.
- Expected UI observables are defined.
