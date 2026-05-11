# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Backend — Architecture Alignment Complete

## Current Goal

- Awaiting next feature unit

## Completed

- `01-user-endpoint.md` — Full implementation:
  - Auth: `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
  - Profile: `GET /users/me`, `PUT /users/me`, `POST /users/profile-image`
  - System: `GET /users`, `GET /users/:id`, `PUT /users/:id`, `DELETE /users/:id`
  - Password hashing with Bcrypt, JWT in HTTP-only cookies
  - Address: `GET /addresses`, `POST /addresses`, `PUT /addresses/:id`, `DELETE /addresses/:id` (Ownership enforced)
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
  - Checkout Module (`POST /checkout`) — Dedicated entry point for cart-to-order creation
  - Payment Module (`POST /payment/webhook`)
  - `models/Cart.ts` and `models/Payment.ts` created
- `05-admin-endpoint.md` — Full implementation:
  - `GET /admin/restaurants` — paginated restaurant fetching with approval filtering
  - `POST /admin/restaurants/:id/approve` — approve a restaurant
  - `POST /admin/restaurants/:id/reject` — reject a restaurant
  - `PUT /admin/restaurants/:id/deactivate` — deactivate a restaurant
  - Applied `authenticate` and `authorize('admin')` middleware to all admin endpoints
  - Architectural Improvements:
    - Centralized error handling with `AppError` class
    - Standardized response format `{ success, data/error }`
    - JWT stored in HTTP-only cookies
    - Role-based authorization middleware (RBAC)
- `07-navbar-ui.md` — Full implementation:
  - Built Navbar using `container` with Logo on left and Links on right.
  - Set up React Router with `Home`, `Login`, and `Register` pages.
  - Implemented shared `Layout` with sticky Navbar and responsive container.
  - Integrated `login-form` and `signup-form` shadcn blocks with 2-column layout.
  - Implemented a functional mobile menu using shadcn's `Sheet` component.
  - Configured design tokens in `index.css` (Orange theme) and fixed path aliases.
- `08-hero-section.md` — Full implementation:
  - Created `HeroSection` component with a responsive, premium design.
  - Integrated high-quality gourmet food background image with hover effects.
  - Implemented a centered search card with single-line title, subtitle, and search/location inputs.
  - Applied design refinements: rounded corners (`rounded-xl`), shadow effects, and optimized typography.
  - Updated `Home` page to include the `HeroSection`.
- `09-categories.md` — Full implementation:
  - Built `Categories` section with **infinite horizontal looping** functionality.
  - Displayed quick categories: Pizza, Burgers, Pasta, Desserts, Drinks, and Healthy.
  - Implemented category cards with image backgrounds and text overlays (bottom-left).
  - Added functional navigation buttons (Left/Right arrows) for easier browsing.
  - Integrated high-quality food photography and reliable fallback mechanisms for visuals.

- Password Reset Flow — Full implementation:
  - `POST /auth/forgot-password` — generates and returns a secure reset token
  - `POST /auth/reset-password/:token` — validates token and updates password
  - Added `resetPasswordToken` and `resetPasswordExpires` to `User` model
  - Added validation schemas in `validation.ts`
  - Fixed TypeScript type mismatch in `auth.controller.ts`
- Health Check — Implementation:
  - `GET /api/health` — Returns application status, uptime, and database connectivity.
  - Documented in `backend-routes.md` and `payload-sample.md`.
- Search Functionality — Implementation:
  - `GET /api/restaurants/search?q=...` — Searches both restaurants and menu items using regex.
- Restaurant Earnings Summary — Implementation:
  - `GET /api/restaurants/earnings` — Aggregates total revenue from delivered orders for owners.
- Advanced Discovery Filtering & Sorting — Implementation:
  - Updated `GET /api/restaurants` to support `minRating` filtering and `sort` (name/rating).
- Stability & Security Enhancements — Implementation:
  - **Environment Validation**: Added startup check for all critical `.env` variables to prevent misconfiguration.
  - **Security Strictness**: Refactored `Address`, `Cart`, and `Order` controllers to strictly use JWT-derived `userId`, eliminating potential ID spoofing via request body/query.

## In Progress


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
- Admin module is fully implemented according to `05-admin-endpoint.md`.
- Restricted all endpoints under `/admin` using `authenticate` and `authorize('admin')` middleware.
- Aligned implementation with `backend-architecture.md` by adding missing `/auth/logout`, `/auth/me`, `/users/me`, `/users/profile-image`, and `/checkout` endpoints.
- Verified system integrity with `tsc --noEmit`; all type checks pass.
- The backend API suite now 100% matches all defined architectural requirements.
