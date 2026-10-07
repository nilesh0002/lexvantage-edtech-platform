"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, BookOpen, CreditCard, ShoppingBag } from "lucide-react";

interface Course {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  duration: string;
  exam: string;
}

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Course[];
  onRemove: (id: string) => void;
  onCheckout: (course: Course) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onCheckout,
}: WishlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/70 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-muted border-l border-border shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-blue-500" />
                  Your Course Wishlist
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Course Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 border border-border">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-foreground font-semibold mb-1">Your wishlist is empty</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mb-6">
                      Explore our premium CLAT, AILET, & MHCET courses to start building your NLU foundation.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground font-medium hover:bg-muted transition-colors text-sm"
                    >
                      Browse Courses
                    </button>
                  </div>
                ) : (
                  items.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-xl glass-panel border border-border relative group flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-blue-500/10 text-brand-blue-500 border border-brand-blue-500/20">
                            {course.exam}
                          </span>
                          <span className="text-xs text-muted-foreground">{course.duration}</span>
                        </div>
                        <h4 className="text-foreground font-bold leading-tight group-hover:text-brand-blue-500 transition-colors">
                          {course.name}
                        </h4>
                      </div>

                      <div className="flex items-center justify-end mt-2 w-full">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRemove(course.id)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onCheckout(course)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90  text-xs font-bold transition-all shadow-md cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Summary checkout footer if items exist */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border bg-background/80 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Courses:</span>
                    <span className="text-foreground font-bold">{items.length}</span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-normal">
                    *Taxes and mock portal fee will be computed during checkout.
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
