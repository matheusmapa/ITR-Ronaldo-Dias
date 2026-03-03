import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquareQuote } from 'lucide-react';

const depoimentos = [
    {
        text: "No começo achei estranho, mas depois de uns dias comecei a lembrar das palavras sem precisar traduzir. Ainda erro bastante, mas já consigo conversar bem melhor.",
        name: "Aluno ITR",
        detail: "Resultado em poucas semanas",
        initials: "A",
        color: "emerald"
    },
    {
        text: "Sinceramente, comprei sem muita expectativa porque já tinha tentado outras vezes e sempre travava. No começo achei estranho focar tanto em vocabulário, mas depois de alguns dias comecei a lembrar das palavras muito mais rápido. Excelente curso, me ajudou muito.",
        name: "Aluno ITR",
        detail: "De cético a fã do método",
        initials: "A",
        color: "teal"
    },
    {
        text: "O que mais mudou pra mim foi que eu parei de traduzir tudo. Antes eu montava frase em português e tentava converter. Agora já vem direto algumas palavras na cabeça. Não é automático 100% ainda, mas já é MUITO mais natural do que antes. Sou muito grata por ter encontrado um método que realmente funciona.",
        name: "Aluna ITR",
        detail: "Fim da tradução mental",
        initials: "A",
        color: "cyan"
    }
];

const colorMap = {
    emerald: { avatarBg: "bg-emerald-500/15", avatarBorder: "border-emerald-500/25", avatarText: "text-emerald-400", hoverBorder: "hover:border-emerald-500/25" },
    teal: { avatarBg: "bg-teal-500/15", avatarBorder: "border-teal-500/25", avatarText: "text-teal-400", hoverBorder: "hover:border-teal-500/25" },
    cyan: { avatarBg: "bg-cyan-500/15", avatarBorder: "border-cyan-500/25", avatarText: "text-cyan-400", hoverBorder: "hover:border-cyan-500/25" },
};

export default function Depoimentos() {
    return (
        <section className="relative py-16 md:py-24 px-6 bg-[#030308] overflow-hidden">

            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-900/5 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-teal-900/4 blur-3xl rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6 cursor-default"
                    >
                        <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Quem já testou</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
                        O que dizem os{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">alunos ITR</span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg font-light max-w-lg mx-auto">
                        Resultados reais de quem aplicou o método na prática.
                    </p>
                </motion.div>

                {/* Depoimentos grid */}
                <div className="grid md:grid-cols-3 gap-4">
                    {depoimentos.map((dep, i) => {
                        const c = colorMap[dep.color];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                                className={`bg-[#080c15] border border-white/[0.05] ${c.hoverBorder} rounded-2xl p-6 md:p-7 relative overflow-hidden group hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-default flex flex-col`}
                            >
                                {/* Top glow line */}
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                {/* Quote watermark */}
                                <motion.div
                                    className="absolute -top-2 -right-2"
                                    animate={{ rotate: [0, 3, -3, 0] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Quote className="w-20 h-20 text-white opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
                                </motion.div>

                                {/* Stars */}
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <motion.div
                                            key={j}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.2, delay: i * 0.1 + j * 0.05 }}
                                        >
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-slate-300 leading-relaxed font-light text-sm md:text-base mb-5 italic flex-1">
                                    "{dep.text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={`w-9 h-9 rounded-full ${c.avatarBg} border ${c.avatarBorder} flex items-center justify-center`}
                                    >
                                        <span className={`${c.avatarText} text-sm font-bold`}>{dep.initials}</span>
                                    </motion.div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">{dep.name}</p>
                                        <p className="text-slate-500 text-xs">{dep.detail}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
