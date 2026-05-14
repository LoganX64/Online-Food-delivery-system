import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Edit2, MapPin, CreditCard, Wallet, Banknote, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { getCartFromStorage } from "@/utils/cart-storage"

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

export function CheckoutPage() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [instructions, setInstructions] = useState("")

  const cartCounts = getCartFromStorage()

  const cartItemsList = DISHES.filter(d => cartCounts[d.id] > 0).map(d => ({
    ...d,
    quantity: cartCounts[d.id]
  }))

  const subtotal = cartItemsList.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = subtotal > 0 ? 2.99 : 0
  const tax = subtotal * 0.05
  const total = subtotal + deliveryFee + tax

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!", {
      description: "You can track your order in the 'Orders' section."
    })
    // Navigate or clear cart logic could go here
  }

  const PaymentOption = ({ id, icon: Icon, title, description }: any) => {
    const isSelected = paymentMethod === id
    return (
      <div
        onClick={() => setPaymentMethod(id)}
        className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50 bg-background"
          }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSelected ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
            <h4 className={`font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>{title}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-6xl pb-32 lg:pb-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted shrink-0 -ml-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-foreground">Checkout</h1>
              <p className="text-muted-foreground text-sm md:text-base font-mono tracking-wider">Review your items before proceeding to checkout.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Delivery & Payment */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">

            {/* Delivery Details Card */}
            <Card className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <CardHeader className="pb-4 border-b border-gray-50 bg-gray-50/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> Delivery Details
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-full h-8 px-3">
                    <Edit2 className="h-4 w-4 mr-2" /> Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-bold text-foreground mb-1">Home Address</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    123 Main Street, Apt 4B<br />
                    New York, NY 10001<br />
                    +1 (555) 123-4567
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <label htmlFor="instructions" className="text-sm font-semibold text-foreground block">
                    Delivery Instructions (Optional)
                  </label>
                  <Input
                    id="instructions"
                    placeholder="E.g., Leave at the door, ring the bell..."
                    className="rounded-xl border-muted bg-gray-50 h-12"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Card */}
            <Card className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <CardHeader className="pb-4 border-b border-gray-50 bg-gray-50/30">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <PaymentOption
                  id="card"
                  icon={CreditCard}
                  title="Credit / Debit Card"
                  description="Pay securely with your bank card"
                />
                <PaymentOption
                  id="cash"
                  icon={Banknote}
                  title="Cash on Delivery"
                  description="Pay with cash when your order arrives"
                />
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <Card className="shadow-lg border-0 bg-white rounded-3xl lg:sticky lg:top-28 overflow-hidden">
              <CardHeader className="pb-5 bg-gray-50/50 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-foreground">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="pt-6 space-y-6 px-6">
                {/* Items List (Simplified) */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                  {cartItemsList.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-muted">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-bold text-sm shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  {cartItemsList.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty.</p>
                  )}
                </div>

                <div className="border-t border-dotted border-gray-300" />

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm font-mono text-gray-500">
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

                <div className="pt-4 border-t border-dotted border-gray-300 flex justify-between items-end">
                  <span className="font-bold text-lg text-gray-800">Total</span>
                  <span className="font-black text-3xl text-primary tracking-tight">${total.toFixed(2)}</span>
                </div>
              </CardContent>

              {/* Desktop Checkout Button */}
              <CardFooter className="pb-6 px-6 hidden lg:block">
                <Button
                  className="w-full text-lg h-14 rounded-2xl shadow-md font-bold"
                  onClick={handlePlaceOrder}
                  disabled={cartItemsList.length === 0}
                >
                  Place Your Order
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Footer */}
      <div className="lg:hidden fixed bottom-[60px] md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex flex-col gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40">
        <Button
          className="w-full h-14 rounded-2xl shadow-md font-bold text-base"
          onClick={handlePlaceOrder}
          disabled={cartItemsList.length === 0}
        >
          Place Your Order • ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  )
}
