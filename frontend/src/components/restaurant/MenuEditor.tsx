import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  GripVerticalIcon,
  ImagePlusIcon,
  SearchIcon,
  Loader2
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getRestaurantMenu, createMenuItem, updateMenuItem, deleteMenuItem, type MenuItem } from "@/api/menu.api"
import { getMyCategories, createCategory, deleteCategoryApi, type Category } from "@/api/category.api"
import { getRestaurantMe } from "@/api/restaurant.api"
import { toast } from "sonner"
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog"

interface MenuEditorProps {
  isAddDialogOpen?: boolean;
  onAddDialogChange?: (open: boolean) => void;
}

export function MenuEditor({ isAddDialogOpen, onAddDialogChange }: MenuEditorProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [items, setItems] = useState<MenuItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [restaurantId, setRestaurantId] = useState<string | null>(null)

  const [formData, setFormData] = useState({ name: "", price: "", description: "", categoryName: "" })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [editingOriginalData, setEditingOriginalData] = useState<typeof formData | null>(null)

  // Category dialog state
  const [newCatName, setNewCatName] = useState("")
  const [newCatDesc, setNewCatDesc] = useState("")
  const [isSavingCat, setIsSavingCat] = useState(false)
  const [isCatDialogOpen, setIsCatDialogOpen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchData = async () => {
    try {
      const [restaurant, cats] = await Promise.all([
        getRestaurantMe(),
        getMyCategories(),
      ])
      setRestaurantId(restaurant._id)
      setCategories(cats)

      if (cats.length > 0 && !activeCategoryId) {
        setActiveCategoryId(cats[0]._id)
      }

      const menuData = await getRestaurantMenu(restaurant._id)
      setItems(menuData)
    } catch (error) {
      toast.error("Failed to load menu")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const activeCategory = categories.find(c => c._id === activeCategoryId) || categories[0] || null

  const filteredItems = items.filter(item =>
    activeCategory && item.category === activeCategory.name &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  // Show all items if no categories exist yet
  const displayItems = categories.length === 0
    ? items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredItems

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const formData = new FormData()
      formData.append('isAvailable', String(!currentStatus))
      await updateMenuItem(id, formData)
      setItems(items.map(item => item._id === id ? { ...item, isAvailable: !currentStatus } : item))
      toast.success("Status updated")
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  const resetForm = () => {
    setFormData({ name: "", price: "", description: "", categoryName: activeCategory?.name || "" })
    setImageFile(null)
    setEditingItemId(null)
    setEditingOriginalData(null)
  }

  const handleSaveItem = async () => {
    if (!formData.name || !formData.price) {
      toast.error("Name and price are required")
      return
    }
    if (!formData.categoryName) {
      toast.error("Please select a category")
      return
    }

    try {
      setIsSaving(true)
      const data = new FormData()
      data.append('name', formData.name)
      data.append('price', formData.price)
      data.append('description', formData.description)
      data.append('category', formData.categoryName)
      if (imageFile) {
        data.append('image', imageFile)
      }

      if (editingItemId) {
        await updateMenuItem(editingItemId, data)
        toast.success("Menu item updated")
      } else {
        await createMenuItem(data)
        toast.success("Menu item created")
      }

      if (restaurantId) {
        const menuData = await getRestaurantMenu(restaurantId)
        setItems(menuData)
      }
      onAddDialogChange?.(false)
      resetForm()
    } catch (error) {
      toast.error("Failed to save menu item")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id)
      setItems(items.filter(i => i._id !== id))
      toast.success("Item deleted")
    } catch (error) {
      toast.error("Failed to delete item")
    }
  }

  const openEdit = (item: MenuItem) => {
    const data = {
      name: item.name,
      price: item.price.toString(),
      description: item.description || "",
      categoryName: item.category
    }
    setFormData(data)
    setEditingOriginalData(data)
    setImageFile(null)
    setEditingItemId(item._id)
    onAddDialogChange?.(true)
  }

  const handleAddCategory = async () => {
    if (!newCatName.trim()) {
      toast.error("Category name is required")
      return
    }
    try {
      setIsSavingCat(true)
      const created = await createCategory({ name: newCatName.trim(), description: newCatDesc.trim() || undefined })
      setCategories(prev => [...prev, created])
      setActiveCategoryId(created._id)
      setNewCatName("")
      setNewCatDesc("")
      setIsCatDialogOpen(false)
      toast.success("Category created")
    } catch (error: any) {
      toast.error(error.message || "Failed to create category")
    } finally {
      setIsSavingCat(false)
    }
  }

  const handleDeleteCategory = async (catId: string) => {
    try {
      await deleteCategoryApi(catId)
      const updated = categories.filter(c => c._id !== catId)
      setCategories(updated)
      if (activeCategoryId === catId) {
        setActiveCategoryId(updated[0]?._id || null)
      }
      toast.success("Category deleted")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    )
  }

  const hasItemChanges = editingItemId && editingOriginalData ? (
    formData.name !== editingOriginalData.name ||
    formData.price !== editingOriginalData.price ||
    formData.description !== editingOriginalData.description ||
    formData.categoryName !== editingOriginalData.categoryName ||
    imageFile !== null
  ) : true

  const isSaveDisabled = isSaving || (editingItemId ? !hasItemChanges : (!formData.name || !formData.price))

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] animate-in fade-in duration-700 -ml-2">
      {/* Sidebar - Categories */}
      <div className="w-full lg:w-48 shrink-0 space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Categories</h2>
          <Dialog open={isCatDialogOpen} onOpenChange={setIsCatDialogOpen}>
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
                  <Input id="cat-name" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="e.g. Starters" className="h-10 rounded-xl bg-muted/50 border-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cat-desc" className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Description</Label>
                  <Textarea id="cat-desc" value={newCatDesc} onChange={(e) => setNewCatDesc(e.target.value)} placeholder="Brief description of this category" className="min-h-[80px] rounded-xl bg-muted/50 border-none resize-none" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddCategory} disabled={isSavingCat} className="w-full h-10 rounded-xl font-bold shadow-lg shadow-primary/20">
                  {isSavingCat ? <Loader2 className="animate-spin size-4 mr-2" /> : null}
                  Save Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-8 px-2">
            <p className="text-sm text-muted-foreground">No categories yet. Create one to organize your menu.</p>
          </div>
        ) : (
          <div className="flex lg:flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategoryId(cat._id)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-left group relative",
                  activeCategoryId === cat._id
                    ? "bg-[#F97316]/5 text-[#F97316] font-bold"
                    : "text-slate-400 hover:text-slate-900 font-medium hover:bg-slate-50"
                )}
              >
                <span className="relative z-10 text-sm">{cat.name}</span>
                {activeCategoryId === cat._id && (
                  <>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F97316] rounded-r-full" />
                    <div className="flex items-center gap-1">
                      <ConfirmDeleteDialog
                        title="Delete Category?"
                        description={`Are you sure you want to delete category "${cat.name}"? This action cannot be undone.`}
                        onConfirm={() => handleDeleteCategory(cat._id)}
                      >
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete category"
                          onClick={(e) => {
                            const hasItems = items.some(item => item.category === cat.name)
                            if (hasItems) {
                              e.preventDefault()
                              e.stopPropagation()
                              toast.error("Remove all items from this category first")
                            }
                          }}
                        >
                          <Trash2Icon className="size-3 text-destructive hover:text-destructive/80" />
                        </button>
                      </ConfirmDeleteDialog>
                      <GripVerticalIcon className="size-3.5 opacity-30" />
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content - Items */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">{activeCategory?.name || "All Items"}</h2>
            <p className="text-slate-400 text-[13px] font-medium">{activeCategory?.description || "Manage your menu items."}</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            if (!open) resetForm()
            onAddDialogChange?.(open)
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2 rounded-xl h-10 px-5 bg-white text-[#F97316] border-2 border-[#F97316]/20 hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-300 text-xs font-bold shadow-sm active:scale-95 group">
                <PlusIcon className="size-4 transition-transform group-hover:rotate-90" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">{editingItemId ? "Edit Item" : "Add New Item"}</DialogTitle>
                <DialogDescription className="font-medium text-slate-400">
                  {editingItemId ? "Update the details of this dish." : `Add a delicious new dish to your menu.`}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex justify-center">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="size-24 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 hover:border-primary/30 transition-all group overflow-hidden"
                  >
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImagePlusIcon className="size-6 text-slate-300 group-hover:text-primary transition-colors" />
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Photo</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="item-name" className="font-bold text-[10px] uppercase tracking-widest text-slate-400 ml-1">Item Name</Label>
                    <Input id="item-name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Crispy Wings" className="h-10 rounded-xl bg-slate-50 border-none" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="item-price" className="font-bold text-[10px] uppercase tracking-widest text-slate-400 ml-1">Price ($)</Label>
                    <Input id="item-price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="10.00" className="h-10 rounded-xl bg-slate-50 border-none font-mono font-bold" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label className="font-bold text-[10px] uppercase tracking-widest text-slate-400 ml-1">Category</Label>
                  {categories.length > 0 ? (
                    <Select value={formData.categoryName} onValueChange={(val) => setFormData({...formData, categoryName: val})}>
                      <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-none">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat._id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-muted-foreground px-1">No categories yet — create one from the sidebar first.</p>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="item-desc" className="font-bold text-[10px] uppercase tracking-widest text-slate-400 ml-1">Description</Label>
                  <Textarea id="item-desc" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="What makes this dish special?" className="min-h-[100px] rounded-xl bg-slate-50 border-none resize-none" />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="ghost" onClick={() => onAddDialogChange?.(false)} className="rounded-xl h-10 font-bold flex-1 text-xs">Cancel</Button>
                <Button onClick={handleSaveItem} disabled={isSaveDisabled} className="h-10 rounded-xl font-bold flex-[2] shadow-lg shadow-primary/20 text-xs">
                  {isSaving ? <Loader2 className="animate-spin size-4 mr-2" /> : null}
                  {editingItemId ? 'Update Item' : 'Save Item'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative group max-w-2xl">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-300 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder={`Search in ${activeCategory?.name || "menu"}...`}
            className="pl-10 h-11 bg-white border-slate-100 rounded-xl shadow-sm focus-visible:ring-primary/10 focus-visible:border-primary/20 transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          {displayItems.length > 0 ? (
            displayItems.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-500 group rounded-[1.5rem] bg-white flex flex-col sm:flex-row"
              >
                {/* Item Image Container */}
                <div className="w-full sm:w-32 md:w-36 aspect-video sm:aspect-square bg-slate-50/50 flex items-center justify-center shrink-0 border-r border-slate-100/50 relative overflow-hidden">
                  {item.image ? (
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="size-16 md:size-20 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-center text-4xl transition-transform duration-500 group-hover:scale-110 relative z-10">
                      🍽️
                    </div>
                  )}
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
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border-none">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                {/* Actions Area */}
                <div className="w-full sm:w-auto p-5 sm:border-l border-slate-50 flex sm:flex-col items-center justify-between sm:justify-center gap-4 bg-slate-50/20 sm:min-w-[120px]">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest",
                      item.isAvailable ? "text-primary" : "text-slate-300"
                    )}>
                      {item.isAvailable ? "Available" : "Sold Out"}
                    </span>
                    <Switch
                      checked={item.isAvailable}
                      onCheckedChange={() => handleToggleStatus(item._id, item.isAvailable)}
                      className="scale-90"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button variant="ghost" onClick={() => openEdit(item)} size="icon" className="size-8 rounded-xl bg-white hover:bg-primary hover:text-white shadow-sm border border-slate-50 transition-all duration-300">
                      <PencilIcon className="size-3.5" />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Delete Menu Item?"
                      description={`Are you sure you want to delete "${item.name}"? This action cannot be undone.`}
                      onConfirm={() => handleDelete(item._id)}
                    >
                      <Button variant="ghost" size="icon" className="size-8 rounded-xl bg-white hover:bg-red-500 hover:text-white shadow-sm border border-slate-50 transition-all duration-300">
                        <Trash2Icon className="size-3.5" />
                      </Button>
                    </ConfirmDeleteDialog>
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
              <p className="text-slate-400 text-sm font-medium mt-1">
                {categories.length === 0 ? "Create a category first, then add items." : "Try another search term or add a new item."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
