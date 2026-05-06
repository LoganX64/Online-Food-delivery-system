# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Backend — Customer Module Complete

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
- `03-menu-endpoint.md` — Full implementation:
  - `POST /menu` — create menu item (with Cloudinary upload)
  - `GET /menu` — fetch all menu items
  - `GET /menu/:id` — fetch single menu item
  - `PUT /menu/:id` — update menu item (and Cloudinary image)
  - `DELETE /menu/:id` — soft delete menu item and remove image from Cloudinary
  - `models/MenuItem.ts` — created MenuItem model
  - Added Cloudinary configuration and Multer upload middleware
- `04-customer-endpoint.md` — Full implementation:
  - `GET /restaurants?pincode=` — fetch restaurants by pincode
  - `GET /restaurants/:id` — fetch single restaurant
  - `GET /restaurants/:id/menu` — fetch restaurant menu
  - Cart Module (`/cart`, `/cart/add`, `/cart/update`, `/cart/remove`, `/cart/clear`)
  - Order Module (`POST /orders`, `GET /orders`, `GET /orders/:id`)
  - Payment Module (`POST /payment/webhook`)
  - `models/Cart.ts` and `models/Payment.ts` created
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
- **Cloudinary Integration**: Used Cloudinary and Multer for uploading and managing menu item images.

## Session Notes
- Customer module is fully implemented according to `04-customer-endpoint.md`.
- Added Cart logic and a refined checkout process that splits orders per restaurant.
- Integrated a mock Payment webhook to verify and update order statuses.
- Resolved TypeScript errors regarding implicit `any` types and faulty extensions.
