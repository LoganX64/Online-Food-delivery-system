import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SearchIcon, FilterIcon, FileDownIcon, MoreHorizontalIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getRestaurantOrders, type Order } from "@/api/restaurant.api"
import { toast } from "sonner"

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getRestaurantOrders()
        setOrders(data)
      } catch (error) {
        toast.error("Failed to load order history")
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const history = orders.filter(o => ['DELIVERED', 'CANCELLED', 'REJECTED'].includes(o.status))

  const formatDate = (dateString: string) => {
    const d = new Date(dateString)
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input placeholder="Filter history..." className="pl-9 border-none bg-muted/50 h-9 text-xs rounded-md shadow-none focus-visible:ring-1" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2 h-9 text-[10px] font-bold border shadow-none bg-background hover:bg-muted">
            <FilterIcon className="size-3.5" />
            Filter
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none gap-2 h-9 text-[10px] font-bold border shadow-none bg-background hover:bg-muted">
            <FileDownIcon className="size-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="border shadow-none overflow-hidden p-0">
        <CardHeader className="pb-4 bg-muted/5 border-b p-6">
          <div className="flex items-center justify-between">
             <div>
                <CardTitle className="text-sm font-bold tracking-tight uppercase">Order History</CardTitle>
                <CardDescription className="text-[10px] font-medium text-muted-foreground">Log of past orders and transitions.</CardDescription>
             </div>
             <Badge variant="outline" className="text-[10px] bg-background font-bold border-muted">
                {history.length} Total
             </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent text-[10px] uppercase font-bold text-muted-foreground">
                <TableHead className="py-3 px-6">Order</TableHead>
                <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                <TableHead>Items Summary</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((order) => (
                <TableRow key={order._id} className="cursor-pointer group hover:bg-muted/30 transition-colors text-xs">
                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold group-hover:text-primary transition-colors text-foreground uppercase tracking-widest">{order._id.substring(order._id.length - 6)}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">{order.userId?.name || 'Guest'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-[11px] text-muted-foreground font-medium">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 max-w-[250px]">
                      <p className="text-[11px] line-clamp-1 font-medium text-foreground/80">{order.items.map(item => `${item.quantity}x ${item.name}`).join(", ")}</p>
                      {(order.rejectionReason || order.rejectionNote) && (
                         <span className="text-[9px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 w-fit italic font-medium">
                            {order.rejectionReason} {order.rejectionNote && `- ${order.rejectionNote}`}
                         </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                       <div className={`size-1.5 rounded-full ${order.status === "DELIVERED" ? "bg-green-500" : "bg-red-500"}`} />
                       <span className="font-medium text-[11px]">{order.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon" className="size-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontalIcon className="size-3.5" />
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
