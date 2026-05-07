Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

Build this system with proper authentication, authorization, and role-based access control.

All protected routes must:
- Require JWT authentication
- Validate the user identity
- Enforce role-based access (admin / restaurantOwner / customer)
- Ensure resource ownership wherever applicable (user can only access their own data unless admin)

Log all registered routes/endpoints in the console on server startup.

For image uploads, use Cloudinary and follow the **latest official Cloudinary file upload documentation**. Do not use deprecated methods.

---

## 🔑 Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and receive JWT token | No |
| POST | `/auth/logout` | Logout user (invalidate token/session if applicable) | Yes |
| GET | `/auth/me` | Get current authenticated user | Yes |

---

## 👤 User Profile (`/users`)

### Self कार्रents (Authenticated User)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/users/me` | Get current user profile | Yes |
| PUT | `/users/me` | Update own profile | Yes |
| POST | `/users/profile-image` | Upload/update profile image (Cloudinary) | Yes |

### Admin कार्रents

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/users` | Create user | Yes (Admin only) |
| GET | `/users` | Get all users | Yes (Admin only) |
| GET | `/users/:id` | Get user by ID | Yes (Admin only) |
| PUT | `/users/:id` | Update user | Yes (Admin only) |
| DELETE | `/users/:id` | Delete user | Yes (Admin only) |

---

## 📍 Address Management (`/addresses`)

All endpoints must ensure the user can only access **their own addresses**.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/addresses` | Create address | Yes |
| GET | `/addresses` | Get all user addresses | Yes |
| GET | `/addresses/:id` | Get address by ID | Yes |
| PUT | `/addresses/:id` | Update address | Yes |
| DELETE | `/addresses/:id` | Delete address | Yes |

---

## 🏠 Restaurant Management (`/restaurant`)

### Owner कार्रents

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/restaurant/me` | Get owner's restaurant | Yes (Owner) |
| PUT | `/restaurant/me` | Update own restaurant | Yes (Owner) |
| GET | `/restaurant/orders` | Get restaurant orders | Yes (Owner) |
| PUT | `/restaurant/orders/:id/accept` | Accept order | Yes (Owner) |
| PUT | `/restaurant/orders/:id/reject` | Reject order | Yes (Owner) |
| PUT | `/restaurant/orders/:id/status` | Update order status | Yes (Owner) |

### Public + Admin

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/restaurant` | Register restaurant | No |
| GET | `/restaurant` | Get all restaurants | No |
| GET | `/restaurant/:id` | Get restaurant by ID | No |
| PUT | `/restaurant/:id` | Update restaurant | Yes (Admin only) |
| DELETE | `/restaurant/:id` | Delete restaurant | Yes (Admin only) |

---

## 🔍 Restaurant Discovery (`/restaurants`)

Public access endpoints:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/restaurants?pincode=` | Filter restaurants by pincode | No |
| GET | `/restaurants/:id` | Get restaurant details | No |
| GET | `/restaurants/:id/menu` | Get restaurant menu | No |

---

## 🍕 Menu Management (`/menu`)

Owner must only manage **their own restaurant’s menu items**.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/menu` | Create menu item | Yes (Owner) |
| GET | `/menu` | Get all menu items | No |
| GET | `/menu/:id` | Get menu item by ID | No |
| PUT | `/menu/:id` | Update menu item | Yes (Owner) |
| DELETE | `/menu/:id` | Delete menu item | Yes (Owner) |

---

## 🛒 Cart Management (`/cart`)

Cart must always belong to the authenticated user.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/cart` | Get current user cart | Yes |
| POST | `/cart/add` | Add item to cart | Yes |
| PUT | `/cart/update` | Update item quantity | Yes |
| DELETE | `/cart/remove` | Remove item from cart | Yes |
| DELETE | `/cart/clear` | Clear cart | Yes |

---

## 💳 Orders & Checkout (`/orders`, `/checkout`)

Users can only access **their own orders**.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/orders` | Create order from cart | Yes |
| GET | `/orders` | Get user orders | Yes |
| GET | `/orders/:id` | Get order details | Yes |
| POST | `/checkout` | Checkout flow | Yes |

---

## 💰 Payments (`/payment`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/payment/webhook` | Handle payment webhook | No (validate signature instead) |

---

## 🛡️ Admin Dashboard (`/admin`)

Admin-only access required.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/admin/restaurants` | Get all restaurants for review | Yes (Admin) |
| POST | `/admin/restaurants/:id/approve` | Approve restaurant | Yes (Admin) |
| POST | `/admin/restaurants/:id/reject` | Reject restaurant | Yes (Admin) |
| PUT | `/admin/restaurants/:id/deactivate` | Deactivate restaurant | Yes (Admin) |

---

## 🏥 Health Check

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/health` | Check system status | No |

---

## Additional Requirements

- Use proper error handling middleware
- Validate all inputs (body, params, query)
- Use environment variables for all secrets
- Follow clean architecture (routes, controllers, services, models)
- Ensure scalability and maintainability