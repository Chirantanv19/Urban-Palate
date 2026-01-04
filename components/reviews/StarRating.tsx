"use client";
import { Star } from "lucide-react";

export default function StarRating({ 
  rating, 
  setRating, 
  interactive = false 
}: { 
  rating: number; 
  setRating?: (n: number) => void; 
  interactive?: boolean 
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          onClick={() => interactive && setRating?.(star)}
          className={`${
            star <= rating ? "fill-primary-500 text-primary-500" : "text-white/20"
          } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
        />
      ))}
    </div>
  );
}