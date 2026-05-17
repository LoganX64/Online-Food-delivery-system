import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, 
  Star, Heart, Clock, Truck, MapPin, X, RotateCcw, UtensilsCrossed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FoodCard } from "@/components/ui/food-card";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger 
} from "@/components/ui/sheet";

// Rich dataset of 12 restaurants to showcase pagination perfectly
const ALL_RESTAURANTS_DATA = [
  {
    id: 1,
    name: "Domino's",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    cuisine: "Pizza, Italian, Fast Food",
    cuisinesList: ["Pizza", "Italian", "Fast Food"],
    badge: "popular",
    deliveryTime: 30, // in minutes
    deliveryTimeStr: "25-35 min",
    deliveryFee: 0,
    deliveryFeeStr: "Free delivery",
    priceRange: "$"
  },
  {
    id: 2,
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    rating: 4.2,
    cuisine: "Pizza, Wings, Sides",
    cuisinesList: ["Pizza", "Chicken", "Sides"],
    badge: "new",
    deliveryTime: 35,
    deliveryTimeStr: "30-40 min",
    deliveryFee: 1.99,
    deliveryFeeStr: "$1.99 delivery",
    priceRange: "$$"
  },
  {
    id: 3,
    name: "KFC",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    cuisine: "Fried Chicken, Burgers",
    cuisinesList: ["Chicken", "Burgers"],
    badge: "free delivery",
    deliveryTime: 25,
    deliveryTimeStr: "20-30 min",
    deliveryFee: 0,
    deliveryFeeStr: "Free delivery",
    priceRange: "$$"
  },
  {
    id: 4,
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1552895638-f7fe08d2f715?q=80&w=800&auto=format&fit=crop",
    rating: 4.1,
    cuisine: "Burgers, Fries, Fast Food",
    cuisinesList: ["Burgers", "Fast Food"],
    badge: "popular",
    deliveryTime: 20,
    deliveryTimeStr: "15-25 min",
    deliveryFee: 0.99,
    deliveryFeeStr: "$0.99 delivery",
    priceRange: "$"
  },
  {
    id: 5,
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop",
    rating: 4.0,
    cuisine: "Burgers, Fast Food",
    cuisinesList: ["Burgers", "Fast Food"],
    badge: "new",
    deliveryTime: 25,
    deliveryTimeStr: "20-30 min",
    deliveryFee: 1.49,
    deliveryFeeStr: "$1.49 delivery",
    priceRange: "$"
  },
  {
    id: 6,
    name: "Subway",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    cuisine: "Sandwiches, Salads, Healthy",
    cuisinesList: ["Sandwiches", "Healthy", "Salads"],
    badge: "popular",
    deliveryTime: 18,
    deliveryTimeStr: "15-20 min",
    deliveryFee: 0,
    deliveryFeeStr: "Free delivery",
    priceRange: "$$"
  },
  {
    id: 7,
    name: "Pizza Inn",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    cuisine: "Pizza, Pasta, Italian",
    cuisinesList: ["Pizza", "Italian"],
    badge: "new",
    deliveryTime: 30,
    deliveryTimeStr: "25-35 min",
    deliveryFee: 2.99,
    deliveryFeeStr: "$2.99 delivery",
    priceRange: "$$"
  },
  {
    id: 8,
    name: "Starbucks",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    cuisine: "Coffee, Desserts, Breakfast",
    cuisinesList: ["Coffee", "Desserts"],
    badge: "popular",
    deliveryTime: 12,
    deliveryTimeStr: "10-15 min",
    deliveryFee: 2.49,
    deliveryFeeStr: "$2.49 delivery",
    priceRange: "$$$"
  },
  {
    id: 9,
    name: "Taco Bell",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop",
    rating: 4.2,
    cuisine: "Mexican, Tacos, Fast Food",
    cuisinesList: ["Mexican", "Fast Food"],
    badge: "free delivery",
    deliveryTime: 25,
    deliveryTimeStr: "20-30 min",
    deliveryFee: 0,
    deliveryFeeStr: "Free delivery",
    priceRange: "$"
  },
  {
    id: 10,
    name: "Baskin Robbins",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    cuisine: "Ice Cream, Desserts",
    cuisinesList: ["Desserts"],
    badge: "popular",
    deliveryTime: 15,
    deliveryTimeStr: "15-20 min",
    deliveryFee: 1.99,
    deliveryFeeStr: "$1.99 delivery",
    priceRange: "$$"
  },
  {
    id: 11,
    name: "Subway (Sector 24)",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    cuisine: "Sandwiches, Salads, Healthy",
    cuisinesList: ["Sandwiches", "Healthy", "Salads"],
    badge: "free delivery",
    deliveryTime: 20,
    deliveryTimeStr: "15-25 min",
    deliveryFee: 0,
    deliveryFeeStr: "Free delivery",
    priceRange: "$$"
  },
  {
    id: 12,
    name: "Noodle House",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    cuisine: "Asian, Noodles, Chinese",
    cuisinesList: ["Asian", "Chinese"],
    badge: "new",
    deliveryTime: 28,
    deliveryTimeStr: "25-35 min",
    deliveryFee: 1.49,
    deliveryFeeStr: "$1.49 delivery",
    priceRange: "$$"
  }
];

