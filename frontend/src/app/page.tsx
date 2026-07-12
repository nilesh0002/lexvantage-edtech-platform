"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home as HomeIcon, GraduationCap, Play, User, LayoutDashboard } from "lucide-react";
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
  const router = useRouter();
  const [activeMobileTab, setActiveMobileTab] = useState<"home" | "courses" | "prep" | "mentor">("home");

  // Sync active mobile tab on refresh
  useEffect(() => {
    const savedTab = sessionStorage.getItem("shreyaslawdesk_active_tab");
    if (savedTab && ["home", "courses", "prep", "mentor"].includes(savedTab)) {
      setActiveMobileTab(savedTab as any);
    }
  }, []);

  const handleMobileTabChange = (tabId: "home" | "courses" | "prep" | "mentor") => {
    setActiveMobileTab(tabId);
    sessionStorage.setItem("shreyaslawdesk_active_tab", tabId);
  };

  // Sync auth state with localStorage if client side
  useEffect(() => {
    const savedUser = localStorage.getItem("shreyaslawdesk_user");
    if (savedUser) {
      setIsLoggedIn(true);
      setUserProfile(savedUser);
    }
    const savedWishlist = localStorage.getItem("shreyaslawdesk_wishlist");
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
      localStorage.setItem("shreyaslawdesk_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveWishlist = (courseId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== courseId);
      localStorage.setItem("shreyaslawdesk_wishlist", JSON.stringify(updated));
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
    localStorage.setItem("shreyaslawdesk_user", name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem("shreyaslawdesk_user");
  };

  const handleEnrollSuccess = (courseId: string) => {
    // Add to enrolled in localstorage
    const enrolled = JSON.parse(localStorage.getItem("shreyaslawdesk_enrolled") || "[]");
    if (!enrolled.includes(courseId)) {
      enrolled.push(courseId);
      localStorage.setItem("shreyaslawdesk_enrolled", JSON.stringify(enrolled));
    }
    // Automatically log user in if not logged in to unlock dashboard
    if (!isLoggedIn) {
      handleLoginSuccess("New Scholar");
    }
  };

  const handleExploreCourses = () => {
    setActiveMobileTab("courses");
    sessionStorage.setItem("shreyaslawdesk_active_tab", "courses");
    setTimeout(() => {
      const target = document.getElementById("courses");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
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

      {/* Main Page Layout (Desktop Full Scroll / Mobile Tabbed Layout) */}
      <main className="flex-grow pb-20 md:pb-0">
        
        {/* Desktop View: Full Scrolling Sections list */}
        <div className="hidden md:block">
          {/* Hero Section */}
          <Hero
            onStartFree={() => handleOpenAuth("signup")}
            onBookDemo={() => handleOpenAuth("login")}
            onExploreCourses={handleExploreCourses}
          />
          <WhyChooseUs />
          <Courses
            wishlist={wishlist.map((c) => c.id)}
            onToggleWishlist={handleToggleWishlist}
            onEnroll={(c) => handleEnrollSuccess(c.id)}
          />
          <MockTestPreview onStartFullMock={() => handleOpenAuth("signup")} />
          <Faculty />
          <CurrentAffairsPreview />
          <Faq />
          <Footer />
        </div>

        {/* Mobile View: Dynamic PW-Style Tabbed segments */}
        <div className="md:hidden">
          {activeMobileTab === "home" && (
            <div className="space-y-1">
              <Hero
                onStartFree={() => handleOpenAuth("signup")}
                onBookDemo={() => handleOpenAuth("login")}
                onExploreCourses={handleExploreCourses}
              />
              <WhyChooseUs />
              <Faq />
              <Footer />
            </div>
          )}

          {activeMobileTab === "courses" && (
            <div className="pt-2">
              <Courses
                wishlist={wishlist.map((c) => c.id)}
                onToggleWishlist={handleToggleWishlist}
                onEnroll={(c) => handleEnrollSuccess(c.id)}
              />
              <Footer />
            </div>
          )}

          {activeMobileTab === "prep" && (
            <div className="pt-2 space-y-4">
              <MockTestPreview onStartFullMock={() => handleOpenAuth("signup")} />
              <CurrentAffairsPreview />
              <Footer />
            </div>
          )}

          {activeMobileTab === "mentor" && (
            <div className="pt-2">
              <Faculty />
              <Footer />
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom Navigation Bar for Mobile (PW-style App Navigation) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-navy-950/95 border-t border-white/10 backdrop-blur-md py-2 px-6 flex justify-between items-center shadow-lg">
        {[
          { id: "home", label: "Home", icon: HomeIcon },
          { id: "courses", label: "Courses", icon: GraduationCap },
          { id: "prep", label: "Free Prep", icon: Play },
          { id: "mentor", label: "Mentor", icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMobileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleMobileTabChange(tab.id as any)}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer py-1 text-center"
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand-gold-500" : "text-slate-400 dark:text-slate-350"}`} />
              <span className={`text-[10px] font-bold tracking-wider ${isActive ? "text-brand-gold-500" : "text-slate-400 dark:text-slate-350"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
        {/* Direct dashboard portal access */}
        <button
          onClick={() => {
            if (isLoggedIn) {
              router.push("/dashboard");
            } else {
              handleOpenAuth("login");
            }
          }}
          className="flex flex-col items-center justify-center gap-1 cursor-pointer py-1 text-center"
        >
          <LayoutDashboard className="w-5 h-5 text-slate-400 dark:text-slate-350" />
          <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-350">Portal</span>
        </button>
      </div>

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
