import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import heroImage from "@/assets/hero.png";

export const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 mt-4 md:mt-4">
      {/* Mobile Version - Hidden on Desktop */}
      <div className="md:hidden space-y-4 pt-2 pb-2">
        {/* Location Info */}
        <div className="flex items-center gap-3 px-1">
          <MapPin className="h-5 w-5 text-[#F97316]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground tracking-[0.1em] uppercase leading-none mb-1">
              Delivering to
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-foreground tracking-tight leading-tight">
                10012, New York
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for restaurants, dishes"
            className="pl-12 h-12 bg-[#f0f4f8] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm rounded-xl placeholder:text-muted-foreground/60 shadow-none"
          />
        </div>
      </div>

      {/* Desktop Version - Hidden on Mobile */}
      <div className="hidden md:flex relative w-full h-[500px] lg:h-[600px] items-center justify-center overflow-hidden rounded-xl shadow-xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Card */}
        <div className="relative z-10 w-full px-4">
          <Card className="max-w-3xl mx-auto border-none shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6 md:p-10 space-y-6">
              <div className="space-y-2 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground capitalize leading-tight">
                  discover your next craving
                </h1>
                <p className="text-muted-foreground text-lg">
                  Fresh ingredients, bold flavors, and unforgettable meals await.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for dishes..."
                    className="pl-10 h-12 border-muted-foreground/20 focus-visible:ring-primary"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Select your location"
                    className="pl-10 h-12 border-muted-foreground/20 focus-visible:ring-primary"
                  />
                </div>
                <Button className="h-12 px-8 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold">
                  Find Food
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

