"use server";

import { supabase } from "@/lib/supabase";
import { MenuItem, Category } from "@/types/database";

// Fetch all categories for the filter tabs
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error("Failed to fetch categories");
  return data;
}

// Fetch menu items with optional category filtering
export async function getMenuItems(categorySlug?: string): Promise<MenuItem[]> {
  let query = supabase
    .from("menu_items")
    .select(`*, categories!inner(*)`)
    .eq("is_available", true);

  if (categorySlug && categorySlug !== "all") {
    query = query.eq("categories.slug", categorySlug);
  }

  const { data, error } = await query;

  if (error) throw new Error("Failed to fetch menu items");
  return data as unknown as MenuItem[];
}