const CUISINES = [
  "Pizza",
  "Burgers",
  "Chicken",
  "Sandwiches",
  "Desserts",
  "Healthy",
  "Mexican",
  "Chinese",
  "Italian"
];

export default function AllRestaurants() {
  const navigate = useNavigate();

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [onlyFreeDelivery, setOnlyFreeDelivery] = useState(false);
  const [fastDeliveryOnly, setFastDeliveryOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 6 items per page

  // Handle Cuisine Checkbox Toggle
  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
    setCurrentPage(1); // Reset page on filter change
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCuisines([]);
    setMinRating(null);
    setOnlyFreeDelivery(false);
    setFastDeliveryOnly(false);
    setSortBy("rating");
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredAndSortedRestaurants = useMemo(() => {
    let result = [...ALL_RESTAURANTS_DATA];

    // 1. Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query)
      );
    }

    // 2. Cuisine Filters
    if (selectedCuisines.length > 0) {
      result = result.filter((r) =>
        r.cuisinesList.some((c) => selectedCuisines.includes(c))
      );
    }

    // 3. Rating Filters
    if (minRating !== null) {
      result = result.filter((r) => r.rating >= minRating);
    }

    // 4. Free Delivery
    if (onlyFreeDelivery) {
      result = result.filter((r) => r.deliveryFee === 0);
    }

    // 5. Fast Delivery (< 25 min average)
    if (fastDeliveryOnly) {
      result = result.filter((r) => r.deliveryTime <= 25);
    }

    // 6. Sorting Logic
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "delivery-time") {
      result.sort((a, b) => a.deliveryTime - b.deliveryTime);
    }

    return result;
  }, [searchQuery, selectedCuisines, minRating, onlyFreeDelivery, fastDeliveryOnly, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedRestaurants.length / pageSize);
  
  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedRestaurants.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedRestaurants, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Render Filter Form Component (Reusable)
  const FilterPanelContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 h-9 text-xs bg-background rounded-lg border-muted-foreground/20 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">Cuisines</h3>
        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CUISINES.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2.5">
              <Checkbox
                id={`cuisine-${cuisine}`}
                checked={selectedCuisines.includes(cuisine)}
                onCheckedChange={() => handleCuisineToggle(cuisine)}
              />
              <label
                htmlFor={`cuisine-${cuisine}`}
                className="text-xs font-bold text-muted-foreground/90 cursor-pointer select-none leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {cuisine}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">Minimum Rating</h3>
        <div className="flex flex-wrap gap-1.5">
          {[4.5, 4.0, 3.5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              onClick={() => {
                setMinRating(minRating === rating ? null : rating);
                setCurrentPage(1);
              }}
              className={`h-7 px-2.5 rounded-lg text-[10px] font-bold gap-1 ${
                minRating === rating ? "bg-primary text-white" : "bg-background border-muted-foreground/20"
              }`}
            >
              <Star className={`h-3 w-3 ${minRating === rating ? "fill-current" : "text-amber-500 fill-amber-500"}`} />
              {rating}+ Stars
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">Delivery Options</h3>
        <div className="space-y-2.5">
          <div className="flex items-center space-x-2.5">
            <Checkbox
              id="free-delivery"
              checked={onlyFreeDelivery}
              onCheckedChange={(checked) => {
                setOnlyFreeDelivery(!!checked);
                setCurrentPage(1);
              }}
            />
            <label
              htmlFor="free-delivery"
              className="text-xs font-bold text-muted-foreground/90 cursor-pointer select-none leading-none"
            >
              Free Delivery Only
            </label>
          </div>

          <div className="flex items-center space-x-2.5">
            <Checkbox
              id="fast-delivery"
              checked={fastDeliveryOnly}
              onCheckedChange={(checked) => {
                setFastDeliveryOnly(!!checked);
                setCurrentPage(1);
              }}
            />
            <label
              htmlFor="fast-delivery"
              className="text-xs font-bold text-muted-foreground/90 cursor-pointer select-none leading-none"
            >
              Fast Delivery (&lt; 25 min)
            </label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="w-full text-xs font-bold h-9 border-red-500/20 text-red-500 hover:bg-red-500/10 gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* High-Fidelity Upper Banner Card */}
      <div className="bg-[#fff1eb] border-b border-[#ffe2d5] py-8 md:py-10 mb-8">
        <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold uppercase tracking-wider text-[10px] px-2.5 py-1">
              Gourmet Directory
            </Badge>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              Explore Partner Restaurants
            </h1>
            <p className="text-xs md:text-sm font-semibold text-muted-foreground/90">
              Delivering local delicacies straight to your doorstep, within 30-minutes.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-background border border-primary/20 p-2 rounded-xl shadow-sm text-xs font-bold text-muted-foreground shrink-0">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Delivering to Sector 15, Pincode 110001</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Workspace Layout: Split Column */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column: Desktop Sidebar Filter Panel */}
          <aside className="hidden lg:block lg:col-span-1 bg-card rounded-2xl border border-muted/50 p-5 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-muted">
              <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
              <h2 className="font-extrabold text-base text-foreground font-heading">Refine Results</h2>
            </div>
            <FilterPanelContent />
          </aside>

          {/* Right Column: Active Results Catalog Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar: Mobile Filter Drawer Trigger & Grid Sort Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-card p-3 rounded-xl border border-muted/50 shadow-sm gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Mobile Filter Sheet Trigger Button */}
                <div className="lg:hidden w-full">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full h-9 bg-background border-muted-foreground/20 text-xs font-bold gap-2">
                        <SlidersHorizontal className="h-4 w-4 text-primary" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px]">
                      <SheetHeader className="pb-3 border-b mb-4">
                        <SheetTitle className="font-extrabold text-base flex items-center gap-2 text-foreground">
                          <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
                          Filter Directory
                        </SheetTitle>
                      </SheetHeader>
                      <FilterPanelContent />
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <span>Found</span>
                  <span className="text-primary font-black bg-primary/10 px-2 py-0.5 rounded-md">
                    {filteredAndSortedRestaurants.length}
                  </span>
                  <span>partners inSector 15</span>
                </div>
              </div>

              {/* Sort selector dropdown */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                <span className="text-[11px] font-bold text-muted-foreground/80 flex items-center gap-1">
                  <ArrowUpDown className="h-3.5 w-3.5 text-primary" /> Sort:
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[170px] h-9 text-xs bg-background border-muted-foreground/20 focus:ring-primary rounded-lg font-bold">
                    <SelectValue placeholder="Sort Directory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating" className="text-xs font-semibold">Highest Rating</SelectItem>
                    <SelectItem value="delivery-time" className="text-xs font-semibold">Delivery Speed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Catalog Grid */}
            {paginatedRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginatedRestaurants.map((restaurant) => (
                  <FoodCard
                    key={restaurant.id}
                    image={restaurant.image}
                    title={restaurant.name}
                    subtitle={restaurant.cuisine}
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    className="border border-muted/50 hover:shadow-xl transition-all duration-300 rounded-2xl bg-card"
                    topLeftBadge={
                      <div className="bg-primary text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-br-lg shadow-md">
                        {restaurant.badge}
                      </div>
                    }
                    topRightBadge={
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Favoriting simulation
                        }} 
                        className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all"
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </button>
                    }
                    contentRight={
                      <div className="flex items-center gap-0.5 bg-green-700 text-white px-1.5 py-0.5 rounded text-[10px] font-extrabold shadow-sm shrink-0">
                        {restaurant.rating}
                        <Star className="h-2.5 w-2.5 fill-current" />
                      </div>
                    }
                    footerFull={
                      <div className="flex items-center gap-3.5 text-[10px] font-bold text-muted-foreground/90">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          <span>{restaurant.deliveryTimeStr}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck className="h-3.5 w-3.5 text-primary" />
                          <span>{restaurant.deliveryFeeStr}</span>
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            ) : (
              /* Beautiful Filter Zero State Search Fallback */
              <div className="py-20 text-center border-2 border-dashed border-muted rounded-[2rem] bg-card/60 shadow-inner">
                <div className="bg-background size-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md border">
                  <UtensilsCrossed className="size-7 text-primary/60 animate-bounce" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground font-heading">No restaurants match</h3>
                <p className="text-muted-foreground/90 text-xs font-semibold mt-2 max-w-sm mx-auto px-4">
                  We couldn't find any partner matching your exact filter settings. Try resetting them or query a different term.
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="mt-6 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 h-9 rounded-xl shadow-md transition-all gap-1.5"
                >
                  <RotateCcw className="h-4 w-4" /> Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination Controls block */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center bg-card p-3 rounded-xl border border-muted/50 shadow-sm flex-wrap gap-4 mt-6">
                <div className="text-xs font-bold text-muted-foreground/80">
                  Showing page <span className="text-primary font-black">{currentPage}</span> of <span className="text-foreground font-black">{totalPages}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 rounded-lg bg-background border-muted-foreground/20 disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </Button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className={`h-8 w-8 rounded-lg text-xs font-bold p-0 ${
                          currentPage === pageNum ? "bg-primary text-white" : "bg-background border-muted-foreground/20 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 rounded-lg bg-background border-muted-foreground/20 disabled:opacity-40"
                  >
                    <ChevronRight className="h-4.5 w-4.5" />
                  </Button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
