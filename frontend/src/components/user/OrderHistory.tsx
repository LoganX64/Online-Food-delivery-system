import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchIcon, FilterIcon, EyeIcon, ShoppingBagIcon } from "lucide-react"
import { orderApi, type Order } from "@/api/order.api"
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

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    orderApi
      .getMyOrders()
      .then(setOrders)
      .catch((err) => {
        toast.error(err?.message || "Failed to load orders")
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = orders.filter((o) => {
    const matchesTab =
      filter === "All"
        ? true
        : filter === "Active"
        ? ["placed", "accepted", "preparing", "out_for_delivery"].includes(o.status)
        : filter === "Delivered"
        ? o.status === "delivered"
        : ["rejected", "cancelled"].includes(o.status)

    const restaurant =
      typeof o.restaurantId === "object" ? o.restaurantId.name : o.restaurantId

    const matchesSearch =
      !search ||
      restaurant.toLowerCase().includes(search.toLowerCase()) ||
      o._id.includes(search)

    return matchesTab && matchesSearch
  })

  const restaurantName = (o: Order) =>
    typeof o.restaurantId === "object" ? o.restaurantId.name : "Restaurant"

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Order History</CardTitle>
            <CardDescription>Track and manage your previous orders</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders…"
                className="pl-8 w-[200px] lg:w-[280px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Tabs defaultValue="All" onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[420px]">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Active">Active</TabsTrigger>
              <TabsTrigger value="Delivered">Delivered</TabsTrigger>
              <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4 text-muted-foreground">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center">
              <ShoppingBagIcon className="h-8 w-8" />
            </div>
            <p className="font-medium">No orders yet</p>
            <p className="text-sm">Your order history will appear here.</p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Order ID</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{order._id.slice(-6).toUpperCase()}
                      </TableCell>
                      <TableCell className="font-medium">{restaurantName(order)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[250px] truncate">
                        {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                      </TableCell>
                      <TableCell className="text-sm">{formatDate(order.createdAt)}</TableCell>
                      <TableCell className="font-semibold">
                        ₹{order.totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EyeIcon className="h-4 w-4 text-primary" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-4">
              {filtered.map((order) => (
                <div key={order._id} className="p-4 rounded-xl border bg-card shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary font-mono text-sm">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div>
                    <h4 className="font-bold">{restaurantName(order)}</h4>
                    <p className="text-xs text-muted-foreground">
                      {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t text-sm">
                    <span className="text-muted-foreground">{formatDate(order.createdAt)}</span>
                    <span className="font-bold text-lg">₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                  <Button variant="outline" className="w-full text-xs" size="sm">
                    <EyeIcon className="h-3 w-3 mr-2" /> View Details
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
