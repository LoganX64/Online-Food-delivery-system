import { useState } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { RestaurantSidebar } from "../components/restaurant/RestaurantSidebar"
import { DashboardOverview } from "../components/restaurant/DashboardOverview"
import { LiveOrders } from "../components/restaurant/LiveOrders"
import { MenuEditor } from "../components/restaurant/MenuEditor"
import { OrderHistory } from "../components/restaurant/OrderHistory"
import { Settings } from "../components/restaurant/Settings"

import { SearchIcon, BellIcon, UserIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard": return <DashboardOverview />
      case "Live Orders": return <LiveOrders />
      case "Menu editor": return <MenuEditor />
      case "Orders history": return <OrderHistory />
      case "Settings": return <Settings />
      default: return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <RestaurantSidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => { setActiveTab(tab); }} 
        />
        <SidebarInset className="flex flex-col flex-1 w-full overflow-x-hidden">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 lg:px-6 sticky top-0 z-30">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Partner
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeTab}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-4">
               <div className="relative hidden lg:block w-72">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search documents..."
                    className="w-full bg-muted/50 pl-9 h-9 border-none shadow-none"
                  />
               </div>
               <Button variant="ghost" size="icon" className="size-9 rounded-full">
                  <BellIcon className="size-4" />
               </Button>
               <Button variant="ghost" size="icon" className="size-9 rounded-full bg-muted">
                  <UserIcon className="size-4" />
               </Button>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-6 bg-background/50">
            <div className="max-w-[1400px] mx-auto w-full">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
