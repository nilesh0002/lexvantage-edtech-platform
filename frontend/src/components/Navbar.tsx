"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Heart, User, Menu, X, ChevronDown, Sparkles, BookOpen, GraduationCap, Trophy, FileText, LayoutDashboard, LogOut } from "lucide-react";

interface NavbarProps {
  onOpenAuth?: (tab: "login" | "signup") => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
}

export default function Navbar({
  onOpenAuth = () => {},
  isLoggedIn = false,
  onLogout = () => {},
  wishlistCount = 0,
  onOpenWishlist = () => {},
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  }, [pathname]);

  const navLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Mock Tests", href: "/mock-tests" },
    { name: "Current Affairs", href: "/current-affairs" },
    { name: "Scholarships", href: "/scholarships" },
  ];

  const resourceLinks = [
    { name: "Free Notes", href: "/free-notes", icon: FileText },
    { name: "Faculty", href: "/faculty", icon: GraduationCap },
    { name: "Results", href: "/results", icon: Trophy },
    { name: "About Us", href: "/about", icon: BookOpen },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-navy-950/70 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-brand-navy-950/20"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg border border-brand-gold-500/30 bg-brand-navy-900 flex items-center justify-center transition-transform group-hover:scale-105">
                <Scale className="w-4.5 h-4.5 text-brand-gold-500" />
              </div>
              <span className="font-sans font-black text-xl tracking-tight text-white">
                Lex<span className="text-brand-gold-500">Vantage</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                      isActive ? "text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-gold-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen("resources")}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Resources <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {dropdownOpen === "resources" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-1 w-56 rounded-xl glass-panel p-2 shadow-2xl border border-white/10"
                    >
                      {resourceLinks.map((item) => {
                        const Icon = item.icon;
                        const isSubActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                              isSubActive
                                ? "bg-white/10 text-white font-medium"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <Icon className="w-4 h-4 text-brand-blue-500" />
                            {item.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Navigation Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-tr from-brand-pink-500 to-brand-purple-600 text-white text-[10px] font-bold flex items-center justify-center border border-brand-navy-950 animate-bounce">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* CTAs */}
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass-panel text-brand-blue-500 hover:text-white hover:bg-brand-blue-600/20 border border-brand-blue-500/30 transition-all shadow-md shadow-brand-blue-600/10"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-colors border border-white/5"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAuth("login")}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onOpenAuth("signup")}
                    className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:shadow-lg hover:shadow-brand-blue-600/25 transition-all duration-300 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-brand-gold-400 animate-pulse" />
                    Start Free
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onOpenWishlist}
                className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 right-0 z-40 bg-brand-navy-950/95 backdrop-blur-lg border-b border-white/10 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-white/5 my-2 pt-2">
                <span className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Resources
                </span>
                {resourceLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-brand-blue-500" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Login / Actions on mobile */}
              <div className="border-t border-white/5 mt-4 pt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-base font-semibold bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5 text-brand-blue-500" />
                      Dashboard Portal
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 rounded-xl text-base font-semibold text-rose-400 hover:bg-rose-500/5 transition-colors border border-rose-500/20"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onOpenAuth("login");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 rounded-xl text-base font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        onOpenAuth("signup");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 text-center flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5 text-brand-gold-400" />
                      Start Free Trial
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
