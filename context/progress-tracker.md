# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Backend — Auth & User Module Complete

## Current Goal

- Awaiting next feature unit

## Completed

- `01-user-endpoint.md` — Full implementation:
  - `GET /health` — health check with MongoDB status
  - `POST /users` — register user (hashed password, no password in response)
  - `GET /users` — fetch all users (passwords excluded)
  - `GET /users/:id` — fetch single user (404 if not found)
  - `PUT /users/:id` — update whitelisted fields only
  - `DELETE /users/:id` — soft delete (`isActive = false`)
  - `POST /auth/login` — validate credentials, return JWT in HTTP-only cookie + user info
  - Address Module:
    - `POST /addresses` — create address
    - `GET /addresses` — fetch user addresses
    - `PUT /addresses/:id` — update address
    - `DELETE /addresses/:id` — delete address
  - Architectural Improvements:
    - Centralized error handling with `AppError` class
    - Standardized response format `{ success, data/error }`
    - JWT stored in HTTP-only cookies
    - Role-based authorization middleware (RBAC)

## In Progress

- None

## Next Up

- TBD

## Open Questions

- [Any unresolved product or technical decisions]

## Architecture Decisions
- **Centralized Error Handling**: Introduced `AppError` and a global error middleware to ensure all errors follow a consistent `{ success: false, error: message }` format and appropriate HTTP status codes.
- **JWT Storage**: JWTs are now stored in **HTTP-only cookies** for better security against XSS, as per the project architecture guidelines.
- **Zod Validation**: Standardized validation at the route level using a reusable `validate` middleware, ensuring all inputs are checked before reaching services.
- **Address Ownership**: Implemented user-scoped logic in `address.service.ts` to ensure users can only manage their own addresses.

## Session Notes
- User and Auth modules are fully implemented according to `01-user-endpoint.md`.
- Address CRUD is implemented but auth middleware integration in `address.routes.ts` is pending the next phase.
- The system is ready for the next feature (Restaurant or Menu management).
