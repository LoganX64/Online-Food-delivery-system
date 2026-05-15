import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { PersonalInfo } from "@/components/dashboard/PersonalInfo"
import { OrderHistory } from "@/components/dashboard/OrderHistory"
import { SavedAddresses } from "@/components/dashboard/SavedAddresses"
import { PaymentMethods } from "@/components/dashboard/PaymentMethods"
import { Notifications } from "@/components/dashboard/Notifications"
import { DashboardNav } from "@/components/dashboard/DashboardNav"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"

export function UserDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = searchParams.get("tab") || "personal"
  const [activeTab, setActiveTab] = useState(tabFromUrl)

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
    <div className="min-h-screen bg-muted/30 pb-20 md:pb-10">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold capitalize">{activeTab.replace("-", " ")}</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your account, orders, and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Card (Left/Bottom) */}
          <div className="w-full lg:w-80 order-1 lg:order-1">
            <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content Area (Right/Top) */}
          <div className="flex-1 order-2 lg:order-2">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
