import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex flex-col gap-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex flex-col gap-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex flex-col gap-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,231</div>
            <p className="text-xs text-muted-foreground">+180 new users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex flex-col gap-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+3 since last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Restaurant Approval Queue</CardTitle>
            <CardDescription>Pending requests that need your attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Restaurant</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Pizza Palace</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>2023-10-25</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">Review</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Burger Hub</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>2023-10-24</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">Review</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="size-2 rounded-full bg-blue-500" />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-sm font-medium leading-none">New Order #1024</p>
                  <p className="text-sm text-muted-foreground">Placed at Sushi Express</p>
                </div>
                <div className="text-sm text-muted-foreground">2m ago</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-2 rounded-full bg-green-500" />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-sm font-medium leading-none">Restaurant Approved</p>
                  <p className="text-sm text-muted-foreground">Taco Fiesta is now active</p>
                </div>
                <div className="text-sm text-muted-foreground">1h ago</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-2 rounded-full bg-orange-500" />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-sm font-medium leading-none">New User</p>
                  <p className="text-sm text-muted-foreground">Alice Johnson registered</p>
                </div>
                <div className="text-sm text-muted-foreground">3h ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Charts Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Orders and Revenue by Month</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center border-t bg-muted/20">
          <p className="text-muted-foreground text-sm">Chart Placeholder</p>
        </CardContent>
      </Card>
    </div>
  )
}
