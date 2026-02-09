import React from 'react'
import { supabase } from "@/lib/supabase";
import StarRating from "@/components/reviews/StarRating";

const reviews = async () => {
    const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    return (

        <>
            <div className='px-10 my-5'>
                <div className="pt-40 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {reviews?.map((rev) => (
                        <div className=" h-70 w-110 flex flex-col mb-10 bg-charcoal/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-500">
                            <h3 className='text-x py-7 text-zinc-300  px-10 font-mono font-extralight'>"{rev.comment}"</h3>
                            <div className=''>
                                <h1 className='text-x px-10 py-2 font-bold text-white'>{rev.customer_name}</h1>
                                <div className="mb-6 px-10">
                                    <label className="block text-sm text-primary-100 mb-2"> </label>
                                    <StarRating rating={rev.rating} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default reviews