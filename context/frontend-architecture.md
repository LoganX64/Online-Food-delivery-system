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

# 🧭 Pages & Routes

## Public

- `/` → Home (restaurant listing)
- `/login`
- `/register`

---

## Customer

- `/restaurant/:id` → Menu view
- `/cart`
- `/checkout`
- `/orders`
- `/orders/:id`
- `/profile`
- `/addresses`

---

## Restaurant Owner

- `/restaurant/dashboard`
- `/restaurant/orders`
- `/restaurant/menu`
- `/restaurant/profile`

---

## Admin

- `/admin/dashboard`
- `/admin/restaurants`
- `/admin/users`
- `/admin/orders`

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
- Cart → Context
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