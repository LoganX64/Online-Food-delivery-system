import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
  ChevronRightIcon
} from "lucide-react"

interface UserNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function UserNav({ activeTab, setActiveTab }: UserNavProps) {
  const menuItems = [
    { id: "personal", label: "Personal Info", icon: UserIcon },
    { id: "orders", label: "Order History", icon: ShoppingBagIcon },
    { id: "addresses", label: "Saved Addresses", icon: MapPinIcon },
    { id: "payment", label: "Payment Methods", icon: CreditCardIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
  ]

  return (
    <Card className="h-fit sticky top-20 shadow-lg border-primary/10 overflow-hidden p-0 gap-0">
      <CardHeader className="bg-primary/5 pt-6 pb-4 px-6 rounded-t-xl">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-primary" />
          My Account
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center justify-between px-6 py-4 text-sm font-mono transition-all border-b last:border-0 hover:bg-muted/5 group",
                activeTab === item.id
                  ? "text-primary border-l-4 border-l-primary"
                  : "text-muted-foreground border-l-4 border-l-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5 transition-colors", activeTab === item.id ? "text-primary" : "group-hover:text-primary")} />
                <span className="font-semibold">{item.label}</span>
              </div>
              <ChevronRightIcon className={cn("h-4 w-4 transition-transform", activeTab === item.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100")} />
            </button>
          ))}
          <button
            className="flex items-center gap-3 px-6 py-4 text-sm font-mono font-semibold text-destructive transition-all hover:bg-destructive/5"
          >
            <LogOutIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </CardContent>
    </Card>
  )
}
