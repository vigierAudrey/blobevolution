import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter, Geist, Geist_Mono } from "next/font/google";



// Fontes personnalisées
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Blobinfini",
  description: "Plateforme de mise en relation pour surf et kitesurf",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
  <html lang="fr">
    <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </AuthProvider>
    </body>
  </html>
);
}
