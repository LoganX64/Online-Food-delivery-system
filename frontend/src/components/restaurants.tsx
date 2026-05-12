import { useRef, useEffect } from "react";
import { Star, Heart, Clock, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const RESTAURANTS = [
  {
    id: 1,
    name: "The Burger Joint",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    cuisine: "American",
    category: "Burgers",
    price: "$",
    deliveryTime: "20-30 min",
    deliveryFee: "Free delivery",
    isPromo: true
  },
  {
    id: 2,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    cuisine: "Japanese",
    category: "Sushi",
    price: "$$",
    deliveryTime: "35-45 min",
    deliveryFee: "$2.99 delivery",
    isPromo: false
  },
  {
    id: 3,
    name: "Pizza Heaven",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    cuisine: "Italian",
    category: "Pizza",
    price: "$",
    deliveryTime: "25-35 min",
    deliveryFee: "Free delivery",
    isPromo: true
  },
  {
    id: 4,
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    cuisine: "Healthy",
    category: "Salads",
    price: "$$",
    deliveryTime: "20-30 min",
    deliveryFee: "$1.50 delivery",
    isPromo: false
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
    <section className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          Featured Near You
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

      <div className="relative group/scroller">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {infiniteRestaurants.map((restaurant, index) => (
            <Card key={`${restaurant.id}-${index}`} className="flex-none w-[300px] sm:w-[340px] md:w-[400px] group border border-muted/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer bg-card snap-start rounded-2xl">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Promo Badge */}
                {restaurant.isPromo && (
                  <div className="absolute bottom-3 left-3 bg-[#F97316] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    Promo
                  </div>
                )}

                {/* Wishlist Heart Icon */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-muted transition-colors">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {restaurant.name}
                  </h3>
                  <Badge variant="secondary" className="bg-[#fff7ed] text-[#F97316] border-none font-bold gap-1 px-2">
                    {restaurant.rating} <Star className="h-3 w-3 fill-current" />
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm font-medium">
                  {restaurant.cuisine} • {restaurant.category} • {restaurant.price}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="h-4 w-4" />
                    <span>{restaurant.deliveryFee}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
