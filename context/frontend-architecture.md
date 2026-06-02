# Frontend Architecture

This document defines the frontend structure, routing system, and UI architecture.

---

# 🧱 Stack Overview

| Layer      | Technology     | Role                        |
| ---------- | -------------- | --------------------------- |
| Frontend   | React          | UI rendering                |
| Styling    | Tailwind CSS   | Styling system              |
| UI Kit     | shadcn/ui      | Component library           |
| Routing    | React Router   | Client-side routing         |
| API Client | fetch          | Backend communication       |
| Icons      | lucide-react   | Icon system                 |

---

# 📦 System Boundaries

| Folder        | Responsibility                        |
| ------------- | ------------------------------------- |
| `pages/`      | Route-level UI                        |
| `components/` | Reusable UI components                |
| `api/`        | API calls (fetch wrapper)             |
| `hooks/`      | Custom hooks                          |
| `context/`    | Global state (auth, cart)             |
| `routes/`     | Route configuration                   |
| `utils/`      | Helpers                               |

---

# 🗂️ Component Namespacing

Each dashboard role owns its components under a dedicated sub-folder. No cross-role imports are allowed.

| Folder                  | Owner Role         | Key Components                                              |
| ----------------------- | ------------------ | ----------------------------------------------------------- |
| `components/user/`      | Customer           | `UserNav`, `PersonalInfo`, `OrderHistory`, `SavedAddresses`, `PaymentMethods`, `Notifications` |
| `components/admin/`     | Admin              | `AdminSidebar`, `DashboardOverview`, `UserManagement`, `OrderManagement`, `RestaurantManagement`, `AnalyticsView`, `SettingsView`, `AddRestaurantWizard` |
| `components/restaurant/`| Restaurant Owner   | `RestaurantSidebar`, `DashboardOverview`, `LiveOrders`, `MenuEditor`, `OrderHistory`, `Settings` |
| `components/ui/`        | Shared (shadcn/ui) | Primitive components only — no business logic              |

> **Rule:** If a component is only used in one dashboard context, it lives in that role's folder. Shared primitives go in `components/ui/` only.

---

# 🧭 Pages & Routes

## Public

- `/` → Home (restaurant listing)
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password/:token`
- `/restaurant/login`
- `/restaurant/register`
- `/restaurant/forgot-password`
- `/restaurant/reset-password/:token`
- `/admin/login`
- Static/Info Pages: `/about`, `/careers`, `/contact`, `/blog`, `/support`, `/safety`, `/faq`, `/privacy`, `/terms`, `/cookies`, `/accessibility`

---

## Global / Edge

- `/*` → NotFound (catch-all route)

---

## Customer

- `/restaurant/:id` → Menu view
- `/restaurants` → All restaurants directory
- `/menus` → Global menus catalog
- `/cart`
- `/checkout`
- `/orders`
- `/user-dashboard` → Profile, addresses, payment methods, notifications

---

## Restaurant Owner

- `/restaurant-dashboard` → Dashboard overview, live orders, menu editor, settings

---

## Admin

- `/admin-dashboard` → Dashboard overview, user/restaurant/order management

---

# 🔄 Routing Rules

- Public routes → no auth
- Customer routes → require login
- Restaurant routes → require `restaurantOwner`
- Admin routes → require `admin`

---

# 🔐 Authentication Flow

- Login → backend sets HTTP-only cookie
- Frontend uses:
  - `fetch` with `credentials: "include"`
- Session fetched via `/auth/me`

---

# 🌐 API Layer

- All API calls go through `/api`
- No direct fetch inside components

---

# 🛒 State Management

- Auth → Context
- Cart → localStorage (no backend state)
- UI → local state only

---

# 🎨 UI System

- shadcn/ui components
- Neutral base + orange theme
- Consistent spacing & typography

---

# 📐 Rules

- No business logic in UI
- No API calls in components
- Pages act as containers only
- Components must be reusable

---

# 🧠 UX Flow

Customer:
Browse → Cart → Checkout → Orders

Restaurant:
Orders → Accept → Prepare → Complete

Admin:
Approve → Monitor → Control