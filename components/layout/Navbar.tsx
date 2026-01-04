"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Check if we are in admin mode to flip colors
    const isAdminPage = pathname.startsWith('/admin') || pathname === '/login';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Menu", href: "/menu" },
        { name: "Reservations", href: "/reservations" },
    ];

    // Dynamic colors based on page and scroll
    const textColor = isAdminPage ? "text-slate-900" : "text-white";
    const navBg = isAdminPage
        ? (isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200" : "bg-transparent")
        : (isScrolled ? "bg-dark/90 backdrop-blur-md border-b border-white/10" : "bg-transparent");

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${navBg} ${isScrolled ? "py-4" : "py-8"}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-primary-500">
                    <Utensils size={32} />
                    <span className={`font-display text-2xl font-bold tracking-tighter ${textColor}`}>URBAN  PALATA</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary-500 ${textColor}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/reservations" className="bg-primary-500 hover:bg-primary-600 text-white px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary-500/20">
                        Book Table
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className={textColor} onClick={() => setMobileMenuOpen(true)}>
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
                        className="fixed inset-0 bg-dark z-[110] flex flex-col p-10 text-white"
                    >
                        <button className="self-end mb-20" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
                        <div className="flex flex-col gap-8 text-4xl font-display italic">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.name}</Link>
                            ))}
                            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}