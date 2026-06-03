import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, Clock, Truck, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { FoodCard } from "./ui/food-card";

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
  const navigate = useNavigate();
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
    <section id="restaurants" className="container mx-auto px-4 pt-2 pb-8 md:pt-2 md:pb-12 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          Popular Restaurants
        </h2>
        <Button
          onClick={() => navigate("/restaurants")}
          variant="ghost"
          className="text-primary hover:text-primary-hover font-bold flex items-center gap-1 p-0 h-auto hover:bg-transparent underline underline-offset-4 decoration-2"
        >
          See All <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* Desktop View: Horizontal Scroll with Overlaid Arrows */}
      <div className="hidden md:block relative group/scroller">
        {/* Navigation Arrows positioned like Categories - floating over the container */}
        <div className="absolute top-1/2 -left-5 z-30 -translate-y-1/2 opacity-0 group-hover/scroller:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full size-10 shadow-xl bg-background border border-border hover:bg-primary hover:text-white transition-all flex items-center justify-center"
          >
            <ChevronLeft className="size-6" />
          </Button>
        </div>
        <div className="absolute top-1/2 -right-5 z-30 -translate-y-1/2 opacity-0 group-hover/scroller:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full size-10 shadow-xl bg-background border border-border hover:bg-primary hover:text-white transition-all flex items-center justify-center"
          >
            <ChevronRight className="size-6" />
          </Button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
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
      <div className="md:hidden flex flex-col gap-5">
        {RESTAURANTS.map((restaurant) => (
          <RestaurantCard key={`${restaurant.id}-${restaurant.name}`} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
};

const RestaurantCard = ({ restaurant }: { restaurant: any }) => {
  const navigate = useNavigate();
  return (
    <FoodCard
      image={restaurant.image}
      title={restaurant.name}
      subtitle={restaurant.cuisine}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      topLeftBadge={
        <div className="bg-primary text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-br-xl shadow-md">
          {restaurant.badge}
        </div>
      }
      topRightBadge={
        <button className="size-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all duration-300">
          <Heart className="size-4" />
        </button>
      }
      contentRight={
        <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">
          {restaurant.rating} <Star className="size-2.5 fill-current" />
        </div>
      }
      footerFull={
        <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground/80">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="size-3.5 text-primary" />
            <span>{restaurant.deliveryFee}</span>
          </div>
        </div>
      }
    />
  );
};
