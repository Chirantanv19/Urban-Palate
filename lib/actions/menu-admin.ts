"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addMenuItem(formData: any) {
  const { error } = await supabase
    .from("menu_items")
    .insert([{
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category_id: formData.category_id,
      image_url: formData.image_url,
      is_available: true,
      is_popular: formData.is_popular || false,
    }]);

  if (error) throw new Error(error.message);
  
  revalidatePath("/admin/menu");
  revalidatePath("/menu"); // Update the public menu too
  return { success: true };
}

export async function toggleAvailability(id: string, currentStatus: boolean) {
  const { error } = await supabase
    .from("menu_items")
    .update({ is_available: !currentStatus })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/menu");
}