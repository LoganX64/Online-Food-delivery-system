import { Link, useLocation } from "react-router-dom"
import { Home, LayoutGrid, ShoppingCart, User, Search, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const defaultNavItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Categories", icon: LayoutGrid, path: "/categories" },
  { label: "Cart", icon: ShoppingCart, path: "/cart" },
  { label: "Profile", icon: User, path: "/profile" },
]

const dashboardNavItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Search", icon: Search, path: "/search" },
  { label: "My Orders", icon: ShoppingBag, path: "/profile?tab=orders" },
  { label: "Profile", icon: User, path: "/profile" },
]

export function BottomNav() {
  const location = useLocation()
  const isDashboard = location.pathname === "/profile" || location.pathname === "/user-dashboard"
  const navItems = isDashboard ? dashboardNavItems : defaultNavItems

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t h-16 flex items-center justify-around px-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (isDashboard && item.label === "My Orders" && location.search.includes("tab=orders"))
        return (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className={cn("h-5 w-5", isActive && "fill-current")} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
