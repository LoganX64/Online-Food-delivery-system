# Code Standards

## General

- Keep modules small, single-purpose, and easy to reason about.
- Always prefer fixing the root cause instead of adding workaround logic.
- Do not mix unrelated responsibilities in a single controller, service, or component.
- Business logic must be isolated in service layers (backend) and not leaked into routes or UI components.
- Keep data flow explicit and predictable from request → validation → service → response.
- Avoid duplication of logic; reuse shared utilities and services.
- Every feature should be traceable from API → service → database change.
- do not hardcode any api endpoints directly inside pages  
- instead use /api/../ from env variables.
- do no expose any api key on frontend UI or expose to internet.
---

## TypeScript / Node.js (Backend)

- Use **TypeScript** consistently across the project.
- Use ES Modules consistently across the project (do not mix).
- Always validate incoming request data using Zod before processing.
- Controllers must only handle:
  - request parsing
  - response formatting
  - error forwarding
- All business logic must live in `services/`.
- Never directly access database logic inside controllers.
- Use async/await for all asynchronous operations (no raw promise chains in core logic).
- Always handle errors using centralized error middleware.

---

## Zod Validation

- All external inputs (body, params, query) must be validated using Zod schemas.
- Validation must happen at the **edge of the system (routes/controllers)** before service calls.
- Never trust frontend-provided values without validation.
- Use reusable schemas for shared entities (user, restaurant, order).

---

## Express.js (Backend Framework)

- Route files must only define endpoints and attach middleware.
- Each route must map to exactly one controller function.
- Controllers must remain thin and stateless.
- Middleware must handle:
  - authentication
  - authorization (role checks)
  - request validation (if applicable)
- Avoid deeply nested route logic; delegate to services.

---

## React (Frontend Framework)

- Components must be split into:
  - Page components (route-level)
  - Reusable UI components
- Business logic must NOT exist inside UI components.
- API calls must always go through the `/api` layer.
- State should be managed using:
  - local state for UI-only logic
  - context for global auth/cart state
- Avoid prop drilling; use context or hooks where appropriate.

---

## Styling (Tailwind + shadcn/ui)

- Use Tailwind utility classes for all styling; avoid custom CSS unless necessary.
- Do not hardcode colors; use Tailwind theme tokens.
- Use shadcn/ui components as base building blocks for consistency.
- Maintain consistent spacing scale across pages.
- UI should prioritize readability and usability over decorative styling.

---

## API Layer (Frontend)

- All API requests must go through a centralized fetch wrapper.
- Do not call `fetch()` directly inside components.
- API layer must handle:
  - base URL configuration
  - credentials (cookies)
  - error handling
  - JSON parsing
- API functions must be grouped by domain:
  - `auth.api.ts`
  - `cart.api.ts`
  - `order.api.ts`

---

## API Routes (Backend)

- Validate request input before any business logic execution.
- Always enforce authentication and role-based authorization first.
- Ensure ownership checks (restaurant owner ↔ restaurant) before mutations.
- Maintain consistent response structure:
  - success: true/false
  - data or error object
- Never expose internal database structure directly in responses.

---

## Data and Storage

- Store structured entities (users, restaurants, orders) in MongoDB.
- Always store **price snapshots** in orders at time of creation.
- Cart is mutable; orders are immutable after creation.
- File uploads (images) must go to external storage (e.g., Cloudinary).
- Do not store large binary data inside MongoDB.
- Keep payment records separate from order records.

---

## Order System Rules

- Orders must be split per restaurant at checkout time.
- Each order must have its own lifecycle state.
- Order status must follow predefined transitions only.
- Payment must always be confirmed via backend webhook, never frontend.
- Partial failures (restaurant rejection) must not affect unrelated orders.

---

## File Organization

### Backend

- `routes/` — API endpoint definitions only
- `controllers/` — request/response handling layer
- `services/` — business logic (checkout, order processing, payment handling)
- `models/` — MongoDB schemas and data structure definitions
- `middleware/` — authentication, authorization, validation, error handling
- `utils/` — reusable helpers (JWT, response formatting, etc.)
- `config/` — database connection and environment configuration

---

### Frontend

- `pages/` — route-level UI screens (customer, restaurant, admin)
- `components/` — reusable UI components
- `api/` — all backend communication logic
- `hooks/` — reusable stateful logic (auth, cart, etc.)
- `context/` — global state providers (auth, cart)
- `routes/` — routing configuration
- `utils/` — helper functions and constants
- `.ts` / `.tsx` used throughout the project instead of `.js`