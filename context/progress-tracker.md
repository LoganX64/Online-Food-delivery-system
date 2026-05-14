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
  - Built Navbar using shadcn `NavigationMenu` for desktop with Logo on left and Links (Home, Login, Register) on right.
  - **Mobile Refinement**: Updated layout to show brand logo/text on the left and sandwich icon on the right for better accessibility.
  - Mobile sandwich menu displays "Login", "Sign Up" and "Become a Partner" links.
  - Added `BottomNav` component for mobile with Home, Categories, Cart, and Profile links/icons.
  - Set up React Router with `Home`, `Login`, and `Register` pages.
  - Implemented shared `Layout` with sticky Navbar, BottomNav, and responsive container.
  - Integrated `login-form` and `signup-form` shadcn blocks.
  - Created `utils/cn.ts` for consistent utility usage.
  - Configured design tokens in `index.css` (Orange theme).
- `08-hero-section.md` — Full implementation:
  - Created `HeroSection` component with a responsive, premium design.
  - **Mobile Refinement**: Implemented mobile-specific view (hidden hero image, persistent location selector with "delivering to" text, and optimized search bar/button).
  - Integrated high-quality gourmet food background image for desktop with hover effects.
  - Implemented a centered search card for desktop with single-line title, subtitle, and search/location inputs.
  - Applied design refinements: rounded corners (`rounded-xl`), shadow effects, and optimized typography.
  - Updated `Home` page to include the `HeroSection`.
- `09-categories.md` — Full implementation:
  - Built `Categories` section with **infinite horizontal looping** functionality.
  - Displayed quick categories: Pizza, Burgers, Pasta, Desserts, Drinks, and Healthy.
  - Implemented category cards with image backgrounds and text overlays (bottom-left).
  - Added functional navigation buttons (Left/Right arrows) for easier browsing.
  - Integrated high-quality food photography and reliable fallback mechanisms for visuals.
- `10-restaurants.md` — Full implementation:
  - Built `Restaurants` section with **infinite horizontal scrolling** functionality.
  - Implemented restaurant cards featuring:
    - High-quality imagery with star rating overlays and no top/side padding.
    - Restaurant name, cuisine types, and a formatted footer with `Clock` icon, delivery time, and fee.
    - Horizontal divider separating content from delivery info.
    - Floating navigation arrows (Left/Right) centered over cards with hover effects.
  - Integrated `Badge` component for ratings.
  - Updated `Home` page to include the `Restaurants` section.
- `11-Footer.md` — Full implementation:
  - Built `Footer` component with a responsive layout and dropdown selectors.
  - Used a light peach/orange theme (`bg-[#fff1eb]`) with dark text to match the design reference.
  - Custom SVG components for missing `lucide-react` brand icons (Facebook, Twitter, Instagram, Youtube).
  - Integrated `Footer` into the `Home` page layout.
- `12-menus-page.md` — Full implementation:
  - Built `MenusPage` component with a responsive layout featuring sidebar filters for desktop and drawer/sheet filters for mobile.
  - Implemented dish cards with 'veg/non-veg' badges, image, details, and dynamic cart add/remove counters.
  - Integrated dummy data and UI for pagination, sorting, search, and category filtering.
  - Updated `Navbar` to show a back button specifically for the `/menus` route on mobile devices.
  - Set up `/menus` route in `index.tsx`.
  - **Add-to-Cart with localStorage**: Created `utils/cart-storage.ts` utility for persisting cart items in `localStorage` (no state management). Cart state initializes from localStorage and syncs on every update.
  - **Toast Notifications**: Integrated Sonner toaster (fixed for Vite — removed `next-themes` dependency). Shows "[Dish name] added to cart" toast with a `ShoppingCart` icon at top-center on every add action.
  - **Category Navigation**: Clicking a category on the Home page navigates to `/menus?category=Name` and pre-selects the filter checkbox.

- `13-view-cart.md` — Full implementation:
  - Built `CartPage` component with responsive desktop and mobile layouts.
  - Implemented grouped display of cart items by restaurant.
  - Developed an order summary card with dynamic subtotal, tax, and delivery fee calculations, plus a mock coupon system.
  - Added a "Recommended for you" section dynamically filtering out current cart items.
  - Used `localStorage` for robust state persistence without a backend.
  - Integrated `sonner` for user-friendly toast notifications on all cart operations (add, remove, quantity change, empty cart).
  - Set up `/cart` route in `index.tsx`.

- `14-checkout.md` — Full implementation:
  - Built `CheckoutPage` component with responsive desktop and mobile layouts.
  - Implemented delivery details card with address and delivery instructions (textbox).
  - Developed a payment methods card featuring selectable radio-style options (Credit/Debit Card, Cash on Delivery).
  - Designed an order summary card displaying the items from the cart, subtotal, taxes, delivery fee, and total.
  - Included a functional "Place Your Order" button and a fixed bottom footer for mobile users.
  - Integrated `lucide-react` icons and a back navigation button.
  - Set up `/checkout` route in `index.tsx`.

- `15-order-page.md` — Full implementation:
  - Built `OrderPage` component with a premium, structured card design (Header, Body, Footer).
  - Implemented desktop sidebar filters ("All Orders", "Orders in Progress", "Delivered", "Cancelled").
  - Implemented mobile toggle/tab buttons ("Active Orders", "Past Orders").
  - Order cards feature meta-info (ID, Date), status badges, high-quality images, and contextual action buttons.
  - Designed a functional pagination component using `lucide-react` icons and Shadcn UI buttons.
  - Set up `/orders` route in `index.tsx`.

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

- Refined `Categories` component in `frontend/src/components/categories.tsx` to strictly match `09-categories.md` requirements:
  - Updated category list (added Drinks, removed Sushi).
  - Implemented responsive design: rectangular cards with text overlays for desktop, circular images with labels for mobile.
  - Positioned navigation arrows to float over categories for better desktop UX.
  - Fixed "jumping effect" on arrow buttons by wrapping them in centered containers and preventing scroll reset logic during animations.
  - Ensured infinite horizontal looping logic is maintained and optimized.
- Refined `Restaurants` component in `frontend/src/components/restaurants.tsx` to match revised `10-restaurants.md` requirements:
  - Updated restaurant list to popular brands (Domino's, KFC, etc.).
  - Implemented vertical list layout for mobile and horizontal scroll for desktop.
  - Positioned navigation arrows (Chevrons) to float over the cards and vertically centered to the whole card height, matching the Categories component's layout.
  - Implemented RestaurantCard using shadcn/ui Card for better visual consistency and shadows.
  - Updated image aspect ratio to 4:3 and ensured no top/side padding for a "full" look.
  - Added underline and hover effects to "See All" action.
  - Added badges (popular, new, free delivery) as small corner boxes, heart icon overlays, and improved typography for name/rating/cuisine.
  - Optimized layout for mobile-first responsiveness with increased spacing between vertical cards.

