import { useState, useRef, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit2Icon, SaveIcon, XIcon, CameraIcon, UserIcon, PhoneIcon } from "lucide-react"
import { AuthContext } from "@/context/AuthContext"
import { toast } from "sonner"

export function PersonalInfo() {
  const auth = useContext(AuthContext)!
  const { user, updateProfile, uploadProfileImage } = auth

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ name: user?.name ?? "", phone: user?.phone ?? "" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—"

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name cannot be empty")
      return
    }
    try {
      setSaving(true)
      await updateProfile({ name: form.name.trim(), phone: form.phone.trim() || undefined })
      toast.success("Profile updated successfully")
      setEditing(false)
    } catch (err: any) {
      toast.error(err?.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setForm({ name: user?.name ?? "", phone: user?.phone ?? "" })
    setEditing(false)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB")
      return
    }
    try {
      setUploading(true)
      await uploadProfileImage(file)
      toast.success("Profile image updated!")
    } catch (err: any) {
      toast.error(err?.message || "Failed to upload image")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  if (!user) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
            <CardDescription>Manage your profile details</CardDescription>
          </div>
          {!editing ? (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              <Edit2Icon className="h-4 w-4 mr-2" /> Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={saving}>
                <XIcon className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground">
                <SaveIcon className="h-4 w-4 mr-1" />
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6 py-4">
            {/* Avatar + upload */}
            <div className="relative shrink-0">
              <Avatar className="h-24 w-24 border-4 border-primary/10">
                {uploading ? (
                  <AvatarFallback>
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                  </AvatarFallback>
                ) : (
                  <>
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                title="Change profile photo"
              >
                <CameraIcon className="h-3.5 w-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Form fields */}
            <div className="flex-1 w-full space-y-4">
              {editing ? (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="profile-name" className="flex items-center gap-1.5 text-sm font-medium">
                      <UserIcon className="h-3.5 w-3.5" /> Full Name
                    </Label>
                    <Input
                      id="profile-name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="profile-phone" className="flex items-center gap-1.5 text-sm font-medium">
                      <PhoneIcon className="h-3.5 w-3.5" /> Phone Number
                    </Label>
                    <Input
                      id="profile-phone"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </>
              ) : (
                <div className="grid gap-1 text-center sm:text-left">
                  <h3 className="text-2xl font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                  {user.phone && <p className="text-muted-foreground text-sm">{user.phone}</p>}
                  <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                    <Badge variant="outline">Member since {memberSince}</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
