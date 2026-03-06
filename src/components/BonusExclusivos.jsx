import React from 'react';
import { motion } from 'framer-motion';
import { Bot, BookOpen, Users, Gift } from 'lucide-react';

const bonus = [
    {
        icon: <Bot className="w-6 h-6" />,
        title: "Treinador com IA",
        desc: "Pratique conversação 24h por dia com uma IA configurada para simular diálogos reais e corrigir erros — sem julgamentos.",
        gradient: "from-violet-400 to-purple-500",
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        hoverBorder: "hover:border-violet-500/40",
        hoverShadow: "hover:shadow-[0_0_35px_rgba(139,92,246,0.08)]",
    },
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Dicionário Estratégico",
        desc: "A lista organizada e mastigada das palavras mais importantes para a sua comunicação prática no dia a dia.",
        gradient: "from-emerald-400 to-teal-500",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        hoverBorder: "hover:border-emerald-500/40",
        hoverShadow: "hover:shadow-[0_0_35px_rgba(16,185,129,0.08)]",
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Comunidade VIP + Plano",
        desc: "Saiba exatamente o que fazer, em qual ordem, e troque experiências com pessoas no mesmo objetivo.",
        gradient: "from-cyan-400 to-blue-500",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        hoverBorder: "hover:border-cyan-500/40",
        hoverShadow: "hover:shadow-[0_0_35px_rgba(6,182,212,0.08)]",
    }
];

export default function BonusExclusivos() {
    return (
        <section className="relative py-16 md:py-24 px-6 bg-[#030308] overflow-hidden min-h-[700px] sm:min-h-[500px]">

            <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-violet-900/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6 cursor-default"
                    >
                        <Gift className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-[#E2E2E2] text-xs font-bold uppercase tracking-widest">Incluído na sua vaga</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
                        Bônus{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">exclusivos</span>
                    </h2>
                    <p className="text-[#E2E2E2] text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
                        Ao garantir sua vaga hoje, você recebe <strong className="text-white font-semibold">gratuitamente:</strong>
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-5">
                    {bonus.map((item, i) => (
                        <motion.div
                            key={i}
                            layout
                            initial={{ opacity: 0.1, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                            className={`relative group bg-[#080c15] border ${item.border} ${item.hoverBorder} ${item.hoverShadow} rounded-2xl p-7 md:p-8 transition-all duration-300 overflow-hidden cursor-default`}
                        >
                            {/* Top accent */}
                            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-70 transition-opacity duration-500`}></div>

                            {/* Icon */}
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-5`}
                            >
                                <span className={item.color}>{item.icon}</span>
                            </motion.div>

                            <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-[#E2E2E2] text-sm leading-relaxed font-light">{item.desc}</p>

                            {/* Bottom accent */}
                            <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
