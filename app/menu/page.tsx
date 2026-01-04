import { supabase } from "@/lib/supabase";
import MenuGridWrapper from "@/components/menu/MenuGridWrapper";

export default async function MenuPage() {
  // Parallel data fetching
  const [categoriesRes, itemsRes] = await Promise.all([
    supabase.from("categories").select("*").order("display_order"),
    supabase.from("menu_items").select(`*, categories!inner(*)`).eq("is_available", true)
  ]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-primary-500 font-medium tracking-widest uppercase mb-4">Exquisite Flavors</h2>
        <h1 className="text-5xl md:text-7xl font-display italic">The Menu</h1>
      </div>

      <MenuGridWrapper
        categories={categoriesRes.data || []}
        initialItems={itemsRes.data as any || []}
      />
    </div>
  );
}