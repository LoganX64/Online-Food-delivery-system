import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { UserSidebar } from "@/components/user/UserSidebar"
import { PersonalInfo } from "@/components/user/PersonalInfo"
import { OrderHistory } from "@/components/user/OrderHistory"
import { SavedAddresses } from "@/components/user/SavedAddresses"
import { PaymentMethods } from "@/components/user/PaymentMethods"
import { Notifications } from "@/components/user/Notifications"
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
} from "lucide-react"

const mobileNavItems = [
  { id: "personal",       label: "Profile",   icon: UserIcon },
  { id: "orders",         label: "My Orders", icon: ShoppingBagIcon },
  { id: "addresses",      label: "Addresses", icon: MapPinIcon },
  { id: "payment",        label: "Payment",   icon: CreditCardIcon },
]

const tabLabels: Record<string, string> = {
  personal:      "Personal Info",
  orders:        "Order History",
  addresses:     "Saved Addresses",
  payment:       "Payment Methods",
  notifications: "Notifications",
}

export function UserDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = searchParams.get("tab") || "personal"
  const [activeTab, setActiveTab] = useState(tabFromUrl)

  useEffect(() => {
    setSearchParams({ tab: activeTab }, { replace: true })
  }, [activeTab, setSearchParams])

  const renderContent = () => {
    switch (activeTab) {
      case "personal":      return <PersonalInfo />
      case "orders":        return <OrderHistory />
      case "addresses":     return <SavedAddresses />
      case "payment":       return <PaymentMethods />
      case "notifications": return <Notifications />
      default:              return <PersonalInfo />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">

        {/* ── Sidebar (offcanvas on mobile, persistent on desktop) ── */}
        <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <SidebarInset className="flex flex-col flex-1 w-full pb-16 md:pb-0 overflow-x-hidden">

          {/* ── Top Header ─────────────────────────────────────── */}
          <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4 lg:px-6 sticky top-0 z-30">
            {/* Hamburger — visible on all screen sizes */}
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* Current section title */}
            <span className="font-semibold text-sm md:text-base">
              {tabLabels[activeTab] ?? "My Account"}
            </span>
          </header>

          {/* ── Main Content ───────────────────────────────────── */}
          <main className="flex-1 p-4 lg:p-6 bg-background/50">
            <div className="max-w-[1400px] mx-auto w-full">
              {/* Desktop page subtitle */}
              <div className="hidden md:block mb-6">
                <h1 className="text-3xl font-extrabold tracking-tight">User Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your account, orders, and preferences.</p>
              </div>
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {renderContent()}
              </div>
            </div>
          </main>

        </SidebarInset>

        {/* ── Mobile Bottom Navbar ──────────────────────────────── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50 flex items-center h-16">
          {mobileNavItems.map((item) => (
            <button
              key={item.id}
              id={`user-nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors",
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="size-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

      </div>
    </SidebarProvider>
  )
}
