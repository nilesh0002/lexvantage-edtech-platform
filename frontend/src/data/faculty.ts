import { Scale, Landmark, BookOpen, GraduationCap } from "lucide-react";
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
    name: "Adv. Vikramaditya Singh",
    role: "Co-Founder & Head of Legal Aptitude",
    credentials: "NLSIU Bangalore (B.A. LL.B.) • BCL, Oxford University",
    bio: "Former Supreme Court litigator with 11+ years of CLAT coaching experience. Architect of the LexVantage legal analytical framework.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    specialtyIcon: Scale,
  },
  {
    name: "Prof. Meenakshi Iyer",
    role: "Director of Logical Reasoning",
    credentials: "PhD in Cognitive Logic, IIT Delhi • Former Prof. at Symbiosis",
    bio: "Specializes in modern analytical reasoning formats. Decoded CLAT Logical patterns since the inception of the offline test.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meenakshi",
    specialtyIcon: Landmark,
  },
  {
    name: "Devansh Kapoor",
    role: "Lead English & Critical Logic",
    credentials: "NUJS Kolkata (B.A. LL.B.) • Scored CLAT AIR 3 (2018)",
    bio: "Focuses on comprehension efficiency and fast vocabulary hacks. Author of 'Critical Reasoning Secrets for Law Entrance'.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devansh",
    specialtyIcon: BookOpen,
  },
  {
    name: "Priya Nair, IFS (Retd.)",
    role: "Head of General Knowledge & Current Affairs",
    credentials: "Former Indian Foreign Service Officer • Harvard Kennedy School MPA",
    bio: "Ex-diplomat curating our high-yield GK bulletins. Focuses on connecting static constitutional history with dynamic news.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    specialtyIcon: GraduationCap,
  },
];
