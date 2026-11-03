import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import Reviews from "@/components/home/Reviews";

export const metadata: Metadata = { title: "BookNook | Home" };

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-4">
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <Reviews />
    </div>
  );
}
