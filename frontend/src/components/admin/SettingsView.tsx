import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function SettingsView() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Manage global configuration and admin preferences.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="Online Food Delivery System" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="adminEmail">Admin Contact Email</Label>
            <Input id="adminEmail" type="email" defaultValue="admin@example.com" />
          </div>
          <div className="pt-4">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
