import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BellIcon, Trash2Icon, CheckCircle2Icon, ClockIcon, InfoIcon } from "lucide-react"

export function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Order Delivered!",
      message: "Your order from Pizza Hut has been delivered. Enjoy your meal!",
      date: "Oct 12, 2023",
      time: "07:30 PM",
      status: "Unread",
      type: "success"
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "Payment for order #ORD-7722 was successful. Restaurant is preparing your food.",
      date: "Oct 15, 2023",
      time: "01:15 PM",
      status: "Read",
      type: "info"
    },
    {
      id: 3,
      title: "Special Offer",
      message: "Get 20% off on your next order from Burger King. Use code BK20.",
      date: "Oct 10, 2023",
      time: "10:00 AM",
      status: "Read",
      type: "promotion"
    }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2Icon className="h-5 w-5 text-success" />
      case "info": return <InfoIcon className="h-5 w-5 text-info" />
      default: return <BellIcon className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your orders and special offers</p>
        </div>
        <Button variant="ghost" className="text-primary text-sm font-medium">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`${notification.status === "Unread" ? "border-l-4 border-l-primary" : ""} overflow-hidden`}>
            <CardContent className="p-0">
              <div className="flex items-start gap-4 p-4">
                <div className="mt-1 bg-muted/50 p-2 rounded-full">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${notification.status === "Unread" ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {notification.status === "Unread" && (
                        <Badge variant="secondary" className="bg-primary-soft text-primary text-[10px] h-4">New</Badge>
                      )}
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" /> {notification.date} | {notification.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                  <div className="pt-2 flex justify-end">
                    <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2Icon className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <BellIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No new notifications</p>
        </div>
      )}
    </div>
  )
}
