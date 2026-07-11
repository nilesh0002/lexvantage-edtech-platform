import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      className={`${outfit.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-brand-navy-950 text-slate-100 selection:bg-brand-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
