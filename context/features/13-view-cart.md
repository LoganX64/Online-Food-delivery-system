Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **cart page** component using:
- React (with React Router)
- Tailwind CSS
- shadcn/ui

## Strict Constraints
- Do NOT implement backend logic
- Do NOT call real APIs
- Do NOT simulate full business flows
- Do NOT add unnecessary features outside scope

## Required shadcn Components
pnpm shadcn@latest add input
pnpm shadcn@latest add button
pnpm shadcn@latest add select
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add checkbox
pnpm dlx shadcn@latest add spinner
pnpm dlx shadcn@latest add slider
pnpm dlx shadcn@latest add sonner
 
## Features to Implement 

### 1. Cart Page
- Use `cart-page`
- on desktop screen 
  - on top text `your cart` on left and below this text `review your items before processing to checkout`
 -below this will a separate cards for food items from each restaurant following the restaurant name and below there food items added in the card option to remove items from cart and add using - and + . This will take 3/4 of the screen width
 - right of the restaurant cards is Order summary in a card with option to apply coupon code and proceed to checkout button 
  - below this two card, at the bottom there will be recommendations for food items based on user's cart  with the restaurant name.
- on mobile screen 
  - show all the cards vertically one after another
  - starting with the restaurant name and then food items added in the card option to remove items from cart and add using - and + . 
  - then recommended items in card view with the restaurant name and order summary in a card with option to apply coupon code and proceed to checkout button in a card 
- use local storage to store cart items 
- use toast notifications to show messages to the user on adding or removing items from cart and also if there are no items in the cart  

### 2. Pages (React Router)

Create the following pages inside `pages/`:

Public:
- `/` → Home (landing page)S
- `/cart` → Cart Page

### 3. Layout
- Proper container spacing
- Consistent alignment using Tailwind utilities

### 4. Responsiveness
- Mobile-first design
- Works across mobile, tablet, desktop
- No overflow or layout break issues

### 5. Screenshot Matching
- Follow UI reference from:
  `context/screenshot/carts-screen.png` and `context/screenshot/carts-screen-mobile.png` 
- Match spacing, proportions, and hierarchy

## Project Structure (Frontend Only)

pages/
  Home.tsx

components/
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
