"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function submitReview(data: {
    customer_name: string;
    rating: number;
    comment: string;
}) {
    const { error } = await supabase
        .from("reviews")
        .insert([
            {
                customer_name: data.customer_name,
                rating: data.rating,
                comment: data.comment,
                is_published: false, // Managers must approve before it shows on Home Page
            },
        ]);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    return { success: true };
}