import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import { CreditCardIcon, Trash2Icon, PlusIcon, ShieldCheckIcon, StarIcon } from "lucide-react"
import { paymentMethodApi, type PaymentMethod } from "@/api/paymentMethod.api"
import { toast } from "sonner"
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog"

const PROVIDERS = ["Visa", "Mastercard", "UPI", "NetBanking", "Amex"]

export function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ provider: "Visa", last4: "", token: "", isDefault: false })

  useEffect(() => {
    paymentMethodApi.getAll()
      .then(setMethods)
      .catch((err) => toast.error(err?.message || "Failed to load payment methods"))
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async () => {
    if (!form.token.trim()) { toast.error("Reference/token is required"); return }
    if (form.last4 && !/^\d{4}$/.test(form.last4)) { toast.error("Last 4 must be exactly 4 digits"); return }
    try {
      setSaving(true)
      const created = await paymentMethodApi.create({
        provider: form.provider,
        last4: form.last4 || undefined,
        token: form.token.trim(),
        isDefault: form.isDefault,
      })
      setMethods((prev) => {
        const updated = form.isDefault ? prev.map((m) => ({ ...m, isDefault: false })) : prev
        return [created, ...updated]
      })
      toast.success(`${form.provider} payment method added`)
      setDialogOpen(false)
      setForm({ provider: "Visa", last4: "", token: "", isDefault: false })
    } catch (err: any) {
      toast.error(err?.message || "Failed to add payment method")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, provider: string) => {
    try {
      await paymentMethodApi.remove(id)
      setMethods((prev) => prev.filter((m) => m._id !== id))
      toast.success(`${provider} removed`)
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove")
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      await paymentMethodApi.update(id, { isDefault: true })
      setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m._id === id })))
      toast.success("Default updated")
    } catch (err: any) {
      toast.error(err?.message || "Failed to update")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Payment Methods</h2>
          <p className="text-muted-foreground">Securely manage your cards and payment options</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusIcon className="mr-2 size-4" /> Add New Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle>Add Payment Method</DialogTitle></DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pm-provider">Provider</Label>
                <select id="pm-provider" value={form.provider}
                  onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                  {PROVIDERS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pm-last4">Last 4 Digits (optional)</Label>
                <Input id="pm-last4" value={form.last4} maxLength={4} placeholder="4242"
                  onChange={(e) => setForm((f) => ({ ...f, last4: e.target.value.slice(0, 4) }))} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pm-token">Reference / Token *</Label>
                <Input id="pm-token" value={form.token} placeholder="tok_visa_xxx"
                  onChange={(e) => setForm((f) => ({ ...f, token: e.target.value }))} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={form.isDefault}
                  onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                  className="accent-primary" />
                Set as default payment method
              </label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>Cancel</Button>
              <Button onClick={handleAdd} disabled={saving} className="bg-primary text-primary-foreground">
                {saving ? "Adding…" : "Add Method"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => <Skeleton key={i} className="h-44 rounded-xl" />)}
        </div>
      ) : methods.length === 0 ? (
        <div className="py-16 text-center flex flex-col gap-3 border rounded-xl bg-muted/20">
          <CreditCardIcon className="size-10 mx-auto text-muted-foreground" />
          <p className="font-medium text-muted-foreground">No payment methods saved</p>
          <p className="text-sm text-muted-foreground">Add a card or UPI to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {methods.map((method) => (
            <Card key={method._id} className={`overflow-hidden p-0 ${method.isDefault ? "ring-2 ring-primary/30" : ""}`}>
              <div className="bg-muted/40 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="size-5 text-primary" />
                  <span className="font-bold">{method.provider}</span>
                </div>
                {method.isDefault && <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">Default</Badge>}
              </div>
              <CardContent className="p-6 flex flex-col gap-3">
                {method.last4 && (
                  <p className="text-lg font-mono tracking-widest font-semibold">
                    **** **** **** {method.last4}
                  </p>
                )}
                <p className="text-xs text-muted-foreground font-mono break-all">{method.token}</p>
                <div className="flex gap-2 pt-2">
                  {!method.isDefault && (
                    <Button variant="outline" className="flex-1 text-xs" size="sm"
                      onClick={() => handleSetDefault(method._id)}>
                      <StarIcon className="size-3 mr-1" /> Set Default
                    </Button>
                  )}
                  <ConfirmDeleteDialog 
                    onConfirm={() => handleDelete(method._id, method.provider)}
                    title={`Remove ${method.provider}?`}
                  >
                    <Button variant="outline" size="sm" className="flex-1 text-xs text-destructive hover:text-destructive">
                      <Trash2Icon className="size-3 mr-2" /> Remove
                    </Button>
                  </ConfirmDeleteDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-primary/5 border-dashed border-primary/20">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="bg-background p-3 rounded-full shadow-sm border border-border">
            <ShieldCheckIcon className="size-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-primary">Secure Payments</p>
            <p className="text-sm text-muted-foreground">Only safe references are stored. Full card details are never saved.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
