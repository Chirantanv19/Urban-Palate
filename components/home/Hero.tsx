"use client";
import { motion } from "framer-motion";
import Button from "../shared/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-primary-500 font-medium tracking-[0.4em] uppercase mb-6 block text-sm md:text-base">
            Est. 2010 • Michelin Starred
          </span>
          <h1 className="text-6xl md:text-9xl font-display text-white mb-8 leading-[0.9]">
            The Art of <br /> 
            <span className="italic text-primary-100 font-light">Fine Dining</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Experience a symphony of flavors crafted with passion, precision, and the finest seasonal ingredients.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link href="/reservations">
            <Button variant="primary" className="w-full sm:w-auto">Reserve a Table</Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" className="w-full sm:w-auto backdrop-blur-sm">View Our Menu</Button>
          </Link>
        </motion.div>
      </div>

      {/* Animated Scroll Line */}
      <motion.div 
        animate={{ height: [0, 80, 0], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-primary-500 z-20"
      />
    </section>
  );
}