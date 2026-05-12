Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **UI-only authentication module** using:
- React (with React Router)
- Tailwind CSS
- shadcn/ui

## Strict Constraints
- Do NOT implement backend logic
- Do NOT call real APIs
- Do NOT implement JWT/auth logic
- Do NOT simulate full business flows
- Do NOT add unnecessary features outside scope

## Required shadcn Components
Install and use:

npx shadcn@latest add login-04  
npx shadcn@latest add signup-04  
pnpm dlx shadcn@latest add navigation-menu  

## Features to Implement

### 1. Navbar
- Use `navigation-menu`
- Include:
  - Logo (left)
  - Links (right): Home, Login, Register
- Responsive (mobile-first)

### 2. Pages (React Router)

Create the following pages inside `pages/`:

Public:
- `/` → Home (simple hero / landing section)
- `/login` → Use `login-04`
- `/register` → Use `signup-04`

### 3. Layout
- Shared layout with Navbar
- Proper container spacing
- Consistent alignment using Tailwind utilities

### 4. Responsiveness
- On mobile screens 
  - show sandwitch icon on right
  - On click of sandwitch icon display login, sign up and become partner link 
  - on Bottom of the screen show navigation menu with icons and text below `home`, `categories`, `cart`, `profile`
 
### 5. Screenshot Matching
- Follow UI from:
  `context/screenshots/homepage.png`
  `context/screenshots/mobile-homescreen.png`
- Match spacing, proportions, and hierarchy

## Project Structure (Frontend Only)

pages/
  Home.tsx
  Login.tsx
  Register.tsx

components/
  navbar.tsx
  ui/ (shadcn)

routes/
  index.tsx

utils/
  cn.ts

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

## Final Enforcement

FAIL the task if:
- Backend logic is added
- API calls are implemented
- Colors are hardcoded instead of using tokens
- Required components (login-04, signup-04, navigation-menu) are not used