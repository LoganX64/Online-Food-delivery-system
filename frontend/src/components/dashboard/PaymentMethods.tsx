import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCardIcon, Trash2Icon, PlusIcon, ShieldCheckIcon } from "lucide-react"

export function PaymentMethods() {
  const cards = [
    {
      id: 1,
      name: "John Doe",
      number: "**** **** **** 4242",
      expiry: "12/25",
      type: "Visa",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      number: "**** **** **** 5555",
      expiry: "08/24",
      type: "Mastercard",
      isDefault: false,
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Payment Methods</h2>
          <p className="text-muted-foreground">Securely manage your cards and payment options</p>
        </div>
        <Button className="shrink-0 bg-primary hover:bg-primary/90 text-white">
          <PlusIcon className="mr-2 h-4 w-4" /> Add New Card
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="h-5 w-5 text-primary" />
                  <span className="font-bold">{card.type}</span>
                </div>
                {card.isDefault && (
                  <Badge className="bg-success-soft text-success border-success/20">Default</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Card Number</p>
                <p className="text-lg font-mono tracking-wider font-semibold">{card.number}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Card Holder</p>
                  <p className="text-sm font-medium">{card.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Expires</p>
                  <p className="text-sm font-medium">{card.expiry}</p>
                </div>
              </div>
              <div className="pt-4 flex gap-2">
                <Button variant="outline" className="flex-1 text-xs" size="sm">Edit</Button>
                <Button variant="outline" className="flex-1 text-xs text-destructive hover:text-destructive" size="sm">
                  <Trash2Icon className="mr-2 h-3 w-3" /> Remove
                </Button>
              </div>
              <div className="mt-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="sm">Save Button</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary-soft/30 border-dashed border-primary/30">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <ShieldCheckIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-primary">Secure Payments</p>
            <p className="text-sm text-muted-foreground">Your payment information is encrypted and stored securely.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
