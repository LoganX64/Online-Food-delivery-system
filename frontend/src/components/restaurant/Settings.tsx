import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPinIcon, PhoneIcon, MailIcon, StoreIcon, Loader2, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { getRestaurantMe, updateRestaurantMe, type Restaurant } from "@/api/restaurant.api"
import { authApi, type User } from "@/api/auth.api"
import { updateMyProfile, updateMyPassword } from "@/api/user.api"
import { addressApi, type Address } from "@/api/address.api"
import { toast } from "sonner"

export function Settings() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [address, setAddress] = useState<Address | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [showCurrentPwd, setShowCurrentPwd] = useState(false)
  const [showNewPwd, setShowNewPwd] = useState(false)
  const [isChangingPwd, setIsChangingPwd] = useState(false)

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    restaurantName: "",
    restaurantDescription: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [initialData, setInitialData] = useState<typeof formData | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const [currentUser, currentRestaurant, addresses] = await Promise.all([
        authApi.getMe(),
        getRestaurantMe().catch(() => null), // Allow to fail if no restaurant created yet
        addressApi.getAll()
      ])

      // Enforce 1 address per restaurant owner: always use the very first address found.
      const existingAddress = addresses.length > 0 ? addresses[0] : null;

      setUser(currentUser)
      setRestaurant(currentRestaurant)
      setAddress(existingAddress)

      const dataObj = {
        userName: currentUser.name || "",
        userEmail: currentUser.email || "",
        userPhone: currentUser.phone || "",
        restaurantName: currentRestaurant?.name || "",
        restaurantDescription: currentRestaurant?.description || "",
        addressLine: existingAddress?.addressLine || currentRestaurant?.addressLine || "",
        city: existingAddress?.city || currentRestaurant?.city || "",
        state: existingAddress?.state || currentRestaurant?.state || "",
        pincode: existingAddress?.pincode || currentRestaurant?.pincode || "",
      }
      setFormData(dataObj)
      setInitialData(dataObj)
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to load details")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      // 1. Update User Profile (Name, Phone)
      await updateMyProfile({
        name: formData.userName,
        phone: formData.userPhone
      })

      // 2. Update or Create Address (Strictly enforcing ONE address)
      const addressPayload = {
        label: "home" as const,
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isDefault: true
      }

      if (address && address._id) {
        await addressApi.update(address._id, addressPayload)
      } else {
        await addressApi.create(addressPayload)
      }

      // 3. Update Restaurant (Name, Description, and sync address fields)
      if (restaurant) {
        await updateRestaurantMe({
          name: formData.restaurantName,
          description: formData.restaurantDescription,
          addressLine: formData.addressLine,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        })
      }

      await fetchData()
      toast.success("Profile updated successfully!")
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error("Please fill in all password fields"); return
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters"); return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match"); return
    }
    try {
      setIsChangingPwd(true)
      await updateMyPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      toast.success("Password changed successfully!")
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error: any) {
      toast.error(error.message || "Failed to change password")
    } finally {
      setIsChangingPwd(false)
    }
  }

  const hasChanges = initialData ? (
    formData.userName !== initialData.userName ||
    formData.userPhone !== initialData.userPhone ||
    formData.restaurantName !== initialData.restaurantName ||
    formData.restaurantDescription !== initialData.restaurantDescription ||
    formData.addressLine !== initialData.addressLine ||
    formData.city !== initialData.city ||
    formData.state !== initialData.state ||
    formData.pincode !== initialData.pincode
  ) : false

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
                Account & Restaurant Profile
              </h3>
              <div className="space-y-2">
                <Label htmlFor="userName" className="font-semibold text-muted-foreground">Owner Name</Label>
                <Input id="userName" value={formData.userName} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail" className="font-semibold text-muted-foreground">Login Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <Input id="userEmail" disabled value={formData.userEmail} className="pl-12 rounded-md border bg-muted/20 h-12 text-muted-foreground cursor-not-allowed" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="userPhone" className="font-semibold text-muted-foreground">Contact Phone</Label>
                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <Input id="userPhone" value={formData.userPhone} onChange={handleInputChange} className="pl-12 rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <Label htmlFor="restaurantName" className="font-semibold text-muted-foreground">Restaurant Name</Label>
                <Input id="restaurantName" value={formData.restaurantName} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-primary text-lg">
                <MapPinIcon className="size-5" />
                Address Details
              </h3>
              <div className="space-y-2">
                <Label htmlFor="addressLine" className="font-semibold text-muted-foreground">Street Address</Label>
                <Input id="addressLine" value={formData.addressLine} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
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
              <div className="space-y-2">
                <Label htmlFor="pincode" className="font-semibold text-muted-foreground">Zip Code</Label>
                <Input id="pincode" value={formData.pincode} onChange={handleInputChange} className="rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button onClick={handleSave} disabled={isSaving || !hasChanges} className="rounded-md h-12 px-10 shadow-sm font-bold">
              {isSaving ? <Loader2 className="animate-spin size-5 mr-2" /> : null}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Change Password ──────────────────────────────────── */}
      <Card className="rounded-xl shadow-lg border-muted/50 overflow-hidden">
        <CardHeader className="p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <LockIcon className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold tracking-tight">Change Password</CardTitle>
              <CardDescription className="text-sm">Update your account password. You'll need your current password to set a new one.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0 md:pt-0 space-y-5">
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="font-semibold text-muted-foreground">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPwd ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                  className="pr-10 rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20"
                />
                <button type="button" onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showCurrentPwd ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="font-semibold text-muted-foreground">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPwd ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                  className="pr-10 rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20"
                />
                <button type="button" onClick={() => setShowNewPwd(!showNewPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showNewPwd ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-semibold text-muted-foreground">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Re-enter new password"
                className={`rounded-md border bg-muted/20 h-12 focus-visible:ring-primary/20 ${passwordForm.confirmPassword && passwordForm.confirmPassword !== passwordForm.newPassword ? "border-destructive" : ""}`}
              />
              {passwordForm.confirmPassword && passwordForm.confirmPassword !== passwordForm.newPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleChangePassword} disabled={isChangingPwd} className="rounded-md h-12 px-10 shadow-sm font-bold">
              {isChangingPwd ? <Loader2 className="animate-spin size-5 mr-2" /> : null}
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
