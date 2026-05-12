import { useRef } from "react";
import { Star, Heart, Clock, Truck, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const RESTAURANTS = [
  {
    id: 1,
    name: "Domino's",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    cuisine: "Pizza, Italian, Fast Food",
    badge: "popular",
    deliveryTime: "25-35 min",
    deliveryFee: "Free delivery"
  },
  {
    id: 2,
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    rating: 4.2,
    cuisine: "Pizza, Wings, Sides",
    badge: "new",
    deliveryTime: "30-40 min",
    deliveryFee: "$1.99 delivery"
  },
  {
    id: 3,
    name: "KFC",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    cuisine: "Fried Chicken, Burgers",
    badge: "free delivery",
    deliveryTime: "20-30 min",
    deliveryFee: "Free delivery"
  },
  {
    id: 4,
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1552895638-f7fe08d2f715?q=80&w=800&auto=format&fit=crop",
    rating: 4.1,
    cuisine: "Burgers, Fries, Shakes",
    badge: "popular",
    deliveryTime: "15-25 min",
    deliveryFee: "$0.99 delivery"
  },
  {
    id: 5,
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop",
    rating: 4.0,
    cuisine: "Burgers, Fast Food",
    badge: "new",
    deliveryTime: "20-30 min",
    deliveryFee: "$1.49 delivery"
  },
  {
    id: 6,
    name: "Subway",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    cuisine: "Sandwiches, Salads",
    badge: "popular",
    deliveryTime: "15-20 min",
    deliveryFee: "Free delivery"
  },
  {
    id: 7,
    name: "Pizza Inn",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    cuisine: "Pizza, Pasta, Buffet",
    badge: "new",
    deliveryTime: "25-35 min",
    deliveryFee: "$2.99 delivery"
  },
  {
    id: 8,
    name: "KFC",
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    cuisine: "Fried Chicken, Sides",
    badge: "free delivery",
    deliveryTime: "20-30 min",
    deliveryFee: "Free delivery"
  }
];

export const Restaurants = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="restaurants" className="container mx-auto px-4 py-8 pb-20 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          Popular Restaurants
        </h2>
        <Button variant="ghost" className="text-primary hover:text-primary-hover font-bold flex items-center gap-1 p-0 h-auto">
          See All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop View: Horizontal Scroll with Overlaid Arrows */}
      <div className="hidden md:block relative group/scroller">
        {/* Navigation Arrows positioned on the card images and vertically centered */}
        <div className="absolute top-[32%] -left-6 z-30 -translate-y-1/2 opacity-0 group-hover/scroller:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full w-12 h-12 shadow-2xl bg-white border-none hover:bg-primary hover:text-white transition-all flex items-center justify-center"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        </div>
        <div className="absolute top-[32%] -right-6 z-30 -translate-y-1/2 opacity-0 group-hover/scroller:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full w-12 h-12 shadow-2xl bg-white border-none hover:bg-primary hover:text-white transition-all flex items-center justify-center"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {RESTAURANTS.map((restaurant) => (
            <div key={`${restaurant.id}-${restaurant.name}`} className="flex-none w-[320px] snap-start">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View: Vertical List */}
      <div className="md:hidden flex flex-col gap-14">
        {RESTAURANTS.map((restaurant) => (
          <RestaurantCard key={`${restaurant.id}-${restaurant.name}`} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
};

const RestaurantCard = ({ restaurant }: { restaurant: any }) => {
  return (
    <Card className="group border-none shadow-none bg-transparent overflow-visible cursor-pointer w-full">
      {/* Image full space of card with no space between image and top */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 w-full border border-muted/10">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Top Left Badge - Small Box */}
        <div className="absolute top-0 left-0 bg-primary text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-br-xl shadow-md z-10">
          {restaurant.badge}
        </div>

        {/* Top Right Heart Icon */}
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all duration-300 z-10">
          <Heart className="h-4.5 w-4.5" />
        </button>
      </div>

      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight truncate">
              {restaurant.name}
            </h3>
            <p className="text-muted-foreground text-xs font-semibold mt-1.5 truncate">
              {restaurant.cuisine}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded text-[11px] font-bold shrink-0 shadow-sm">
            {restaurant.rating} <Star className="h-3 w-3 fill-current" />
          </div>
        </div>

        <div className="flex items-center gap-5 text-[12px] font-bold text-muted-foreground/80 mt-4 border-t border-muted/30 pt-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            <span>{restaurant.deliveryFee}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
