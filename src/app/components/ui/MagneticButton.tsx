"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-[#C9A96E] to-[#B76E79] text-[#0A0A0A] font-medium",
    secondary: "bg-[#1A1A2E] text-[#E8E8E8] border border-[#C9A96E]/20",
    outline:
      "bg-transparent text-[#C9A96E] border border-[#C9A96E] hover:bg-[#C9A96E]/10",
    ghost: "bg-transparent text-[#E8E8E8] hover:bg-[#E8E8E8]/5",
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 rounded-full overflow-hidden transition-colors duration-300",
        variants[variant],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
