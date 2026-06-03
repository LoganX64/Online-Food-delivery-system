import { useState, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockIcon, EyeIcon, EyeOffIcon, ShieldIcon } from "lucide-react"
import { AuthContext } from "@/context/AuthContext"
import { toast } from "sonner"

export function SecurityTab() {
  const { updatePassword } = useContext(AuthContext)!

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [show, setShow] = useState({
    current: false,
    newPwd: false,
    confirm: false,
  })
  const [saving, setSaving] = useState(false)

  const toggle = (field: keyof typeof show) =>
    setShow((s) => ({ ...s, [field]: !s[field] }))

  const validate = () => {
    if (!form.currentPassword) { toast.error("Current password is required"); return false }
    if (form.newPassword.length < 8) { toast.error("New password must be at least 8 characters"); return false }
    if (!/[A-Z]/.test(form.newPassword)) { toast.error("New password must contain an uppercase letter"); return false }
    if (!/[a-z]/.test(form.newPassword)) { toast.error("New password must contain a lowercase letter"); return false }
    if (!/[0-9]/.test(form.newPassword)) { toast.error("New password must contain a number"); return false }
    if (!/[^A-Za-z0-9]/.test(form.newPassword)) { toast.error("New password must contain a special character"); return false }
    if (form.newPassword !== form.confirmPassword) { toast.error("Passwords do not match"); return false }
    if (form.newPassword === form.currentPassword) { toast.error("New password must differ from current password"); return false }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      setSaving(true)
      await updatePassword(form.currentPassword, form.newPassword)
      toast.success("Password updated successfully")
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err: any) {
      toast.error(err?.message || "Failed to update password")
    } finally {
      setSaving(false)
    }
  }

  const strength = (() => {
    const p = form.newPassword
    if (!p) return 0
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[a-z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  })()

  const strengthLabel = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"][strength]
  const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][strength]

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <LockIcon className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Current password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={show.current ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggle("current")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show.current ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={show.newPwd ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggle("newPwd")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show.newPwd ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
              {form.newPassword && (
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          i <= strength ? strengthColor : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Strength: <span className="font-medium">{strengthLabel}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={show.confirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                  className={`pr-10 ${
                    form.confirmPassword && form.confirmPassword !== form.newPassword
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggle("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show.confirm ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
              {form.confirmPassword && form.confirmPassword !== form.newPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <LockIcon className="size-4 mr-2" />
              {saving ? "Updating…" : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-dashed border-primary/20">
        <CardContent className="flex items-center gap-4 py-5">
          <div className="bg-background p-2.5 rounded-full shadow-sm shrink-0 border border-border">
            <ShieldIcon className="size-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-primary text-sm">Password Requirements</p>
            <ul className="text-xs text-muted-foreground mt-1 flex flex-col gap-0.5">
              <li>• Minimum 8 characters</li>
              <li>• At least one uppercase letter (A–Z)</li>
              <li>• At least one lowercase letter (a–z)</li>
              <li>• At least one number (0–9)</li>
              <li>• At least one special character (!@#$ etc.)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
