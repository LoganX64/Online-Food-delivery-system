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
  LayoutDashboardIcon,
  ActivityIcon,
  UtensilsCrossedIcon,
  HistoryIcon,
  Settings2Icon,
  LogOutIcon,
  PlusIcon,
  CommandIcon,
  HomeIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    id: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Live Orders",
    id: "Live Orders",
    icon: ActivityIcon,
  },
  {
    title: "Menu editor",
    id: "Menu editor",
    icon: UtensilsCrossedIcon,
  },
  {
    title: "Orders history",
    id: "Orders history",
    icon: HistoryIcon,
  },
  {
    title: "Settings",
    id: "Settings",
    icon: Settings2Icon,
  },
]

interface RestaurantSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: string
  setActiveTab: (tab: string) => void
  onQuickCreate?: () => void
}

export function RestaurantSidebar({ activeTab, setActiveTab, onQuickCreate, ...props }: RestaurantSidebarProps) {
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 flex flex-row items-center gap-2 px-4 border-b">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <CommandIcon className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
          <span className="truncate font-semibold">Acme Food</span>
          <span className="truncate text-xs text-muted-foreground">Partner</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          <SidebarMenuItem className="mb-2 group-data-[collapsible=icon]:hidden px-2">
            <SidebarMenuButton asChild>
              <Link to="/" className="gap-3 font-medium text-primary hover:text-primary h-9 rounded-md px-3">
                <HomeIcon className="size-4" />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mb-2 group-data-[collapsible=icon]:hidden px-2">
             <Button 
                onClick={() => {
                  if (onQuickCreate) onQuickCreate();
                  setOpenMobile(false);
                }} 
                className="w-full justify-start gap-2 h-9 rounded-md shadow-sm"
              >
                <PlusIcon className="size-4" />
                <span>Quick Create</span>
             </Button>
          </SidebarMenuItem>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                onClick={() => { setActiveTab(item.id); setOpenMobile(false); }}
                tooltip={item.title}
                className="gap-3 h-9 rounded-md px-3 transition-all"
              >
                <item.icon className="size-4" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => {}} className="gap-3 text-destructive hover:text-destructive hover:bg-destructive/5 rounded-md px-3 h-9">
              <LogOutIcon className="size-4" />
              <span className="font-medium group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
