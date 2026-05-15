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
- Use `admin-dashboard-page`
- on desktop screen 
  - use `dashboard-01` as a main dashboard and reusable component
  - this will have 4 cards for 4 metrics `Total Orders`, `Total Revenue`, `Total Users`, `Active restaurants`
  - a card show table for Restaurant approval queue
  - on right of approval queue show a card with recent activity
  - at bottom performance charts for orders by month  and revenue by month
  - sidebar will have `Dashboard`,`Orders`,`Restaurants`,`Users`,`Analytics`,`Settings` and at top a button to add restaurant
  - at bottom a logout button
-adding new restuarant process 
  - adding resturant has 3 stages form field `Basic info`,`address`,`Agreement`
  - fields will be for basic info :  "name", "description" ,"email", "password" , "logo","images"(plural)
  - fields will be for address : "addressLine", "city" , "pincode", "state", "country", "phone"
  - In agreement there will be small letter and a checkbox to agree to the terms and conditions
- on click of `Users` tab in sidebar shows user table : "name", "email", "role", "isActive".Has filter,search functionality and pagination.
- on click of `Orders` tab in sidebar shows  order table has fields: "orderId", "customer", "restaurant", "total", "status", "actions".Has filter,search functionality and pagination.
- on click of `Restaurants` tab in sidebar has restaurant table has fields: "name", "email", "phone", "status", "actions".Has filter,search functionality and pagination.
- on click of `Analytics` tab in sidebar shows a dashboard with charts and metrics.
- on click of `Settings` tab in sidebar shows a form with settings.

- on mobile screen 
- make the card show in vertical layout
- at bottom there will be navbar with icons for `Dashboard`,`Orders`,`Restaurants`,`Settings`

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
