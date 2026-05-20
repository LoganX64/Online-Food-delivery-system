Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task

Implement a complete **User Dashboard system** at:

/profile?tab=personal

This includes:

- Profile management (CRUD)
- Profile image upload
- Payment methods (WITH backend if missing)
- Notifications (WITH backend if missing)
- Password management (forgot/reset/update)
- Recent orders
- Secure logout

---

## Route Structure

Single route:

/profile

Tabs:

- ?tab=personal (default)
- ?tab=orders
- ?tab=payments
- ?tab=notifications
- ?tab=security

---

## Global Security Rules (STRICT)

- User can ONLY access their own data
- DO NOT send userId from frontend
- Backend MUST extract user from session (HTTP-only cookies)

If user tries to modify another user’s data:
- Return 403 Forbidden
- Show error: "Unauthorized action"

---

## 1. Personal Tab (Profile CRUD)

Fields:
- profile image
- name
- email
- address

Features:
- Pre-fill existing data
- Update profile
- Upload profile image

Behavior:
- Validate before submit
- Show success/error feedback
- Preserve state on failure

---

## 2. Orders Tab

- Fetch user orders

Behavior:
- If orders exist → show list
- If NOT → show:
  No orders yet

---

## 3. Payment Methods Tab

IMPORTANT:
If backend endpoints DO NOT exist → YOU MUST CREATE THEM

Backend Requirements:

Base Route:
/api/payment-methods

Endpoints:
- GET /api/payment-methods → get user methods
- POST /api/payment-methods → add method
- PUT /api/payment-methods/:id → update
- DELETE /api/payment-methods/:id → delete

Rules:
- Use authenticated user from cookie
- NEVER accept userId from frontend
- Store ONLY safe payment data:
  - last4
  - provider
  - token/reference

NEVER store full card details

Frontend Behavior:
- Add / list / delete methods
- Handle empty state
- Handle API failures gracefully

---

## 4. Notifications Tab

IMPORTANT:
If backend endpoints DO NOT exist → YOU MUST CREATE THEM

Backend Requirements:

Base Route:
/api/notifications

Endpoints:
- GET /api/notifications
- POST /api/notifications
- PUT /api/notifications/:id/read
- DELETE /api/notifications/:id

Behavior:
- Show notifications list
- Mark as read
- Delete notification

Empty State:
No notifications available

---

## 5. Security Tab

Update Password (Authenticated):
- current password
- new password
- confirm password

---

Forgot Password:

Route:
/forgot-password

- Input: email
- Always return success message

---

Reset Password:

Route:
/reset-password

- token (from URL)
- new password
- confirm password

Behavior:
- On success → redirect /login

IMPORTANT:
If backend does NOT provide UI:
- You MUST create Forgot Password and Reset Password pages

---

## 6. Logout

Behavior:
- Call backend logout endpoint
- Backend clears HTTP-only cookie
- Clear AuthContext
- Redirect → /login

---

## 7. AuthContext Enhancements

State:
- user
- role
- isAuthenticated

Methods:
- updateProfile
- uploadProfileImage
- logout
- updatePassword
- forgotPassword
- resetPassword

---

## 8. API Rules

- No API calls inside components
- Use service layer
- Use environment-based base URL
- Always send credentials (cookies)

---

## 9. Error Handling

Handle:
- 401 Unauthorized
- 403 Forbidden
- Validation errors
- Network failures

UI Fallbacks:
- Preserve form data
- Show retry options
- Disable actions when needed

---

## 10. UI/UX Rules

- Use Tailwind + shadcn
- Do NOT hardcode colors
- Use UIcontext.md

Include:
- Loading states
- Skeletons
- Empty states
- Toast feedback

---

## 11. Architecture Rules

- Pages = containers only
- Components = reusable
- No business logic inside UI
- Use TypeScript everywhere

---

## Expected Outcome

- Fully functional dashboard at /profile
- Backend implemented for payment methods and notifications if missing
- Strict user-only data access
- Clean, scalable, production-ready code