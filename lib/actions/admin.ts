"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateReservationStatus(id: string, status: 'confirmed' | 'cancelled') {
    const { error } = await supabase
        .from("reservations")
        .update({ status })
        .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admin");
}

export async function deleteReservation(id: string) {
    const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admin");
}