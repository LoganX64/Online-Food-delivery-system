import { useState } from "react"
import { Filter, Clock, CheckCircle2, XCircle, ChevronLeft, ChevronRight, PackageSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dummy data for orders
const ORDERS = [
  {
    id: "ORD-98234",
    restaurant: "Domino's Pizza",
    date: "May 14, 2026, 7:30 PM",
    total: 24.99,
    status: "in_progress",
    items: "1x Margherita Pizza, 1x Garlic Bread, 2x Coke",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ORD-98230",
    restaurant: "Spice Route",
    date: "May 12, 2026, 1:15 PM",
    total: 35.50,
    status: "delivered",
    items: "2x Chicken Tikka Masala, 2x Garlic Naan",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ORD-98190",
    restaurant: "Burger King",
    date: "May 08, 2026, 8:45 PM",
    total: 18.99,
    status: "delivered",
    items: "2x Whopper Meal, 1x Onion Rings",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ORD-98145",
    restaurant: "Sushi Master",
    date: "May 01, 2026, 6:20 PM",
    total: 45.00,
    status: "cancelled",
    items: "1x Spicy Tuna Roll, 1x Dragon Roll, 2x Miso Soup",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ORD-98102",
    restaurant: "Green Leaf",
    date: "Apr 25, 2026, 12:00 PM",
    total: 15.50,
    status: "delivered",
    items: "1x Caesar Salad, 1x Green Smoothie",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop"
  }
]

export function OrderPage() {
  const [desktopFilter, setDesktopFilter] = useState("all")
  const [mobileTab, setMobileTab] = useState("active")

  // Filter logic
  const filteredOrders = ORDERS.filter(order => {
    // Desktop filtering
    if (window.innerWidth >= 768) {
      if (desktopFilter === "all") return true
      if (desktopFilter === "in_progress") return order.status === "in_progress"
      if (desktopFilter === "delivered") return order.status === "delivered"
      if (desktopFilter === "cancelled") return order.status === "cancelled"
    } 
    // Mobile filtering (Active vs Past)
    else {
      if (mobileTab === "active") return order.status === "in_progress"
      if (mobileTab === "past") return order.status === "delivered" || order.status === "cancelled"
    }
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> In Progress</Badge>
      case "delivered":
        return <Badge variant="default" className="bg-green-600 hover:bg-green-700 flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Delivered</Badge>
      case "cancelled":
        return <Badge variant="destructive" className="flex items-center gap-1.5"><XCircle className="h-3.5 w-3.5" /> Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track, manage and view your order history.</p>
        </div>

        {/* Mobile Toggle (Visible only on small screens) */}
        <div className="md:hidden flex bg-muted p-1 rounded-xl mb-6">
          <Button 
            variant={mobileTab === "active" ? "default" : "ghost"} 
            className={`flex-1 rounded-lg font-bold ${mobileTab === "active" ? "shadow-sm" : ""}`}
            onClick={() => setMobileTab("active")}
          >
            Active Orders
          </Button>
          <Button 
            variant={mobileTab === "past" ? "default" : "ghost"} 
            className={`flex-1 rounded-lg font-bold ${mobileTab === "past" ? "shadow-sm" : ""}`}
            onClick={() => setMobileTab("past")}
          >
            Past Orders
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:flex flex-col w-64 shrink-0 sticky top-24">
            <div className="bg-card p-5 rounded-xl border shadow-sm flex flex-col space-y-2">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" /> Filters
              </h3>
              
              <Button 
                variant={desktopFilter === "all" ? "default" : "ghost"} 
                className={`justify-start font-medium text-sm w-full ${desktopFilter === "all" ? "" : "text-muted-foreground hover:bg-muted/50"}`}
                onClick={() => setDesktopFilter("all")}
              >
                All Orders
              </Button>
              <Button 
                variant={desktopFilter === "in_progress" ? "default" : "ghost"} 
                className={`justify-start font-medium text-sm w-full ${desktopFilter === "in_progress" ? "" : "text-muted-foreground hover:bg-muted/50"}`}
                onClick={() => setDesktopFilter("in_progress")}
              >
                Orders in Progress
              </Button>
              <Button 
                variant={desktopFilter === "delivered" ? "default" : "ghost"} 
                className={`justify-start font-medium text-sm w-full ${desktopFilter === "delivered" ? "" : "text-muted-foreground hover:bg-muted/50"}`}
                onClick={() => setDesktopFilter("delivered")}
              >
                Delivered
              </Button>
              <Button 
                variant={desktopFilter === "cancelled" ? "default" : "ghost"} 
                className={`justify-start font-medium text-sm w-full ${desktopFilter === "cancelled" ? "" : "text-muted-foreground hover:bg-muted/50"}`}
                onClick={() => setDesktopFilter("cancelled")}
              >
                Cancelled
              </Button>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1 w-full space-y-4 sm:space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-card border border-dashed border-muted-foreground/30 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
                <div className="bg-muted p-4 rounded-full mb-4">
                  <PackageSearch className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No orders found</h3>
                <p className="text-muted-foreground max-w-md">You don't have any orders matching the selected filter.</p>
              </div>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex items-start sm:items-center justify-between mb-4 pb-4 border-b border-dotted border-gray-200">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-foreground">
                        <span role="img" aria-label="package">📦</span> {order.restaurant}
                      </h2>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{order.id} • {order.date}</p>
                    </div>
                    <div className="shrink-0 mt-1 sm:mt-0">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={order.image}
                          alt={order.restaurant}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg text-foreground line-clamp-1">Order Items</h3>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mt-0.5">{order.items}</p>
                        <p className="text-primary font-black mt-1.5 text-sm sm:text-base">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 pt-3 sm:pt-0 border-t border-dotted border-gray-200 sm:border-0">
                      {order.status === "in_progress" && (
                        <Button className="w-full sm:w-auto rounded-full px-6 h-10 font-bold shadow-sm">
                          Track Order
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <Button variant="outline" className="w-full sm:w-auto rounded-full px-6 h-10 font-bold text-primary border-primary/20 hover:bg-primary/5">
                          Reorder
                        </Button>
                      )}
                      {order.status === "cancelled" && (
                        <Button variant="secondary" className="w-full sm:w-auto rounded-full px-6 h-10 font-bold">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Pagination */}
            {filteredOrders.length > 0 && (
              <div className="flex justify-center items-center gap-2 pt-8 pb-4">
                <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl" disabled>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="default" size="icon" className="w-10 h-10 rounded-xl font-bold">1</Button>
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl font-bold">2</Button>
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl font-bold">3</Button>
                <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
