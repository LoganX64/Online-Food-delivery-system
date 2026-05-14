import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FoodCard } from "@/components/ui/food-card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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

export function CartPage() {
  const navigate = useNavigate()
  const [cartCounts, setCartCounts] = useState<CartItems>(getCartFromStorage)
  const [coupon, setCoupon] = useState("")

  const updateCount = (id: number, delta: number) => {
    const dishName = DISHES.find(d => d.id === id)?.name ?? "Item"
    setCartCounts((prev) => {
      const current = prev[id] || 0
      const next = current + delta
      let updated: CartItems

      if (next <= 0) {
        const { [id]: _, ...rest } = prev
        updated = rest
        toast(`${dishName} removed from cart`, {
          icon: <Trash2 className="h-4 w-4 text-destructive" />,
        })
        if (Object.keys(updated).length === 0) {
          toast("Your cart is now empty", {
            icon: <ShoppingCart className="h-4 w-4" />,
          })
        }
      } else {
        updated = { ...prev, [id]: next }
        if (delta > 0) {
          toast(`${dishName} quantity increased`, {
            icon: <Plus className="h-4 w-4 text-primary" />,
          })
        } else {
          toast(`${dishName} quantity decreased`, {
            icon: <Minus className="h-4 w-4 text-primary" />,
          })
        }
      }

      saveCartToStorage(updated)
      return updated
    })
  }

  const removeItem = (id: number) => {
    const currentCount = cartCounts[id] || 0
    if (currentCount > 0) {
      updateCount(id, -currentCount)
    }
  }

  const addToCart = (id: number) => {
    const dishName = DISHES.find(d => d.id === id)?.name ?? "Item"
    setCartCounts((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 }
      saveCartToStorage(updated)
      toast(`${dishName} added to cart`, {
        icon: <ShoppingCart className="h-4 w-4 text-primary" />,
      })
      return updated
    })
  }

  const cartItemsList = DISHES.filter(d => cartCounts[d.id] > 0).map(d => ({
    ...d,
    quantity: cartCounts[d.id]
  }))

  const groupedItems = cartItemsList.reduce((acc, item) => {
    if (!acc[item.restaurant]) acc[item.restaurant] = []
    acc[item.restaurant].push(item)
    return acc
  }, {} as Record<string, typeof cartItemsList>)

  const recommendations = DISHES.filter(d => !cartCounts[d.id]).slice(0, 4)

  const subtotal = cartItemsList.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = subtotal > 0 ? 2.99 : 0
  const tax = subtotal * 0.05
  const total = subtotal + deliveryFee + tax

  if (Object.keys(cartCounts).length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="bg-muted p-6 rounded-full mb-6">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven't added any items to your cart yet. Explore our menus to find your next favorite meal!
        </p>
        <Link to="/menus">
          <Button size="lg" className="rounded-full px-8">
            Browse Menus <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-6xl pb-32 lg:pb-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-foreground">Your Cart</h1>
          <p className="text-muted-foreground text-sm md:text-base font-mono tracking-wider">Review your items before proceeding to checkout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Side: Restaurant Cards */}
          <div className="lg:col-span-7 xl:col-span-8 order-1 space-y-8">
            {Object.entries(groupedItems).map(([restaurantName, items]) => (
              <div key={restaurantName} className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold flex items-center gap-2 pb-2 text-foreground">
                  <span role="img" aria-label="fork and knife">🍴</span> {restaurantName}
                </h2>
                <div className="space-y-0">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4 py-5 border-b border-dotted border-gray-300 last:border-0 last:pb-0">
                      <div className="relative shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg text-foreground line-clamp-1">{item.name}</h3>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1 mt-0.5">Classic preparation</p>
                        <p className="text-primary font-black mt-1 text-sm sm:text-base">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-3 bg-primary/10 rounded-full px-1.5 py-1.5 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full text-primary hover:bg-primary/20 hover:text-primary transition-colors"
                          onClick={() => updateCount(item.id, -1)}
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <span className="w-5 sm:w-6 text-center font-bold text-sm sm:text-base text-primary">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full text-primary hover:bg-primary/20 hover:text-primary transition-colors"
                          onClick={() => updateCount(item.id, 1)}
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 order-3 lg:order-2">
            <Card className="shadow-lg border-0 bg-white rounded-3xl lg:sticky lg:top-24 overflow-hidden">
              <CardHeader className="pb-5 bg-gray-50/50 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6 px-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Promo Code"
                      className="pl-10 rounded-2xl bg-gray-50 border-gray-200 h-12 text-base"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="rounded-2xl h-12 bg-primary/10 text-primary border-0 hover:bg-primary/20 font-bold px-6" onClick={() => {
                    if (coupon) toast("Coupon applied successfully!", { icon: <Ticket className="h-4 w-4 text-primary" /> })
                  }}>
                    Apply
                  </Button>
                </div>

                <div className="space-y-4 text-sm font-mono text-gray-500">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-gray-900">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Taxes & Fees</span>
                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="pt-5 border-t border-dotted border-gray-300 flex justify-between items-end">
                  <span className="font-bold text-lg text-gray-800">Total</span>
                  <span className="font-black text-3xl text-primary tracking-tight">${total.toFixed(2)}</span>
                </div>
              </CardContent>

              {/* Desktop Checkout Button */}
              <CardFooter className="pb-6 px-6 hidden lg:flex flex-col gap-3">
                <Button className="w-full text-lg h-14 rounded-2xl shadow-md font-bold flex justify-between items-center px-6" onClick={() => {
                  navigate("/checkout")
                }}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <p className="text-center text-xs text-gray-400 mt-2">By proceeding, you agree to our Terms of Service.</p>
              </CardFooter>
            </Card>
          </div>

          {/* Recommendations Section */}
          {recommendations.length > 0 && (
            <div className="lg:col-span-12 order-2 lg:order-3 mt-4 lg:mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground hidden sm:block">Recommended Add-ons</h2>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:hidden">Complete Your Meal</h2>
              </div>

              {/* Horizontal scroll for mobile, grid for desktop */}
              <div 
                className="flex overflow-x-auto pb-4 sm:grid sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {recommendations.map(dish => (
                  <FoodCard
                    key={dish.id}
                    image={dish.image}
                    title={dish.name}
                    subtitle={dish.restaurant}
                    className="min-w-[220px] sm:min-w-0"
                    footerLeft={`$${dish.price.toFixed(2)}`}
                    footerRight={
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full h-9 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-bold transition-colors"
                        onClick={() => addToCart(dish.id)}
                      >
                        + Add
                      </Button>
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Fixed Footer */}
      <div className="lg:hidden fixed bottom-[60px] md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-mono font-medium tracking-wide">TOTAL</span>
          <span className="font-black text-2xl text-primary leading-none mt-1">${total.toFixed(2)}</span>
        </div>
        <Button className="h-14 rounded-2xl shadow-md font-bold px-8 flex items-center gap-2" onClick={() => {
          navigate("/checkout")
        }}>
          Checkout <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
