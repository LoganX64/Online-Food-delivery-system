Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **Categories** section component using:
- React (with React Router)
- Tailwind CSS
- shadcn/ui

## Strict Constraints
- Do NOT implement backend logic
- Do NOT call real APIs
- Do NOT simulate full business flows
- Do NOT add unnecessary features outside scope

## Features to Implement

### 1. Categories Section
#### Desktop screen view
- Use `categories`
- Header - Quick Categories
  - Display quick categories: `Pizza`, `Burgers`, `Pasta`, `Desserts`, `Drinks`,`Healthy`
  - Each category should be clickable and display related dishes
  - image as full width and text overlay at bottom left of the image
  - arrow buttons to scroll through categories on the left and right on the categories card 

#### Mobile screen view
- Display quick categories: `Pizza`, `Burgers`, `Pasta`, `Desserts`, `Drinks`,`Healthy`
- Each category should be clickable and display related dishes
- image as full rounded width and below image `category name` in smaller font size 
-categories should be in touch-to-scroll carousel from left to right 

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
  categories.tsx
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
