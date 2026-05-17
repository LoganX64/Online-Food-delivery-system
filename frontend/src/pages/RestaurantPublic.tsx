import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { 
  Star, Clock, Truck, MapPin, Phone, Calendar, Heart, 
  ChevronLeft, ShoppingCart, Plus, Minus, Search, 
  Map, ZoomIn, ZoomOut, Compass, StarHalf, MessageSquare,
  History
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { FoodCard } from "@/components/ui/food-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { getCartFromStorage, saveCartToStorage } from "@/utils/cart-storage"
import type { CartItems } from "@/utils/cart-storage"

// Restaurant profiles database
const RESTAURANT_PROFILES: Record<number, any> = {
  1: {
    id: 1,
    name: "Domino's",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    logo: "🍕",
    rating: 4.5,
    cuisine: "Pizza, Italian, Fast Food",
    address: "742 Evergreen Terrace, Sector 15",
    phone: "+1 (555) 019-2834",
    hours: "9:00 AM - 11:00 PM",
    deliveryTime: "25-35 min",
    deliveryFee: "Free delivery",
    description: "Serving piping hot, handcrafted artisanal pizzas loaded with premium ingredients and our signature tomato herb sauce. Order online for instant 30-minute delivery guarantees.",
    mapCoords: { lat: "40.7128° N", lng: "74.0060° W" },
    menu: [
      { id: 1001, name: "Artisanal Margherita Pizza", price: 12.99, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop", type: "veg", description: "Classic fresh mozzarella, robust signature marinara, and sweet basil chiffonade on our hand-tossed sourdough crust." },
      { id: 1002, name: "Double Pepperoni Feast", price: 15.99, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop", type: "non-veg", description: "A double-layered mountain of crispy, curled cup pepperoni over fresh mozzarella and aged parmesan cheeses." },
      { id: 1003, name: "Garlic Butter Parm Breadsticks", price: 5.99, image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=800&auto=format&fit=crop", type: "veg", description: "Baked golden fresh dough twists brushed heavily with warm garlic butter and dusted with dry oregano and parmesan." },
      { id: 1004, name: "Gooey Choco Lava Cake", price: 6.99, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop", type: "veg", description: "Rich chocolate cake crust enclosing a decadent, warm liquid dark Belgian fudge core. Served fresh and warm." }
    ],
    reviews: [
      { id: 1, author: "Sarah Jenkins", rating: 5, date: "2 days ago", comment: "The sourdough crust on the Margherita was absolutely incredible. Super fast delivery!" },
      { id: 2, author: "David Miller", rating: 4, date: "1 week ago", comment: "Consistently hot and flavorful. Love the choco lava cake." }
    ],
    previousOrders: [
      {
        id: "ORD-9824",
        date: "May 12, 2026",
        items: [
          { name: "Double Pepperoni Feast", price: 15.99, quantity: 1, dishId: 1002 },
          { name: "Gooey Choco Lava Cake", price: 6.99, quantity: 1, dishId: 1004 }
        ],
        total: 22.98,
        status: "Delivered"
      },
      {
        id: "ORD-8812",
        date: "April 28, 2026",
        items: [
          { name: "Artisanal Margherita Pizza", price: 12.99, quantity: 2, dishId: 1001 }
        ],
        total: 25.98,
        status: "Delivered"
      }
    ]
  },
  2: {
    id: 2,
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    logo: "🛖",
    rating: 4.2,
    cuisine: "Pizza, Wings, Sides",
    address: "104 Baker Street, Ring Road",
    phone: "+1 (555) 012-7749",
    hours: "10:00 AM - 11:30 PM",
    deliveryTime: "30-40 min",
    deliveryFee: "$1.99 delivery",
    description: "Famous for our original Stuffed Crust and legendary Pan Pizzas. Crafted with premium ingredients and baked to golden perfection. Enjoy our buffalo wings and delicious garlic sides.",
    mapCoords: { lat: "34.0522° N", lng: "118.2437° W" },
    menu: [
      { id: 2001, name: "Original Pan Supreme", price: 16.50, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop", type: "non-veg", description: "Pepperoni, Italian sausage, fresh green peppers, red onions, mushrooms, and black olives." },
      { id: 2002, name: "Buffalo Garlic Wings", price: 10.99, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop", type: "non-veg", description: "Crispy fried bone-in chicken wings tossed heavily in hot buffalo sauce and dusted with garlic." },
      { id: 2003, name: "Cheese Lover's Garlic Bread", price: 6.50, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=800&auto=format&fit=crop", type: "veg", description: "Baguette slices slathered with homemade garlic butter and loaded with melted provolone and mozzarella." }
    ],
    reviews: [
      { id: 1, author: "Michael Chen", rating: 4, date: "3 days ago", comment: "Pan pizza crust is super soft and thick. Wings are extremely juicy!" }
    ],
    previousOrders: [
      {
        id: "ORD-7712",
        date: "May 05, 2026",
        items: [
          { name: "Original Pan Supreme", price: 16.50, quantity: 1, dishId: 2001 },
          { name: "Cheese Lover's Garlic Bread", price: 6.50, quantity: 1, dishId: 2003 }
        ],
        total: 23.00,
        status: "Delivered"
      }
    ]
  },
  3: {
    id: 3,
    name: "KFC",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=1200&auto=format&fit=crop",
    logo: "🍗",
    rating: 4.3,
    cuisine: "Fried Chicken, Burgers",
    address: "55 King's Avenue, Central Crossing",
    phone: "+1 (555) 045-8812",
    hours: "9:30 AM - 10:30 PM",
    deliveryTime: "20-30 min",
    deliveryFee: "Free delivery",
    description: "Taste the legendary original recipe crispy chicken prepared fresh daily. Infused with our secret blend of 11 herbs and spices, cooked to tender, golden crunchiness.",
    mapCoords: { lat: "51.5074° N", lng: "0.1278° W" },
    menu: [
      { id: 3001, name: "10-Pc Original Recipe Bucket", price: 24.99, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop", type: "non-veg", description: "A generous bucket of our signature bone-in chicken breast, thighs, and drumsticks freshly hand-breaded." },
      { id: 3002, name: "Crunchy Chicken Zinger Burger", price: 7.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop", type: "non-veg", description: "Crispy double-breaded chicken breast fillet topped with spicy mayo and shredded iceberg lettuce on a toasted bun." },
      { id: 3003, name: "Loaded Cheese Crinkle Fries", price: 4.99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop", type: "veg", description: "Crinkle-cut golden potatoes drenched in warm cheddar sauce and sprinkled with fresh chives." }
    ],
    reviews: [
      { id: 1, author: "Robert T.", rating: 5, date: "Yesterday", comment: "Extremely crispy, exactly as KFC should be! The bucket was perfect for the family match." }
    ],
    previousOrders: [
      {
        id: "ORD-6624",
        date: "May 10, 2026",
        items: [
          { name: "Crunchy Chicken Zinger Burger", price: 7.99, quantity: 2, dishId: 3002 }
        ],
        total: 15.98,
        status: "Delivered"
      }
    ]
  },
  4: {
    id: 4,
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1552895638-f7fe08d2f715?q=80&w=1200&auto=format&fit=crop",
    logo: "🍔",
    rating: 4.1,
    cuisine: "Burgers, Fries, Shakes",
    address: "208 Broadway Lane, Downtown",
    phone: "+1 (555) 091-6623",
    hours: "7:00 AM - 12:00 AM",
    deliveryTime: "15-25 min",
    deliveryFee: "$0.99 delivery",
    description: "Dedicated to serving delicious, golden french fries and iconic global favorites like the Big Mac and Quarter Pounder with cheese. Fast, friendly, and reliable comfort meals.",
    mapCoords: { lat: "41.8781° N", lng: "87.6298° W" },
    menu: [
      { id: 4001, name: "Double Big Mac Combo", price: 11.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop", type: "non-veg", description: "Two 100% pure beef patties with our signature Big Mac sauce, pickles, lettuce, onions, and processed cheddar." },
      { id: 4002, name: "Large World-Famous Fries", price: 3.49, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop", type: "veg", description: "Cut from whole premium potatoes, fried crisp and golden, salted to mouthwatering perfection." },
      { id: 4003, name: "Premium Vanilla Bean Milkshake", price: 4.50, image: "https://images.unsplash.com/photo-1579954115545-a95591f28bec?q=80&w=800&auto=format&fit=crop", type: "veg", description: "Thick, ultra-creamy vanilla milkshake blended from organic milk and vanilla extract, topped with whipped cream." }
    ],
    reviews: [
      { id: 1, author: "Emma Davis", rating: 4, date: "4 days ago", comment: "French fries were super hot and crispy! Classic Double Big Mac hit the spot perfectly." }
    ],
    previousOrders: [
      {
        id: "ORD-5541",
        date: "May 14, 2026",
        items: [
          { name: "Double Big Mac Combo", price: 11.99, quantity: 1, dishId: 4001 },
          { name: "Large World-Famous Fries", price: 3.49, quantity: 1, dishId: 4002 }
        ],
        total: 15.48,
        status: "Delivered"
      }
    ]
  }
}

// Fallback profile if id not matched
const DEFAULT_PROFILE = {
  id: 1,
  name: "Local Gourmet Bistro",
  image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
  logo: "🍽️",
  rating: 4.4,
  cuisine: "Gourmet, Local Specialties, Clean Eating",
  address: "12 Main St, West Side Avenue",
  phone: "+1 (555) 777-2283",
  hours: "9:00 AM - 10:00 PM",
  deliveryTime: "20-30 min",
  deliveryFee: "Free delivery",
  description: "Experience premium home-style comfort dishes crafted from seasonal organic ingredients sourced directly from local agricultural vendors.",
  mapCoords: { lat: "37.7749° N", lng: "122.4194° W" },
  menu: [
    { id: 9001, name: "Handcrafted Organic Salad", price: 11.50, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop", type: "veg", description: "Organic mixed greens, heirloom tomatoes, roasted walnuts, and pomegranate seed vinaigrette dressing." },
    { id: 9002, name: "Garlic Butter Seared Salmon", price: 19.99, image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=800&auto=format&fit=crop", type: "non-veg", description: "Pan-seared Atlantic salmon fillet with fresh rosemary garlic glaze, served with asparagus." }
  ],
  reviews: [
    { id: 1, author: "James Watson", rating: 5, date: "3 days ago", comment: "The ingredients feel incredibly clean and premium. Perfect salad!" }
  ],
  previousOrders: [
    {
      id: "ORD-1122",
      date: "May 01, 2026",
      items: [
        { name: "Handcrafted Organic Salad", price: 11.50, quantity: 1, dishId: 9001 }
      ],
      total: 11.50,
      status: "Delivered"
    }
  ]
}

export default function RestaurantPublic() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [cartCounts, setCartCounts] = useState<CartItems>({})
  const [activeTab, setActiveTab] = useState("menu")
  const [searchQuery, setSearchQuery] = useState("")
  const [zoomLevel, setZoomLevel] = useState(14)
  const [isLiked, setIsLiked] = useState(false)

  // Fetch target profile
  const restaurantId = id ? parseInt(id, 10) : 1
  const profile = RESTAURANT_PROFILES[restaurantId] || { ...DEFAULT_PROFILE, id: restaurantId, name: id ? decodeURIComponent(id).replace(/-/g, ' ') : DEFAULT_PROFILE.name }

  useEffect(() => {
    // Initial cart load
    setCartCounts(getCartFromStorage())

    // Update dynamically on storage events
    const handleCartUpdate = () => {
      setCartCounts(getCartFromStorage())
    }
    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  const updateCount = (dishId: number, delta: number, dishName: string) => {
    setCartCounts((prev) => {
      const current = prev[dishId] || 0
      const next = current + delta
      let updated: CartItems
      
      if (next <= 0) {
        const { [dishId]: _, ...rest } = prev
        updated = rest
      } else {
        updated = { ...prev, [dishId]: next }
      }
      
      saveCartToStorage(updated)
      
      if (delta > 0) {
        toast.success(`${dishName} added to cart!`, {
          icon: <ShoppingCart className="h-4 w-4 text-primary" />,
          duration: 1500
        })
      }
      return updated
    })
  }

  // Filtered menu search
  const filteredMenu = profile.menu.filter((dish: any) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFavoriteClick = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? "Removed from Favorites" : "Added to Favorites!", {
      description: `${profile.name} added to your personal vault.`
    })
  }

  const handleReorder = (items: any[]) => {
    setCartCounts((prev) => {
      const updated = { ...prev }
      items.forEach((item) => {
        updated[item.dishId] = (updated[item.dishId] || 0) + item.quantity
      })
      saveCartToStorage(updated)
      
      // Dispatch custom cart event to notify other parts of the app
      window.dispatchEvent(new Event("cartUpdated"))
      return updated
    })
    toast.success("Previous order items added to your cart!", {
      icon: <ShoppingCart className="h-4 w-4 text-primary" />,
      description: `Successfully added ${items.length} item(s) to checkout.`
    })
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-10">
      {/* Upper Cover Panel */}
      <div className="relative h-[160px] md:h-[220px] w-full overflow-hidden bg-zinc-950">
        <img
          src={profile.image}
          alt={profile.name}
          className="h-full w-full object-cover opacity-80 brightness-[0.75] transition-all duration-700 hover:scale-105"
        />
        
        {/* Floating actions */}
        <div className="absolute top-3 left-3 z-10">
          <Button 
            onClick={() => navigate(-1)} 
            variant="secondary" 
            size="icon" 
            className="rounded-full shadow-lg bg-white/95 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white border-none transition-all h-8 w-8"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </Button>
        </div>

        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Button 
            onClick={handleFavoriteClick}
            variant="secondary" 
            size="icon" 
            className="rounded-full shadow-lg bg-white/95 backdrop-blur-sm text-foreground hover:text-red-500 border-none transition-all h-8 w-8"
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        {/* Backdrop vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
      </div>

      {/* Overlapping Profile Header Container */}
      <div className="container mx-auto px-4 -mt-10 md:-mt-14 relative z-20">
        <Card className="py-0 border-none shadow-2xl bg-card/95 backdrop-blur-md rounded-[1.25rem] overflow-hidden">
          <CardContent className="p-4 md:p-5">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left w-full md:w-auto">
                {/* Profile Avatar Emblem */}
                <div className="flex size-14 md:size-16 items-center justify-center rounded-xl bg-primary/10 text-2xl shadow-inner border border-primary/20 bg-white shrink-0">
                  {profile.logo}
                </div>
                
                <div className="space-y-1.5 w-full">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground font-heading">
                      {profile.name}
                    </h1>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold uppercase tracking-wider text-[9px] px-1.5 py-0.5 mt-0.5">
                      Open Now
                    </Badge>
                  </div>
                  
                  <p className="text-[11px] md:text-xs font-semibold text-muted-foreground">
                    {profile.cuisine}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 text-[11px] font-bold text-muted-foreground/80 pt-0.5">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{profile.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      <span>{profile.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats metrics */}
              <div className="grid grid-cols-3 gap-2 border-t border-muted md:border-t-0 pt-3.5 md:pt-0 w-full md:w-auto shrink-0 justify-items-center">
                <div className="flex flex-col items-center bg-muted/40 p-1.5 md:p-2 rounded-xl shadow-inner border border-muted/20 w-[80px] md:w-[85px]">
                  <div className="flex items-center gap-0.5 text-green-700 dark:text-emerald-400 font-extrabold text-xs md:text-sm">
                    {profile.rating}
                    <Star className="h-3.5 w-3.5 fill-green-700 text-green-700 dark:fill-emerald-400 dark:text-emerald-400" />
                  </div>
                  <span className="text-[8px] uppercase font-black text-slate-400 tracking-wider mt-0.5">Rating</span>
                </div>
                
                <div className="flex flex-col items-center bg-muted/40 p-1.5 md:p-2 rounded-xl shadow-inner border border-muted/20 w-[80px] md:w-[85px]">
                  <div className="flex items-center gap-0.5 text-foreground font-extrabold text-xs md:text-sm">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>{profile.deliveryTime.split(' ')[0]}</span>
                  </div>
                  <span className="text-[8px] uppercase font-black text-slate-400 tracking-wider mt-0.5">Minutes</span>
                </div>

                <div className="flex flex-col items-center bg-muted/40 p-1.5 md:p-2 rounded-xl shadow-inner border border-muted/20 w-[80px] md:w-[85px]">
                  <div className="flex items-center gap-0.5 text-foreground font-extrabold text-xs md:text-sm truncate justify-center">
                    <Truck className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Free</span>
                  </div>
                  <span className="text-[8px] uppercase font-black text-slate-400 tracking-wider mt-0.5">Delivery</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-muted text-[11px] md:text-xs leading-relaxed text-muted-foreground/90 max-w-4xl text-center md:text-left">
              {profile.description}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Multi-Section Workspace Layout */}
      <div className="container mx-auto px-4 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Left Column: Menu Items list (takes 2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="menu" className="w-full" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between border-b pb-3 mb-6 flex-wrap gap-4">
                <TabsList className="bg-muted/50 p-1 rounded-xl h-11 border w-full max-w-full flex overflow-x-auto justify-start md:justify-center flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <TabsTrigger value="menu" className="shrink-0 rounded-lg h-9 px-4 font-bold text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    📜 Interactive Menu
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="shrink-0 rounded-lg h-9 px-4 font-bold text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    ⭐ Reviews ({profile.reviews.length})
                  </TabsTrigger>
                  <TabsTrigger value="info" className="shrink-0 rounded-lg h-9 px-4 font-bold text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    📍 Location & Hours
                  </TabsTrigger>
                </TabsList>

                {activeTab === "menu" && (
                  <div className="relative w-full sm:w-[220px]">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search dishes..." 
                      className="pl-9 h-9 text-xs bg-card rounded-lg border-muted-foreground/20 focus-visible:ring-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* TABS CONTENT: Menu Items */}
              <TabsContent value="menu" className="space-y-4 outline-none">
                {filteredMenu.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMenu.map((dish: any) => (
                      <FoodCard
                        key={dish.id}
                        image={dish.image}
                        title={dish.name}
                        subtitle={dish.description}
                        topRightBadge={
                          <div className="bg-background/95 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[9px] font-bold flex items-center gap-1 shadow-sm border border-muted/40">
                            <div className={`w-1.5 h-1.5 rounded-full ${dish.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                            {dish.type === 'veg' ? 'Veg' : 'Non-Veg'}
                          </div>
                        }
                        footerLeft={`$${dish.price.toFixed(2)}`}
                        footerRight={
                          cartCounts[dish.id] ? (
                            <div className="flex items-center gap-1.5 bg-primary/10 rounded-full p-0.5 border border-primary/20">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-primary hover:bg-primary/20 hover:text-primary"
                                onClick={() => updateCount(dish.id, -1, dish.name)}
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </Button>
                              <span className="w-3.5 text-center font-bold text-[11px] text-primary">{cartCounts[dish.id]}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-primary hover:bg-primary/20 hover:text-primary"
                                onClick={() => updateCount(dish.id, 1, dish.name)}
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full text-primary border-primary/30 hover:bg-primary hover:text-white transition-all duration-300 px-3 h-7 text-[11px] font-bold gap-1"
                              onClick={() => updateCount(dish.id, 1, dish.name)}
                            >
                              <Plus className="h-2.5 w-2.5" /> Add
                            </Button>
                          )
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center border-2 border-dashed border-muted rounded-[2rem] bg-card/50">
                    <div className="bg-background size-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border">
                      <Search className="size-6 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-black text-foreground">No dishes match search</h3>
                    <p className="text-slate-400 text-xs font-semibold mt-1">Try another search keyword.</p>
                  </div>
                )}
              </TabsContent>

              {/* TABS CONTENT: Reviews */}
              <TabsContent value="reviews" className="space-y-4 outline-none">
                <div className="space-y-4">
                  {profile.reviews.map((review: any) => (
                    <Card key={review.id} className="py-0 border border-muted/50 rounded-2xl shadow-sm bg-card">
                      <CardContent className="p-5 flex gap-4">
                        {/* Avatar initial emblem */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold shadow-inner">
                          {review.author.split(' ').map((n: string) => n[0]).join('')}
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h4 className="text-sm font-bold text-foreground">{review.author}</h4>
                            <span className="text-[10px] font-semibold text-muted-foreground">{review.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3.5 w-3.5 ${i < review.rating ? "fill-primary text-primary" : "text-slate-200"}`} 
                              />
                            ))}
                          </div>

                          <p className="text-xs text-muted-foreground/90 font-medium leading-relaxed pt-1">
                            {review.comment}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* TABS CONTENT: Info & Map Location */}
              <TabsContent value="info" className="space-y-4 outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location card */}
                  <Card className="py-0 border border-muted/50 rounded-xl bg-card">
                    <CardContent className="p-4 space-y-3 flex flex-col justify-between h-full">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          <Compass className="h-4.5 w-4.5 animate-pulse" />
                          <span>Interactive Coordinate Locator</span>
                        </div>
                        
                        <div className="space-y-1.5 text-xs font-semibold text-muted-foreground">
                          <p className="flex justify-between border-b pb-1.5">
                            <span>Latitude:</span>
                            <span className="text-foreground font-mono">{profile.mapCoords.lat}</span>
                          </p>
                          <p className="flex justify-between border-b pb-1.5">
                            <span>Longitude:</span>
                            <span className="text-foreground font-mono">{profile.mapCoords.lng}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Geodetic Datum:</span>
                            <span className="text-foreground font-mono">WGS 84</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-primary/5 border border-primary/10 p-2.5 rounded-xl text-xs font-medium text-primary mt-3">
                        This locator displays coordinates mapped in real-time onto simulated satellite feeds.
                      </div>
                    </CardContent>
                  </Card>

                  {/* Hours card */}
                  <Card className="py-0 border border-muted/50 rounded-xl bg-card">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <Calendar className="h-4.5 w-4.5" />
                        <span>Operational Working Hours</span>
                      </div>

                      <div className="space-y-2 text-xs font-semibold text-muted-foreground">
                        <div className="flex justify-between border-b pb-1.5 text-foreground font-bold">
                          <span>Monday - Sunday:</span>
                          <span>{profile.hours}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5">
                          <span>Delivery Hours:</span>
                          <span>10:00 AM - 10:30 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Holidays Status:</span>
                          <span className="text-amber-600 font-bold">Open (Special Timings)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Simulated Interactive Map */}
                <Card className="py-0 overflow-hidden border border-muted/50 rounded-xl shadow-md bg-card">
                  <div className="p-3 bg-muted/40 border-b flex justify-between items-center flex-wrap gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-foreground">
                      <Map className="h-4 w-4 text-primary" />
                      <span>Live Coordinate Satellite Grid</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Button 
                        onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))} 
                        variant="outline" 
                        size="icon" 
                        className="size-7 rounded-lg bg-background"
                      >
                        <ZoomIn className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        onClick={() => setZoomLevel(prev => Math.max(prev - 1, 10))} 
                        variant="outline" 
                        size="icon" 
                        className="size-7 rounded-lg bg-background"
                      >
                        <ZoomOut className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        onClick={() => setZoomLevel(14)} 
                        variant="outline" 
                        className="h-7 text-[10px] font-bold px-2 rounded-lg bg-background"
                      >
                        Reset Grid
                      </Button>
                    </div>
                  </div>

                  {/* High quality map mock backdrop */}
                  <div className="relative h-[180px] w-full bg-[#1e293b] flex items-center justify-center overflow-hidden">
                    {/* Modern dynamic tech grid lines background */}
                    <div className="absolute inset-0 opacity-15" style={{
                      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                      backgroundSize: `${zoomLevel * 1.5}px ${zoomLevel * 1.5}px`
                    }} />

                    {/* Concentric rings represent zoom level */}
                    <div className="absolute rounded-full border border-primary/25 animate-ping duration-[3000ms] size-32" />
                    <div className="absolute rounded-full border border-primary/10 size-48" style={{ transform: `scale(${zoomLevel / 14})` }} />
                    <div className="absolute rounded-full border border-primary/5 size-80" style={{ transform: `scale(${zoomLevel / 14})` }} />

                    {/* Tech stats coordinates HUD */}
                    <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 p-2.5 rounded-lg text-white font-mono text-[9px] space-y-1">
                      <p className="text-primary font-bold">GRID TRACKING HUD</p>
                      <p>LAT: {profile.mapCoords.lat}</p>
                      <p>LNG: {profile.mapCoords.lng}</p>
                      <p>ZOOM RESOLUTION: {zoomLevel}x</p>
                    </div>

                    {/* Central location marker */}
                    <div className="relative z-10 flex flex-col items-center gap-1 cursor-pointer group">
                      <div className="absolute -top-12 bg-primary text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {profile.name} (Here)
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-xl border-2 border-white animate-bounce">
                        {profile.logo}
                      </div>
                      <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Checkout info / Cart sidebar (takes 1 span) */}
          <div className="space-y-6">
            <Card className="py-0 border border-muted/50 shadow-lg bg-card rounded-2xl">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-extrabold text-lg text-foreground border-b pb-3 flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <span>Previous Orders</span>
                </h3>

                {profile.previousOrders && profile.previousOrders.length > 0 ? (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {profile.previousOrders.map((order: any) => (
                      <div key={order.id} className="p-3.5 bg-muted/40 hover:bg-muted/65 border border-muted/30 rounded-xl space-y-2.5 transition-colors">
                        <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/90">
                          <span>#{order.id}</span>
                          <span>{order.date}</span>
                        </div>
                        
                        <div className="space-y-1">
                          {order.items.map((item: any, idx: number) => (
                            <p key={idx} className="text-xs font-bold text-foreground flex justify-between">
                              <span className="truncate max-w-[140px] md:max-w-[170px]">{item.name}</span>
                              <span className="text-muted-foreground shrink-0 font-medium">x{item.quantity}</span>
                            </p>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-muted/40 flex justify-between items-center text-xs">
                          <span className="font-black text-foreground">${order.total.toFixed(2)}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="bg-emerald-500/10 text-emerald-500 font-extrabold px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider">
                              {order.status}
                            </span>
                            <Button 
                              onClick={() => handleReorder(order.items)} 
                              size="sm" 
                              className="h-6 text-[10px] px-2.5 font-bold rounded-lg bg-primary hover:bg-primary/95 text-white"
                            >
                              Reorder
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground text-xs font-semibold">
                    <History className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2.5" />
                    No previous orders found for this merchant.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick trust badges */}
            <Card className="py-0 border border-muted/50 shadow-sm bg-card rounded-2xl">
              <CardContent className="p-5 space-y-4">
                <h4 className="font-extrabold text-sm text-foreground uppercase tracking-widest text-[10px] text-muted-foreground">Why order from us?</h4>
                
                <div className="space-y-3 text-xs font-semibold text-muted-foreground">
                  <div className="flex gap-3 items-start">
                    <div className="bg-emerald-500/10 text-emerald-500 rounded-lg p-1.5 shrink-0 mt-0.5">
                      <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-foreground font-extrabold">Superb Hygiene Standards</p>
                      <p className="text-[10px] font-medium mt-0.5 text-muted-foreground/80">Certified safe, sanitized kitchen facilities.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="bg-primary/10 text-primary rounded-lg p-1.5 shrink-0 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-foreground font-extrabold">Instant Fresh Guarantee</p>
                      <p className="text-[10px] font-medium mt-0.5 text-muted-foreground/80">Dishes packaged in specialized heat-retention containers.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
