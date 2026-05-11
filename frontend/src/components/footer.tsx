import {
  MapPin,
  Globe,
  ChevronDown,
  UtensilsCrossed
} from "lucide-react";

// Custom SVG Icons for Brands (since lucide-react removed brand icons)
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full mt-12">
      {/* Part 1: Location & Currency Selector */}
      <div className="bg-background border-t border-b border-muted">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-between gap-2 border-muted-foreground/20 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-normal text-muted-foreground">Deliver to:</span>
                  <span className="font-medium">New York, NY 10001</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px]">
              <DropdownMenuItem>Current Location</DropdownMenuItem>
              <DropdownMenuItem>New York, NY 10001</DropdownMenuItem>
              <DropdownMenuItem>Los Angeles, CA 90001</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-between gap-2 border-muted-foreground/20 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">$ USD (United States)</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>$ USD (United States)</DropdownMenuItem>
              <DropdownMenuItem>€ EUR (Europe)</DropdownMenuItem>
              <DropdownMenuItem>£ GBP (United Kingdom)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Part 2: Main Footer */}
      <div className="bg-footer-bg text-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Brand & Social */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-md">
                  <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold font-heading text-foreground">FlavorSwift</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Eat what you love, where you love, when you love. Find the local flavors you crave, all at the tap of a button.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-foreground/5 hover:bg-primary hover:text-primary-foreground transition-colors p-2 rounded-full text-foreground">
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a href="#" className="bg-foreground/5 hover:bg-primary hover:text-primary-foreground transition-colors p-2 rounded-full text-foreground">
                  <TwitterIcon className="h-4 w-4" />
                </a>
                <a href="#" className="bg-foreground/5 hover:bg-primary hover:text-primary-foreground transition-colors p-2 rounded-full text-foreground">
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a href="#" className="bg-foreground/5 hover:bg-primary hover:text-primary-foreground transition-colors p-2 rounded-full text-foreground">
                  <YoutubeIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 className="font-bold mb-4 font-heading text-lg text-foreground">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Column 3: For Customers */}
            <div>
              <h4 className="font-bold mb-4 font-heading text-lg text-foreground">For Customers</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Concerns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="font-bold mb-4 font-heading text-lg text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-foreground/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FlavorSwift. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Made with love for food.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
