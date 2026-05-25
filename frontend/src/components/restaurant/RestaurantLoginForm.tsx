import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { ChefHat, Mail, Lock, Store, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

interface RestaurantLoginFormProps extends React.ComponentProps<"div"> { }

export function RestaurantLoginForm({ className, ...props }: RestaurantLoginFormProps) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login({ email, password }, "restaurantOwner")
      toast.success("Welcome back, Restaurant Partner!", {
        description: "Redirecting to your dashboard...",
        icon: <Store className="h-5 w-5 text-primary" />,
      })

      navigate("/restaurant-dashboard", { replace: true })
    } catch (error: any) {
      toast.error("Login Failed", {
        description: error.message || "Invalid credentials. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full shadow-2xl border-primary/10">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left panel: Modern Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="flex flex-col items-center gap-2 text-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2 animate-bounce">
                <ChefHat className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">Partner Portal</h1>
              <p className="text-sm text-muted-foreground">
                Manage your restaurant orders and menu
              </p>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="partner@restaurant.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Password
                  </Label>
                  <Link
                    to="/restaurant/forgot-password"
                    className="text-xs text-primary font-semibold hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
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
                      <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                      <Eye className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-1">
                <Checkbox id="remember" className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <label
                  htmlFor="remember"
                  className="text-xs text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Remember this device
                </label>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-11 text-sm font-semibold mt-3 rounded-[0.45rem]">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    Partner Sign In
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>

            <div className="mt-8 text-center text-xs text-muted-foreground">
              Don't have your restaurant listed?{" "}
              <Link to="/restaurant/register" className="font-semibold text-primary hover:underline underline-offset-4">
                Partner Register
              </Link>
            </div>

            {/* Portal Switcher Footer */}
            <div className="mt-8 pt-6 border-t border-muted/50 flex justify-between text-xs font-semibold text-muted-foreground">
              <Link to="/login" className="flex items-center gap-1 hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Customer Login
              </Link>
              <Link to="/admin/login" className="flex items-center gap-1 hover:text-primary transition-colors">
                Admin Console
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </form>

          {/* Right panel: Modern culinary imagery with overlay */}
          <div className="relative hidden md:block overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
              alt="Culinary background"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12 text-white">
              <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full w-fit mb-4">
                <Store className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Merchant Portal</span>
              </div>
              <h2 className="text-3xl font-bold font-heading leading-tight mb-2">
                Grow Your Kitchen with FoodieFlow
              </h2>
              <p className="text-sm text-neutral-300 max-w-sm">
                Access order updates, sales reports, and menu customization tools in one sleek dashboard designed to streamline your operations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        By continuing, you agree to FoodieFlow Merchant <a href="#" className="underline underline-offset-4">Terms of Business</a>.
      </div>
    </div>
  )
}
