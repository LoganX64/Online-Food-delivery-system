import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function RestaurantManagement() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Restaurants Directory</CardTitle>
          <CardDescription>Manage approved and pending restaurants.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search restaurants..." className="max-w-sm" />
            <Button variant="outline">Filter</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Pizza Palace</TableCell>
                <TableCell>contact@pizzapalace.com</TableCell>
                <TableCell>+1 234 567 890</TableCell>
                <TableCell><Badge variant="outline" className="text-green-600">Active</Badge></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">Manage</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Taco Fiesta</TableCell>
                <TableCell>hello@tacofiesta.com</TableCell>
                <TableCell>+1 987 654 321</TableCell>
                <TableCell><Badge variant="outline" className="text-orange-500">Pending</Badge></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">Manage</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
