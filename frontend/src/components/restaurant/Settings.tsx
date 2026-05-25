import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPinIcon, PhoneIcon, MailIcon, StoreIcon, Loader2 } from "lucide-react"
import { getRestaurantMe, updateRestaurantMe, type Restaurant } from "@/api/restaurant.api"
import { toast } from "sonner"

export function Settings() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  })

  useEffect(() => {
    fetchRestaurant()
  }, [])

  const fetchRestaurant = async () => {
    try {
      setIsLoading(true)
      const data = await getRestaurantMe()
      setRestaurant(data)
      setFormData({
        name: data.name || "",
        contactEmail: data.contactEmail || "",
        contactPhone: data.contactPhone || "",
        street: data.address?.street || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        pincode: data.address?.pincode || "",
        country: data.address?.country || "USA",
      })
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to load restaurant details")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const updateData = {
        name: formData.name,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        }
      }
      
      const updated = await updateRestaurantMe(updateData)
      setRestaurant(updated)
      toast.success("Restaurant details updated successfully!")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update restaurant details")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Card className="border shadow-sm overflow-hidden p-0">
        <CardHeader className="bg-muted/50 p-8 pb-8 rounded-t-none">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="size-24 border-4 border-background shadow-xl">
              <AvatarImage src={restaurant?.imageUrl || ""} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {restaurant?.name?.substring(0, 2).toUpperCase() || "RE"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">{restaurant?.name || "Restaurant Name"}</CardTitle>
              <CardDescription className="text-base font-medium">Manage your restaurant profile and account settings.</CardDescription>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-none px-3 py-1 font-semibold">
                  {restaurant?.isApproved ? "Verified Partner" : "Pending Approval"}
                </Badge>
                {restaurant?.isActive && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-none px-3 py-1 font-semibold">Store Open</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
               <h3 className="font-bold flex items-center gap-2 text-primary text-lg">
                  <StoreIcon className="size-5" />
                  Restaurant Information
               </h3>
               <div className="space-y-2">
                 <Label htmlFor="name" className="font-semibold text-muted-foreground">Restaurant Name</Label>
                 <Input id="name" value={formData.name} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="contactEmail" className="font-semibold text-muted-foreground">Business Email</Label>
                 <div className="relative">
                   <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                   <Input id="contactEmail" value={formData.contactEmail} onChange={handleInputChange} className="pl-12 rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="contactPhone" className="font-semibold text-muted-foreground">Phone Number</Label>
                 <div className="relative">
                   <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                   <Input id="contactPhone" value={formData.contactPhone} onChange={handleInputChange} className="pl-12 rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="font-bold flex items-center gap-2 text-primary text-lg">
                  <MapPinIcon className="size-5" />
                  Address Details
               </h3>
               <div className="space-y-2">
                 <Label htmlFor="street" className="font-semibold text-muted-foreground">Street Address</Label>
                 <Input id="street" value={formData.street} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="city" className="font-semibold text-muted-foreground">City</Label>
                   <Input id="city" value={formData.city} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="state" className="font-semibold text-muted-foreground">State</Label>
                   <Input id="state" value={formData.state} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="pincode" className="font-semibold text-muted-foreground">Zip Code</Label>
                   <Input id="pincode" value={formData.pincode} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="country" className="font-semibold text-muted-foreground">Country</Label>
                   <Input id="country" value={formData.country} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
               </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={() => fetchRestaurant()} disabled={isSaving} className="rounded-md h-12 px-10 bg-muted/20 font-bold hover:bg-muted/30">Reset</Button>
            <Button onClick={handleSave} disabled={isSaving} className="rounded-md h-12 px-10 shadow-sm font-bold">
              {isSaving ? <Loader2 className="animate-spin size-5 mr-2" /> : null}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
