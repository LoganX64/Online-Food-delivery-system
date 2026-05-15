import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, FilterIcon, EyeIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OrderHistory() {
  const [filter, setFilter] = useState("All")

  const orders = [
    { id: "#ORD-7721", restaurant: "Pizza Hut", total: "$42.50", status: "Delivered", items: "2x Pepperoni Pizza, 1x Garlic Bread", date: "Oct 12, 2023" },
    { id: "#ORD-7722", restaurant: "Burger King", total: "$15.00", status: "Processing", items: "1x Whopper Meal, 1x Coke", date: "Oct 15, 2023" },
    { id: "#ORD-7723", restaurant: "KFC", total: "$28.00", status: "Cancelled", items: "1x Family Bucket", date: "Oct 10, 2023" },
    { id: "#ORD-7724", restaurant: "Starbucks", total: "$12.50", status: "Delivered", items: "1x Caramel Macchiato, 1x Croissant", date: "Oct 08, 2023" },
    { id: "#ORD-7725", restaurant: "Subway", total: "$18.20", status: "Delivered", items: "1x Footlong BMT", date: "Oct 05, 2023" },
  ]

  const filteredOrders = filter === "All" 
    ? orders 
    : orders.filter(o => {
        if (filter === "Pending") return o.status === "Processing" || o.status === "Placed"
        if (filter === "Completed") return o.status === "Delivered"
        if (filter === "Cancelled") return o.status === "Cancelled"
        return true
      })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered": return <Badge variant="secondary" className="bg-success-soft text-success hover:bg-success-soft/80 border-success/20">Delivered</Badge>
      case "Processing": return <Badge variant="secondary" className="bg-warning-soft text-warning hover:bg-warning-soft/80 border-warning/20">Processing</Badge>
      case "Cancelled": return <Badge variant="secondary" className="bg-destructive-soft text-destructive hover:bg-destructive-soft/80 border-destructive/20">Cancelled</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Order History</CardTitle>
            <CardDescription>Manage and track your previous orders</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search orders..." className="pl-8 w-[200px] lg:w-[300px]" />
            </div>
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Tabs defaultValue="All" onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Pending">Pending</TabsTrigger>
              <TabsTrigger value="Completed">Completed</TabsTrigger>
              <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead className="hidden lg:table-cell">Order Items</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.restaurant}</TableCell>
                    <TableCell className="hidden lg:table-cell max-w-[300px] truncate text-muted-foreground text-sm">
                      {order.items}
                    </TableCell>
                    <TableCell className="text-sm">{order.date}</TableCell>
                    <TableCell className="font-semibold">{order.total}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <EyeIcon className="h-4 w-4 text-primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No orders found matching your filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex items-center justify-end space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}
