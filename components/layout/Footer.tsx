import { Utensils, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-primary-500">
            <Utensils size={24} />
            <span className="font-display text-xl font-bold text-white">LUMIÈRE</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            Crafting unforgettable culinary moments since 2010. Experience the intersection of art and flavor.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li><a href="/menu" className="hover:text-primary-500 transition-colors">The Menu</a></li>
            <li><a href="/reservations" className="hover:text-primary-500 transition-colors">Reservations</a></li>
            <li><a href="/gallery" className="hover:text-primary-500 transition-colors">Gallery</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li>123 Gastronomy Lane, NY</li>
            <li>+1 (555) 000-1234</li>
            <li>hello@lumiere.com</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Hours</h4>
          <ul className="space-y-2 text-white/50 text-sm">
            <li>Mon - Thu: 5pm - 10pm</li>
            <li>Fri - Sat: 5pm - 11pm</li>
            <li>Sunday: 4pm - 9pm</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-center text-white/30 text-xs">
        © 2026 Lumière Restaurant. All rights reserved.
      </div>
    </footer>
  );
}