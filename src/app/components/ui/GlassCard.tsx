"use client";

import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "gold" | "rose" | "none";
  intensity?: "light" | "medium" | "strong";
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  intensity = "medium",
}: GlassCardProps) {
  const intensityClasses = {
    light: "bg-[#1A1A2E]/30 backdrop-blur-[10px]",
    medium: "bg-[#1A1A2E]/50 backdrop-blur-[20px]",
    strong: "bg-[#1A1A2E]/70 backdrop-blur-[30px]",
  };

  const glowClasses = {
    gold: "hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]",
    rose: "hover:shadow-[0_0_30px_rgba(183,110,121,0.3)]",
    none: "",
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-[#C9A96E]/10 overflow-hidden",
        intensityClasses[intensity],
        hover && "transition-all duration-500 ease-out",
        hover && glowClasses[glow],
        className
      )}
      whileHover={
        hover
          ? {
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
            }
          : undefined
      }
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A96E]/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      </div>
      {children}
    </motion.div>
  );
}
