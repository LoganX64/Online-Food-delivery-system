import { HeroSection } from "@/components/hero-section";
import { Categories } from "@/components/categories";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Categories />
      {/* Other sections like Restaurant listings will go here */}
    </main>
  );
}
