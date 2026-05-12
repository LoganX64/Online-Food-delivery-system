Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **Restaurants** section component using:
- React (with React Router)
- Tailwind CSS
- shadcn/ui

## Required shadcn Components
Install and use:

npx shadcn@latest add card

## Strict Constraints
- Do NOT implement backend logic
- Do NOT call real APIs
- Do NOT simulate full business flows
- Do NOT add unnecessary features outside scope

## Features to Implement

### 1. Restaurants Section
- Use `restaurants`
- Header - Popular Restaurants
  - Display quick restaurants: `Domino's`, `Pizza Hut`, `KFC`, `McDonald's`, `Burger King`, `Subway`, `Pizza Inn`, `KFC`
  - Each restaurant should be clickable and display related restaurant images with heart icon on the top-right corner of the image
  - image full space of the card with rounded corners no space between image and top and on top left corner of  image add small box with `popular`,`new`,`free delivery` (any one of them)
  - arrow buttons to scroll through restaurants on the left and right on the restaurant card and align center to the card.
  - below the image the restaurant name and on top right corner of the name add rating (4-5 stars )and on same line below that types of dishes they serve in the restaurant 
  - below that delivery time and delivery fee or free delivery text
- `See All` link with underline and a arrow on the right
- On mobile screen 
  - display one single column cards with touch to scroll vertical list of  restaurants 
  - display the restaurant images as full width and rounded corners. take full space of card
  - below image the restaurant name and on top right corner of the name add rating (4-5 stars )and on same line below that types of dishes they serve in the restaurant 
  - top right corner button with heart icon no text and top left corner small box with text `popular`,`new`,`free delivery` (any one of them) and below that delivery time and delivery fee or free delivery text  
  - On touch of restaurant image  show the related restaurants 

### 3. Layout
- Proper container spacing
- Consistent alignment using Tailwind utilities

### 4. Responsiveness
- Mobile-first design
- Works across mobile, tablet, desktop
- No overflow or layout break issues

### 5. Screenshot Matching
- Follow UI reference from:
  `context/screenshots/homepage.png`
- Match spacing, proportions, and hierarchy

## Project Structure (Frontend Only)

pages/
  Home.tsx

components/
  restaurants.tsx
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