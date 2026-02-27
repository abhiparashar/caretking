"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Eye, Heart } from "lucide-react";
import { products } from "@/app/lib/products";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { ProductViewer } from "@/app/components/3d/ProductViewer";
import { Material } from "@/app/types";
import { formatPrice } from "@/app/lib/utils";

const featuredProducts = products.filter((p) => p.featured);

export function FeaturedCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -50]);

  return (
    <section
      id="collections"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/30 via-transparent to-[#1A1A2E]/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#C9A96E] text-sm uppercase tracking-[0.3em] mb-4 block">
            Curated Selection
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8E8E8] mb-6">
            Featured Collection
          </h2>
          <p className="text-[#E8E8E8]/60 max-w-2xl mx-auto">
            Our most coveted pieces, each telling a unique story of craftsmanship
            and timeless beauty.
          </p>
        </motion.div>

        {/* Products Grid with Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.slice(0, 3).map((product, index) => {
            const yValue = index === 0 ? y1 : index === 1 ? y2 : y3;
            return (
              <motion.div
                key={product.id}
                style={{ y: yValue }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <MagneticButton variant="outline">
            View All Collections
            <ArrowRight size={20} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(
    product.materials[0]
  );
  const [isHovered, setIsHovered] = useState(false);

  const materialColors: Record<Material, string> = {
    gold: "#C9A96E",
    silver: "#C0C0C0",
    "rose-gold": "#B76E79",
    platinum: "#E5E4E2",
  };

  return (
    <GlassCard
      className="group relative overflow-visible"
      glow="gold"
      intensity="medium"
    >
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 3D Viewer */}
        <div className="relative h-[300px] overflow-hidden rounded-t-2xl">
          <ProductViewer
            type={product.category === "rings" ? "ring" : product.category === "necklaces" ? "necklace" : product.category === "earrings" ? "earring" : "bracelet"}
            material={selectedMaterial}
          />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#0A0A0A]"
            >
              <Eye size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full border border-[#E8E8E8]/30 flex items-center justify-center text-[#E8E8E8] hover:bg-[#E8E8E8]/10"
            >
              <Heart size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#E8E8E8] mb-2 group-hover:text-[#C9A96E] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#E8E8E8]/50 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Material Selector */}
          <div className="flex items-center gap-2 mb-4">
            {product.materials.map((material) => (
              <button
                key={material}
                onClick={() => setSelectedMaterial(material)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  selectedMaterial === material
                    ? "border-[#C9A96E] scale-110"
                    : "border-transparent hover:border-[#E8E8E8]/30"
                }`}
                style={{ backgroundColor: materialColors[material] }}
                title={material}
              />
            ))}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gold-gradient">
              {formatPrice(product.price)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-full text-[#C9A96E] text-sm hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-300"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
