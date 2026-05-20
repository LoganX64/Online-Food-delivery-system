import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BellIcon, Trash2Icon, CheckCircle2Icon, ClockIcon, InfoIcon, TagIcon } from "lucide-react"
import { notificationApi, type Notification } from "@/api/notification.api"
import { toast } from "sonner"
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog"

function getIcon(type: Notification["type"]) {
  switch (type) {
    case "success":   return <CheckCircle2Icon className="h-5 w-5 text-green-600" />
    case "warning":   return <ClockIcon className="h-5 w-5 text-yellow-600" />
    case "promotion": return <TagIcon className="h-5 w-5 text-primary" />
    default:          return <InfoIcon className="h-5 w-5 text-blue-600" />
  }
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [markingAll, setMarkingAll] = useState(false)

  useEffect(() => {
    notificationApi.getAll()
      .then(setNotifications)
      .catch((err) => toast.error(err?.message || "Failed to load notifications"))
      .finally(() => setLoading(false))
  }, [])

  const handleMarkRead = async (id: string) => {
    try {
      await notificationApi.markAsRead(id)
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      )
    } catch (err: any) {
      toast.error(err?.message || "Failed to mark as read")
    }
  }

  const handleMarkAllRead = async () => {
    try {
      setMarkingAll(true)
      await notificationApi.markAllAsRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
      toast.success("All notifications marked as read")
    } catch (err: any) {
      toast.error(err?.message || "Failed to mark all as read")
    } finally {
      setMarkingAll(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await notificationApi.remove(id)
      setNotifications((prev) => prev.filter((n) => n._id !== id))
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete notification")
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">
            Stay updated with your orders and offers
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs w-5 h-5">
                {unreadCount}
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            className="text-primary text-sm font-medium"
            onClick={handleMarkAllRead}
            disabled={markingAll}
          >
            {markingAll ? "Marking…" : "Mark all as read"}
          </Button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      ) : notifications.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <BellIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-medium text-muted-foreground">No notifications available</p>
          <p className="text-sm text-muted-foreground">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card
              key={n._id}
              className={`overflow-hidden transition-all ${
                !n.isRead ? "border-l-4 border-l-primary shadow-sm" : "opacity-80"
              }`}
            >
              <CardContent className="p-0">
                <div
                  className="flex items-start gap-4 p-4 cursor-pointer"
                  onClick={() => !n.isRead && handleMarkRead(n._id)}
                >
                  <div className="mt-0.5 bg-muted/50 p-2 rounded-full shrink-0">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-bold text-sm ${!n.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {n.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        {!n.isRead && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] h-4">
                            New
                          </Badge>
                        )}
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {formatDate(n.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{n.message}</p>
                    <div className="pt-1 flex justify-end">
                      <ConfirmDeleteDialog 
                        onConfirm={() => handleDelete(n._id)}
                        title="Delete Notification?"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2Icon className="mr-1 h-3 w-3" /> Delete
                        </Button>
                      </ConfirmDeleteDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
