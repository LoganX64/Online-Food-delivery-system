Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task

Extend the existing authentication system by implementing a complete registration flow for both customers and restaurant owners, along with role-aware logout handling.

### Registration Flow

#### Customer Registration
- Create a registration page for customers.
- Connect the form to the backend registration endpoint.
- Required fields (validate with backend):
  - name
  - email
  - password
  - confirm password

#### Behavior
- On successful registration:
  - Show success feedback
  - Redirect user to login page
- Do NOT log the user in automatically after registration

---

#### Restaurant Owner Registration (Multi-Step)

Implement a 2-step registration flow:

##### Step 1: Account Information
- name
- email
- password
- confirm password

##### Step 2: Restaurant Details
- Fetch required fields from backend and match exactly
- Typical fields may include:
  - restaurant name
  - address
  - phone number
  - cuisine type
  - description
  - opening hours
  - optional media (logo/image)

⚠️ If backend requirements are unclear or missing, request confirmation before implementation.

#### Behavior
- Maintain state across steps
- Validate each step before proceeding
- On final submission:
  - Show success message
  - Redirect to login page
- Do NOT log the restaurant owner in automatically

---

### Login Redirection (Enhancement)

After successful login, redirect users based on role:

- customer → Home page
- restaurant → Restaurant Dashboard
- admin → Admin Dashboard

---

### Logout Handling

Implement logout functionality for all roles:

- customer
- restaurant
- admin

#### Behavior
- Call backend logout endpoint
- Clear authentication state from React Context
- Ensure cookies are invalidated via backend
- Redirect user to login page

---

### Protected Flow Consistency

- Registration pages remain publicly accessible
- After logout:
  - User must not access protected routes
- Ensure role-based route protection remains intact

---

### State Management (React Context)

Extend existing AuthContext to:

- Maintain:
  - user data
  - role
  - authentication status
- Provide:
  - registerCustomer method
  - registerRestaurant method
  - logout method
- Do NOT store tokens in localStorage/sessionStorage
- Rely only on HTTP-only cookies

---

### API Integration

- Add registration endpoints to service layer
- Use environment-based API base URL
- Ensure all requests include credentials (cookies)

---

### Error Handling

- Handle:
  - Duplicate email or account conflicts
  - Validation errors (frontend + backend)
  - Multi-step submission failures
  - Network/API failures

- Provide fallback UI for:
  - Step form errors (preserve entered data)
  - Submission failures
  - Missing backend fields
  - Unauthorized actions after logout

---

### Navigation Handling

- Registration routes:
  - `/register` → Customer registration
  - `/register/restaurant` → Restaurant registration

- Redirect rules:
  - After registration → `/login`
  - After logout → `/login`

- Ensure:
  - No unintended auto-login after registration
  - Clean navigation between steps in multi-step form

---

## Code Rules (Must Follow)

- No API calls inside components
- No business logic inside UI
- Components must be reusable
- Pages act as containers only
- Use TypeScript everywhere

---

## Styling Rules

- Use Tailwind + shadcn
- Do NOT hardcode colors
- Use design tokens from `UIcontext.md`
- Maintain consistent spacing and typography

---

## Error Handling

- Prevent runtime crashes due to missing components
- Handle invalid imports gracefully
- Provide fallback UI if needed

---

## Environment Awareness

- Keep code ready for environment-based configs
- Avoid hardcoded URLs or values

---

## Output Expectations

Generate production-friendly code with:

* clean folder structure  
* proper error handling  
* environment-based configuration  
* readable and maintainable code  

Use best practices and keep the implementation simple, clear, and ready to extend.