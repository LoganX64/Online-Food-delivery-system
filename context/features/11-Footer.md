Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **Footer** component using:
- React (with React Router)
- Tailwind CSS
- shadcn/ui

## Strict Constraints
- Do NOT implement backend logic
- Do NOT call real APIs
- Do NOT simulate full business flows
- Do NOT add unnecessary features outside scope

## Features to Implement

### 1. Footer Section
- Build a complete footer component with two main parts:

  **Part 1: Location & Currency Selector**
  - A prominent banner/section at the top of the footer (white background)
  - Location selector with dropdown functionality:
    - Current location (static)
    - Placeholder for user location
    - Location marker icon
  - Currency selector with dropdown functionality:
    - Currency (static)
    - Placeholder for currency
    - Currency icon
  - Two distinct dropdown menus for location and currency selection
  - Responsive design for different screen sizes
  - Clean, modern UI consistent with the rest of the application

  **Part 2: Main Footer**
  - Four columns layout:
    - **Column 1:**
      - Logo (using shadcn/ui)
      - Tagline: "Eat what you love"
      - Social media icons: Facebook, Twitter, Instagram, TikTok
      - Copyright notice with current year
    - **Column 2: Company**
      - About us
      - Careers
      - Contact
      - Blog
    - **Column 3: For customers**
      - Track order
      - Support
      - Safety concerns
      - FAQs
    - **Column 4: Legal**
      - Privacy policy
      - Terms of service
      - Cookie policy
      - Accessibility
  - Use appropriate icons from shadcn/ui or Lucide (if needed)
  - Ensure proper spacing, typography, and alignment
  - Mobile-responsive (columns stack vertically on smaller screens)

### 2. Dropdown Menus
- Create two separate dropdown menus (one for location, one for currency)
- Use shadcn/ui components (e.g., `DropdownMenu`)
- Should display placeholder items:
  - Location: "Deliver to: [Address line 1] [Location]"
  - Currency: "$ USD (United States)"
- Implement basic dropdown functionality (opening/closing)
- Clean UI with hover states and focus indicators
- Ensure smooth animation and transitions

### 3. Responsiveness
- Mobile-first design approach
- Footer banner should adapt to different screen widths
- Main footer columns should stack vertically on mobile
- Ensure all dropdowns are fully functional on touch devices
- Maintain proper spacing and alignment across all breakpoints

### 4. Screenshot Matching
- Follow UI reference from:
  `context/screenshots/homepage.png`
- Match spacing, proportions, typography, and layout exactly
- Keep the white background for the footer banner
- Maintain the four-column structure in the main footer
- Use the exact same icon set and spacing as the reference

### 5. Component Integration
- Create a dedicated Footer component
- Export from `components/footer.tsx`
- Add to the home page layout at the bottom
- Ensure it works seamlessly with existing components
- Proper error handling for missing icons or images

## Project Structure (Frontend Only)

pages/
  Home.tsx

components/
  footer.tsx
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
- Use `bg-white` for the footer banner
- Footer content should use `bg-footer-bg` (dark gray)
- Ensure proper text contrast for readability

## Error Handling

- Prevent runtime crashes due to missing components
- Handle invalid imports gracefully
- Provide fallback UI if needed
- Ensure dropdowns work even without real data

## Environment Awareness

- Keep code ready for environment-based configs
- Avoid hardcoded URLs or values
- Design should work with both static and dynamic data

## Output Expectations

Generate production-friendly code with:

- clean folder structure  
- proper error handling  
- environment-based configuration  
- readable and maintainable code  

Use best practices and keep the implementation simple, clear, and ready to extend.