"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Courses from "@/components/home/Courses";
import Faculty from "@/components/home/Faculty";
import MockTestPreview from "@/components/home/MockTestPreview";
import CurrentAffairsPreview from "@/components/home/CurrentAffairsPreview";
import Faq from "@/components/home/Faq";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import WishlistDrawer from "@/components/WishlistDrawer";

interface Course {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  duration: string;
  exam: string;
}

export default function Home() {
  const [wishlist, setWishlist] = useState<Course[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Sync auth state with localStorage if client side
  useEffect(() => {
    const savedUser = localStorage.getItem("lexvantage_user");
    if (savedUser) {
      setIsLoggedIn(true);
      setUserProfile(savedUser);
    }
    const savedWishlist = localStorage.getItem("lexvantage_wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleToggleWishlist = (course: Course) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === course.id);
      let updated;
      if (exists) {
        updated = prev.filter((item) => item.id !== course.id);
      } else {
        updated = [...prev, course];
      }
      localStorage.setItem("lexvantage_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveWishlist = (courseId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== courseId);
      localStorage.setItem("lexvantage_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserProfile(name);
    localStorage.setItem("lexvantage_user", name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem("lexvantage_user");
  };

  const handleEnrollSuccess = (courseId: string) => {
    // Add to enrolled in localstorage
    const enrolled = JSON.parse(localStorage.getItem("lexvantage_enrolled") || "[]");
    if (!enrolled.includes(courseId)) {
      enrolled.push(courseId);
      localStorage.setItem("lexvantage_enrolled", JSON.stringify(enrolled));
    }
    // Automatically log user in if not logged in to unlock dashboard
    if (!isLoggedIn) {
      handleLoginSuccess("New Scholar");
    }
  };

  return (
    <>
      {/* Sticky Navbar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onStartFree={() => handleOpenAuth("signup")}
          onBookDemo={() => handleOpenAuth("login")}
        />

        {/* Why Choose Us features */}
        <WhyChooseUs />

        {/* Courses listing section */}
        <Courses
          wishlist={wishlist.map((c) => c.id)}
          onToggleWishlist={handleToggleWishlist}
          onEnroll={(c) => handleEnrollSuccess(c.id)}
        />

        {/* Mock Test Portal Preview */}
        <MockTestPreview onStartFullMock={() => handleOpenAuth("signup")} />

        {/* Faculty board */}
        <Faculty />

        {/* Daily Current affairs */}
        <CurrentAffairsPreview />

        {/* FAQ panel */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={handleRemoveWishlist}
        onCheckout={(course) => {
          setIsWishlistOpen(false);
          // Auto trigger signup modal for credentials, then buy
          handleOpenAuth("signup");
        }}
      />

      {/* Authentications Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
