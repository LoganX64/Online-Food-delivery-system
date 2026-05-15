import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function UserManagement() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all registered users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search users..." className="max-w-sm" />
            <Button variant="outline">Filter</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice Johnson</TableCell>
                <TableCell>alice@example.com</TableCell>
                <TableCell>customer</TableCell>
                <TableCell><Badge variant="outline" className="text-green-600">Active</Badge></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">Edit</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Smith</TableCell>
                <TableCell>bob@restaurant.com</TableCell>
                <TableCell>restaurantOwner</TableCell>
                <TableCell><Badge variant="outline" className="text-green-600">Active</Badge></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">Edit</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
