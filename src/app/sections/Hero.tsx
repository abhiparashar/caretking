"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { GemstoneScene } from "@/app/components/3d/GemstoneScene";
import { MagneticButton } from "@/app/components/ui/MagneticButton";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <GemstoneScene />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-transparent to-[#0A0A0A] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/50 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles size={16} className="text-[#C9A96E]" />
          <span className="text-sm text-[#E8E8E8]/80 tracking-wider">
            Est. 1895
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="font-[family-name:var(--font-playfair)] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-6"
        >
          <span className="block text-gold-gradient">Timeless</span>
          <span className="block text-[#E8E8E8] mt-2">Elegance</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-[#E8E8E8]/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Discover our exquisite collection of handcrafted jewelry, 
          where artistry meets eternal beauty in every precious piece.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton className="group">
            Explore Collection
            <ChevronRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </MagneticButton>

          <MagneticButton variant="outline">
            View Lookbook
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "130+", label: "Years of Excellence" },
            { value: "50K+", label: "Happy Clients" },
            { value: "100%", label: "Handcrafted" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#E8E8E8]/50 mt-1 tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#E8E8E8]/40 tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C9A96E] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
