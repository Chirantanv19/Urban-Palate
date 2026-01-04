"use client";
import { useState } from "react";
import MenuFilter from "./MenuFilter";
import MenuGrid from "./MenuGrid";
import { Category, MenuItem } from "@/types/database";

export default function MenuGridWrapper({
    categories,
    initialItems
}: {
    categories: Category[],
    initialItems: MenuItem[]
}) {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredItems = activeCategory === "all"
        ? initialItems
        : initialItems.filter(item => (item as any).categories?.slug === activeCategory);

    return (
        <>
            <MenuFilter
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <MenuGrid items={filteredItems} />
        </>
    );
}