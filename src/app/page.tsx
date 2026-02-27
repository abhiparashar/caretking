"use client";

import { useState } from "react";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { ParticleField } from "@/app/components/ui/ParticleField";
import { Cart } from "@/app/components/product/Cart";
import { Hero } from "@/app/sections/Hero";
import { Categories } from "@/app/sections/Categories";
import { FeaturedCollection } from "@/app/sections/FeaturedCollection";
import { Lookbook } from "@/app/sections/Lookbook";
import { About } from "@/app/sections/About";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* Ambient Particle Background */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <Categories />
        <FeaturedCollection />
        <Lookbook />
        <About />
      </div>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
