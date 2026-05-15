import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit2Icon, MapPinIcon } from "lucide-react"

export function PersonalInfo() {
  const recentOrders = [
    { id: "#ORD-7721", restaurant: "Pizza Hut", total: "$42.50", status: "Delivered", date: "Oct 12, 2023" },
    { id: "#ORD-7722", restaurant: "Burger King", total: "$15.00", status: "Processing", date: "Oct 15, 2023" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Personal Info Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
            <Button variant="ghost" size="icon">
              <Edit2Icon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6 py-4">
              <Avatar className="h-24 w-24 border-4 border-primary/10">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 text-center sm:text-left">
                <h3 className="text-2xl font-semibold">John Doe</h3>
                <p className="text-muted-foreground">johndoe@example.com</p>
                <p className="text-muted-foreground">+1 (555) 000-0000</p>
                <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="secondary">Customer</Badge>
                  <Badge variant="outline">Member since 2023</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Default Address Card (Card Right) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Default Address</CardTitle>
            <Button variant="link" className="p-0 h-auto text-primary">Edit</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Home</p>
                <p className="text-muted-foreground">123 Food Street, Delicious Avenue</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
                <p className="text-muted-foreground">United States</p>
              </div>
            </div>
            <Button variant="outline" className="w-full text-xs" size="sm">Manage All Addresses</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders (Below) - Hidden on mobile, accessible via My Orders tab */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your latest food adventures</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.restaurant}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={order.status === "Delivered" ? "bg-success-soft text-success hover:bg-success-soft/80 border-success/20" : "bg-warning-soft text-warning hover:bg-warning-soft/80 border-warning/20"}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm" className="text-primary font-medium">View All Orders</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
