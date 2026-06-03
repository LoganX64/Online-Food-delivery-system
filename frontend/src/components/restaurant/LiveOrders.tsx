import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckIcon, 
  XIcon, 
  ClockIcon, 
  ChefHatIcon, 
  PackageCheckIcon,
  MessageSquareIcon,
  Loader2
} from "lucide-react"
import { getRestaurantOrders, acceptOrder, rejectOrder, updateOrderStatus, type Order } from "@/api/restaurant.api"
import { toast } from "sonner"

export function LiveOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      const data = await getRestaurantOrders()
      setOrders(data)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      toast.error("Failed to load live orders")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // Poll every 30 seconds
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleAccept = async (orderId: string) => {
    try {
      setActionLoading(orderId)
      await acceptOrder(orderId)
      toast.success("Order accepted")
      await fetchOrders()
    } catch (error) {
      toast.error("Failed to accept order")
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (orderId: string) => {
    try {
      const reason = window.prompt("Reason for rejection:")
      if (reason === null) return // Cancelled
      
      setActionLoading(orderId)
      await rejectOrder(orderId, { reason: reason || "Restaurant busy" })
      toast.success("Order rejected")
      await fetchOrders()
    } catch (error) {
      toast.error("Failed to reject order")
    } finally {
      setActionLoading(null)
    }
  }

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      setActionLoading(orderId)
      await updateOrderStatus(orderId, status)
      toast.success("Order status updated")
      await fetchOrders()
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setActionLoading(null)
    }
  }

  const formatTime = (dateString: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 60000)
    if (diff < 1) return "Just now"
    return `${diff} min${diff !== 1 ? 's' : ''} ago`
  }

  const liveOrders = orders.filter(o => o.status === "PENDING")
  const preparingOrders = orders.filter(o => o.status === "ACCEPTED" || o.status === "PREPARING")
  const readyOrders = orders.filter(o => o.status === "HANDED_OFF") // Reusing HANDED_OFF as ready for pickup before delivery

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    )
  }
  const OrderCard = ({ order, actions }: { order: Order, actions?: React.ReactNode }) => (
    <Card className="border shadow-none overflow-hidden mb-4 bg-background p-0">
      <CardHeader className="bg-muted/10 p-6 pt-4 pb-3 flex flex-row items-center justify-between border-b border-muted/20">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-foreground uppercase tracking-widest">{order._id.substring(order._id.length - 6)}</span>
            <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0 border-primary/20 text-primary bg-primary/5">
              {order.status}
            </Badge>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">{formatTime(order.createdAt)}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-primary">${order.totalAmount.toFixed(2)}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex flex-col gap-4">
        <div>
          <div className="text-[10px] font-bold text-muted-foreground mb-1 tracking-tight uppercase">Customer</div>
          <div className="text-sm font-bold">{order.userId?.name || 'Guest'}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted-foreground mb-1 tracking-tight uppercase">Items</div>
          <ul className="text-xs flex flex-col gap-1.5">
            {order.items.map((item: any, i: number) => (
              <li key={i} className="flex items-center gap-2 text-foreground/80">
                <div className="size-1 bg-primary/40 rounded-full" />
                {item.quantity}x {item.name}
              </li>
            ))}
          </ul>
        </div>
        {/*
        {order.note && (
          <div className="bg-orange-50/50 p-2 rounded border border-orange-100 flex gap-2">
            <MessageSquareIcon className="size-3.5 text-orange-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-orange-700 font-medium leading-relaxed italic">"{order.note}"</p>
          </div>
        )}
        */}
      </CardContent>
      {actions && (
        <CardFooter className="border-t bg-muted/5 p-3 gap-2">
          {actions}
        </CardFooter>
      )}
    </Card>
  )

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      {/* Live Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1">
          <div className="size-2 bg-orange-500 rounded-full animate-pulse" />
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Live Orders</h2>
          <Badge className="ml-auto bg-orange-100 text-orange-600 hover:bg-orange-100 border-none text-[10px] font-bold h-5 px-2">
            {liveOrders.length} New
          </Badge>
        </div>
        <div className="flex flex-col">
          {liveOrders.map(order => (
            <OrderCard 
              key={order._id} 
              order={order} 
              actions={
                <>
                  <Button disabled={actionLoading === order._id} onClick={() => handleReject(order._id)} variant="outline" size="sm" className="flex-1 h-8 text-[10px] font-bold gap-1 text-destructive hover:bg-destructive/5 hover:text-destructive border-destructive/20 rounded">
                    {actionLoading === order._id ? <Loader2 className="size-3.5 animate-spin" /> : <XIcon className="size-3.5" />}
                    Reject
                  </Button>
                  <Button disabled={actionLoading === order._id} onClick={() => handleAccept(order._id)} size="sm" className="flex-1 h-8 text-[10px] font-bold gap-1 bg-green-600 hover:bg-green-700 shadow-none rounded">
                    {actionLoading === order._id ? <Loader2 className="size-3.5 animate-spin" /> : <CheckIcon className="size-3.5" />}
                    Accept
                  </Button>
                </>
              }
            />
          ))}
          {liveOrders.length === 0 && (
            <div className="text-center py-10 border border-dashed rounded border-muted/50 bg-muted/5">
              <ClockIcon className="size-8 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">No new orders</p>
            </div>
          )}
        </div>
      </div>

      {/* Preparing Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1">
          <div className="size-2 bg-blue-500 rounded-full" />
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Preparing</h2>
          <Badge className="ml-auto bg-blue-100 text-blue-600 hover:bg-blue-100 border-none text-[10px] font-bold h-5 px-2">
            {preparingOrders.length} Active
          </Badge>
        </div>
        <div className="flex flex-col">
          {preparingOrders.map(order => (
            <OrderCard 
              key={order._id} 
              order={order} 
              actions={
                <Button disabled={actionLoading === order._id} onClick={() => handleUpdateStatus(order._id, 'HANDED_OFF')} size="sm" className="w-full h-8 text-[10px] font-bold gap-1 bg-blue-600 hover:bg-blue-700 shadow-none rounded">
                  {actionLoading === order._id ? <Loader2 className="size-3.5 animate-spin" /> : <ChefHatIcon className="size-3.5" />}
                  Mark as Ready
                </Button>
              }
            />
          ))}
          {preparingOrders.length === 0 && (
            <div className="text-center py-10 border border-dashed rounded border-muted/50 bg-muted/5">
              <ClockIcon className="size-8 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">Kitchen is idle</p>
            </div>
          )}
        </div>
      </div>

      {/* Ready Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1">
          <div className="size-2 bg-green-500 rounded-full" />
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Ready for Pickup</h2>
          <Badge className="ml-auto bg-green-100 text-green-600 hover:bg-green-100 border-none text-[10px] font-bold h-5 px-2">
            {readyOrders.length} Ready
          </Badge>
        </div>
        <div className="flex flex-col">
          {readyOrders.map(order => (
            <OrderCard 
              key={order._id} 
              order={order} 
              actions={
                <Button disabled={actionLoading === order._id} onClick={() => handleUpdateStatus(order._id, 'DELIVERED')} size="sm" className="w-full h-8 text-[10px] font-bold gap-1 bg-green-600 hover:bg-green-700 shadow-none rounded">
                  {actionLoading === order._id ? <Loader2 className="size-3.5 animate-spin" /> : <PackageCheckIcon className="size-3.5" />}
                  Handed Off
                </Button>
              }
            />
          ))}
          {readyOrders.length === 0 && (
            <div className="text-center py-10 border border-dashed rounded border-muted/50 bg-muted/5">
              <ClockIcon className="size-8 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">Nothing waiting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
