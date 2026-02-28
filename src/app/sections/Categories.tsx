"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { categories } from "@/app/lib/products";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { useInView } from "@/app/hooks/useScrollProgress";

export function Categories() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="categories" className="relative py-32 overflow-hidden">
      {/* Background Elements - Dark Mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A1A2E]/20 to-[#0A0A0A] dark-only" />
      
      {/* Background Elements - Light Mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F5F2ED]/50 to-[#FAF8F5] light-only" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[var(--gold)] text-sm uppercase tracking-[0.3em] mb-4 block">
            Browse By
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)]">
            Categories
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <GlassCard
                className="group cursor-pointer h-[400px] relative"
                glow="gold"
                intensity="medium"
              >
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0A] dark-only" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] to-[#F5F2ED] light-only" />

                {/* Category Icon/Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <CategoryVisual type={category.id} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent dark-only" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent light-only" />

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-[var(--foreground)]/50 text-sm mb-3">
                        {category.description}
                      </p>
                      <span className="text-[var(--gold)] text-xs uppercase tracking-wider">
                        {category.count} Pieces
                      </span>
                    </div>

                    <motion.div
                      className="w-12 h-12 rounded-full border border-[var(--gold)]/30 flex items-center justify-center group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight
                        size={20}
                        className="text-[var(--gold)] group-hover:text-[var(--background)] transition-colors"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/30 transition-all duration-500" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryVisual({ type }: { type: string }) {
  const visuals: Record<string, ReactNode> = {
    rings: (
      <svg
        viewBox="0 0 100 100"
        className="w-32 h-32 text-[var(--gold)]/30 group-hover:text-[var(--gold)]/50 transition-colors"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="8" />
        <polygon points="50,25 55,40 70,40 58,50 63,65 50,55 37,65 42,50 30,40 45,40" />
      </svg>
    ),
    necklaces: (
      <svg
        viewBox="0 0 100 100"
        className="w-32 h-32 text-[var(--gold)]/30 group-hover:text-[var(--gold)]/50 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="M20,20 Q50,80 80,20" />
        <circle cx="50" cy="65" r="8" fill="currentColor" />
      </svg>
    ),
    earrings: (
      <svg
        viewBox="0 0 100 100"
        className="w-32 h-32 text-[var(--gold)]/30 group-hover:text-[var(--gold)]/50 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <line x1="30" y1="20" x2="30" y2="45" />
        <line x1="70" y1="20" x2="70" y2="45" />
        <circle cx="30" cy="55" r="12" fill="currentColor" fillOpacity="0.3" />
        <circle cx="70" cy="55" r="12" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
    bracelets: (
      <svg
        viewBox="0 0 100 100"
        className="w-32 h-32 text-[var(--gold)]/30 group-hover:text-[var(--gold)]/50 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      >
        <ellipse cx="50" cy="50" rx="30" ry="35" />
        <circle cx="35" cy="45" r="3" fill="currentColor" />
        <circle cx="65" cy="45" r="3" fill="currentColor" />
        <circle cx="50" cy="65" r="3" fill="currentColor" />
      </svg>
    ),
  };

  return visuals[type] || null;
}
