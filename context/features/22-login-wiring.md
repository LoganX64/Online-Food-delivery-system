Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task

Implement a complete authentication and authorization system for a React + TypeScript application using JWT stored in HTTP-only cookies and React Context for state management.

### Authentication Flow
- Connect the login page to a backend authentication endpoint.
- On successful login:
  - Backend sets JWT in HTTP-only cookies.
  - Frontend updates authentication state via React Context.
- Do not store tokens in localStorage or sessionStorage.

### User Roles
Support role-based access for:
- customer
- restaurant
- admin

Role should be obtained from backend response and managed in the auth state.

### Routing Behavior
- Login page remains publicly accessible.
- After login:
  - customer → Home page
  - restaurant → Restaurant Dashboard
  - admin → Admin Dashboard

### Checkout Access Control
- When a non-authenticated user attempts to access the checkout page:
  - Redirect to login page.
  - After successful login, redirect back to the checkout page.

### Protected Routes
- Protect all dashboard and sensitive routes:
  - Admin dashboard
  - Restaurant dashboard
  - Checkout and other user-specific pages

- Behavior:
  - If not authenticated → redirect to login
  - If authenticated but unauthorized role → show fallback/unauthorized UI

### State Management (React Context)
- Implement AuthContext to manage:
  - user data
  - authentication status
  - role
  - loading state

- Context should:
  - Validate session on app load via backend (e.g., `/me` endpoint)
  - Provide login and logout methods
  - Maintain session using cookies

### API Integration
- Abstract all API calls into a service layer.
- Use environment-based configuration for API base URL.
- Ensure requests include credentials (cookies).

### Error Handling
- Handle:
  - Invalid login attempts
  - Expired sessions
  - Missing or invalid authentication state

- Provide fallback UI for:
  - Unauthorized access
  - Loading states
  - API failures

### Navigation Handling
- Store intended route before redirecting to login.
- After login, safely redirect the user back to the original route.

## Code Rules (Must Follow)

- No API calls inside components
- No business logic inside UI
- Components must be reusable
- Pages act as containers only
- Use TypeScript everywhere

## Styling Rules

- Use Tailwind + shadcn
- Do NOT hardcode colors
- Use design tokens from `UIcontext.md`
- Maintain consistent spacing and typography

## Error Handling

- Prevent runtime crashes due to missing components
- Handle invalid imports gracefully
- Provide fallback UI if needed

## Environment Awareness

- Keep code ready for environment-based configs
- Avoid hardcoded URLs or values

## Output Expectations

Generate production-friendly code with:

* clean folder structure  
* proper error handling  
* environment-based configuration  
* readable and maintainable code  

Use best practices and keep the implementation simple, clear, and ready to extend.