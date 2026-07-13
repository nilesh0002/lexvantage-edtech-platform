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
  title: "Shreya's Law Desk | Law Entrance & 5-Year Law College Companion",
  description: "Prepare for CLAT, AILET, & Law Entrances under Adv. Shreya Nadar's mentorship, and access curated study guides, course articles, and semester notes throughout your entire 5 years of law school (LL.B / B.A. LL.B).",
  keywords: "CLAT coaching, law school companion, NLU prep, LL.B notes, B.A. LL.B semester guides, law college articles, AILET prep, Shreya's Law Desk",
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
