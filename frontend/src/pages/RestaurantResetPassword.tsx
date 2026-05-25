import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { resetPassword } from "@/api/user.api"
import { toast } from "sonner"

export default function RestaurantResetPassword() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()

  const [form, setForm] = useState({ password: "", confirm: "" })
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 8) { toast.error("Password must be at least 8 chars"); return }
    if (form.password !== form.confirm) { toast.error("Passwords do not match"); return }
    if (!token) { toast.error("Invalid reset link"); return }
    try {
      setLoading(true)
      await resetPassword(token, form.password)
      toast.success("Password reset successfully! Redirecting to login…")
      setTimeout(() => navigate("/restaurant/login", { replace: true }), 1500)
    } catch (err: any) {
      toast.error(err?.message || "Failed to reset password. The link may have expired.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <LockIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Reset Partner Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="reset-pwd">New Password</Label>
              <div className="relative">
                <Input
                  id="reset-pwd"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Enter new password"
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPwd ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reset-confirm">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="reset-confirm"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                  placeholder="Confirm new password"
                  className={`pr-10 ${form.confirm && form.confirm !== form.password ? "border-destructive" : ""}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showConfirm ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
              {form.confirm && form.confirm !== form.password && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>
            <Button type="submit" disabled={loading}
              className="w-full bg-primary text-primary-foreground">
              {loading ? "Resetting…" : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
