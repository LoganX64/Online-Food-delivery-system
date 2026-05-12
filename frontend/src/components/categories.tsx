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
  { id: "sushi", name: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" },
  { id: "healthy", name: "Healthy", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
  { id: "pasta", name: "Pasta", image: pastaImg },
  { id: "desserts", name: "Desserts", image: dessertImg },
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
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          Craving something?
        </h2>
        <div className="hidden md:flex gap-2">
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
        className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {infiniteCategories.map((category, index) => (
          <div
            key={`${category.id}-${index}`}
            className="flex-none flex flex-col items-center gap-3 snap-start group cursor-pointer"
          >
            <div className="w-20 h-20 md:w-32 md:h-32 relative rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-primary">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/200x200/orange/white?text=" + category.name;
                }}
              />
            </div>
            <span className="text-sm md:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
