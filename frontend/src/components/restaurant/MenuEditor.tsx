import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  GripVerticalIcon,
  ImagePlusIcon,
  SearchIcon
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Mock Data
const INITIAL_CATEGORIES = [
  { id: "1", name: "Appetizers", description: "Manage items in the Appetizers category." },
  { id: "2", name: "Main Course", description: "Hearty meals for your main course." },
  { id: "3", name: "Desserts", description: "Sweet treats to end your meal." },
  { id: "4", name: "Beverages", description: "Refreshing drinks and beverages." },
]

const INITIAL_ITEMS = [
  {
    id: "101",
    name: "Crispy Calamari",
    description: "Lightly breaded and fried to golden perfection, served with house-made marinara.",
    price: 14.00,
    category: "Appetizers",
    image: "🦑",
    status: "Available",
    tags: ["Popular", "Seafood"]
  },
  {
    id: "102",
    name: "Classic Bruschetta",
    description: "Toasted baguette slices topped with a fresh mixture of diced tomatoes, garlic, basil, and balsamic glaze.",
    price: 10.00,
    category: "Appetizers",
    image: "🍅",
    status: "Sold Out",
    tags: ["Vegetarian"]
  },
  {
    id: "103",
    name: "Buffalo Wings",
    description: "Crispy chicken wings tossed in our signature spicy buffalo sauce. Served with celery.",
    price: 16.00,
    category: "Appetizers",
    image: "🍗",
    status: "Available",
    tags: ["Spicy"]
  }
]

export function MenuEditor() {
  const [categories] = useState(INITIAL_CATEGORIES)
  const [activeCategoryId, setActiveCategoryId] = useState("1")
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [searchQuery, setSearchQuery] = useState("")

  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0]

  const filteredItems = items.filter(item =>
    item.category === activeCategory.name &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleToggleStatus = (id: string) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, status: item.status === "Available" ? "Sold Out" : "Available" }
        : item
    ))
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] animate-in fade-in duration-700 -ml-2">
      {/* Sidebar - Categories */}
      <div className="w-full lg:w-48 shrink-0 space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Categories</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 rounded-full text-[#F97316] hover:bg-[#F97316]/10 transition-colors">
                <PlusIcon className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Add Category</DialogTitle>
                <DialogDescription className="font-medium">
                  Create a new category for your menu items.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-5 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="cat-name" className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Category Name</Label>
                  <Input id="cat-name" placeholder="e.g. Starters" className="h-10 rounded-xl bg-muted/50 border-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cat-desc" className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Description</Label>
                  <Textarea id="cat-desc" placeholder="Brief description of this category" className="min-h-[80px] rounded-xl bg-muted/50 border-none resize-none" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full h-10 rounded-xl font-bold shadow-lg shadow-primary/20">Save Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex lg:flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-left group relative",
                activeCategoryId === cat.id 
                  ? "bg-[#F97316]/5 text-[#F97316] font-bold" 
                  : "text-slate-400 hover:text-slate-900 font-medium hover:bg-slate-50"
              )}
            >
              <span className="relative z-10 text-sm">{cat.name}</span>
              {activeCategoryId === cat.id && (
                <>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F97316] rounded-r-full" />
                  <GripVerticalIcon className="size-3.5 opacity-30" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Items */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{activeCategory.name}</h2>
            <p className="text-slate-400 text-[13px] font-medium">{activeCategory.description}</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 rounded-xl h-10 px-5 bg-white text-[#F97316] border-2 border-[#F97316]/20 hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-300 text-xs font-bold shadow-sm active:scale-95 group">
                <PlusIcon className="size-4 transition-transform group-hover:rotate-90" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Add New Item</DialogTitle>
                <DialogDescription className="font-medium text-slate-400">
                  Add a delicious new dish to your {activeCategory.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex justify-center">
                  <div className="size-24 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 hover:border-primary/30 transition-all group">
                    <ImagePlusIcon className="size-6 text-slate-300 group-hover:text-primary transition-colors" />
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Photo</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="item-name" className="font-bold text-[10px] uppercase tracking-widest text-slate-400 ml-1">Item Name</Label>
                    <Input id="item-name" placeholder="e.g. Crispy Wings" className="h-10 rounded-xl bg-slate-50 border-none" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="item-price" className="font-bold text-[10px] uppercase tracking-widest text-slate-400 ml-1">Price ($)</Label>
                    <Input id="item-price" type="number" step="0.01" placeholder="10.00" className="h-10 rounded-xl bg-slate-50 border-none font-mono font-bold" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="item-desc" className="font-bold text-[10px] uppercase tracking-widest text-slate-400 ml-1">Description</Label>
                  <Textarea id="item-desc" placeholder="What makes this dish special?" className="min-h-[100px] rounded-xl bg-slate-50 border-none resize-none" />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="ghost" className="rounded-xl h-10 font-bold flex-1 text-xs">Cancel</Button>
                <Button type="submit" className="h-10 rounded-xl font-bold flex-[2] shadow-lg shadow-primary/20 text-xs">Save Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative group max-w-2xl">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-300 transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder={`Search in ${activeCategory.name}...`} 
            className="pl-10 h-11 bg-white border-slate-100 rounded-xl shadow-sm focus-visible:ring-primary/10 focus-visible:border-primary/20 transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="overflow-hidden border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-500 group rounded-[1.5rem] bg-white flex flex-col sm:flex-row"
              >
                {/* Item Image Container - Fixed alignment */}
                <div className="w-full sm:w-32 md:w-36 aspect-video sm:aspect-square bg-slate-50/50 flex items-center justify-center shrink-0 border-r border-slate-100/50 relative overflow-hidden">
                  <div className="size-16 md:size-20 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-center text-4xl transition-transform duration-500 group-hover:scale-110 relative z-10">
                    {item.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Item Details */}
                <div className="flex-1 p-5 flex flex-col justify-center gap-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2.5">
                        <h3 className="text-[17px] font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight">
                          {item.name}
                        </h3>
                        <span className="text-[17px] font-bold text-slate-800">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-slate-400 text-[13px] font-medium leading-relaxed max-w-lg line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className={cn(
                        "text-[9px] px-2 py-0.5 font-black uppercase tracking-widest border-none shadow-sm",
                        tag === "Spicy" && "bg-red-50 text-red-400",
                        tag === "Vegetarian" && "bg-emerald-50 text-emerald-500",
                        tag === "Popular" && "bg-orange-50 text-orange-500",
                        tag === "Seafood" && "bg-blue-50 text-blue-500",
                      )}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions Area */}
                <div className="w-full sm:w-auto p-5 sm:border-l border-slate-50 flex sm:flex-col items-center justify-between sm:justify-center gap-4 bg-slate-50/20 sm:min-w-[120px]">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest",
                      item.status === "Available" ? "text-primary" : "text-slate-300"
                    )}>
                      {item.status}
                    </span>
                    <Switch 
                      checked={item.status === "Available"} 
                      onCheckedChange={() => handleToggleStatus(item.id)}
                      className="scale-90"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <Button variant="ghost" size="icon" className="size-8 rounded-xl bg-white hover:bg-primary hover:text-white shadow-sm border border-slate-50 transition-all duration-300">
                      <PencilIcon className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 rounded-xl bg-white hover:bg-red-500 hover:text-white shadow-sm border border-slate-50 transition-all duration-300">
                      <Trash2Icon className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
              <div className="bg-white size-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <SearchIcon className="size-6 text-slate-200" />
              </div>
              <h3 className="text-xl font-black text-slate-800">No items found</h3>
              <p className="text-slate-400 text-sm font-medium mt-1">Try another search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
