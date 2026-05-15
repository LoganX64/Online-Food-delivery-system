import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function OrderManagement() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View all orders across the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search orders..." className="max-w-sm" />
            <Button variant="outline">Filter</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#ORD-1024</TableCell>
                <TableCell>Alice Johnson</TableCell>
                <TableCell>Pizza Palace</TableCell>
                <TableCell>$45.00</TableCell>
                <TableCell><Badge>Preparing</Badge></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">View</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#ORD-1025</TableCell>
                <TableCell>Charlie Davis</TableCell>
                <TableCell>Burger Hub</TableCell>
                <TableCell>$22.50</TableCell>
                <TableCell><Badge variant="outline" className="text-green-600">Delivered</Badge></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">View</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
