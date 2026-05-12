Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **hero section** component using:
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

npx shadcn@latest add input

## Features to Implement

### 1. Hero Section
- Use `hero-section`
- Include:
  - Full width image
    - inside this a card with the following information:
      - Title - discover your next craving
      - subtitle - Fresh ingredients, bold flavors, and unforgettable meals await.
      - Search bar - type to search for dishes
      - Current location - select your location 
      - Search Button - Find Food
- on mobile screen hide the hero section image 
  - location icon with text `delivering to [location]` and below this text `show the addresses` with an arrow down
  - search bar `search for dishes` and `Find Food` button 

### 2. Pages (React Router)

Create the following pages inside `pages/`:

Public:
- `/` → Home (landing page)

### 3. Layout
- Proper container spacing
- Consistent alignment using Tailwind utilities

### 4. Responsiveness
- Mobile-first design
- Works across mobile, tablet, desktop
- No overflow or layout break issues

### 5. Screenshot Matching
- Follow UI reference from:
  `context/screenshot`
- Match spacing, proportions, and hierarchy

## Project Structure (Frontend Only)

pages/
  Home.tsx

components/
  hero-section.tsx
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