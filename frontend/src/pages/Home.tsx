import { HeroSection } from "@/components/hero-section";
import { Categories } from "@/components/categories";
import { Restaurants } from "@/components/restaurants";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Categories />
      <Restaurants />
    </main>
  );
}
