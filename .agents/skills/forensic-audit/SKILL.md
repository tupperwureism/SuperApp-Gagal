---
name: forensic-audit
description: Forensic 360-degree line-by-line verification audit to ensure zero missing entities, rules, or edge cases before declaring completion or phase transition.
---

# Forensic Self-Audit ("Eagle-Eye / Forget-Less System")

Execute this rigorous self-audit automatically before declaring any phase, artifact, or batch "100% complete" or asking the user for sign-off. Never rely on macro-level memory abstractions or general summaries.

## 1. Source Enumeration & Master File Discovery
- Enumerate all upstream master specification files (e.g., Use Cases, Mockup Logic Lists, Compliance Matrices, or architectural contracts).
- Open and inspect the actual physical contents of the upstream files rather than relying on context window summaries.

## 2. Micro Line-by-Line Mapping Loop
- For every functional component, table row, input field, API contract, or hardening rule discovered in the upstream master files:
  1. Trace where it lands in the downstream deliverable (e.g., ERD, sequence diagram, or code).
  2. Verify if its constraints (data types, invariants, thresholds, timeouts) are explicitly represented.
  3. Flag any missing entity, unhandled edge-case, or omitted hardening rule immediately.

## 3. Verification Matrix Proof
- Present a concrete 1-to-1 verification table (`Source Spec / Mockup` -> `Target Entity / Component` -> `Verification Status`) to the user.
- Explicitly highlight any newly uncovered items during the audit so the user sees complete transparency.

## 4. Zero-Omission Certification Gate
- Only declare "100% Complete" or "Ready for Next Phase" when the Verification Matrix shows zero omissions (`0 missing items / 0 gaps`).
- If even one item was missing and added during the audit, declare what was fixed before certifying readiness.
