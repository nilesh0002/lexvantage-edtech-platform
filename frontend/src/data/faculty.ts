import { Scale } from "lucide-react";
import React from "react";

export interface Educator {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  avatar: string;
  specialtyIcon: React.ComponentType<any>;
}

export const facultyData: Educator[] = [
  {
    name: "Adv. Meera Sharma",
    role: "Founder & Master Law Educator",
    credentials: "NLSIU Bangalore (B.A. LL.B. Hons.) • BCL, Oxford University",
    bio: "Former Supreme Court advocate with 12+ years of CLAT mentoring experience. Having cracked CLAT herself and mentored 1,500+ NLU qualifiers, she personally teaches and guides students across all core subjects—Legal Aptitude, Logical Reasoning, English, and Current Affairs.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera",
    specialtyIcon: Scale,
  }
];
