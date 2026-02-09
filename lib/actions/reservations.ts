"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createReservation(formData: any) {
    console.log("--- Server Action Triggered ---", formData);

    const { data, error } = await supabase
        .from("reservations")
        .insert([
            {
                customer_name: formData.name,
                email: formData.email,
                phone: formData.phone || "0000000000", // Fallback if phone isn't in schema
                reservation_date: formData.date,
                special_requests: formData.special_requests,
                reservation_time: "19:00", // Hardcoded for testing
                guests: Number(formData.guests),
                status: "pending",
            },
        ]);

    if (error) {
        console.error("Supabase Error:", error.message);
        return { success: false, message: error.message };
    }

    revalidatePath("/admin");
    return { success: true };
}