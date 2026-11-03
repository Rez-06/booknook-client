"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "Add a book",
    title: "Put your favourite reads on the shelf",
    text: "Upload a cover, write a few lines and share a book with the whole community in under a minute.",
  },
  {
    eyebrow: "Borrow a book",
    title: "Borrow for seven days, no queue",
    text: "Pick a title, confirm in one tap and it lands on your My Borrows list with a return date.",
  },
  {
    eyebrow: "Return a book",
    title: "Done reading? Send it back",
    text: "Returning frees up a copy so the next reader can pick it up. Keep the shelf moving.",
  },
];

const spines = [
  ["h-40", "bg-primary"],
  ["h-56", "bg-neutral-content"],
  ["h-48", "bg-accent"],
  ["h-64", "bg-primary"],
  ["h-44", "bg-neutral-content"],
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      loop
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="overflow-hidden rounded-[2rem]"
      style={
        {
          "--swiper-theme-color": "#ff5a1f",
          "--swiper-pagination-bullet-inactive-color": "#fff4e6",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        } as React.CSSProperties
      }
    >
      {slides.map((s) => (
        <SwiperSlide key={s.title}>
          <div className="flex min-h-[28rem] items-center justify-between gap-8 bg-neutral px-6 pb-14 pt-10 text-neutral-content sm:px-12 md:min-h-[32rem]">
            <div className="max-w-xl">
              <p className="eyebrow mb-4">{s.eyebrow}</p>
              <h2 className="section-title">{s.title}</h2>
              <p className="mt-5 max-w-md opacity-80">{s.text}</p>
              <Link href="/books" className="btn btn-primary mt-8 rounded-full font-mono uppercase">
                Browse Books
              </Link>
            </div>
            <div className="hidden items-end gap-2 md:flex" aria-hidden="true">
              {spines.map(([h, c], i) => (
                <div key={i} className={`w-8 rounded-t-md lg:w-10 ${h} ${c}`} />
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
