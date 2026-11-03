import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";

export const metadata: Metadata = { title: "BookNook | Home" };

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-4">
      <HeroSlider />
    </div>
  );
}
