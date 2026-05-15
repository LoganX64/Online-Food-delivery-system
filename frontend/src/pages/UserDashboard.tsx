import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import { PersonalInfo } from "@/components/dashboard/PersonalInfo"
import { OrderHistory } from "@/components/dashboard/OrderHistory"
import { SavedAddresses } from "@/components/dashboard/SavedAddresses"
import { PaymentMethods } from "@/components/dashboard/PaymentMethods"
import { Notifications } from "@/components/dashboard/Notifications"
import { DashboardNav } from "@/components/dashboard/DashboardNav"
import { Button } from "../components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { 
  MenuIcon, 
  ChevronLeftIcon, 
  ShoppingBagIcon, 
  MapPinIcon, 
  CreditCardIcon, 
  BellIcon 
} from "lucide-react"

export function UserDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = searchParams.get("tab") || "personal"
  const [activeTab, setActiveTab] = useState(tabFromUrl)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setSearchParams({ tab: activeTab }, { replace: true })
  }, [activeTab, setSearchParams])

  const renderContent = () => {
    switch (activeTab) {
      case "personal": return <PersonalInfo />
      case "orders": return <OrderHistory />
      case "addresses": return <SavedAddresses />
      case "payment": return <PaymentMethods />
      case "notifications": return <Notifications />
      default: return <PersonalInfo />
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-10">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Desktop Header */}
        <div className="hidden md:block mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your account, orders, and preferences.</p>
        </div>

        {/* Mobile Header (Dynamic) */}
        <div className="md:hidden flex items-center mb-6">
          {activeTab !== "personal" && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => setActiveTab("personal")}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
          )}
          <h1 className="text-2xl font-bold tracking-tight capitalize">
            {activeTab === "personal" ? "Account" : activeTab.replace("-", " ")}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar (Desktop Only) */}
          <div className="hidden lg:block w-80">
            <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Mobile Hub Navigation (Only on personal tab on mobile) */}
              {activeTab === "personal" && (
                <div className="lg:hidden mb-6 space-y-4">
                  <PersonalInfo />
                  
                  <div className="bg-card rounded-xl border shadow-sm divide-y overflow-hidden">
                    <div className="px-4 py-3 bg-muted/30">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Account Settings</h3>
                    </div>
                    {[
                      { id: "orders", label: "My Orders", icon: ShoppingBagIcon },
                      { id: "addresses", label: "Saved Addresses", icon: MapPinIcon },
                      { id: "payment", label: "Payment Methods", icon: CreditCardIcon },
                      { id: "notifications", label: "Notifications", icon: BellIcon },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-primary" />
                          <span className="font-mono font-semibold text-sm">{item.label}</span>
                        </div>
                        <ChevronLeftIcon className="h-4 w-4 rotate-180 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Render Desktop or Specific Tab Content */}
              <div className={cn(activeTab === "personal" ? "hidden lg:block" : "block")}>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
