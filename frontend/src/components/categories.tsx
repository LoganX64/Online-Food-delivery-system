import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import pizzaImg from "@/assets/pizza.png";
import burgerImg from "@/assets/burger.png";
import pastaImg from "@/assets/pasta.png";
import dessertImg from "@/assets/dessert.png";
import healthyImg from "@/assets/healthy.png";

const CATEGORIES = [
  { id: "pizza", name: "Pizza", image: pizzaImg },
  { id: "burgers", name: "Burgers", image: burgerImg },
  { id: "pasta", name: "Pasta", image: pastaImg },
  { id: "desserts", name: "Desserts", image: dessertImg },
  { id: "drinks", name: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=800&auto=format&fit=crop" },
  { id: "healthy", name: "Healthy", image: healthyImg },
];

export const Categories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const infiniteCategories = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = () => {
    if (!scrollRef.current || isScrollingRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 3;

    // Jump to middle set if scrolled too far left or right
    if (scrollLeft <= 0.5) {
      scrollRef.current.scrollLeft = singleSetWidth;
    } else if (scrollLeft >= singleSetWidth * 2 - 0.5) {
      scrollRef.current.scrollLeft = singleSetWidth;
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const singleSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = singleSetWidth;
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      // Re-enable handleScroll after the smooth animation is likely to be finished
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        handleScroll(); // Check if we need to jump after animation
      }, 600);
    }
  };

  return (
    <section id="categories" className="container mx-auto px-4 py-8 relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          Quick Categories
        </h2>
      </div>

      <div className="relative">
        {/* Desktop Navigation Buttons - Floating over cards */}
        <div className="hidden md:block">
          <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full shadow-lg bg-background hover:bg-primary hover:text-white border-muted"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full shadow-lg bg-background hover:bg-primary hover:text-white border-muted"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {infiniteCategories.map((category, index) => (
            <div
              key={`${category.id}-${index}`}
              className="flex-none snap-start cursor-pointer group/item"
            >
              {/* Desktop View: Rectangular Card with Overlay */}
              <div className="hidden md:block w-[240px] h-[160px] relative rounded-xl overflow-hidden shadow-sm group-hover/item:shadow-xl transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x300/orange/white?text=${category.name}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  {category.name}
                </span>
              </div>

              {/* Mobile View: Circular Image with Text Below */}
              <div className="md:hidden flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm border border-muted-soft bg-muted-soft">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/100x100/orange/white?text=${category.name}`;
                    }}
                  />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide text-center">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

