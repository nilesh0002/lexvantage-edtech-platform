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
    name: "Shreya Nadar",
    role: "Founder & Lead Law Mentor",
    credentials: "BLS LL.B Candidate (D.Y. Patil College of Law) • Company Secretary (ICSI)",
    bio: "Detail-oriented professional with experience as a Legal Aid Officer at Belapur Court and content developer for InAmigos Foundation. Currently pursuing BLS LL.B to enhance legal knowledge through practical engagement, Shreya brings strong research, drafting, and compliance skills to guide aspirants into top law colleges.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shreya",
    specialtyIcon: Scale,
  }
];
