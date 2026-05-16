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
pnpm dlx shadcn@latest add sheet
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add label
pnpm dlx shadcn@latest add avatar
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add toast

## Features to Implement 
### 1. Restaurant Dashboard Page
- Use `restaurant-dashboard-page`
- on desktop screen 
  - use `dashboard-01` as a main dashboard 
  - sidebar links : `Dashboard`, `Live Orders`, `Menu editor`, `Orders history`,`Settings`
  - dashboard cards: 
      - `Today's order count` 
      - `Total Revenue`
      - `Daily Revenue`
      - `Active deliveries`
    - recent order table 
      - `Order ID`
      - `Customer`
      - `Date`
      - `Status`
      - `Total`
    - top selling items table
      - `Item Name`
      - `Category`
      - `Quantity Sold`
      - `Total Revenue`
  - live Orders section 
    - a card `live` with order status
      - order id
      - customer name 
      - note 
      - order items  
      - total amount 
      - two buttons reject or accept buttons
    -second card `Preparing`
      - a card with order details 
      - order id
      - customer name 
      - note 
      - order items  
      - total amount 
      - two buttons reject or accept buttons
    -third card `Ready for Pickup`
      - a card with order details 
      - order id
      - customer name 
      - note 
      - order items  
      - total amount 
      - button `Handed Off`
  - Order History
    - a table with order details 
      - order id
      - customer name 
      - note 
      - order items  
      - total amount 
  - settings page 
    - account information 
      - name 
      - email 
      - phone number 
      - address 
      - city 
      - state 
      - zip code 
      - country 
    
- on mobile screen 
- Navbar at bottom with this fields :
   Dashboard 
   Live Orders 
   Orders history
   Settings
- make the card show in vertical layout
- Top performing items 
- sandwitch icon on top left of main navbar with fields : 
  `Dashboard`, `Live Orders`, `Menu editor`, `Orders history`,`Settings`
  when sandwitch icon is clicked menu should open from left side
- live orders cards should show in vertical layout on mobile screen with cards titling as : 
  `Live`, `Preparing`, `Ready for Pickup`  

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
