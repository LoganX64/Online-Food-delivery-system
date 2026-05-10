import { Link } from "react-router-dom"
import { UtensilsCrossed, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-heading tracking-tight">FoodDash</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/register?role=restaurantOwner" className="text-sm font-medium hover:text-primary transition-colors">
            Become a Partner
          </Link>
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Button asChild size="sm">
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-primary" />
                  FoodDash
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/register?role=restaurantOwner" className="text-lg font-medium hover:text-primary transition-colors">
                  Become a Partner
                </Link>
                <Link to="/login" className="text-lg font-medium hover:text-primary transition-colors">
                  Login
                </Link>
                <Button asChild className="w-full mt-2">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
