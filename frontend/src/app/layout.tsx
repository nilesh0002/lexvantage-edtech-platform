import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LexVantage | Premium Law Entrance Coaching Institute",
  description: "Your Gateway to India's Top NLUs. Premium, AI-powered preparation for CLAT, AILET, SLAT, and MH CET Law exams.",
  keywords: "CLAT coaching, law coaching, NLSIU, NALSAR, NLU prep, AILET prep, SLAT, MHCET Law",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-brand-navy-950 text-slate-100 selection:bg-brand-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
