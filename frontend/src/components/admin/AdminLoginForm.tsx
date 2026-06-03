import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ShieldCheck, Mail, Lock, Key, ArrowRight, ArrowLeft, Terminal, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

interface AdminLoginFormProps extends React.ComponentProps<"div"> {}

export function AdminLoginForm({ className, ...props }: AdminLoginFormProps) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [securityKey, setSecurityKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login({ email, password }, "admin")
      toast.success("Administrator Authenticated!", {
        description: "Welcome to FoodieFlow HQ. Launching console...",
        icon: <ShieldCheck className="size-5 text-primary" />,
      })
      
      navigate("/admin-dashboard", { replace: true })
    } catch (error: any) {
      toast.error("Authentication Failed", {
        description: error.message || "Invalid credentials. Access Denied.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full shadow-2xl border-primary/20 bg-card">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left panel: Modern Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-card">
            <div className="flex flex-col items-center gap-2 text-center mb-8">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary mb-2 shadow-inner border border-primary/10">
                <ShieldCheck className="size-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">Admin Console</h1>
              <p className="text-sm text-muted-foreground">
                Authorize administrative privileges below
              </p>
            </div>

            <div className="grid gap-4.5">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Admin Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4.5 text-muted-foreground/70" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@foodieflow.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Access Key
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-4.5 text-muted-foreground/70" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4.5" />
                    ) : (
                      <Eye className="size-4.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="securityKey" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Security Token <span className="text-[10px] text-muted-foreground/60">(Optional)</span>
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 size-4.5 text-muted-foreground/70" />
                  <Input
                    id="securityKey"
                    type="text"
                    placeholder="6-digit MFA or PIN"
                    value={securityKey}
                    onChange={(e) => setSecurityKey(e.target.value)}
                    className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-11 text-sm font-semibold mt-3 rounded-[0.45rem] bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Authenticating Privileges...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    Launch Admin Terminal
                    <ArrowRight className="size-4 text-primary" />
                  </span>
                )}
              </Button>
            </div>

            {/* Portal Switcher Footer */}
            <div className="mt-10 pt-6 border-t border-muted/50 flex justify-between text-xs font-semibold text-muted-foreground">
              <Link to="/login" className="flex items-center gap-1 hover:text-primary transition-colors">
                <ArrowLeft className="size-3.5" />
                Customer Portal
              </Link>
              <Link to="/restaurant/login" className="flex items-center gap-1 hover:text-primary transition-colors">
                Partner Portal
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </form>

          {/* Right panel: Futuristic server room overlay */}
          <div className="relative hidden md:block overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200"
              alt="Data center server racks"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent flex flex-col justify-end p-12 text-white">
              <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full w-fit mb-4">
                <Terminal className="size-4 text-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">System Operations</span>
              </div>
              <h2 className="text-3xl font-bold font-heading leading-tight mb-2">
                Operational Oversight Console
              </h2>
              <p className="text-sm text-zinc-400 max-w-sm">
                Access restaurant review wizards, platform analytics dashboards, order integrity workflows, and global merchant configurations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        Access restricted. Unauthorized attempts will be logged and subject to monitoring.
      </div>
    </div>
  )
}
