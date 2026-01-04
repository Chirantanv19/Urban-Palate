import { supabase } from "@/lib/supabase";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import MenuGrid from "@/components/menu/MenuGrid";
import ReviewForm from "@/components/reviews/ReviewForm";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  // Fetch data on the server for speed
  const { data: popularDishes } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_popular", true)
    .limit(3);

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .limit(6);

  return (
    <div className="bg-dark min-h-screen">
      <Hero />

      {/* Featured Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-primary-500 font-medium tracking-widest uppercase mb-4 italic">Chef's Selection</h2>
            <h1 className="text-4xl md:text-6xl font-display">Popular Dishes</h1>
          </div>
          <Link href="/menu">
            <Button variant="outline" className="flex items-center gap-2 group">
              View All Menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {popularDishes && <MenuGrid items={popularDishes} />}
      </section>

      {reviews && reviews.length > 0 && <Testimonials reviews={reviews} />}

      <section className="py-24 bg-[#121110] px-6">
        <div className="max-w-3xl mx-auto">
          <ReviewForm />
        </div>
      </section>
    </div>
  );
}