import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  ArrowUpRightIcon, 
  UsersIcon, 
  ActivityIcon, 
  CreditCardIcon, 
  DollarSignIcon,
  Loader2
} from "lucide-react"
import { getRestaurantEarnings } from "@/api/restaurant.api"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"

const chartData = [
  { date: "Apr 2", visitors: 120, customers: 40 },
  { date: "Apr 9", visitors: 180, customers: 60 },
  { date: "Apr 16", visitors: 250, customers: 85 },
  { date: "Apr 23", visitors: 220, customers: 70 },
  { date: "May 2", visitors: 300, customers: 110 },
  { date: "May 9", visitors: 280, customers: 95 },
  { date: "May 16", visitors: 350, customers: 130 },
  { date: "May 23", visitors: 320, customers: 120 },
  { date: "Jun 2", visitors: 400, customers: 150 },
  { date: "Jun 9", visitors: 380, customers: 140 },
  { date: "Jun 16", visitors: 450, customers: 180 },
  { date: "Jun 23", visitors: 420, customers: 160 },
]

export function DashboardOverview() {
  const [earnings, setEarnings] = useState({ totalEarnings: 0, totalOrders: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const data = await getRestaurantEarnings()
        setEarnings(data)
      } catch (error) {
        console.error("Failed to fetch earnings:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEarnings()
  }, [])

  const stats = [
    {
      title: "Total Revenue",
      value: isLoading ? "..." : `$${(earnings?.totalEarnings || 0).toFixed(2)}`,
      description: "Total earnings from delivered orders",
      change: "+12.5%",
      icon: DollarSignIcon,
    },
    {
      title: "New Customers",
      value: "1,234",
      description: "Down 20% this period",
      change: "-20%",
      icon: UsersIcon,
    },
    {
      title: "Total Orders",
      value: isLoading ? "..." : (earnings?.totalOrders || 0).toString(),
      description: "Successfully delivered orders",
      change: "+2.5%",
      icon: CreditCardIcon,
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      description: "Steady performance increase",
      change: "+4.5%",
      icon: ActivityIcon,
    }
  ]

  const recentOrders = [
    { id: "ORD-7231", customer: "John Doe", status: "In Process", total: "$42.50", limit: 18, reviewer: "Eddie Lake" },
    { id: "ORD-7232", customer: "Sarah Smith", status: "Done", total: "$28.00", limit: 29, reviewer: "Eddie Lake" },
    { id: "ORD-7233", customer: "Mike Johnson", status: "Done", total: "$15.20", limit: 10, reviewer: "Eddie Lake" },
    { id: "ORD-7234", customer: "Emily Brown", status: "In Process", total: "$54.00", limit: 27, reviewer: "Janik T." },
    { id: "ORD-7235", customer: "David Wilson", status: "Done", total: "$32.10", limit: 2, reviewer: "Janik T." },
  ]

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border shadow-none p-0">
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-2 flex flex-col gap-0">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
              <Badge variant="outline" className="text-[10px] bg-muted/50 font-bold border-none">
                {stat.change}
              </Badge>
            </CardHeader>
            <CardContent className="p-6 pt-0 pb-8">
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1 font-medium">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart Section */}
      <Card className="border shadow-none overflow-hidden p-0">
        <CardHeader className="flex flex-row items-center justify-between p-6 pb-8">
          <div>
            <CardTitle className="text-sm font-bold">Total Visitors</CardTitle>
            <CardDescription className="text-xs">Total for the last 3 months</CardDescription>
          </div>
          <div className="flex items-center gap-2">
             <Tabs defaultValue="3months">
               <TabsList className="bg-muted/50 h-8">
                 <TabsTrigger value="3months" className="text-[10px] px-3">Last 3 months</TabsTrigger>
                 <TabsTrigger value="30days" className="text-[10px] px-3">Last 30 days</TabsTrigger>
                 <TabsTrigger value="7days" className="text-[10px] px-3">Last 7 days</TabsTrigger>
               </TabsList>
             </Tabs>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.5 0 0)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="oklch(0.5 0 0)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.9 0 0)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: "oklch(0.5 0 0)" }}
                  interval={1}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "oklch(1 0 0)", 
                    border: "1px solid oklch(0.9 0 0)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVisitors)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="oklch(0.5 0 0)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCustomers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Tabs defaultValue="outline" className="w-full">
        <div className="flex items-center justify-between mb-4 border-b pb-0">
          <TabsList variant="line" className="bg-transparent h-auto p-0 gap-6 border-none">
            <TabsTrigger value="outline" className="bg-transparent border-none shadow-none p-0 h-auto font-bold text-xs data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 transition-none after:hidden">Outline</TabsTrigger>
            <TabsTrigger value="performance" className="bg-transparent border-none shadow-none p-0 h-auto font-bold text-xs data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 transition-none after:hidden">Past Performance</TabsTrigger>
            <TabsTrigger value="personnel" className="bg-transparent border-none shadow-none p-0 h-auto font-bold text-xs data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 transition-none after:hidden">Key Personnel</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="h-8 text-[10px] gap-1">
                Customize Columns
             </Button>
             <Button size="sm" className="h-8 text-[10px] gap-1">
                Add Section
             </Button>
          </div>
        </div>
        
        <TabsContent value="outline" className="mt-0">
          <Card className="border shadow-none p-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent text-[10px] uppercase font-bold text-muted-foreground">
                    <TableHead className="w-[30px]"></TableHead>
                    <TableHead>Header</TableHead>
                    <TableHead>Section Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Target</TableHead>
                    <TableHead className="text-right">Limit</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead className="w-[30px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order, i) => (
                    <TableRow key={i} className="text-xs group hover:bg-muted/50 transition-colors">
                      <TableCell><div className="size-3 border rounded-sm" /></TableCell>
                      <TableCell className="font-bold">{order.customer}</TableCell>
                      <TableCell>
                         <Badge variant="outline" className="text-[9px] bg-muted/50 border-none font-medium text-muted-foreground">
                            Narrative
                         </Badge>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-1.5">
                            <div className={`size-1.5 rounded-full ${order.status === "Done" ? "bg-green-500" : "bg-orange-500"}`} />
                            <span className="font-medium">{order.status}</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">18</TableCell>
                      <TableCell className="text-right font-medium">{order.limit}</TableCell>
                      <TableCell>
                         <Badge variant="outline" className="text-[9px] font-medium border-muted">
                            {order.reviewer}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-right"><ArrowUpRightIcon className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
