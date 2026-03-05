import React from "react";
import DisplayCards from "./ui/display-cards";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsWhatsApp() {
    const feedbackCards = [
        {
            icon: <MessageCircle className="size-4 text-emerald-300" />,
            title: "Marcos Lima",
            description: "\"Cara, o ITR foi um divisor de águas! Em 2 meses eu aprendi mais inglês do que em 3 anos de Wiz**. Tô conseguindo formar frases com naturalidade já!\"",
            date: "Ontem às 19:43",
            iconClassName: "text-[#25D366]",
            titleClassName: "text-slate-100",
            className:
                "[grid-area:stack] transition-all duration-300 ease-out -translate-x-4 -translate-y-4 md:-translate-x-8 md:-translate-y-8 opacity-70 hover:!opacity-100 hover:!z-50 z-10 hover:duration-150 shadow-lg",
        },
        {
            icon: <MessageCircle className="size-4 text-emerald-300" />,
            title: "Carla Souza",
            description: "\"Ronaldo, não sei como te agradecer! O método destravou a minha fala, foi o diferencial na minha última entrevista em inglês e passei na vaga!!!\"",
            date: "Hoje às 10:12",
            iconClassName: "text-[#25D366]",
            titleClassName: "text-slate-100",
            className:
                "[grid-area:stack] transition-all duration-300 ease-out translate-x-0 translate-y-0 opacity-80 hover:!opacity-100 hover:!z-50 z-20 hover:duration-150 shadow-xl",
        },
        {
            icon: <MessageCircle className="size-4 text-emerald-300" />,
            title: "Felipe Andrade",
            description: "\"O curso é um absurdo! Achei que eu não aprendia inglês porque eu era ruim ou velho, mas era a didática dos cursinhos. Tô aprendendo rápido demais! 😎\"",
            date: "Hoje às 14:30",
            iconClassName: "text-[#25D366]",
            titleClassName: "text-slate-100",
            className:
                "[grid-area:stack] transition-all duration-300 ease-out translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 opacity-100 hover:!z-50 z-30 shadow-2xl",
        },
    ];

    return (
        <div className="relative w-full flex justify-center perspective-[1200px] pointer-events-auto h-[200px] mt-10">
            <div className="relative scale-[0.8] md:scale-[1] transition-opacity duration-300 origin-center group">
                {/* Ping indicador de notificação para chamar clique/hover */}
                <div className="absolute -top-1 md:-top-4 -right-1 md:-right-4 z-50 flex h-6 w-6 pointer-events-none group-hover:opacity-0 transition-opacity">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-2 border-emerald-900 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                </div>

                <div className="absolute inset-0 -inset-x-8 -inset-y-8 z-[-1]" /> {/* hitbox invisível estável */}
                <DisplayCards cards={feedbackCards} />
            </div>
        </div>
    );
}
