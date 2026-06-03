import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Search, Plus, Minus, ChevronLeft, ChevronRight, SlidersHorizontal, 
  ShoppingCart, Star, RotateCcw, MapPin, Sparkles, Utensils, Heart 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FoodCard } from "@/components/ui/food-card";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger 
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { getCartFromStorage, saveCartToStorage } from "@/utils/cart-storage";
import type { CartItems } from "@/utils/cart-storage";
import { DISHES as ALL_DISHES } from "@/utils/dishes"
const DISHES = ALL_DISHES.filter(d => d.id >= 1 && d.id <= 12)

const CATEGORIES = ["Pizza", "Burger", "Sushi", "Indian", "Healthy", "Dessert"];

export function MenusPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  // Global Cart State
  const [cartCounts, setCartCounts] = useState<CartItems>(getCartFromStorage);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("rating");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 6 items per page

  // Listen to Quick Category URL Changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategories((prev) => prev.includes(cat) ? prev : [...prev, cat]);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Handle Category Checkbox Toggle
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
    setCurrentPage(1);
  };

  // Handle Dietary Toggle
  const toggleDietary = (type: string) => {
    setSelectedDietary((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedDietary([]);
    setMinRating(null);
    setPriceFilter("all");
    setSortBy("rating");
    setCurrentPage(1);
  };

  // Storing/Quantity Trigger Handler
  const updateCount = (id: number, delta: number) => {
    const dishName = DISHES.find(d => d.id === id)?.name ?? "Item";
    const current = cartCounts[id] || 0;
    const next = current + delta;
    let updated: CartItems;

    if (next <= 0) {
      const { [id]: _, ...rest } = cartCounts;
      updated = rest;
    } else {
      updated = { ...cartCounts, [id]: next };
    }

    setCartCounts(updated);
    saveCartToStorage(updated);

    if (delta > 0) {
      toast(dishName + " added to cart", {
        icon: <ShoppingCart className="size-4 text-primary" />,
        duration: 2000,
      });
    }
  };

  // Filter & Sort Logic
  const filteredAndSortedDishes = useMemo(() => {
    let result = [...DISHES];

    // 1. Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.restaurant.toLowerCase().includes(query) ||
          (d.description || "").toLowerCase().includes(query)
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      result = result.filter((d) => d.category && selectedCategories.includes(d.category));
    }

    // 3. Dietary Choices (Veg / Non-Veg)
    if (selectedDietary.length > 0) {
      result = result.filter((d) => selectedDietary.includes(d.type));
    }

    // 4. Star Ratings
    if (minRating !== null) {
      result = result.filter((d) => (d.rating || 0) >= minRating);
    }

    // 5. Price Ranges
    if (priceFilter === "under-10") {
      result = result.filter((d) => d.price < 10);
    } else if (priceFilter === "under-18") {
      result = result.filter((d) => d.price < 18);
    } else if (priceFilter === "over-18") {
      result = result.filter((d) => d.price >= 18);
    }

    // 6. Sorting Logic
    if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategories, selectedDietary, minRating, priceFilter, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedDishes.length / pageSize);

  const paginatedDishes = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedDishes.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedDishes, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reusable Filter Content (Sidebar / Mobile Sheet Drawer)
  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Search Bar */}
      <div>
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search food items..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 h-9 text-xs bg-background rounded-lg border-muted-foreground/20 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Dietary Checkboxes */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">Dietary</h3>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="dietary-veg"
              checked={selectedDietary.includes("veg")}
              onCheckedChange={() => toggleDietary("veg")}
            />
            <label
              htmlFor="dietary-veg"
              className="text-xs font-bold text-muted-foreground/90 cursor-pointer select-none leading-none"
            >
              Vegetarian Only
            </label>
          </div>

          <div className="flex items-center flex gap-2.5">
            <Checkbox
              id="dietary-nonveg"
              checked={selectedDietary.includes("non-veg")}
              onCheckedChange={() => toggleDietary("non-veg")}
            />
            <label
              htmlFor="dietary-nonveg"
              className="text-xs font-bold text-muted-foreground/90 cursor-pointer select-none leading-none"
            >
              Non-Vegetarian Only
            </label>
          </div>
        </div>
      </div>

      {/* Categories Checkboxes with See All Reset */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Categories</h3>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedCategories([]);
                setCurrentPage(1);
              }}
              className="text-primary hover:text-primary-hover font-bold text-xs p-0 h-auto hover:bg-transparent underline"
            >
              See All
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center flex gap-2.5">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <label
                htmlFor={`cat-${cat}`}
                className="text-xs font-bold text-muted-foreground/90 cursor-pointer select-none leading-none"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Star Ratings Toggles */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">Minimum Rating</h3>
        <div className="flex flex-wrap gap-1.5">
          {[4.5, 4.2, 4.0].map((rating) => (
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
              <Star className={`size-3 ${minRating === rating ? "fill-current" : "text-amber-500 fill-amber-500"}`} />
              {rating}+ Stars
            </Button>
          ))}
        </div>
      </div>

      {/* Price Selection Buttons */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">Price Bracket</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "All Prices", value: "all" },
            { label: "Under $10", value: "under-10" },
            { label: "Under $18", value: "under-18" },
            { label: "$18 & Above", value: "over-18" }
          ].map((item) => (
            <div key={item.value} className="flex items-center flex gap-2.5">
              <Checkbox
                id={`price-${item.value}`}
                checked={priceFilter === item.value}
                onCheckedChange={() => {
                  setPriceFilter(item.value);
                  setCurrentPage(1);
                }}
              />
              <label
                htmlFor={`price-${item.value}`}
                className="text-xs font-bold text-muted-foreground/90 cursor-pointer select-none leading-none"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset filters button */}
      <div className="border-t pt-4">
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="w-full text-xs font-bold h-9 border-red-500/20 text-red-500 hover:bg-red-500/10 gap-1.5"
        >
          <RotateCcw className="size-3.5" />
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* High-Fidelity Upper Banner Card */}
      <div className="relative bg-[#fff1eb] border-b border-[#ffe2d5] py-8 md:py-10 mb-8">
        {/* Floating actions */}
        <div className="absolute top-3 left-3 z-10 md:hidden">
          <Button 
            onClick={() => navigate(-1)} 
            variant="secondary" 
            size="icon" 
            className="rounded-full shadow-lg bg-white/95 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white border-none transition-all size-8"
          >
            <ChevronLeft className="size-4.5" />
          </Button>
        </div>
        <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold uppercase tracking-wider text-[10px] px-2.5 py-1">
              Food Catalog
            </Badge>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              Dine From Your Favorites
            </h1>
            <p className="text-xs md:text-sm font-semibold text-muted-foreground/90">
              Explore gourmet dishes, hot hand-tossed pizzas, and delicious desserts.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-background border border-primary/20 p-2 rounded-xl shadow-sm text-xs font-bold text-muted-foreground shrink-0">
            <MapPin className="size-4 text-primary" />
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
              <Utensils className="size-4.5 text-primary" />
              <h2 className="font-extrabold text-base text-foreground font-heading">Refine Dishes</h2>
            </div>
            <FilterContent />
          </aside>

          {/* Right Column: Active Results Catalog Grid */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Top Toolbar: Mobile Filter Drawer Trigger & Grid Sort Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-card p-3 rounded-xl border border-muted/50 shadow-sm gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                
                {/* Mobile Filter Sheet Trigger Button */}
                <div className="lg:hidden w-full">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full h-9 bg-background border-muted-foreground/20 text-xs font-bold gap-2">
                        <SlidersHorizontal className="size-4 text-primary" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px]">
                      <SheetHeader className="pb-3 border-b mb-4">
                        <SheetTitle className="font-extrabold text-base flex items-center gap-2 text-foreground">
                          <SlidersHorizontal className="size-4.5 text-primary" />
                          Filter Dishes
                        </SheetTitle>
                      </SheetHeader>
                      <FilterContent />
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <span>Found</span>
                  <span className="text-primary font-black bg-primary/10 px-2 py-0.5 rounded-md">
                    {filteredAndSortedDishes.length}
                  </span>
                  <span>gourmet dishes in Sector 15</span>
                </div>
              </div>

              {/* Sort selector dropdown */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                <span className="text-[11px] font-bold text-muted-foreground/80">Sort Dishes:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[170px] h-9 text-xs bg-background border-muted-foreground/20 focus:ring-primary rounded-lg font-bold">
                    <SelectValue placeholder="Sort Directory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating" className="text-xs font-semibold">Highest Rating</SelectItem>
                    <SelectItem value="price-low" className="text-xs font-semibold">Price: Low to High</SelectItem>
                    <SelectItem value="price-high" className="text-xs font-semibold">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Catalog Grid - Dense 3 Cards per row on desktop */}
            {paginatedDishes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginatedDishes.map((dish) => (
                  <FoodCard
                    key={dish.id}
                    image={dish.image}
                    title={dish.name}
                    subtitle={dish.restaurant}
                    className="border border-muted/50 hover:shadow-xl transition-all duration-300 rounded-2xl bg-card"
                    topRightBadge={
                      <div className="bg-background/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1.5 shadow-sm border border-muted/40">
                        <div className={`size-1.5 rounded-full ${dish.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                        {dish.type === 'veg' ? 'Veg' : 'Non-Veg'}
                      </div>
                    }
                    footerLeft={`$${dish.price.toFixed(2)}`}
                    footerRight={
                      cartCounts[dish.id] ? (
                        <div className="flex items-center gap-1.5 bg-primary/10 rounded-full p-0.5 border border-primary/20">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6 rounded-full text-primary hover:bg-primary/20 hover:text-primary"
                            onClick={() => updateCount(dish.id, -1)}
                          >
                            <Minus className="size-2.5" />
                          </Button>
                          <span className="w-3.5 text-center font-bold text-[11px] text-primary">{cartCounts[dish.id]}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6 rounded-full text-primary hover:bg-primary/20 hover:text-primary"
                            onClick={() => updateCount(dish.id, 1)}
                          >
                            <Plus className="size-2.5" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-primary border-primary/30 hover:bg-primary hover:text-white transition-all duration-300 px-3.5 h-8 text-xs font-bold gap-1"
                          onClick={() => updateCount(dish.id, 1)}
                        >
                          <Plus className="size-2.5" /> Add
                        </Button>
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              /* Beautiful Zero State Search Fallback */
              <div className="py-20 text-center border-2 border-dashed border-muted rounded-[2rem] bg-card/60 shadow-inner">
                <div className="bg-background size-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md border">
                  <Sparkles className="size-7 text-primary/60 animate-bounce" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground font-heading">No dishes match</h3>
                <p className="text-muted-foreground/90 text-xs font-semibold mt-2 max-w-sm mx-auto px-4">
                  We couldn't find any food items matching your exact filter settings. Try resetting them or search for something else.
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="mt-6 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 h-9 rounded-xl shadow-md transition-all gap-1.5"
                >
                  <RotateCcw className="size-4" /> Reset Filters
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
                    className="size-8 rounded-lg bg-background border-muted-foreground/20 disabled:opacity-40"
                  >
                    <ChevronLeft className="size-4.5" />
                  </Button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className={`size-8 rounded-lg text-xs font-bold p-0 ${
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
                    className="size-8 rounded-lg bg-background border-muted-foreground/20 disabled:opacity-40"
                  >
                    <ChevronRight className="size-4.5" />
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
