import { supabase } from "./supabase";

export async function seedDatabase() {
  // 1. Clear existing items to avoid duplicates
  await supabase.from('menu_items').delete().neq('id', '00000000-00-00-00-00-000000000000');

  // 2. Insert some mouth-watering food
  const { data: categories } = await supabase.from('categories').select('*');
  
  const appetizersId = categories?.find(c => c.slug === 'appetizers')?.id;
  const mainsId = categories?.find(c => c.slug === 'mains')?.id;

  await supabase.from('menu_items').insert([
    {
      name: "Truffle Burrata",
      description: "Creamy burrata, heirloom tomatoes, fresh truffle shavings.",
      price: 22.00,
      category_id: appetizersId,
      image_url: "https://images.unsplash.com/photo-1541529086526-db283c563270",
      is_popular: true
    },
    {
      name: "A5 Wagyu Steak",
      description: "Japanese wagyu, smoked salt, roasted bone marrow.",
      price: 85.00,
      category_id: mainsId,
      image_url: "https://images.unsplash.com/photo-1546241072-48010ad28c2c",
      is_popular: true
    }
  ]);

  console.log("Database Seeded! 🍽️");
}