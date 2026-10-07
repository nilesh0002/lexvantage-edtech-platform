"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faculty from "@/components/home/Faculty";
import AuthModal from "@/components/AuthModal";

export default function FacultyPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <main className="flex-grow pt-20 bg-background">
        <Faculty />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={() => {}} />
    </>
  );
}
