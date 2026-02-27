"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  collections: ["Rings", "Necklaces", "Earrings", "Bracelets", "Wedding"],
  company: ["About Us", "Careers", "Press", "Sustainability"],
  support: ["Contact", "Shipping", "Returns", "Size Guide", "FAQ"],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#C9A96E]/10">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="inline-block text-4xl font-bold tracking-[0.2em] text-gold-gradient font-[family-name:var(--font-playfair)] mb-6"
              whileHover={{ scale: 1.02 }}
            >
              AUREA
            </motion.a>
            <p className="text-[#E8E8E8]/60 text-sm leading-relaxed max-w-sm mb-8">
              Crafting timeless elegance since 1895. Each piece tells a story of
              exceptional artistry and uncompromising quality.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#E8E8E8]/60 text-sm">
                <MapPin size={16} className="text-[#C9A96E]" />
                <span>123 Fifth Avenue, New York, NY 10010</span>
              </div>
              <div className="flex items-center gap-3 text-[#E8E8E8]/60 text-sm">
                <Phone size={16} className="text-[#C9A96E]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-[#E8E8E8]/60 text-sm">
                <Mail size={16} className="text-[#C9A96E]" />
                <span>concierge@aurea.com</span>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[#C9A96E] text-sm uppercase tracking-[0.2em] mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-[#E8E8E8]/60 hover:text-[#C9A96E] text-sm transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#C9A96E] text-sm uppercase tracking-[0.2em] mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-[#E8E8E8]/60 hover:text-[#C9A96E] text-sm transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#C9A96E] text-sm uppercase tracking-[0.2em] mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-[#E8E8E8]/60 hover:text-[#C9A96E] text-sm transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#C9A96E]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-[#C9A96E]/20 flex items-center justify-center text-[#E8E8E8]/60 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[#E8E8E8]/40 text-sm">
            © 2024 AUREA. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[#E8E8E8]/40 hover:text-[#C9A96E] text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#E8E8E8]/40 hover:text-[#C9A96E] text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
