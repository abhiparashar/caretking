"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { GemstoneScene } from "@/app/components/3d/GemstoneScene";
import { MagneticButton } from "@/app/components/ui/MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <GemstoneScene />

      {/* Gradient Overlay - Dark Mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-transparent to-[#0A0A0A] z-[1] dark-only" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/50 z-[1] dark-only" />
      
      {/* Gradient Overlay - Light Mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/40 via-transparent to-[#FAF8F5] z-[1] light-only" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/30 via-transparent to-[#FAF8F5]/30 z-[1] light-only" />

      {/* Main Content Layout */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div style={{ y, opacity }} className="text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 cursor-pointer hover:scale-105 transition-transform"
              >
                <Sparkles size={16} className="text-[var(--gold)]" />
                <span className="text-sm text-[var(--foreground)]/70 tracking-wider">
                  Est. 1895
                </span>
              </motion.div>

              {/* Main Heading - Like reference: "THE ALABASTER VAULT" style */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
              >
                <span className="block text-gold-gradient">THE ALABASTER</span>
                <span className="block text-[var(--foreground)] mt-2">VAULT</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl text-[var(--foreground)]/60 max-w-md mb-12 leading-relaxed"
              >
                Discover our exquisite collection of handcrafted jewelry, 
                where artistry meets eternal beauty.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <MagneticButton className="group cursor-pointer">
                  Explore Collection
                  <ChevronRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </MagneticButton>

                <MagneticButton variant="outline" className="cursor-pointer">
                  View Lookbook
                </MagneticButton>
              </motion.div>

              {/* Stats - Horizontal like reference */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-16 flex gap-12"
              >
                {[
                  { value: "130+", label: "Years" },
                  { value: "50K+", label: "Clients" },
                  { value: "100%", label: "Handcrafted" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="text-left"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--foreground)]/50 mt-1 tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Floating Product Cards like reference */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative h-[500px] lg:h-[600px] hidden lg:block"
            >
              {/* Main Floating Ring */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="relative w-64 h-64">
                  {/* Ring Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/30 via-transparent to-[#C9A96E]/20 rounded-full blur-3xl" />
                  {/* Ring SVG */}
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E8D5A3" />
                        <stop offset="50%" stopColor="#C9A96E" />
                        <stop offset="100%" stopColor="#B8956B" />
                      </linearGradient>
                      <linearGradient id="diamond" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#E8F4F8" />
                        <stop offset="100%" stopColor="#C9E4F5" />
                      </linearGradient>
                    </defs>
                    {/* Ring Band */}
                    <ellipse cx="100" cy="130" rx="60" ry="25" fill="none" stroke="url(#ringGold)" strokeWidth="12" />
                    {/* Diamond */}
                    <polygon points="100,45 115,75 100,95 85,75" fill="url(#diamond)" />
                    <polygon points="100,45 115,75 130,70 115,60" fill="#F0F8FF" opacity="0.8" />
                    <polygon points="100,45 85,75 70,70 85,60" fill="#E0E8F0" opacity="0.6" />
                    {/* Sparkles */}
                    <circle cx="100" cy="70" r="2" fill="#FFFFFF" opacity="0.9">
                      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
              </motion.div>

              {/* Floating Product Cards - Like reference images */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-10 right-0 glass rounded-2xl p-4 cursor-pointer hover:scale-110 transition-transform"
                style={{ transform: "rotate(8deg)" }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#F5F2ED] to-[#E8E0D5] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 60 60" className="w-16 h-16">
                    <circle cx="30" cy="35" r="20" fill="none" stroke="#C9A96E" strokeWidth="4" />
                    <polygon points="30,15 34,28 46,28 36,36 40,48 30,40 20,48 24,36 14,28 26,28" fill="#E8F4F8" />
                  </svg>
                </div>
                <p className="text-xs text-[var(--foreground)]/60 mt-2 text-center">$300 Metal</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0], rotate: [3, -3, 3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-10 glass rounded-2xl p-4 cursor-pointer hover:scale-110 transition-transform"
                style={{ transform: "rotate(-5deg)" }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#F5F2ED] to-[#E8E0D5] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 50 50" className="w-12 h-12">
                    <path d="M10,10 Q25,45 40,10" fill="none" stroke="#C9A96E" strokeWidth="2" />
                    <circle cx="25" cy="32" r="5" fill="#C9A96E" />
                  </svg>
                </div>
                <p className="text-xs text-[var(--foreground)]/60 mt-2 text-center">$360 Metal</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute top-1/3 -left-4 glass rounded-2xl p-3 cursor-pointer hover:scale-110 transition-transform"
                style={{ transform: "rotate(-8deg)" }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#F5F2ED] to-[#E8E0D5] rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-10 h-10">
                    <rect x="15" y="8" width="10" height="24" rx="2" fill="#C9A96E" />
                    <rect x="12" y="12" width="16" height="16" fill="#E8F4F8" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[var(--foreground)]/40 tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
