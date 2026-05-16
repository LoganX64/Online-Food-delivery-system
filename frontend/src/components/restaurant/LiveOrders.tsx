import * as React from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckIcon, 
  XIcon, 
  ClockIcon, 
  ChefHatIcon, 
  PackageCheckIcon,
  MessageSquareIcon
} from "lucide-react"

export function LiveOrders() {
  const liveOrders = [
    {
      id: "ORD-9821",
      customer: "Alex Rivers",
      items: ["2x Cheeseburger", "1x French Fries", "1x Coke"],
      total: "$34.50",
      time: "2 mins ago",
      note: "Extra ketchup please!",
      status: "Live"
    },
    {
      id: "ORD-9825",
      customer: "Jordan Lee",
      items: ["1x Margherita Pizza (L)", "2x Garlic Bread"],
      total: "$28.00",
      time: "5 mins ago",
      note: "Don't ring the bell, baby sleeping.",
      status: "Live"
    }
  ]

  const preparingOrders = [
    {
      id: "ORD-9810",
      customer: "Sarah Johnson",
      items: ["3x Chicken Tacos", "1x Nachos Supreme"],
      total: "$42.10",
      time: "15 mins ago",
      note: "No onions in the tacos.",
      status: "Preparing"
    }
  ]

  const readyOrders = [
    {
      id: "ORD-9805",
      customer: "Mike Davis",
      items: ["1x Family Meal Box", "4x Pepsi"],
      total: "$55.00",
      time: "25 mins ago",
      note: "",
      status: "Ready"
    }
  ]

  const OrderCard = ({ order, actions }: { order: any, actions?: React.ReactNode }) => (
    <Card className="border shadow-none overflow-hidden mb-4 bg-background p-0">
      <CardHeader className="bg-muted/10 p-6 pt-4 pb-3 flex flex-row items-center justify-between border-b border-muted/20">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{order.id}</span>
            <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0 border-primary/20 text-primary bg-primary/5">
              {order.status}
            </Badge>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">{order.time}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-primary">{order.total}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div>
          <div className="text-[10px] font-bold text-muted-foreground mb-1 tracking-tight uppercase">Customer</div>
          <div className="text-sm font-bold">{order.customer}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted-foreground mb-1 tracking-tight uppercase">Items</div>
          <ul className="text-xs space-y-1.5">
            {order.items.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-foreground/80">
                <div className="size-1 bg-primary/40 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        {order.note && (
          <div className="bg-orange-50/50 p-2 rounded border border-orange-100 flex gap-2">
            <MessageSquareIcon className="size-3.5 text-orange-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-orange-700 font-medium leading-relaxed italic">"{order.note}"</p>
          </div>
        )}
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
      <div className="space-y-4">
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
              key={order.id} 
              order={order} 
              actions={
                <>
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-[10px] font-bold gap-1 text-destructive hover:bg-destructive/5 hover:text-destructive border-destructive/20 rounded">
                    <XIcon className="size-3.5" />
                    Reject
                  </Button>
                  <Button size="sm" className="flex-1 h-8 text-[10px] font-bold gap-1 bg-green-600 hover:bg-green-700 shadow-none rounded">
                    <CheckIcon className="size-3.5" />
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
      <div className="space-y-4">
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
              key={order.id} 
              order={order} 
              actions={
                <Button size="sm" className="w-full h-8 text-[10px] font-bold gap-1 bg-blue-600 hover:bg-blue-700 shadow-none rounded">
                  <ChefHatIcon className="size-3.5" />
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
      <div className="space-y-4">
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
              key={order.id} 
              order={order} 
              actions={
                <Button size="sm" className="w-full h-8 text-[10px] font-bold gap-1 bg-green-600 hover:bg-green-700 shadow-none rounded">
                  <PackageCheckIcon className="size-3.5" />
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
