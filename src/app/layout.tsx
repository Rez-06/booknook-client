import type { Metadata } from "next";
import { Anton, DM_Sans, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "BookNook",
  description: "A small online library. Add a book, borrow a book, return a book.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${spaceMono.variable} ${instrument.variable} ${dmSans.variable}`}
    >
      <body className="bg-base-100 font-sans text-base-content antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
