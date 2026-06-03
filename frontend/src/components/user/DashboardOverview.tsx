import { useState, useEffect, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPinIcon, ShoppingBagIcon, EyeIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { orderApi, type Order } from "@/api/order.api"
import { addressApi, type Address } from "@/api/address.api"
import { PersonalInfo } from "./PersonalInfo"
import { toast } from "sonner"

const STATUS_MAP: Record<Order["status"], { label: string; className: string }> = {
  created:          { label: "Created",          className: "bg-muted text-muted-foreground" },
  placed:           { label: "Placed",            className: "bg-blue-100 text-blue-700" },
  accepted:         { label: "Accepted",          className: "bg-indigo-100 text-indigo-700" },
  preparing:        { label: "Preparing",         className: "bg-yellow-100 text-yellow-700" },
  out_for_delivery: { label: "Out for Delivery",  className: "bg-orange-100 text-orange-700" },
  delivered:        { label: "Delivered",         className: "bg-green-100 text-green-700" },
  rejected:         { label: "Rejected",          className: "bg-red-100 text-red-700" },
  cancelled:        { label: "Cancelled",         className: "bg-destructive/10 text-destructive" },
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const s = STATUS_MAP[status] ?? { label: status, className: "" }
  return <Badge variant="secondary" className={s.className}>{s.label}</Badge>
}

export function DashboardOverview({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null)
  const [loadingAddress, setLoadingAddress] = useState(true)

  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    addressApi.getAll()
      .then((addresses) => {
        const def = addresses.find(a => a.isDefault) || addresses[0] || null;
        setDefaultAddress(def)
      })
      .catch((err) => console.error("Failed to load addresses", err))
      .finally(() => setLoadingAddress(false))

    orderApi.getMyOrders()
      .then((orders) => {
        setRecentOrders(orders.slice(0, 3)) // Get top 3 recent orders
      })
      .catch((err) => console.error("Failed to load orders", err))
      .finally(() => setLoadingOrders(false))
  }, [])

  const restaurantName = (o: Order) =>
    typeof o.restaurantId === "object" ? o.restaurantId.name : "Restaurant"

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* 1. Personal Info */}
      <div className="col-span-1">
        <PersonalInfo />
      </div>

      {/* 2. Default Address */}
      <div className="col-span-1 h-full">
        {loadingAddress ? (
          <Skeleton className="h-full min-h-[250px] w-full rounded-xl" />
        ) : defaultAddress ? (
          <Card className="h-full flex flex-col border-primary/50 ring-1 ring-primary/20">
            <CardHeader className="pb-2 flex-row items-center justify-between flex flex-col gap-0">
              <div className="flex items-center gap-2 capitalize">
                <MapPinIcon className="size-4 text-primary" />
                <CardTitle className="text-xl font-bold">{defaultAddress.label} Address</CardTitle>
                {defaultAddress.isDefault && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] h-5 px-2">Default</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between flex flex-col gap-4">
              <div className="text-sm flex flex-col gap-1">
                <p className="font-medium text-foreground text-lg">{defaultAddress.addressLine}</p>
                <p className="text-muted-foreground text-base">{defaultAddress.city}, {defaultAddress.state} {defaultAddress.pincode}</p>
              </div>
              <Button variant="outline" className="w-full" onClick={() => onTabChange("addresses")}>
                Manage Addresses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex flex-col justify-center items-center py-10 bg-muted/20 border-dashed">
            <MapPinIcon className="size-10 text-muted-foreground mb-3" />
            <p className="font-medium text-muted-foreground mb-1">No default address</p>
            <Button variant="link" onClick={() => onTabChange("addresses")} className="text-primary">
              Add an address
            </Button>
          </Card>
        )}
      </div>

      {/* 3. Recent Orders */}
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex flex-col gap-0 pb-4">
            <div>
              <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
            </div>
            <Button variant="ghost" className="text-primary" onClick={() => onTabChange("orders")}>
              View All Orders
            </Button>
          </CardHeader>
          <CardContent>
            {loadingOrders ? (
              <div className="flex flex-col gap-3">
                {[1, 2].map((i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-muted-foreground">
                <ShoppingBagIcon className="size-8 mb-2" />
                <p className="font-medium">No recent orders</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{restaurantName(order)}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                      </p>
                      <span className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="font-bold text-lg">₹{order.totalAmount.toFixed(2)}</span>
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => onTabChange("orders")}>
                        <EyeIcon className="size-3 mr-1" /> View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
