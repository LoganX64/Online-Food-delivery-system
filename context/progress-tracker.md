# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Backend — Restaurant Module Complete

## Current Goal

- Awaiting next feature unit

## Completed

- `01-user-endpoint.md` — Full implementation
- `02-resturant-endpoint.md` — Full implementation:
  - `POST /restaurant` — create restaurant
  - `GET /restaurant` — fetch all restaurants
  - `GET /restaurant/:id` — fetch single restaurant
  - `PUT /restaurant/:id` — update restaurant
  - `DELETE /restaurant/:id` — soft delete restaurant
  - `GET /restaurant/me` — fetch owner's restaurant
  - `PUT /restaurant/me` — update owner's restaurant
  - `GET /restaurant/orders` — fetch all orders for owner's restaurant
  - `PUT /restaurant/orders/:id/accept` — accept order
  - `PUT /restaurant/orders/:id/reject` — reject order
  - `PUT /restaurant/orders/:id/status` — update order status
  - `models/Order.ts` — created Order model with schema and status enums
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
- Restaurant module is fully implemented according to `02-resturant-endpoint.md`.
- Order model has been created, and basic status-update endpoints are functional for Restaurant Owners.
- Next phase might be Menu Management or Customer checkout flow.
