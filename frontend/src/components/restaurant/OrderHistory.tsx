import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SearchIcon, FilterIcon, FileDownIcon, MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OrderHistory() {
  const history = [
    {
      id: "ORD-9750",
      customer: "Alice Brown",
      date: "2024-05-15 14:30",
      items: ["1x Veggie Burger", "1x Water"],
      total: "$15.50",
      status: "Delivered",
      note: ""
    },
    {
      id: "ORD-9745",
      customer: "Robert Miller",
      date: "2024-05-15 13:15",
      items: ["2x Pepperoni Pizza", "1x Garlic Knots"],
      total: "$45.00",
      status: "Delivered",
      note: "Extra crispy crust"
    },
    {
      id: "ORD-9740",
      customer: "Emily Watson",
      date: "2024-05-15 12:45",
      items: ["1x Pasta Primavera", "1x Salad"],
      total: "$24.20",
      status: "Cancelled",
      note: ""
    },
    {
      id: "ORD-9735",
      customer: "Tom Hanks",
      date: "2024-05-15 11:20",
      items: ["3x Sushi Platter", "2x Miso Soup"],
      total: "$82.00",
      status: "Delivered",
      note: "Include extra soy sauce"
    },
    {
      id: "ORD-9730",
      customer: "Lucia Garcia",
      date: "2024-05-14 20:10",
      items: ["1x Beef Tacos (3pc)", "1x Nachos"],
      total: "$22.50",
      status: "Delivered",
      note: ""
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input placeholder="Filter history..." className="pl-9 border-none bg-muted/50 h-9 text-xs rounded-md shadow-none focus-visible:ring-1" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2 h-9 text-[10px] font-bold border shadow-none bg-background hover:bg-muted">
            <FilterIcon className="size-3.5" />
            Filter
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none gap-2 h-9 text-[10px] font-bold border shadow-none bg-background hover:bg-muted">
            <FileDownIcon className="size-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="border shadow-none overflow-hidden p-0">
        <CardHeader className="pb-4 bg-muted/5 border-b p-6">
          <div className="flex items-center justify-between">
             <div>
                <CardTitle className="text-sm font-bold tracking-tight uppercase">Order History</CardTitle>
                <CardDescription className="text-[10px] font-medium text-muted-foreground">Log of past orders and transitions.</CardDescription>
             </div>
             <Badge variant="outline" className="text-[10px] bg-background font-bold border-muted">
                {history.length} Total
             </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent text-[10px] uppercase font-bold text-muted-foreground">
                <TableHead className="py-3 px-6">Order</TableHead>
                <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                <TableHead>Items Summary</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((order) => (
                <TableRow key={order.id} className="cursor-pointer group hover:bg-muted/30 transition-colors text-xs">
                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold group-hover:text-primary transition-colors">{order.id}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">{order.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-[11px] text-muted-foreground font-medium">
                    {order.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 max-w-[250px]">
                      <p className="text-[11px] line-clamp-1 font-medium text-foreground/80">{order.items.join(", ")}</p>
                      {order.note && (
                         <span className="text-[9px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 w-fit italic font-medium">
                            {order.note}
                         </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">
                    {order.total}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                       <div className={`size-1.5 rounded-full ${order.status === "Delivered" ? "bg-green-500" : "bg-red-500"}`} />
                       <span className="font-medium text-[11px]">{order.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon" className="size-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontalIcon className="size-3.5" />
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
