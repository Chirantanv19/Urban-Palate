import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default async function MenuManagementPage() {
  const { data: items } = await supabase
    .from("menu_items")
    .select(`*, categories(name)`)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-6 lg:px-12 text-dark">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-display font-bold">Menu Management</h1>
            <p className="text-charcoal/60">Update your dishes, prices, and availability</p>
          </div>
          <Link href="/admin/menu/new" className="btn-primary flex items-center gap-2">
            <Plus size={20} /> Add New Dish
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-charcoal/5 group">
              <div className="relative h-48">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 flex gap-2">
                   <button className="p-2 bg-white/90 backdrop-blur rounded-full text-charcoal hover:text-primary-600 transition-colors">
                      <Edit size={16} />
                   </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600">
                       {(item as any).categories?.name}
                    </span>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                  </div>
                  <span className="font-display font-bold text-primary-600">${item.price}</span>
                </div>
                
                <p className="text-sm text-charcoal/60 line-clamp-2 mb-6">{item.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-charcoal/5">
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${item.is_available ? 'text-green-600' : 'text-red-500'}`}>
                    {item.is_available ? <Eye size={14} /> : <EyeOff size={14} />}
                    {item.is_available ? 'Live on Menu' : 'Hidden'}
                  </span>
                  <button className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}