Read `AGENTS.md` before starting. If `AGENTS.md` is present, follow it strictly.

## Task
Build a **Menus Page** component for a restaurant that:
- Displays a restaurant header with banner image, logo, rating, and delivery info
- Shows two tabs: **Menu** and **Reviews**
- Menu tab displays items categorized by type (Appetizers, Main Courses, Beverages, Desserts)
- Each menu item shows name, description, price, and image
- Reviews tab shows customer reviews with rating and comment
- Supports horizontal scrolling for menu items on desktop
- Mobile-responsive layout

## Required shadcn Components
Install and use:

pnpm shadcn@latest add card
pnpm shadcn@latest add tabs
pnpm shadcn@latest add button
pnpm shadcn@latest add avatar
pnpm shadcn@latest add badge


## Strict Constraints
- Do NOT implement backend logic
- Do NOT call real APIs
- Do NOT simulate full business flows
- Do NOT add unnecessary features outside scope

## Features to Implement

### 1. Restaurant Header
- Banner image at the top (4:3 aspect ratio)
- Restaurant logo positioned on the banner image
- Restaurant name (e.g., "Domino's Pizza") above the banner
- Rating section (e.g., 4.5 ★) to the right of the logo
- Delivery time and delivery fee to the right of rating
- Smooth transitions and hover effects
- Clean, modern design matching the application's style

### 2. Tabs Navigation
- Create a tabbed interface with two tabs:
  - **Menu** (default selected)
  - **Reviews**
- Use shadcn/ui `Tabs` component
- Tabs should be visually distinct and easy to click
- Active tab should be highlighted
- Mobile-responsive: tabs should remain functional on touch devices

### 3. Menu Tab Content
- Display menu items organized by categories:
  - Appetizers
  - Main Courses
  - Beverages
  - Desserts
- Each category should have a clear heading
- Menu items should be displayed in a grid or list format:
  - Left side: Item name and description
  - Right side: Item image
  - Below: Price (e.g., $12.99)
- Desktop: Horizontal scroll for menu items within each category
- Mobile: Vertical list for menu items
- Add hover effects to menu items (scale effect, shadow)
- Support for two-item grid layout on tablet
- Use appropriate spacing and typography

### 4. Reviews Tab Content
- Display customer reviews with:
  - Avatar/initials of the reviewer
  - Reviewer name (e.g., "Sarah Johnson")
  - Rating (e.g., 5 stars)
  - Review comment (2-3 sentences)
- Show 3 reviews by default
- "Load more reviews" button at the bottom
- Mobile-responsive display
- Professional and clean card layout

### 5. Responsiveness
- Mobile-first design approach
- Banner should adjust to different screen widths
- Tabs should be fully functional on touch devices
- Menu categories should stack vertically on mobile
- Menu items should display in two-column grid on tablet
- Use appropriate media queries for different breakpoints
- Maintain consistent spacing and alignment across all devices

### 6. Data Structure
- Use static mock data (no real API calls)
- Menu items structure:
  ```typescript
  interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  }
  ```
- Reviews structure:
  ```typescript
  interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    avatar?: string;
  }
  ```
- Ensure data is well-formatted and easy to display

### 7. Screenshot Matching
- Follow UI reference from:
  `context/screenshots/menus-page.png`
- Match spacing, proportions, typography, and layout exactly
- Maintain consistent colors and design elements
- Ensure smooth transitions and hover effects
- Use the same icon styles and positioning as the reference

### 8. Component Integration
- Create a dedicated Menus Page component
- Export from `components/menus-page.tsx`
- Add to the home page layout at the bottom
- Ensure it works seamlessly with existing components
- Proper error handling for missing images or data

## Environment Awareness
- Keep code ready for environment-based configs
- Avoid hardcoded URLs or values
- Design should work with both static and dynamic data
- Provide clear separation between UI and mock data

## Output Expectations
Generate production-friendly code with:

- Clean folder structure
- Proper error handling
- Environment-based configuration
- Readable and maintainable code

Use best practices and keep the implementation simple, clear, and ready to extend.
