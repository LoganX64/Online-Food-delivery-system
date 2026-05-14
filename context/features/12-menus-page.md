Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **menus page** component using:
- React (with React Router)
- Tailwind CSS
- shadcn/ui

## Strict Constraints
- Do NOT implement backend logic
- Do NOT call real APIs
- Do NOT simulate full business flows
- Do NOT add unnecessary features outside scope

## Required shadcn Components
Install and use:

pnpm shadcn@latest add input
pnpm shadcn@latest add button
pnpm shadcn@latest add select
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add checkbox
pnpm dlx shadcn@latest add spinner
pnpm dlx shadcn@latest add slider
pnpm dlx shadcn@latest add sonner

## Features to Implement 

### 1. Menus Page
- Use `menus-page`
- on desktop screen 
  -on left there will be filter options and on right there will be menus cards in grid 
  - on top of filter options show a `search bar` for search for dishes
  - on top of menus cards show `sort` and `filter` options 
  - same line of sort and filter options show a `heading` for food items e.g `Veg Non-Veg`  or  selected items of user
  - pagination at the bottom of the page
 
- on mobile screen 
  - on this screen navbar should have a back button `arrow button` on left of logo
  - below navbar show a search bar `search for dishes` and 
  - below search bar show `sort` and `filter` options 
  - on click of filter button open a new screen with filter options 
  - on click of sort button open a drawer from below with sort options based on `price`,`rating` and `isBestSeller`

- for food cards
  - image with border radius
  - text area to put label `veg` or `non-veg`  in top  right corner of the image 
  -  below image on left there will be dish name and below the name restaurant name
  - below the name restaurant name there is price and same line on right of price add `add to cart` button with `+` icon  
  -   on click of + icon increase the count of the item in the cart and on right of it  show a `+` and `-` button to increase or decrease the count of the item in the cart 
  - on adding item to cart show a notification message on top of page saying `item added to cart` and on left of notification show a  cart icon
  - for now store cart items in local storage not in state management

### 2. Pages (React Router)

Create the following pages inside `pages/`:

Public:
- `/` → Home (landing page)
- `/menus` → Menus Page

### 3. Layout
- Proper container spacing
- Consistent alignment using Tailwind utilities

### 4. Responsiveness
- Mobile-first design
- Works across mobile, tablet, desktop
- No overflow or layout break issues

### 5. Screenshot Matching
- Follow UI reference from:
  `context/screenshot/menus-screen.png`
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