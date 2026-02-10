"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createReservation } from "@/lib/actions/reservations";
import Button from "@/components/shared/Button";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Select a date"),
  reservation_time: z.string().min(1, "Select a time"),
  guests: z.coerce.number().min(1, "At least 1 guest required"),
  special_requests: z.string()
});

export default function BookingForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Confirming your table...");
    try {
      const res = await createReservation(data);
      if (res.success) {
        toast.success("Reservation Secured. We look forward to serving you.", { id: toastId });
      } else {
        toast.error("Booking failed. Please call us directly.", { id: toastId });
      }
    } catch (e) {
      toast.error("Connection error.", { id: toastId });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8"
      >
        <div className="text-center mb-10">
          <h3 className="font-display text-3xl text-white mb-2">Reserve a Table</h3>
          <p className="text-primary-500/60 text-xs uppercase tracking-[0.2em] font-bold">Secure your culinary journey</p>
        </div>

        <div className="space-y-6">
          {/* Name Field */}
          <div className="group">
            <label className="text-[10px] uppercase tracking-widest text-primary-500 font-black mb-2 block ml-1">Full Name</label>
            <input
              {...register("name")}
              placeholder="e.g. Alexander Pierce"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
            />
            {errors.name && <p className="text-accent-500 text-[10px] mt-2 ml-2 uppercase font-bold">{errors.name.message as string}</p>}
          </div>
          {/* Email Field */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-primary-500 font-black mb-2 block ml-1">Email</label>
            <input
              {...register("email")}
              placeholder="concierge@lumiere.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
            />
            {errors.email && <p className="text-accent-500 text-[10px] mt-2 ml-2 uppercase font-bold">{errors.email.message as string}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Field */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-primary-500 font-black mb-2 block ml-1">Time</label>
              <input
                type="time"
                {...register("reservation_time")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all [color-scheme:dark]"
              />
            </div>
            {/* Date Field */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-primary-500 font-black mb-2 block ml-1">Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Guests Field */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-primary-500 font-black mb-2 block ml-1">Number of Guests</label>
            <div className="relative">
              <input
                type="number"
                {...register("guests")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
          {/* massage fild */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-primary-500 font-black mb-2 block ml-1">Special Requests</label>
            <div className="relative">
              <textarea
                placeholder="Any special requests or dietary restrictions?"
                rows={4}
                {...register("special_requests")}
                className="w-full bg-white/5 border placeholder:text-white/20 border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 text-sm uppercase tracking-[0.2em] font-black mt-4"
        >
          {isSubmitting ? "Processing Request..." : "Confirm Reservation"}
        </Button>

        <p className="text-center text-[10px] text-white/30 italic">
          * For parties larger than 8, please contact our concierge team directly.
        </p>
      </form>
    </motion.div>
  );
}