import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, ChevronDown, Plus, Minus, ChevronLeft, ChevronRight, SlidersHorizontal, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FoodCard } from "@/components/ui/food-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { getCartFromStorage, saveCartToStorage } from "@/utils/cart-storage"
import type { CartItems } from "@/utils/cart-storage"

const DISHES = [
  { id: 1, name: "Margherita Pizza", restaurant: "Domino's", price: 12.99, type: "veg", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Chicken Tikka Masala", restaurant: "Spice Route", price: 15.50, type: "non-veg", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Classic Veggie Burger", restaurant: "Burger King", price: 8.99, type: "veg", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Spicy Tuna Roll", restaurant: "Sushi Master", price: 18.00, type: "non-veg", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Paneer Butter Masala", restaurant: "Tandoor Express", price: 13.50, type: "veg", image: "https://images.unsplash.com/photo-1631452180519-c014fe946cb0?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Grilled Salmon", restaurant: "Ocean Catch", price: 22.99, type: "non-veg", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "Caesar Salad", restaurant: "Green Leaf", price: 9.50, type: "veg", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "Beef Steak", restaurant: "The Grill", price: 28.00, type: "non-veg", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop" },
]

const CATEGORIES = ["Pizza", "Burger", "Sushi", "Indian", "Healthy", "Dessert"]

export function MenusPage() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get("category")

  const [cartCounts, setCartCounts] = useState<CartItems>(getCartFromStorage)
  const [sortValue, setSortValue] = useState("rating")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) {
      setSelectedCategories((prev) => prev.includes(cat) ? prev : [...prev, cat])
    }
  }, [searchParams])

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const updateCount = (id: number, delta: number) => {
    const dishName = DISHES.find(d => d.id === id)?.name ?? "Item"
    setCartCounts((prev) => {
      const current = prev[id] || 0
      const next = current + delta
      let updated: CartItems
      if (next <= 0) {
        const { [id]: _, ...rest } = prev
        updated = rest
      } else {
        updated = { ...prev, [id]: next }
      }
      saveCartToStorage(updated)
      if (delta > 0) {
        toast(dishName + " added to cart", {
          icon: <ShoppingCart className="h-4 w-4 text-primary" />,
          duration: 2000,
        })
      }
      return updated
    })
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-lg">Dietary</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="veg" />
            <label htmlFor="veg" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Vegetarian
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="non-veg" />
            <label htmlFor="non-veg" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Non-Vegetarian
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-lg">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-lg">Price Range</h3>
        <Slider defaultValue={[50]} max={100} step={1} className="mt-6" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>$0</span>
          <span>$100+</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left Sidebar (Desktop) */}
        <div className="hidden md:flex flex-col w-64 shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for dishes..." className="pl-9 bg-muted/50 border-0" />
          </div>

          <div className="bg-card p-5 rounded-xl border shadow-sm">
            <FilterContent />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-6">

          {/* Mobile Top Controls */}
          <div className="md:hidden flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for dishes..." className="pl-9 bg-muted/50 border-0" />
            </div>

            <div className="flex gap-3">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="flex-1 bg-background shadow-sm border-muted-foreground/20">
                    Sort <ChevronDown className="ml-2 w-4 h-4 text-muted-foreground" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Sort by</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 space-y-4 pb-8">
                    {["Price", "Rating", "Best Seller"].map((opt) => (
                      <div key={opt} className="flex items-center justify-between" onClick={() => setSortValue(opt.toLowerCase())}>
                        <label className="text-sm font-medium">{opt}</label>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${sortValue === opt.toLowerCase() ? 'border-primary' : 'border-input'}`}>
                          {sortValue === opt.toLowerCase() && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 bg-background shadow-sm border-muted-foreground/20">
                    Filter <SlidersHorizontal className="ml-2 w-4 h-4 text-muted-foreground" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px]">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterContent />
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Top Controls & Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Food Items <span className="text-muted-foreground font-normal text-lg">(Veg & Non-Veg)</span></h2>

            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              <Select defaultValue="rating">
                <SelectTrigger className="w-[160px] bg-background">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="best">Best Seller</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DISHES.map((dish) => (
              <FoodCard
                key={dish.id}
                image={dish.image}
                title={dish.name}
                subtitle={dish.restaurant}
                className="border-0 bg-transparent sm:bg-card"
                topRightBadge={
                  <div className="bg-background/95 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                    <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${dish.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {dish.type === 'veg' ? 'Veg' : 'Non-Veg'}
                  </div>
                }
                footerLeft={`$${dish.price.toFixed(2)}`}
                footerRight={
                  cartCounts[dish.id] ? (
                    <div className="flex items-center gap-2 sm:gap-3 bg-primary/10 rounded-full px-1 sm:px-1.5 py-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 sm:h-7 sm:w-7 rounded-full text-primary hover:bg-primary/20 hover:text-primary"
                        onClick={() => updateCount(dish.id, -1)}
                      >
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <span className="w-3 sm:w-4 text-center font-bold text-sm text-primary">{cartCounts[dish.id]}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 sm:h-7 sm:w-7 rounded-full text-primary hover:bg-primary/20 hover:text-primary"
                        onClick={() => updateCount(dish.id, 1)}
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-primary border-primary/30 hover:bg-primary hover:text-white transition-colors h-8 sm:h-9 text-xs sm:text-sm"
                      onClick={() => updateCount(dish.id, 1)}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1.5 mr-1" /> Add
                    </Button>
                  )
                }
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 pt-10 pb-4">
            <Button variant="outline" size="icon" className="w-9 h-9" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="default" size="icon" className="w-9 h-9 font-medium">1</Button>
            <Button variant="ghost" size="icon" className="w-9 h-9 font-medium">2</Button>
            <Button variant="ghost" size="icon" className="w-9 h-9 font-medium">3</Button>
            <Button variant="outline" size="icon" className="w-9 h-9">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
