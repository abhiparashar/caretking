"use client";

import { motion } from "framer-motion";
import { lookbookItems } from "@/app/lib/products";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { useInView } from "@/app/hooks/useScrollProgress";
import { ArrowUpRight } from "lucide-react";

export function Lookbook() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="lookbook" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A2E]/20 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#C9A96E] text-sm uppercase tracking-[0.3em] mb-4 block">
            Editorial
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8E8E8] mb-6">
            The Lookbook
          </h2>
          <p className="text-[#E8E8E8]/60 max-w-2xl mx-auto">
            Immerse yourself in our visual stories, where each image captures the
            essence of luxury and sophistication.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={index === 0 || index === 3 ? "md:row-span-2" : ""}
            >
              <GlassCard
                className={`group cursor-pointer h-full min-h-[300px] ${
                  index === 0 || index === 3 ? "md:min-h-[600px]" : ""
                }`}
                glow="gold"
                intensity="light"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#0A0A0A] to-[#1A1A2E]" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-30">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at ${20 + index * 20}% ${30 + index * 10}%, rgba(201, 169, 110, 0.15) 0%, transparent 50%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                    <span className="text-[#C9A96E]/60 text-xs uppercase tracking-[0.2em] mb-2 block">
                      Collection {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-4 group-hover:text-[#C9A96E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#E8E8E8]/50 text-sm mb-6 max-w-xs">
                      Featuring {item.products.length} exclusive pieces from our
                      latest collection.
                    </p>

                    <motion.div
                      className="inline-flex items-center gap-2 text-[#C9A96E] text-sm uppercase tracking-wider"
                      whileHover={{ x: 5 }}
                    >
                      <span>Explore Story</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-20 h-20 border border-[#C9A96E]/20 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-12 right-12 w-12 h-12 border border-[#C9A96E]/10 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-700" />

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-[#E8E8E8]/40 text-sm mb-4">
            Want to see more?
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#E8D5A3] transition-colors text-lg font-medium"
          >
            View Complete Lookbook
            <ArrowUpRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
