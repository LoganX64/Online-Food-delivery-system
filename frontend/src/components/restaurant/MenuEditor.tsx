import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, SearchIcon, MoreVerticalIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function MenuEditor() {
  const categories = ["All", "Burgers", "Pizza", "Pasta", "Salads", "Desserts", "Drinks"]
  
  const menuItems = [
    { id: 1, name: "Classic Cheeseburger", category: "Burgers", price: "$12.50", status: "Available", image: "🍔" },
    { id: 2, name: "Margherita Pizza", category: "Pizza", price: "$14.00", status: "Available", image: "🍕" },
    { id: 3, name: "Chicken Alfredo", category: "Pasta", price: "$16.50", status: "Out of Stock", image: "🍝" },
    { id: 4, name: "Caesar Salad", category: "Salads", price: "$10.00", status: "Available", image: "🥗" },
    { id: 5, name: "Chocolate Brownie", category: "Desserts", price: "$6.50", status: "Available", image: "🍰" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search menu items..." className="pl-9 border shadow-sm h-11 rounded-md bg-background" />
        </div>
        <Button className="w-full md:w-auto gap-2 h-11 rounded-md shadow-sm">
          <PlusIcon className="size-4" />
          Add New Item
        </Button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, i) => (
          <Button 
            key={cat} 
            variant={i === 0 ? "default" : "outline"} 
            size="sm" 
            className={`rounded-full px-5 transition-all ${i !== 0 ? "border shadow-sm bg-background hover:bg-muted" : ""}`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-300 w-full p-0 flex flex-col gap-0">
            {/* Image Container - mimicking FoodCard from Home page */}
            <div className="relative aspect-[4/3] overflow-hidden w-full bg-muted/20 flex items-center justify-center text-5xl transition-transform duration-700 group-hover:scale-105">
              {item.image}
              
              <div className="absolute top-0 left-0 z-10">
                <div className="bg-primary text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-br-xl shadow-md">
                  {item.category}
                </div>
              </div>

              <div className="absolute top-3 right-3 z-10">
                <Button variant="ghost" size="icon" className="size-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-primary hover:text-white transition-all duration-300">
                  <MoreVerticalIcon className="size-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-4 flex flex-col flex-1 gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight truncate">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-[11px] font-semibold mt-1 truncate uppercase tracking-wider">
                    {item.category}
                  </p>
                </div>
                <div className="shrink-0">
                   <Badge 
                    className={`border-none text-[9px] font-bold uppercase tracking-tight ${item.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
              
              <div className="pt-3 border-t border-muted/30 mt-auto flex items-center justify-between">
                <span className="font-bold text-lg text-primary">{item.price}</span>
                <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold px-3">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
