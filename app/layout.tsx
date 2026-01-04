import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: 'swap'
});

export const metadata: Metadata = {
  title: "LUMIÈRE | Fine Dining & Modern Gastronomy",
  description: "Experience the art of modern flavors at Lumière. Award-winning dishes and an unforgettable ambiance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-body bg-dark text-white antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}