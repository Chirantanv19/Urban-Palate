"use client";
import { MenuItem } from "@/types/database";
import { motion } from "framer-motion";
import Image from "next/image";
import { Flame, Leaf } from "lucide-react";

export default function MenuGrid({ items }: { items: MenuItem[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-charcoal/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-500"
                >
                    <div className="relative h-72 overflow-hidden">
                        <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {item.is_popular && (
                            <span className="absolute top-6 left-6 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">
                                Best Seller
                            </span>
                        )}
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary-500 transition-colors">
                                {item.name}
                            </h3>
                            <span className="text-xl font-display font-bold text-primary-500">${item.price}</span>
                        </div>

                        <p className="text-white/50 text-sm leading-relaxed mb-6 italic">
                            {item.description}
                        </p>

                        <div className="flex gap-3">
                            {item.is_vegetarian && (
                                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-md">
                                    <Leaf size={12} /> Veg
                                </div>
                            )}
                            {item.is_spicy && (
                                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-md">
                                    <Flame size={12} /> Spicy
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}