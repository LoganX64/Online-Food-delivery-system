Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

---

## 🧩 Task

Implement a complete **Restaurant Owner Dashboard system** at:

/restaurant/dashboard

This dashboard allows restaurant owners to:

- Manage incoming orders (accept/reject/update status)
- Manage menu items (CRUD + image upload)
- View earnings (basic dashboard)
- Manage restaurant profile/settings
- Reset password
- Secure logout

---

## 🧭 Route Structure

Base Route:

/restaurant/dashboard

Pages:

- /restaurant/dashboard → Main dashboard
- /restaurant/dashboard/orders
- /restaurant/dashboard/menu
- /restaurant/dashboard/history
- /restaurant/dashboard/settings

---

## 🔐 Global Security Rules (STRICT)

- Owner can ONLY access their own restaurant data
- DO NOT send `restaurantId` or `userId` from frontend
- Backend MUST extract user from session (HTTP-only cookies)

If unauthorized:
- Return 403 Forbidden
- Show: "Unauthorized action"

---

## 🍽️ 1. Orders Management (CORE FEATURE)

### API Endpoints

- GET /restaurant/orders
- PUT /restaurant/orders/:id/accept
- PUT /restaurant/orders/:id/reject
- PUT /restaurant/orders/:id/status

---

### 🔄 Order Flow

PENDING → ACCEPTED → PREPARING → HANDED_OFF  
         ↘ REJECTED

---

### 🧠 Behavior

#### PENDING
- Show:
  - Accept button
  - Reject button

---

#### ACCEPT ORDER

Call:
PUT /restaurant/orders/:id/accept

- Move order → PREPARING

---

#### REJECT ORDER

- Open dialog with:
  - Predefined reasons
  - Optional custom note

Call:
PUT /restaurant/orders/:id/reject

Body:
{
  "reason": "string",
  "note": "string (optional)"
}

---

#### UPDATE STATUS

Call:
PUT /restaurant/orders/:id/status

Body:
{
  "status": "PREPARING" | "HANDED_OFF"
}

---

### 🧩 UI Rules

- Disable buttons during API call
- Optimistic UI update with rollback on failure
- Show toast feedback

Empty state:
No active orders

---

## 🍕 2. Menu Management

### API Endpoints

- POST /menus
- PUT /menus/:id
- DELETE /menus/:id
- GET /restaurants/:id/menu
- GET /restaurant/me

---

### 🧠 Behavior

#### Fetch Menu

1. Call GET /restaurant/me  
2. Use ID → GET /restaurants/:id/menu

---

#### Add Menu Item

- Upload image via Cloudinary endpoint
- Submit:

POST /menus

Body:
{
  "name": "string",
  "price": number,
  "imageUrl": "string",
  "categoryId": "string (optional)"
}

---

#### Update Menu Item

PUT /menus/:id

---

#### Delete Menu Item

1. DELETE /menus/:id (soft delete)
2. DELETE image from Cloudinary

---

### 📂 Category Dropdown

If backend endpoint NOT available:

Use temporary static list:

// TODO: Replace with backend categories API

---

## ⚡ 3. Quick Create (Sidebar)

- Opens "Add Menu Item" modal
- Reuses Menu Form component
- No duplicate logic

---

## 📊 4. Dashboard (Home)

### API

GET /restaurant/earnings

---

### Behavior

- Show total earnings
- Show basic metrics

If missing data:
- Keep UI
- Show placeholders

---

## 📜 5. Orders History

### Behavior

- Display past orders

Empty state:
No order history

⚠️ If backend filtering not available:
- Handle basic filtering on frontend only

---

## ⚙️ 6. Settings Page

### API

- GET /restaurant/me
- PUT /restaurant/me

---

### Features

- Update restaurant details
- Form validation
- Success/error feedback

---

## 🔐 7. Password Management

### APIs

- POST /auth/forgot-password
- POST /auth/reset-password/:token

---

### Routes

- /restaurant/forgot-password
- /restaurant/reset-password

---

### Behavior

Forgot Password:
- Input: email
- Always return success message

Reset Password:
- Token from URL
- On success → redirect /restaurant/login

---

## 🚪 8. Logout

API:
POST /auth/logout

Behavior:
- Clear HTTP-only cookie
- Clear AuthContext
- Redirect → /restaurant/login

---

## 🧠 9. Service Layer (STRICT)

- No API calls inside components

Use:

/services
  - restaurant.service.ts
  - order.service.ts
  - menu.service.ts
  - auth.service.ts

Rules:
- Use environment-based base URL
- Always send credentials

---

## ❗ 10. Error Handling

Handle:

- 401 Unauthorized → redirect to login
- 403 Forbidden → show "Unauthorized action"
- Validation errors
- Network failures

---

### UI Fallbacks

- Preserve form data
- Disable actions during requests
- Provide retry options

---

## 🎨 11. UI/UX Rules

- Use Tailwind + shadcn
- Do NOT hardcode colors
- Follow UIcontext.md

Include:

- Loading states
- Skeleton loaders
- Empty states
- Toast notifications

---

## 🧱 12. Architecture Rules

- Pages = containers only
- Components = reusable
- No business logic in UI
- Use TypeScript everywhere

---

## ⚠️ 13. Backend Constraints

- DO NOT create new endpoints without permission
- If endpoint is missing:
  → STOP and ask for confirmation

- Keep UI intact even if backend is missing

---

## ✅ Expected Outcome

- Fully functional Restaurant Owner Dashboard
- Orders lifecycle fully working
- Menu management complete
- Secure session-based access
- Clean, scalable architecture
- Production-ready implementation