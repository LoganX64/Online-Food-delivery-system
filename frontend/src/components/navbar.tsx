import { Link, useLocation, useNavigate } from "react-router-dom"
import { UtensilsCrossed, Menu, ArrowLeft, ShoppingCart, UserCircle, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { getCartItemCount } from "@/utils/cart-storage"

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isMenusPage = location.pathname === '/menus'
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Initial count
    setCartCount(getCartItemCount())

    // Listen for custom event from our storage utility
    const handleCartUpdate = () => {
      setCartCount(getCartItemCount())
    }

    // Listen for cross-tab updates
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "foodieflow_cart") {
        setCartCount(getCartItemCount())
      }
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    window.addEventListener("storage", handleStorage)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo - Left */}
        <div className="flex items-center space-x-2">
          {isMenusPage && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold font-heading tracking-tight text-[#F97316]">FoodieFlow</span>
          </Link>
        </div>

        {/* Right Section: Desktop Menu & Mobile Sandwich */}
        <div className="flex items-center gap-2">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6" />
                  <span className="sr-only">Profile Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center cursor-pointer w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="flex items-center cursor-pointer w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register?role=restaurantOwner" className="flex items-center cursor-pointer w-full">
                    <UtensilsCrossed className="mr-2 h-4 w-4" />
                    <span>Become a Partner</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Sandwich - Right */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="border-b pb-6">
                  <SheetTitle className="text-left flex items-center gap-2 text-2xl">
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                    FoodieFlow
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  <Link to="/login" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-lg font-medium group">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <LogIn className="h-5 w-5" />
                    </div>
                    Login
                  </Link>
                  <Link to="/register" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-lg font-medium group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <UserPlus className="h-5 w-5" />
                    </div>
                    Sign Up
                  </Link>
                  <Link to="/register?role=restaurantOwner" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-lg font-medium group">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <UtensilsCrossed className="h-5 w-5" />
                    </div>
                    Become a Partner
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
