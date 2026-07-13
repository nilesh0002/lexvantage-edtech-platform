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
    name: "Adv. Shreya Nadar",
    role: "Founder & Lead Law Mentor",
    credentials: "B.L.S. LL.B. Graduate • Company Secretary (ICSI)",
    bio: "Hello! I'm Adv. Shreya Nadar, the founder of Shreya's Law Desk.\n\nI am a B.L.S. LL.B. graduate with a passion for making legal education simple, practical, and accessible. During my academic journey, I realized that many law students struggle with lengthy provisions and complex legal concepts. That's why I created Shreya's Law Desk—to help students understand the law through clear explanations, structured notes, and exam-oriented guidance.\n\nWhether you're preparing for LL.B. exams, CLAT UG/PG, LL.M. entrances, AIBE, Judiciary, or other competitive law examinations, my goal is to help you build a strong conceptual foundation and study with confidence.\n\nAt Shreya's Law Desk, you'll find quality learning, regular practice, and a supportive environment designed to help every aspiring legal professional succeed.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shreya",
    specialtyIcon: Scale,
  }
];
