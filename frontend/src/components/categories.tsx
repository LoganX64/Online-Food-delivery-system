import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import pizzaImg from "@/assets/pizza.png";
import burgerImg from "@/assets/burger.png";
import pastaImg from "@/assets/pasta.png";
import dessertImg from "@/assets/dessert.png";

const CATEGORIES = [
  { id: "pizza", name: "Pizza", image: pizzaImg },
  { id: "burgers", name: "Burgers", image: burgerImg },
  { id: "pasta", name: "Pasta", image: pastaImg },
  { id: "desserts", name: "Desserts", image: dessertImg },
  { id: "drinks", name: "Drinks", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=800&fit=crop" },
  { id: "healthy", name: "Healthy", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=800&fit=crop" },
];

export const Categories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Triplicate categories for seamless looping
  const infiniteCategories = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 3;

    // Jump to middle set if scrolled too far left or right
    if (scrollLeft <= 0) {
      scrollRef.current.scrollLeft = singleSetWidth;
    } else if (scrollLeft >= singleSetWidth * 2) {
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
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          Quick Categories
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full hover:bg-primary hover:text-primary-foreground border-muted-foreground/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full hover:bg-primary hover:text-primary-foreground border-muted-foreground/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {infiniteCategories.map((category, index) => (
          <div
            key={`${category.id}-${index}`}
            className="flex-none w-40 md:w-56 aspect-square relative group cursor-pointer overflow-hidden rounded-2xl snap-start shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/400x400/orange/white?text=" + category.name;
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-bold text-lg md:text-xl tracking-wide">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
