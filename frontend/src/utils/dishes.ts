export interface Dish {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  type: string;
  image: string;
  category?: string;
  rating?: number;
  description?: string;
}

export const DISHES: Dish[] = [
  // 1-12 from menus-page
  { 
    id: 1, 
    name: "Artisanal Margherita Pizza", 
    restaurant: "Domino's", 
    price: 12.99, 
    type: "veg", 
    category: "Pizza", 
    rating: 4.5,
    description: "Classic fresh mozzarella, robust signature marinara, and sweet basil chiffonade on our hand-tossed sourdough crust.",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    name: "Classic Veggie Burger", 
    restaurant: "Burger King", 
    price: 8.99, 
    type: "veg", 
    category: "Burger", 
    rating: 4.2,
    description: "Flame-grilled signature plant-based patty topped with melted cheddar, crisp lettuce, tomatoes, and tangy pickles.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    name: "Double Pepperoni Feast", 
    restaurant: "Pizza Hut", 
    price: 15.99, 
    type: "non-veg", 
    category: "Pizza", 
    rating: 4.4,
    description: "A double-layered mountain of crispy, curled cup pepperoni over fresh mozzarella and aged parmesan cheeses.",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    name: "Crunchy Chicken Zinger Burger", 
    restaurant: "KFC", 
    price: 7.99, 
    type: "non-veg", 
    category: "Burger", 
    rating: 4.3,
    description: "Crispy double-breaded chicken breast fillet topped with spicy mayo and shredded iceberg lettuce on a toasted bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    name: "Paneer Butter Masala", 
    restaurant: "Tandoor Express", 
    price: 13.50, 
    type: "veg", 
    category: "Indian", 
    rating: 4.6,
    description: "Cottage cheese cubes simmered in a rich, buttery, tomato-cashew cream gravy infused with aromatic fenugreek leaves.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946cb0?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 6, 
    name: "Chicken Tikka Masala", 
    restaurant: "Spice Route", 
    price: 15.50, 
    type: "non-veg", 
    category: "Indian", 
    rating: 4.5,
    description: "Tender boneless chicken thigh chunks char-grilled in a clay oven and cooked in our famous spiced tomato gravy.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 7, 
    name: "Spicy Tuna Roll", 
    restaurant: "Sushi Master", 
    price: 18.00, 
    type: "non-veg", 
    category: "Sushi", 
    rating: 4.7,
    description: "Chop-grade yellowfin tuna tossed in house sriracha aioli, rolled with pickled cucumber and dusted with black sesame.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 8, 
    name: "Premium Caesar Salad", 
    restaurant: "Green Leaf", 
    price: 9.50, 
    type: "veg", 
    category: "Healthy", 
    rating: 4.1,
    description: "Crispy romaine hearts tossed in robust creamy garlic dressing, shaved grana padano, and garlic-herb baguettini croutons.",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 9, 
    name: "Grilled Salmon Bowl", 
    restaurant: "Ocean Catch", 
    price: 22.99, 
    type: "non-veg", 
    category: "Healthy", 
    rating: 4.7,
    description: "Char-grilled Atlantic salmon fillet over black organic quinoa, steamed avocado, edamame, and ginger-miso glaze.",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 10, 
    name: "Gooey Choco Lava Cake", 
    restaurant: "Domino's", 
    price: 6.99, 
    type: "veg", 
    category: "Dessert", 
    rating: 4.6,
    description: "Rich chocolate cake crust enclosing a decadent, warm liquid dark Belgian fudge core. Served fresh and warm.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 11, 
    name: "Strawberry Waffle Scoop", 
    restaurant: "Baskin Robbins", 
    price: 8.50, 
    type: "veg", 
    category: "Dessert", 
    rating: 4.4,
    description: "A freshly pressed golden waffle bowl loaded with wild strawberry cream scoop, strawberry syrup, and fresh berries.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 12, 
    name: "Classic Garlic Breadsticks", 
    restaurant: "Pizza Hut", 
    price: 5.99, 
    type: "veg", 
    category: "Pizza", 
    rating: 4.2,
    description: "Baked golden fresh dough twists brushed heavily with garlic butter and dusted with oregano.",
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=800&auto=format&fit=crop" 
  },

  // Domino's (id: 1001-1004)
  { 
    id: 1001, 
    name: "Artisanal Margherita Pizza", 
    restaurant: "Domino's", 
    price: 12.99, 
    type: "veg", 
    category: "Pizza", 
    description: "Classic fresh mozzarella, robust signature marinara, and sweet basil chiffonade on our hand-tossed sourdough crust.",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 1002, 
    name: "Double Pepperoni Feast", 
    restaurant: "Domino's", 
    price: 15.99, 
    type: "non-veg", 
    category: "Pizza", 
    description: "A double-layered mountain of crispy, curled cup pepperoni over fresh mozzarella and aged parmesan cheeses.",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 1003, 
    name: "Garlic Butter Parm Breadsticks", 
    restaurant: "Domino's", 
    price: 5.99, 
    type: "veg", 
    category: "Pizza", 
    description: "Baked golden fresh dough twists brushed heavily with warm garlic butter and dusted with dry oregano and parmesan.",
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 1004, 
    name: "Gooey Choco Lava Cake", 
    restaurant: "Domino's", 
    price: 6.99, 
    type: "veg", 
    category: "Dessert", 
    description: "Rich chocolate cake crust enclosing a decadent, warm liquid dark Belgian fudge core. Served fresh and warm.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop" 
  },

  // Pizza Hut (id: 2001-2003)
  { 
    id: 2001, 
    name: "Original Pan Supreme", 
    restaurant: "Pizza Hut", 
    price: 16.50, 
    type: "non-veg", 
    category: "Pizza", 
    description: "Pepperoni, Italian sausage, fresh green peppers, red onions, mushrooms, and black olives.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 2002, 
    name: "Buffalo Garlic Wings", 
    restaurant: "Pizza Hut", 
    price: 10.99, 
    type: "non-veg", 
    category: "Wings", 
    description: "Crispy fried bone-in chicken wings tossed heavily in hot buffalo sauce and dusted with garlic.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 2003, 
    name: "Cheese Lover's Garlic Bread", 
    restaurant: "Pizza Hut", 
    price: 6.50, 
    type: "veg", 
    category: "Sides", 
    description: "Baguette slices slathered with homemade garlic butter and loaded with melted provolone and mozzarella.",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=800&auto=format&fit=crop" 
  },

  // KFC (id: 3001-3003)
  { 
    id: 3001, 
    name: "10-Pc Original Recipe Bucket", 
    restaurant: "KFC", 
    price: 24.99, 
    type: "non-veg", 
    category: "Chicken", 
    description: "A generous bucket of our signature bone-in chicken breast, thighs, and drumsticks freshly hand-breaded.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 3002, 
    name: "Crunchy Chicken Zinger Burger", 
    restaurant: "KFC", 
    price: 7.99, 
    type: "non-veg", 
    category: "Burger", 
    description: "Crispy double-breaded chicken breast fillet topped with spicy mayo and shredded iceberg lettuce on a toasted bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 3003, 
    name: "Loaded Cheese Crinkle Fries", 
    restaurant: "KFC", 
    price: 4.99, 
    type: "veg", 
    category: "Sides", 
    description: "Crinkle-cut golden potatoes drenched in warm cheddar sauce and sprinkled with fresh chives.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop" 
  },

  // McDonald's (id: 4001-4003)
  { 
    id: 4001, 
    name: "Double Big Mac Combo", 
    restaurant: "McDonald's", 
    price: 11.99, 
    type: "non-veg", 
    category: "Burger", 
    description: "Two 100% pure beef patties with our signature Big Mac sauce, pickles, lettuce, onions, and processed cheddar.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 4002, 
    name: "Large World-Famous Fries", 
    restaurant: "McDonald's", 
    price: 3.49, 
    type: "veg", 
    category: "Sides", 
    description: "Cut from whole premium potatoes, fried crisp and golden, salted to mouthwatering perfection.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 4003, 
    name: "Premium Vanilla Bean Milkshake", 
    restaurant: "McDonald's", 
    price: 4.50, 
    type: "veg", 
    category: "Dessert", 
    description: "Thick, ultra-creamy vanilla milkshake blended from organic milk and vanilla extract, topped with whipped cream.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bec?q=80&w=800&auto=format&fit=crop" 
  },

  // Default Profile (id: 9001-9002) - used by restaurants 5-12 as fallback
  { 
    id: 9001, 
    name: "Handcrafted Organic Salad", 
    restaurant: "Local Gourmet Bistro", 
    price: 11.50, 
    type: "veg", 
    category: "Healthy", 
    description: "Organic mixed greens, heirloom tomatoes, roasted walnuts, and pomegranate seed vinaigrette dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 9002, 
    name: "Garlic Butter Seared Salmon", 
    restaurant: "Local Gourmet Bistro", 
    price: 19.99, 
    type: "non-veg", 
    category: "Healthy", 
    description: "Pan-seared Atlantic salmon fillet with fresh rosemary garlic glaze, served with asparagus.",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=800&auto=format&fit=crop" 
  }
];
