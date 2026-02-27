"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { CartItem } from "@/app/types";
import { formatPrice } from "@/app/lib/utils";
import { MagneticButton } from "@/app/components/ui/MagneticButton";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

// Demo cart items
const demoItems: CartItem[] = [
  {
    product: {
      id: "1",
      name: "Eternal Solitaire",
      category: "rings",
      price: 12500,
      materials: ["gold", "platinum", "rose-gold"],
      description: "A timeless diamond solitaire",
      image: "/images/ring-solitaire.jpg",
    },
    quantity: 1,
    selectedMaterial: "gold",
  },
  {
    product: {
      id: "3",
      name: "Midnight Pendant",
      category: "necklaces",
      price: 8400,
      materials: ["gold", "silver", "rose-gold"],
      description: "A deep sapphire embraced by diamonds",
      image: "/images/necklace-pendant.jpg",
    },
    quantity: 1,
    selectedMaterial: "gold",
  },
];

export function Cart({ isOpen, onClose }: CartProps) {
  const [items, setItems] = useState<CartItem[]>(demoItems);

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-[#C9A96E]/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#C9A96E]/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-[#C9A96E]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#E8E8E8]">
                  Your Cart
                </h2>
                <span className="text-[#C9A96E] text-sm">
                  ({items.length} items)
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-[#E8E8E8]/60 hover:text-[#C9A96E] transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <ShoppingBag
                      size={48}
                      className="mx-auto text-[#C9A96E]/30 mb-4"
                    />
                    <p className="text-[#E8E8E8]/60">Your cart is empty</p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 rounded-xl bg-[#1A1A2E]/30 border border-[#C9A96E]/10"
                    >
                      {/* Product Image Placeholder */}
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0A] flex-shrink-0" />

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-[family-name:var(--font-playfair)] text-[#E8E8E8] font-semibold truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-[#C9A96E] text-sm capitalize">
                          {item.selectedMaterial}
                        </p>
                        <p className="text-[#E8E8E8]/60 text-sm mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item.product.id, -1)
                            }
                            className="w-8 h-8 rounded-full border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E]/10"
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="text-[#E8E8E8] w-8 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-8 h-8 rounded-full border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E]/10"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-[#E8E8E8]/40 hover:text-red-400 transition-colors self-start"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#C9A96E]/10 space-y-4">
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#E8E8E8]/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#E8E8E8]/60">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#E8E8E8] font-semibold pt-2 border-t border-[#C9A96E]/10">
                    <span>Total</span>
                    <span className="text-gold-gradient text-lg">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <MagneticButton className="w-full justify-center">
                  Proceed to Checkout
                </MagneticButton>

                <p className="text-center text-[#E8E8E8]/40 text-xs">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
