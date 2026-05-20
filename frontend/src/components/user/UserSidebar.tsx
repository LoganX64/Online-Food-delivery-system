import * as React from "react"
import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
  LockIcon,
  LogOutIcon,
  HomeIcon,
} from "lucide-react"

const navItems = [
  { title: "Personal Info",    id: "personal",      icon: UserIcon },
  { title: "Order History",    id: "orders",         icon: ShoppingBagIcon },
  { title: "Saved Addresses",  id: "addresses",      icon: MapPinIcon },
  { title: "Payment Methods",  id: "payment",        icon: CreditCardIcon },
  { title: "Notifications",    id: "notifications",  icon: BellIcon },
  { title: "Security",         id: "security",       icon: LockIcon },
]

interface UserSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout?: () => void
}

export function UserSidebar({ activeTab, setActiveTab, onLogout, ...props }: UserSidebarProps) {
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md font-bold text-sm">
            U
          </div>
          <span className="text-lg font-bold tracking-tight">My Account</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="mb-2 px-2">
            <SidebarMenuButton asChild>
              <Link to="/" className="gap-3 font-medium text-primary hover:text-primary">
                <HomeIcon className="size-4" />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                onClick={() => { setActiveTab(item.id); setOpenMobile(false) }}
                className="gap-3"
              >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setOpenMobile(false)
                onLogout?.()
              }}
              className="gap-3 text-destructive hover:text-destructive"
            >
              <LogOutIcon className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
