import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, PhoneIcon, Trash2Icon, EditIcon, PlusIcon } from "lucide-react"

export function SavedAddresses() {
  const addresses = [
    {
      id: 1,
      label: "Home",
      addressLine: "123 Food Street, Delicious Avenue",
      city: "New York",
      state: "NY",
      pincode: "10001",
      country: "United States",
      phone: "+1 (555) 000-0000",
      isDefault: true,
    },
    {
      id: 2,
      label: "Office",
      addressLine: "456 Tech Plaza, Innovation Way",
      city: "Brooklyn",
      state: "NY",
      pincode: "11201",
      country: "United States",
      phone: "+1 (555) 111-2222",
      isDefault: false,
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Saved Addresses</h2>
          <p className="text-muted-foreground">Manage your delivery locations for faster checkout</p>
        </div>
        <Button className="shrink-0 bg-primary hover:bg-primary/90 text-white">
          <PlusIcon className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id} className={address.isDefault ? "border-primary/50 ring-1 ring-primary/20" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPinIcon className={`h-4 w-4 ${address.isDefault ? "text-primary" : "text-muted-foreground"}`} />
                  <CardTitle className="text-base font-bold">{address.label}</CardTitle>
                  {address.isDefault && (
                    <Badge variant="secondary" className="bg-primary-soft text-primary text-[10px] h-4">Default</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">{address.addressLine}</p>
                <p className="text-muted-foreground">{address.city}, {address.state} {address.pincode}</p>
                <p className="text-muted-foreground">{address.country}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                <PhoneIcon className="h-3 w-3" />
                <span>{address.phone}</span>
              </div>
              <Button variant="outline" className="w-full text-xs" size="sm">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
