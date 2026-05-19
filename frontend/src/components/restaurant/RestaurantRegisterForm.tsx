import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { ChefHat, Mail, Lock, Store, ArrowRight, ArrowLeft, User, Phone, MapPin, Sparkles, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { apiClient } from "@/api/apiClient"

interface RestaurantRegisterFormProps extends React.ComponentProps<"div"> {}

export function RestaurantRegisterForm({ className, ...props }: RestaurantRegisterFormProps) {
  const navigate = useNavigate()
  const { registerRestaurant } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    phone: "",
    cuisineType: "",
    city: "",
    pincode: "",
    address: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      cuisineType: value,
    })
  }

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if (!formData.ownerName || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill all owner details")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match")
        return
      }
      // Just advance to step 2, no API call yet
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.restaurantName || !formData.phone || !formData.city || !formData.pincode || !formData.address) {
      toast.error("Please fill all restaurant details")
      return
    }

    setIsLoading(true)

    try {
      await registerRestaurant(
        {
          name: formData.ownerName,
          email: formData.email,
          password: formData.password,
          role: "restaurantOwner",
          phone: formData.phone
        },
        {
          name: formData.restaurantName,
          description: formData.cuisineType,
          addressLine: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        }
      )

      toast.success("Application Submitted Successfully!", {
        description: "Your restaurant application is under review. Please log in.",
        icon: <Sparkles className="h-5 w-5 text-primary" />,
      })
      
      navigate("/restaurant/login", { replace: true })
    } catch (error: any) {
      toast.error("Restaurant Creation Failed", {
        description: error.message || "Failed to submit restaurant details.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full shadow-2xl border-primary/10">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left panel: Registration Flow */}
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="flex flex-col items-center gap-2 text-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                <ChefHat className="h-6 w-6 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">Partner Registration</h1>
              <p className="text-sm text-muted-foreground">
                Join our network of elite kitchens and boost your sales
              </p>
              
              {/* Progress Steps Indicators */}
              <div className="flex items-center gap-2 mt-4 w-full justify-center max-w-[200px]">
                <div className={cn("h-1.5 flex-1 rounded-full transition-all duration-300", step >= 1 ? "bg-primary" : "bg-muted")} />
                <div className={cn("h-1.5 flex-1 rounded-full transition-all duration-300", step >= 2 ? "bg-primary" : "bg-muted")} />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">
                Step {step} of 2: {step === 1 ? "Owner Profile" : "Restaurant Details"}
              </span>
            </div>

            {step === 1 ? (
              <form onSubmit={handleNext} className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="ownerName" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                    <Input
                      id="ownerName"
                      type="text"
                      placeholder="Chef John Doe"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@restaurant.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Create Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-tight">Must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 text-sm font-semibold mt-3 rounded-[0.45rem]">
                  <span className="flex items-center justify-center gap-1.5">
                    Continue to Details
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="restaurantName" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Restaurant Name
                  </Label>
                  <div className="relative">
                    <Store className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                    <Input
                      id="restaurantName"
                      type="text"
                      placeholder="The Gourmet Bistro"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="phone" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Contact Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="city" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      City
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                      <Input
                        id="city"
                        type="text"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleChange}
                        className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="cuisine" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Cuisine
                    </Label>
                    <Select onValueChange={handleSelectChange} defaultValue={formData.cuisineType}>
                      <SelectTrigger className="h-11 border-muted-foreground/20 rounded-[0.45rem] text-left">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Burgers">Burgers</SelectItem>
                        <SelectItem value="Asian">Asian</SelectItem>
                        <SelectItem value="Desserts">Desserts</SelectItem>
                        <SelectItem value="Healthy">Healthy</SelectItem>
                        <SelectItem value="Mexican">Mexican</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="pincode" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Pincode
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground/70" />
                      <Input
                        id="pincode"
                        type="text"
                        placeholder="110001"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="pl-10 h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="address" className="text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Full Restaurant Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main Street, Suite 400"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-11 border-muted-foreground/20 focus-visible:ring-primary rounded-[0.45rem]"
                    required
                  />
                </div>

                <div className="flex gap-3 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-11 text-sm font-semibold rounded-[0.45rem]"
                  >
                    <span className="flex items-center justify-center gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </span>
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-[2] h-11 text-sm font-semibold rounded-[0.45rem]"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        Submit Application
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-8 text-center text-xs text-muted-foreground">
              Already registered as a partner?{" "}
              <Link to="/restaurant/login" className="font-semibold text-primary hover:underline underline-offset-4">
                Partner Sign In
              </Link>
            </div>
          </div>

          {/* Right panel: Modern culinary imagery with overlay */}
          <div className="relative hidden md:block overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200"
              alt="Kitchen background"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12 text-white">
              <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full w-fit mb-4">
                <Sparkles className="h-4 w-4 text-primary animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Join FoodieFlow</span>
              </div>
              <h2 className="text-3xl font-bold font-heading leading-tight mb-2">
                Increase Your Delivery & Takeout Orders
              </h2>
              <p className="text-sm text-neutral-300 max-w-sm">
                Get access to thousands of hungry food lovers in your zip code. Optimize your cooking efficiency and watch your business expand with our marketing resources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        By registering, you agree to FoodieFlow Partner <a href="#" className="underline underline-offset-4">Agreement</a> & <a href="#" className="underline underline-offset-4">Privacy Terms</a>.
      </div>
    </div>
  )
}
