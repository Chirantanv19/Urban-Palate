"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

// We combine standard button props with Framer Motion props
interface ButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
}

export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {

    const baseStyles = "px-8 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20",
        secondary: "bg-accent-500 hover:bg-accent-600 text-white",
        outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props} // This now passes both React and Motion props safely
        >
            {children}
        </motion.button>
    );
}