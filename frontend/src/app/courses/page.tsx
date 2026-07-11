"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Courses from "@/components/home/Courses";
import AuthModal from "@/components/AuthModal";

export default function CoursesPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const handleToggleWishlist = (course: any) => {
    setWishlist((prev) =>
      prev.includes(course.id) ? prev.filter((id) => id !== course.id) : [...prev, course.id]
    );
  };

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} wishlistCount={wishlist.length} />
      <main className="flex-grow pt-20 bg-brand-navy-950">
        <Courses
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onEnroll={() => setIsAuthOpen(true)}
        />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={() => {}} />
    </>
  );
}
