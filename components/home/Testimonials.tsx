"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";

export default function Testimonials({ reviews }: { reviews: any[] }) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

    return (
        <section className="py-24 bg-dark relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container flex">
                        {reviews.map((rev) => (
                            <div key={rev.id} className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%] px-4">
                                <div className="bg-white/5 p-12 rounded-[3rem] h-full relative">
                                    <Quote className="absolute top-8 right-8 text-primary-500/20" size={60} />
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={i < rev.rating ? "fill-primary-500 text-primary-500" : "text-white/10"} />
                                        ))}
                                    </div>
                                    <p className="text-xl text-white/80 font-display italic mb-8">"{rev.comment}"</p>
                                    <p className="text-primary-500 font-bold tracking-widest uppercase text-xs">{rev.customer_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}