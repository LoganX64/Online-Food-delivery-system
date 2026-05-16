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


## Required shadcn Components
pnpm dlx shadcn@latest add dashboard-01
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add pagination
pnpm dlx shadcn@latest add badge

## Features to Implement 
### 1. Admin Dashboard Page
- **Desktop Layout**:
  - Uses `SidebarProvider` with a sticky header.
  - Left-side `AdminSidebar` containing:
    - **Back to Home** button (top of menu).
    - **Quick Actions**: "Add Restaurant" primary button in header.
    - **Navigation**: Dashboard, Orders, Restaurants, Users, Analytics, Settings.
    - **Footer**: Logout button.
  - **Main Content**:
    - 4 metric cards: Total Orders, Total Revenue, Total Users, Active Restaurants.
    - Restaurant approval queue (table).
    - Recent activity card.
    - Performance charts (Orders and Revenue by month).
- **Mobile Layout**:
  - **Sticky Top Header**: Displays current tab title and a hamburger menu (`SidebarTrigger`) to access the full sidebar.
  - **Bottom Navbar**: Fixed footer with icons for Dashboard, Orders, Restaurants, and Settings.
  - Cards and tables stack vertically for small screens.

### 2. Pages (React Router)

Create the following pages inside `pages/`:

Public:
- `/` → Home (landing page)
- `/admin-dashboard` → Admin Dashboard Page

### 3. Layout 
- Proper container spacing
- Consistent alignment using Tailwind utilities

### 4. Responsiveness
- Mobile-first design
- Works across mobile, tablet, desktop
- No overflow or layout break issues

### 5. Screenshot Matching
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
