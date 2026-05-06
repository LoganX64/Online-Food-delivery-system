# Backend Architecture

This document defines the backend architecture of the multi-restaurant food ordering system, including API design, data models, system boundaries, authentication model, and invariants.

---

# 🧱 Stack Overview

| Layer      | Technology        | Role                                  |
| ---------- | ----------------- | ------------------------------------- |
| Backend    | Node.js + Express | REST API server, business logic       |
| Database   | MongoDB           | Primary data store                    |
| Validation | Zod               | Request validation                    |
| Auth       | JWT (cookies)     | Authentication & authorization        |
| Linting    | ESLint            | Code quality enforcement              |

---

# 📦 System Boundaries

| Folder         | Responsibility                                                    |
| -------------- | ----------------------------------------------------------------- |
| `routes/`      | Defines API endpoints and maps them to controllers                |
| `controllers/` | Handles HTTP requests/responses only                              |
| `services/`    | Core business logic                                               |
| `models/`      | MongoDB schemas                                                   |
| `middleware/`  | Auth, authorization, error handling                               |
| `utils/`       | Helpers (JWT, response formatting)                                |
| `config/`      | DB connection, env config                                         |

### Rule

- Business logic must NEVER exist in controllers or routes.

---

# 🗄️ Database Schema

## users

- _id
- name
- email
- password
- role (customer | restaurantOwner | admin)
- profileImage
- phone
- isActive
- createdAt
- updatedAt

---

## addresses

- _id
- userId
- label
- addressLine
- city
- state
- pincode
- isDefault
- createdAt

---

## restaurants

- _id
- ownerId (User)
- name
- description
- addressLine
- city
- pincode
- isApproved
- isActive
- rating
- createdAt

---

## menu_items

- _id
- restaurantId
- name
- description
- price
- image
- category
- isAvailable
- createdAt
- updatedAt

---

## carts

- _id
- userId
- items: [
  - menuItemId
  - restaurantId
  - name
  - price
  - quantity
]
- updatedAt

---

## orders

- _id
- userId
- restaurantId
- paymentId
- items: [
  - menuItemId
  - name
  - priceAtOrder
  - quantity
]
- totalAmount
- status
- addressSnapshot {
  addressLine
  city
  pincode
}
- createdAt
- updatedAt

---

## payments

- _id
- userId
- orderIds[]
- amount
- status (PENDING | SUCCESS | FAILED)
- method (MOCK)
- createdAt
- updatedAt

---

# 🔗 Relationships

- User → Addresses (1:N)
- User → Orders (1:N)
- User → Restaurant (1:1)
- Restaurant → MenuItems (1:N)
- Restaurant → Orders (1:N)
- Cart → multi-restaurant items
- Payment → multiple Orders

---

# 🌐 API Routes

## Auth

- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`
- GET  `/auth/me`

---

## User Profile

- GET  `/users/me`
- PUT  `/users/me`
- POST `/users/profile-image`

---

## Address

- GET    `/addresses`
- POST   `/addresses`
- PUT    `/addresses/:id`
- DELETE `/addresses/:id`

---

## Restaurants (Customer)

- GET `/restaurants?pincode=`
- GET `/restaurants/:id`
- GET `/restaurants/:id/menu`

---

## Restaurant (Owner)

- POST `/restaurant`
- GET  `/restaurant/me`
- PUT  `/restaurant/me`

---

## Menu

- POST   `/menu`
- PUT    `/menu/:id`
- DELETE `/menu/:id`

---

## Cart

- GET    `/cart`
- POST   `/cart/add`
- PUT    `/cart/update`
- DELETE `/cart/remove`
- DELETE `/cart/clear`

---

## Checkout

- POST `/checkout`

---

## Orders (Customer)

- GET `/orders`
- GET `/orders/:id`

---

## Restaurant Orders

- GET `/restaurant/orders`
- PUT `/restaurant/orders/:id/accept`
- PUT `/restaurant/orders/:id/reject`
- PUT `/restaurant/orders/:id/status`

---

## Admin

- GET  `/admin/restaurants`
- POST `/admin/restaurants/:id/approve`
- POST `/admin/restaurants/:id/reject`
- PUT  `/admin/restaurants/:id/deactivate`

---

## Payment

- POST `/payment/webhook`

---

# 🔐 Authentication & Access Model

- JWT stored in HTTP-only cookies
- Role-based access: customer, restaurantOwner, admin
- Ownership enforced via `ownerId`

---

# ⚙️ Background Processes / Async Behavior

## Payment

- Checkout → payment initiated
- Webhook → confirms success/failure
- Orders updated after confirmation

---

## Order Processing

- Validate cart
- Split by restaurant
- Create orders (transaction)
- Link payment

---

# 📐 Invariants

- Orders are immutable after creation
- Cart is mutable, order is snapshot
- Payment verified server-side only
- Ownership must always be enforced
- Role checks enforced in middleware
- Price frozen at order creation
- Orders must link to payment
- Invalid state transitions are forbidden