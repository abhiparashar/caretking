"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, Gem, Heart, Sparkles } from "lucide-react";
import { MagneticButton } from "@/app/components/ui/MagneticButton";

const values = [
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description:
      "Each gemstone is hand-selected by our master jewelers, ensuring only the finest stones become part of our collections.",
  },
  {
    icon: Heart,
    title: "Crafted with Passion",
    description:
      "Our artisans pour their heart into every piece, combining traditional techniques with modern innovation.",
  },
  {
    icon: Award,
    title: "Legacy of Excellence",
    description:
      "For over 130 years, we have been creating jewelry that becomes part of your family's most cherished moments.",
  },
];

const milestones = [
  { year: "1895", event: "Founded in Paris" },
  { year: "1920", event: "First Royal Commission" },
  { year: "1955", event: "Expanded to New York" },
  { year: "2024", event: "Digital Innovation" },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/40 via-transparent to-[#1A1A2E]/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[#C9A96E] text-sm uppercase tracking-[0.3em] mb-4 block">
              Our Story
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8E8E8] mb-8 leading-tight">
              Where Artistry
              <span className="block text-gold-gradient">Meets Eternity</span>
            </h2>
            <div className="space-y-6 text-[#E8E8E8]/70 leading-relaxed">
              <p>
                Since 1895, AUREA has been at the forefront of luxury jewelry,
                creating pieces that transcend time and trends. Our journey began
                in a small atelier in Paris, where our founder, Pierre Laurent,
                dreamed of crafting jewelry that would capture the essence of
                eternal beauty.
              </p>
              <p>
                Today, we continue that legacy, combining centuries-old
                craftsmanship with cutting-edge technology. Each piece that bears
                the AUREA name is a testament to our unwavering commitment to
                excellence.
              </p>
            </div>

            <div className="mt-10">
              <MagneticButton>
                <Sparkles size={18} />
                Discover Our Heritage
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* Placeholder for About Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#0A0A0A] to-[#1A1A2E]" />

              {/* Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 border border-[#C9A96E]/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-48 h-48 border border-[#C9A96E]/10 rounded-full"
                />
              </div>

              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">
                    130
                  </span>
                  <span className="block text-[#E8E8E8]/60 text-sm uppercase tracking-[0.2em] mt-2">
                    Years of Excellence
                  </span>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-6"
              >
                <div className="text-3xl font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">
                  50K+
                </div>
                <div className="text-[#E8E8E8]/60 text-sm">
                  Happy Clients
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group text-center p-8 rounded-2xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-500 hover:bg-[#1A1A2E]/30"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C9A96E]/10 flex items-center justify-center group-hover:bg-[#C9A96E]/20 transition-colors">
                <value.icon size={28} className="text-[#C9A96E]" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#E8E8E8] mb-4 group-hover:text-[#C9A96E] transition-colors">
                {value.title}
              </h3>
              <p className="text-[#E8E8E8]/60 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-[#C9A96E] text-sm uppercase tracking-[0.3em] mb-8 block">
            Our Journey
          </span>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl lg:text-3xl font-bold text-gold-gradient font-[family-name:var(--font-playfair)] mb-2">
                  {milestone.year}
                </div>
                <div className="text-[#E8E8E8]/50 text-sm">
                  {milestone.event}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
