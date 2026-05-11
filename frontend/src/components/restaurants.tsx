import { useRef, useEffect } from "react";
import { Star, ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const RESTAURANTS = [
  {
    id: 1,
    name: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    rating: 4.2,
    dishes: "Pizza, Pasta, Desserts",
    deliveryTime: "25-30 min",
    deliveryFee: "Free delivery"
  },
  {
    id: 2,
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    dishes: "Burgers, Sides, Shakes",
    deliveryTime: "20-30 min",
    deliveryFee: "$1.99 delivery fee"
  },
  {
    id: 3,
    name: "KFC",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=800&auto=format&fit=crop",
    rating: 4.1,
    dishes: "Fried Chicken, Wings, Buckets",
    deliveryTime: "30-40 min",
    deliveryFee: "$2.50 delivery fee"
  },
  {
    id: 4,
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    dishes: "Pizza, Wings, Sides",
    deliveryTime: "25-35 min",
    deliveryFee: "Free delivery"
  },
  {
    id: 5,
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    dishes: "Burgers, Fries, Coffee",
    deliveryTime: "15-25 min",
    deliveryFee: "Free delivery"
  },
  {
    id: 6,
    name: "Subway",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=800&auto=format&fit=crop",
    rating: 4.0,
    dishes: "Sandwiches, Salads, Cookies",
    deliveryTime: "20-30 min",
    deliveryFee: "$1.50 delivery fee"
  },
  {
    id: 7,
    name: "Pizza Inn",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop",
    rating: 4.2,
    dishes: "Pizza, Drinks, Sides",
    deliveryTime: "30-45 min",
    deliveryFee: "Free delivery"
  },
  {
    id: 8,
    name: "Popeyes",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    dishes: "Chicken, Biscuits, Seafood",
    deliveryTime: "35-50 min",
    deliveryFee: "$3.00 delivery fee"
  }
];

export const Restaurants = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Triplicate restaurants for seamless looping
  const infiniteRestaurants = [...RESTAURANTS, ...RESTAURANTS, ...RESTAURANTS];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 3;

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
          Popular Restaurants
        </h2>
        <Link to="/restaurants" className="flex items-center text-primary hover:text-primary-hover hover:underline font-semibold group transition-colors">
          See All
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative group/scroller">
        {/* Navigation Arrows - Floating */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute left-[-10px] lg:left-[-20px] top-[40%] -translate-y-1/2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground border-muted-foreground/20 h-12 w-12 shadow-xl z-20 opacity-0 group-hover/scroller:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="absolute right-[-10px] lg:right-[-20px] top-[40%] -translate-y-1/2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground border-muted-foreground/20 h-12 w-12 shadow-xl z-20 opacity-0 group-hover/scroller:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {infiniteRestaurants.map((restaurant, index) => (
            <Card key={`${restaurant.id}-${index}`} className="flex-none w-[280px] sm:w-[320px] md:w-[380px] group border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer bg-card p-0 gap-0 snap-start">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground backdrop-blur-sm border-none flex items-center gap-1 font-bold shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-rating text-rating" />
                    {restaurant.rating}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-1 pb-1">
                  {restaurant.dishes}
                </p>
                <div className="flex items-center gap-3 text-sm font-medium pt-3 border-t border-muted">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className={restaurant.deliveryFee === "Free delivery" ? "text-success font-semibold" : "text-muted-foreground"}>
                    {restaurant.deliveryFee}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
