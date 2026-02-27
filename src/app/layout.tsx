import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUREA | Luxury Jewelry",
  description: "Discover exquisite handcrafted jewelry in an immersive 3D experience. AUREA brings you the finest diamonds, gold, and platinum pieces.",
  keywords: ["luxury jewelry", "diamonds", "gold", "platinum", "3D jewelry", "high-end jewelry"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#0A0A0A] text-[#E8E8E8]`}
      >
        {children}
      </body>
    </html>
  );
}
