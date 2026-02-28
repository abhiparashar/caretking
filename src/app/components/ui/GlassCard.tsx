"use client";

import { cn } from "@/app/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "gold" | "rose" | "none";
  intensity?: "light" | "medium" | "strong";
  float3D?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  intensity = "medium",
  float3D = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  // More dramatic rotation angles for stronger 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Transform for inner content to create depth
  const contentX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const contentY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);
  
  // Dynamic lighting based on mouse position
  const lightingGradient = useTransform(
    [mouseXSpring, mouseYSpring],
    ([latestX, latestY]) => {
      const xPos = (latestX as number) * 100;
      const yPos = (latestY as number) * 100;
      return `radial-gradient(circle at ${50 + xPos}% ${50 + yPos}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
    }
  );
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !float3D) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const intensityClasses = {
    light: "bg-[#1A1A2E]/40 backdrop-blur-[12px] dark-only bg-white/70 light-only",
    medium: "bg-[#1A1A2E]/60 backdrop-blur-[20px] dark-only bg-white/85 light-only",
    strong: "bg-[#1A1A2E]/80 backdrop-blur-[30px] dark-only bg-white/98 light-only",
  };

  const glowClasses = {
    gold: "shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(201,169,110,0.4)] dark-only shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_rgba(201,169,110,0.25)] light-only",
    rose: "shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(183,110,121,0.4)]",
    none: "shadow-[0_10px_40px_rgba(0,0,0,0.2)]",
  };

  return (
    <div 
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-2xl border-2 overflow-hidden cursor-pointer",
          "border-[#C9A96E]/20 dark-only border-[#C9A96E]/30 light-only",
          intensityClasses[intensity],
          hover && "transition-shadow duration-500 ease-out",
          glowClasses[glow],
          className
        )}
        style={{
          rotateX: float3D ? rotateX : 0,
          rotateY: float3D ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={
          hover
            ? {
                scale: 1.05,
                transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
              }
            : undefined
        }
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* 3D Depth Shadow Layer */}
        <div 
          className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{
            background: "linear-gradient(135deg, rgba(201,169,110,0.2) 0%, transparent 50%, rgba(201,169,110,0.1) 100%)",
            filter: "blur(20px)",
          }}
        />
        
        {/* Dynamic Lighting Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
          style={{
            background: float3D ? lightingGradient : "transparent",
          }}
        />
        
        {/* Edge Highlight */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(201,169,110,0.1) 100%)",
          }}
        />
        
        {/* Shimmer overlay */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
        </div>
        
        {/* Content with 3D parallax */}
        <motion.div 
          className="relative z-0"
          style={{ 
            x: float3D ? contentX : 0,
            y: float3D ? contentY : 0,
            transform: "translateZ(40px)",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
