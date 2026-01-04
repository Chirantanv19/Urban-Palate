"use client";
import { useState } from "react";
import { submitReview } from "@/lib/actions/reviews";
import { toast } from "sonner";
import StarRating from "./StarRating";
import Button from "../shared/Button";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      customer_name: formData.get("name") as string,
      rating,
      comment: formData.get("comment") as string,
    };

    try {
      await submitReview(data);
      toast.success("Thank you! Your review has been sent for approval.");
      (e.target as HTMLFormElement).reset();
      setRating(5);
    } catch (err) {
      toast.error("Failed to submit review.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-charcoal p-8 rounded-3xl border border-white/5 max-w-xl mx-auto">
      <h3 className="text-2xl font-display mb-6">Share Your Experience</h3>
      
      <div className="mb-6">
        <label className="block text-sm text-primary-100 mb-2">Your Rating</label>
        <StarRating rating={rating} setRating={setRating} interactive />
      </div>

      <div className="space-y-4">
        <input 
          name="name" 
          placeholder="Your Name" 
          required 
          className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-500"
        />
        <textarea 
          name="comment" 
          placeholder="How was the food and service?" 
          rows={4} 
          required 
          className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-500"
        />
        <Button disabled={isPending} className="w-full">
          {isPending ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}