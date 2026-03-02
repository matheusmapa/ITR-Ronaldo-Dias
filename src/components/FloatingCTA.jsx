import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 800) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:hidden pointer-events-none"
                >
                    <button
                        onClick={() => document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' })}
                        className="pointer-events-auto w-full max-w-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-lg py-4 rounded-full shadow-[0_10px_40px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 border border-emerald-400/50 active:scale-95 transition-transform"
                    >
                        <span>QUERO ACELERAR MEU INGLÊS AGORA</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
