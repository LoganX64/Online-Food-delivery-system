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
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="border-b pb-6">
                <SheetTitle className="text-left flex items-center gap-2 text-2xl">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                  FoodDash
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                <Link to="/register?role=restaurantOwner" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-lg font-medium group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <UtensilsCrossed className="h-5 w-5" />
                  </div>
                  Become a Partner
                </Link>
                <Link to="/login" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-lg font-medium group">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                  </div>
                  Login
                </Link>
                <div className="mt-4 px-4">
                  <Button asChild size="lg" className="w-full text-lg">
                    <Link to="/register">Sign Up Free</Link>
                  </Button>
                </div>
              </nav>
              <div className="absolute bottom-8 left-6 right-6 p-4 rounded-xl bg-primary-soft border border-primary/10">
                <p className="text-sm font-semibold text-primary">Need help?</p>
                <p className="text-xs text-muted-foreground mt-1">Check our support center or contact us 24/7.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
