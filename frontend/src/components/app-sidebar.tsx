import * as React from "react"

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
  LayoutDashboardIcon,
  ShoppingBagIcon,
  StoreIcon,
  UsersIcon,
  ChartBarIcon,
  Settings2Icon,
  LogOutIcon,
  PlusIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    id: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Orders",
    id: "Orders",
    icon: ShoppingBagIcon,
  },
  {
    title: "Restaurants",
    id: "Restaurants",
    icon: StoreIcon,
  },
  {
    title: "Users",
    id: "Users",
    icon: UsersIcon,
  },
  {
    title: "Analytics",
    id: "Analytics",
    icon: ChartBarIcon,
  },
  {
    title: "Settings",
    id: "Settings",
    icon: Settings2Icon,
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: string
  setActiveTab: (tab: string) => void
  onAddRestaurant: () => void
}

export function AppSidebar({ activeTab, setActiveTab, onAddRestaurant, ...props }: AppSidebarProps) {
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 px-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md font-bold">
            OF
          </div>
          <span className="text-lg font-bold tracking-tight">Admin Portal</span>
        </div>
        <Button onClick={() => { onAddRestaurant(); setOpenMobile(false); }} className="w-full flex items-center justify-start gap-2">
          <PlusIcon className="size-4" />
          Add Restaurant
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                onClick={() => { setActiveTab(item.id); setOpenMobile(false); }}
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
            <SidebarMenuButton onClick={() => {}} className="gap-3 text-destructive hover:text-destructive">
              <LogOutIcon className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
