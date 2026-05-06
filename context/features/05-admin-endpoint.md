Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Requirements

### 1) Admin Module

- `GET /admin/restaurants` — Get all restaurants (paginated)
  - Should allow filtering by `isApproved` status
  - Should return comprehensive restaurant details
  - Should only be allowed for admin users
- `POST /admin/restaurants/:id/approve` — Approve a restaurant
  - Set `isApproved = true`
  - Set `isActive = true` (if not already)
  - Update `updatedAt` timestamp
  - Should only be allowed for admin users
- `POST /admin/restaurants/:id/reject` — Reject a restaurant
  - Set `isApproved = false`
  - Keep `isActive = false`
  - Update `updatedAt` timestamp
  - Should only be allowed for admin users
- `PUT /admin/restaurants/:id/deactivate` — Deactivate a restaurant
  - Set `isActive = false`
  - Restaurant will not be visible to customers
  - Should only be allowed for admin users

---

### 2) Output Expectations

Generate production-friendly code with:

* clean folder structure
* proper error handling
* environment-based configuration
* readable and maintainable code

Use best practices and keep the implementation simple, clear, and ready to extend.
