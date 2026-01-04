"use client";
import { Category } from "@/types/database";

interface FilterProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
}

export default function MenuFilter({ categories, activeCategory, setActiveCategory }: FilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <button
        onClick={() => setActiveCategory("all")}
        className={`px-6 py-2 rounded-full border transition-all ${
          activeCategory === "all" 
          ? "bg-primary-500 border-primary-500 text-white" 
          : "border-white/10 text-white/60 hover:border-primary-500/50"
        }`}
      >
        All Dishes
      </button>
      
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.slug)}
          className={`px-6 py-2 rounded-full border transition-all ${
            activeCategory === cat.slug 
            ? "bg-primary-500 border-primary-500 text-white" 
            : "border-white/10 text-white/60 hover:border-primary-500/50"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}