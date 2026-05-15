import { useState } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardOverview } from "@/components/admin/DashboardOverview"
import { UserManagement } from "@/components/admin/UserManagement"
import { OrderManagement } from "@/components/admin/OrderManagement"
import { RestaurantManagement } from "@/components/admin/RestaurantManagement"
import { AnalyticsView } from "@/components/admin/AnalyticsView"
import { SettingsView } from "@/components/admin/SettingsView"
import { AddRestaurantWizard } from "@/components/admin/AddRestaurantWizard"
import { LayoutDashboardIcon, ShoppingBagIcon, StoreIcon, Settings2Icon } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false)

  const renderContent = () => {
    if (isAddingRestaurant) {
      return (
        <AddRestaurantWizard 
          onComplete={() => setIsAddingRestaurant(false)} 
          onCancel={() => setIsAddingRestaurant(false)} 
        />
      )
    }

    switch (activeTab) {
      case "Dashboard": return <DashboardOverview />
      case "Users": return <UserManagement />
      case "Orders": return <OrderManagement />
      case "Restaurants": return <RestaurantManagement />
      case "Analytics": return <AnalyticsView />
      case "Settings": return <SettingsView />
      default: return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => { setActiveTab(tab); setIsAddingRestaurant(false); }} 
          onAddRestaurant={() => setIsAddingRestaurant(true)}
        />
        <SidebarInset className="flex flex-col flex-1 w-full pb-16 md:pb-0 overflow-x-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
            <SidebarTrigger />
            <h1 className="font-semibold text-lg">{isAddingRestaurant ? "Add Restaurant" : activeTab}</h1>
          </header>
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </SidebarInset>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background flex items-center justify-around h-16 z-50">
          <button 
            onClick={() => { setActiveTab("Dashboard"); setIsAddingRestaurant(false); }}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === "Dashboard" && !isAddingRestaurant ? "text-primary" : "text-muted-foreground"}`}
          >
            <LayoutDashboardIcon className="size-5" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => { setActiveTab("Orders"); setIsAddingRestaurant(false); }}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === "Orders" && !isAddingRestaurant ? "text-primary" : "text-muted-foreground"}`}
          >
            <ShoppingBagIcon className="size-5" />
            <span className="text-[10px] font-medium">Orders</span>
          </button>
          <button 
            onClick={() => { setActiveTab("Restaurants"); setIsAddingRestaurant(false); }}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === "Restaurants" && !isAddingRestaurant ? "text-primary" : "text-muted-foreground"}`}
          >
            <StoreIcon className="size-5" />
            <span className="text-[10px] font-medium">Restaurants</span>
          </button>
          <button 
            onClick={() => { setActiveTab("Settings"); setIsAddingRestaurant(false); }}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === "Settings" && !isAddingRestaurant ? "text-primary" : "text-muted-foreground"}`}
          >
            <Settings2Icon className="size-5" />
            <span className="text-[10px] font-medium">Settings</span>
          </button>
        </div>
      </div>
    </SidebarProvider>
  )
}
