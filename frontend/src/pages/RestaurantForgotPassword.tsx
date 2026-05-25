import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MailIcon, ArrowLeftIcon, CheckCircle2Icon } from "lucide-react"
import { forgotPassword } from "@/api/user.api"
import { toast } from "sonner"

export default function RestaurantForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { toast.error("Email is required"); return }
    try {
      setLoading(true)
      await forgotPassword(email.trim())
      setSent(true)
    } catch {
      // Always show success to prevent email enumeration
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            {sent ? (
              <CheckCircle2Icon className="h-8 w-8 text-green-600" />
            ) : (
              <MailIcon className="h-8 w-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {sent ? "Check Your Email" : "Forgot Password?"}
          </CardTitle>
          <CardDescription>
            {sent
              ? "If an account exists with that email, a password reset link has been sent."
              : "Enter your email address and we'll send you a link to reset your partner password."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {sent ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => setSent(false)} className="w-full">
                  Try Another Email
                </Button>
                <Link to="/restaurant/login">
                  <Button variant="ghost" className="w-full text-primary">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Partner Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="forgot-email">Business Email Address</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground"
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </Button>
              <div className="text-center">
                <Link to="/restaurant/login">
                  <Button variant="ghost" size="sm" className="text-primary">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Partner Login
                  </Button>
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
