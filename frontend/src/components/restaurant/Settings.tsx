import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPinIcon, PhoneIcon, MailIcon, StoreIcon } from "lucide-react"

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Card className="border shadow-sm overflow-hidden p-0">
        <CardHeader className="bg-muted/50 p-8 pb-8 rounded-t-none">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="size-24 border-4 border-background shadow-xl">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">BK</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">Burger King #1042</CardTitle>
              <CardDescription className="text-base font-medium">Manage your restaurant profile and account settings.</CardDescription>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-none px-3 py-1 font-semibold">Verified Partner</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-none px-3 py-1 font-semibold">Store Open</Badge>
              </div>
            </div>
            <Button className="md:ml-auto rounded-md shadow-sm">Change Cover Image</Button>
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
                 <Label htmlFor="rest-name" className="font-semibold text-muted-foreground">Restaurant Name</Label>
                 <Input id="rest-name" defaultValue="Burger King" className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="rest-email" className="font-semibold text-muted-foreground">Business Email</Label>
                 <div className="relative">
                   <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                   <Input id="rest-email" defaultValue="bk1042@burgerking.com" className="pl-12 rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="rest-phone" className="font-semibold text-muted-foreground">Phone Number</Label>
                 <div className="relative">
                   <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                   <Input id="rest-phone" defaultValue="+1 (555) 123-4567" className="pl-12 rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="font-bold flex items-center gap-2 text-primary text-lg">
                  <MapPinIcon className="size-5" />
                  Address Details
               </h3>
               <div className="space-y-2">
                 <Label htmlFor="rest-address" className="font-semibold text-muted-foreground">Street Address</Label>
                 <Input id="rest-address" defaultValue="123 Fast Food Lane" className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="rest-city" className="font-semibold text-muted-foreground">City</Label>
                   <Input id="rest-city" defaultValue="Gourmet City" className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="rest-state" className="font-semibold text-muted-foreground">State</Label>
                   <Input id="rest-state" defaultValue="NY" className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="rest-zip" className="font-semibold text-muted-foreground">Zip Code</Label>
                   <Input id="rest-zip" defaultValue="10001" className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="rest-country" className="font-semibold text-muted-foreground">Country</Label>
                   <Input id="rest-country" defaultValue="USA" className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                 </div>
               </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" className="rounded-md h-12 px-10 bg-muted/20 font-bold hover:bg-muted/30">Cancel</Button>
            <Button className="rounded-md h-12 px-10 shadow-sm font-bold">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
