Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **order page** component using:
- React (with React Router)
- Tailwind CSS
- shadcn/ui

## Strict Constraints
- Do NOT implement backend logic
- Do NOT call real APIs
- Do NOT simulate full business flows
- Do NOT add unnecessary features outside scope

## Features to Implement 

### 1. Login Design
- I need little different design for login, signup for User, Restaurant and Admin
- Keep the existing design of user login and signup
- for Restaurant and Admin, use shadcn/ui components to create these pages
- make it look modern and elegant

### 2. Responsiveness
- Mobile-first design
- Works across mobile, tablet, desktop
- No overflow or layout break issues

### 3. Screenshot Matching
- Follow UI reference from:
  `context/screenshot/`
- Match spacing, proportions, and hierarchy

## Project Structure (Frontend Only)

pages/
  Home.tsx

components/
  ui/ (shadcn)

routes/
  index.tsx

ut
ils/
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