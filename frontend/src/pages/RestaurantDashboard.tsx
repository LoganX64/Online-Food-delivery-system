import { useState } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { RestaurantSidebar } from "../components/restaurant/RestaurantSidebar"
import { DashboardOverview } from "../components/restaurant/DashboardOverview"
import { LiveOrders } from "../components/restaurant/LiveOrders"
import { MenuEditor } from "../components/restaurant/MenuEditor"
import { OrderHistory } from "../components/restaurant/OrderHistory"
import { Settings } from "../components/restaurant/Settings"
import { cn } from "@/lib/utils"
import {
  SearchIcon,
  BellIcon,
  LayoutDashboardIcon,
  ShoppingBagIcon,
  UtensilsIcon,
  Settings2Icon,
} from "lucide-react"
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

const mobileNavItems = [
  { id: "Dashboard",     label: "Dashboard", icon: LayoutDashboardIcon },
  { id: "Live Orders",   label: "Orders",    icon: ShoppingBagIcon },
  { id: "Menu editor",   label: "Menu",      icon: UtensilsIcon },
  { id: "Settings",      label: "Settings",  icon: Settings2Icon },
]

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":     return <DashboardOverview />
      case "Live Orders":   return <LiveOrders />
      case "Menu editor":   return <MenuEditor />
      case "Orders history":return <OrderHistory />
      case "Settings":      return <Settings />
      default:              return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">

        <RestaurantSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab)}
        />

        <SidebarInset className="flex flex-col flex-1 w-full pb-16 md:pb-0 overflow-x-hidden">

          {/* ── Top Header ─────────────────────────────────────── */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 lg:px-6 sticky top-0 z-30">

            {/* Hamburger — visible on all screen sizes */}
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 hidden md:block" />

            {/* Breadcrumb — current section */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Partner</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeTab}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2">
              {/* Search — desktop only */}
              <div className="relative hidden lg:block w-72">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-muted/50 pl-9 h-9 border-none shadow-none"
                />
              </div>

              {/* Bell — always visible */}
              <Button variant="ghost" size="icon" className="size-9 rounded-full">
                <BellIcon className="size-4" />
              </Button>

              {/* Profile avatar — desktop only (wired to Settings) */}
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full bg-muted hidden md:flex"
                onClick={() => setActiveTab("Settings")}
                title="Go to Settings"
              >
                <Settings2Icon className="size-4" />
              </Button>
            </div>
          </header>

          {/* ── Main Content ───────────────────────────────────── */}
          <main className="flex-1 p-4 lg:p-6 bg-background/50">
            <div className="max-w-[1400px] mx-auto w-full">
              {renderContent()}
            </div>
          </main>

        </SidebarInset>

        {/* ── Mobile Bottom Navbar ──────────────────────────────── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background flex items-center h-16 z-50">
          {mobileNavItems.map((item) => (
            <button
              key={item.id}
              id={`restaurant-nav-${item.id.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors",
                activeTab === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
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
