import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { MapPinIcon, Trash2Icon, EditIcon, PlusIcon, StarIcon } from "lucide-react"
import { addressApi, type Address } from "@/api/address.api"
import { toast } from "sonner"
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog"

export function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const initialFormState: Omit<Address, '_id' | 'userId' | 'isActive' | 'createdAt'> = {
    label: "home",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  }
  const [form, setForm] = useState(initialFormState)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = () => {
    addressApi.getAll()
      .then(setAddresses)
      .catch((err) => toast.error(err?.message || "Failed to load addresses"))
      .finally(() => setLoading(false))
  }

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setEditingId(address._id)
      setForm({
        label: address.label,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        isDefault: address.isDefault,
      })
    } else {
      setEditingId(null)
      setForm(initialFormState)
    }
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.addressLine.trim() || !form.city.trim() || !form.state.trim() || !form.pincode.trim()) {
      toast.error("Please fill all required fields")
      return
    }
    
    try {
      setSaving(true)
      if (editingId) {
        const updated = await addressApi.update(editingId, form)
        setAddresses((prev) => {
            const newList = form.isDefault ? prev.map(a => ({ ...a, isDefault: false })) : prev
            return newList.map((a) => (a._id === editingId ? updated : a))
        })
        toast.success("Address updated successfully")
      } else {
        const created = await addressApi.create(form)
        setAddresses((prev) => {
            const newList = form.isDefault ? prev.map(a => ({ ...a, isDefault: false })) : prev
            return [created, ...newList]
        })
        toast.success("Address added successfully")
      }
      setDialogOpen(false)
    } catch (err: any) {
      toast.error(err?.message || "Failed to save address")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, label: string) => {
    try {
      await addressApi.remove(id)
      setAddresses((prev) => prev.filter((a) => a._id !== id))
      toast.success(`${label} address removed`)
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove address")
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      await addressApi.update(id, { isDefault: true })
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a._id === id })))
      toast.success("Default address updated")
    } catch (err: any) {
      toast.error(err?.message || "Failed to update default address")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Saved Addresses</h2>
          <p className="text-muted-foreground">Manage your delivery locations for faster checkout</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusIcon className="mr-2 size-4" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Address" : "Add Address"}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="addr-label">Label</Label>
                <select
                  id="addr-label"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value as any })}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="addr-line">Address Line</Label>
                <Input
                  id="addr-line"
                  value={form.addressLine}
                  onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
                  placeholder="Street, Building, Apartment"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="addr-city">City</Label>
                  <Input
                    id="addr-city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="addr-state">State</Label>
                  <Input
                    id="addr-state"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="addr-pincode">Pincode</Label>
                <Input
                  id="addr-pincode"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  placeholder="Postal Code"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-sm pt-2">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="accent-primary size-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                Set as default delivery address
              </label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground">
                {saving ? "Saving…" : "Save Address"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => <Skeleton key={i} className="h-44 rounded-xl" />)}
        </div>
      ) : addresses.length === 0 ? (
        <div className="py-16 text-center flex flex-col gap-3 border rounded-xl bg-muted/20">
          <MapPinIcon className="size-10 mx-auto text-muted-foreground" />
          <p className="font-medium text-muted-foreground">No addresses saved</p>
          <p className="text-sm text-muted-foreground">Add an address to start ordering.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address._id} className={address.isDefault ? "border-primary/50 ring-1 ring-primary/20" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 capitalize">
                    <MapPinIcon className={`size-4 ${address.isDefault ? "text-primary" : "text-muted-foreground"}`} />
                    <CardTitle className="text-base font-bold">{address.label}</CardTitle>
                    {address.isDefault && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] h-5 px-2">Default</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground" onClick={() => handleOpenDialog(address)}>
                      <EditIcon className="size-4" />
                    </Button>
                    <ConfirmDeleteDialog 
                      onConfirm={() => handleDelete(address._id, address.label)}
                      title={`Delete ${address.label} address?`}
                    >
                      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive">
                        <Trash2Icon className="size-4" />
                      </Button>
                    </ConfirmDeleteDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="text-sm flex flex-col gap-1">
                  <p className="font-medium text-foreground">{address.addressLine}</p>
                  <p className="text-muted-foreground">{address.city}, {address.state} {address.pincode}</p>
                </div>
                {!address.isDefault && (
                  <Button 
                    variant="outline" 
                    className="w-full text-xs hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-colors" 
                    size="sm"
                    onClick={() => handleSetDefault(address._id)}
                  >
                    <StarIcon className="size-3 mr-1" /> Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
