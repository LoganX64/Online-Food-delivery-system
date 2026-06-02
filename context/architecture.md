# Architecture

This document defines the technical architecture of the multi-restaurant food ordering system, including stack choices, system boundaries, data storage strategy, authentication model, and strict invariants that the system must always follow.

---

# 🧱 Stack Overview

| Layer      | Technology        | Role                                                       |
| ---------- | ----------------- | ---------------------------------------------------------- |
| Frontend   | React             | UI rendering, state management, user interactions          |
| Styling    | Tailwind CSS      | Utility-first styling system for UI consistency            |
| UI Kit     | shadcn/ui         | Prebuilt accessible UI components (forms, dialogs, tables) |
| Routing    | React Router      | Client-side routing for customer, restaurant, admin apps   |
| API Client | fetch             | HTTP communication with backend APIs                       |
| Backend    | Node.js + Express | REST API server, business logic orchestration              |
| Database   | MongoDB           | Primary data store for users, orders, restaurants, carts   |
| Validation | Zod               | Request validation and schema enforcement                  |
| Linting    | ESLint            | Code quality enforcement and consistency                   |

---

# 📦 System Boundaries (Folder Responsibilities)

## Backend (Express)

| Folder         | Responsibility                                                    |
| -------------- | ----------------------------------------------------------------- |
| `routes/`      | Defines API endpoints and maps them to controllers                |
| `controllers/` | Handles HTTP requests/responses only (no business logic)          |
| `services/`    | Core business logic (order splitting, checkout, payment handling) |
| `models/`      | MongoDB schemas and data structure definitions                    |
| `middleware/`  | Authentication, authorization, error handling                     |
| `utils/`       | Helper functions (JWT, response formatting, etc.)                 |
| `config/`      | Database connection, environment configuration                    |

### Rule:

- Business logic must NEVER exist in controllers or routes.
- Only services contain domain logic.

---

## Frontend (React)

| Folder        | Responsibility                        |
| ------------- | ------------------------------------- |
| `pages/`      | Route-level UI components (screens)   |
| `components/` | Reusable UI components                |
| `api/`        | All API calls using fetch wrapper     |
| `hooks/`      | Custom React hooks (auth, cart, etc.) |
| `context/`    | Global state (auth, cart state)       |
| `routes/`     | Route configuration                   |
| `utils/`      | Helper functions and constants        |

### Rule:

- API calls must NOT be written directly inside components.
- All API calls must go through `api/` layer.

---

# 🗄️ Storage Model

## MongoDB (Primary Database)

Stores all core application data:

### Collections:

- `users`
  - authentication data
  - roles (customer, restaurantOwner, admin)

- `restaurants`
  - restaurant profile
  - owner reference
  - approval status

- `menu_items`
  - food items per restaurant
  - price, availability

- `carts`
  - active user cart sessions (Note: currently implemented via localStorage on frontend)

- `orders`
  - split per restaurant
  - order lifecycle state

- `order_items`
  - frozen snapshot of product at order time

- `payments`
  - mock payment records and status

- `addresses`
  - user delivery locations

---

## File Storage (External)

Used for:

- user profile images
- restaurant images
- menu images (optional)

### Storage Provider:

- Cloudinary (or equivalent)

---

## Cache (Not used in MVP)

- No Redis in MVP scope
- Future use: caching restaurants by pincode, sessions, or menu data

---

# 🔐 Authentication & Access Model

## Authentication Flow

- User logs in via `/auth/login`
- Backend issues JWT token
- Token is stored in **HTTP-only cookie**
- Each request reads cookie for authentication

---

## Authorization Model

### Roles:

- `customer`
- `restaurantOwner`
- `admin`

### Access Rules:

- Customers can:
  - browse restaurants
  - manage cart and orders

- Restaurant owners can:
  - manage their restaurant profile
  - manage menu
  - manage incoming orders

- Admin can:
  - approve/reject restaurants
  - manage users and restaurants

---

## Ownership Rules

- Each restaurant is linked to a user via `ownerId`
- A restaurant owner can ONLY access their own restaurant data
- Orders are scoped by `restaurantId`

---

# ⚙️ Background Processes / Async Behavior

## Payment Handling

- Payment is initiated during checkout
- Payment result is confirmed via mock webhook endpoint
- Order status is updated after payment confirmation

---

## Order Processing Flow

- Cart → checkout → order creation (transactional)
- Orders are split per restaurant
- Each order independently progresses through lifecycle

---

## Future (Not implemented in MVP)

- Background job queue (e.g., for retries, notifications)
- Email notifications
- Real-time updates (WebSockets)

---

# 📐 Invariants (Critical System Rules)

These rules must NEVER be violated in code.

---

## 1. Orders are immutable after creation

Once an order is created:

- product price cannot change
- order items cannot be modified
  Only status updates are allowed.

---

## 2. Cart and Order are separate systems

- Cart is mutable
- Order is immutable snapshot of cart at checkout time

---

## 3. Payment must always be verified server-side

- Frontend cannot mark payment as successful
- Only backend webhook updates payment status

---

## 4. Restaurant ownership must always be enforced

- A restaurant owner can only access their own restaurant
- All queries must be filtered by `ownerId`

---

## 5. Role-based access must be enforced at middleware level

- Never rely on frontend role checks
- Backend middleware is the only source of truth

---

## 6. Price must be frozen at order creation

- All order items must store `priceAtOrder`
- Menu price changes must NOT affect existing orders

---

## 7. Orders must always be linked to a payment record

- Every order group must reference a `paymentId`
- No orphan orders allowed

---

## 8. Invalid state transitions are forbidden

- Order status must follow defined lifecycle only
- Example: `DELIVERED → CANCELLED` is invalid

---
