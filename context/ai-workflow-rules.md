# AI Workflow Rules

These rules define how an AI coding agent must behave while working on this project. They are strict execution constraints, not suggestions.

---

## 1. Overall Approach

- Follow a **spec-first, implementation-second** workflow at all times.
- Do not write code without first understanding the full scope of the unit being implemented.
- Build the system incrementally in small, verifiable units.
- Treat every feature as a standalone deliverable that integrates into the existing system.

---

## 2. Scoping Rules

- Work on only **one feature unit at a time**.
- Do not implement multiple unrelated features in a single change set.
- Do not introduce speculative features, optimizations, or abstractions.
- Do not refactor unrelated code while implementing a feature unless explicitly instructed.
- Only modify files directly relevant to the current unit of work.

---

## 3. Incremental Development Rules

- Always break complex features into smaller steps before implementation.
- Each step must be independently testable or verifiable.
- If a feature requires more than 3 logical parts, split it into sub-tasks before coding.
- Never attempt full system implementation in a single pass.

---

## 4. Handling Missing or Ambiguous Requirements

- If any requirement is unclear, stop and request clarification.
- Do not guess business logic for core flows (auth, orders, payments, role access).
- If ambiguity exists:
  - propose 2–3 possible interpretations
  - wait for confirmation before implementation
- If a decision affects data models or architecture, it must be explicitly confirmed.

---

## 5. File Modification Rules

- Do NOT modify generated or third-party UI components (e.g. shadcn/ui source files).
- Do NOT modify configuration files unless explicitly instructed.
- Do NOT refactor folder structure without prior approval.
- Only modify:
  - feature-related source files
  - services, controllers, models, routes
  - frontend pages/components tied to current feature

---

## 6. Data Safety Rules

- Never delete or overwrite existing database models without migration planning.
- Never change schema fields that affect existing features without explicit instruction.
- Always preserve backward compatibility unless system reset is explicitly requested.

---

## 7. Documentation Sync Rules

- Every implemented feature must update relevant documentation if it changes:
  - API behavior
  - data models
  - system flow
- If a new rule or constraint is introduced, it must be reflected in:
  - architecture.md (if structural)
  - code-standards.md (if behavioral)
- Documentation must never lag behind implementation.

---

## 8. Verification Before Moving to Next Unit

Before completing any task, the following must be verified:

### Functional Verification

- Feature works end-to-end in isolation
- No broken routes or missing handlers
- No unhandled errors in service logic

### Data Verification

- Correct data is stored in MongoDB
- No missing or inconsistent fields
- Snapshots (e.g. order pricing) are correctly frozen

### Access Control Verification

- Role-based access is enforced
- Ownership checks are applied where required

### Integration Verification

- Feature integrates cleanly with existing APIs
- No breaking changes introduced to unrelated modules

---

## 9. State Management Rules (Backend + Frontend)

- Backend must remain stateless except for database operations.
- Frontend state must not replace backend validation.
- Never rely on frontend for security-critical decisions.

---

## 10. Order of Execution Rules

- Implement backend before frontend integration for any feature.
- Implement models → services → controllers → routes in that order.
- Frontend integration only begins after API is fully functional.

---

## 11. Failure Handling Rules

- If a bug or inconsistency is discovered:
  - stop current work
  - identify root cause
  - fix at source level (not patch workaround)
- Do not stack temporary fixes.

---

## 12. Code Quality Rules

- Keep functions small and single-purpose.
- Avoid deeply nested logic (>3 levels).
- Prefer explicit logic over hidden abstraction.
- All async operations must be properly handled with try/catch or centralized error middleware.

---
