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
pnpm dlx shadcn@latest add progress



## Features to Implement 
### 1. User Dashboard Page
- Use `user-dashboard-page`
- on desktop screen 
  - use `dashboard-01` as a main dashboard and reusable component
  - My Accounts card on left contains `Personal info`,`Order History`,`Saved Addresses`,`Payment Methods`,`Notifications`
- Personal Info fields: `name`, `email`, `phone`, `profile image`. A card right shows address and edit. below the card recent orders.
- order history in table with fields: `orderId`, `restaurant name`, `total`, `status`,`order items`
- payment methods  in cards with fields: `card name`, `card number`, `expiry date`, `cvv` and save button
- saved addresses in cards with fields: `addressLine`, `city`, `pincode`, `state`, `country`, `phone` and save button
- notification in cards with fields: `title`, `message`, `date`, `time`, `status` and a delete button
 
- on mobile screen 
- make the card show in vertical layout
- at bottom there will be navbar with icons for `Home`,`Search`,`My Orders`,`Profile`
- for orders sections has a Filter options `Pending`,`Completed`,`Cancelled`


### 2. Pages (React Router) 

Create the following pages inside `pages/`:

Public:
- `/` → Home (landing page)
- `/restaurant-dashboard` → restaurant Dashboard Page

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
