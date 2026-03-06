import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { MagneticButton } from './Common';

export default function QuebraDeCrenca() {
    return (
        <section className="relative pt-6 pb-10 md:pt-10 md:pb-12 px-6 bg-[#030308] overflow-hidden">

            {/* ── Glows ──────────────────────────────────────── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-900/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">

                {/* ── Ícone de virada com float animation ──────── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-pointer transition-shadow hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]"
                    >
                        <Lightbulb className="w-6 h-6 text-emerald-400" />
                    </motion.div>
                </motion.div>

                {/* ── Headline ────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-6">
                        A fluência não começa <br className="hidden md:block" />
                        na gramática.
                    </h2>
                    <p className="text-xl md:text-2xl text-emerald-400 font-bold leading-snug">
                        Ela começa na ativação inteligente<br className="hidden md:block" /> do seu vocabulário.
                    </p>
                </motion.div>

                {/* ── Bloco central com dado de impacto ───────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#0a0e18]/80 backdrop-blur-md border border-white/[0.06] rounded-[2rem] p-8 md:p-10 relative overflow-hidden mb-10 hover:border-emerald-500/15 transition-colors duration-500"
                >
                    {/* Linha superior decorativa */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        {/* Número de impacto com animação de contagem */}
                        <motion.div
                            className="shrink-0 text-center md:text-left"
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 150 }}
                        >
                            <motion.span
                                whileHover={{ scale: 1.1 }}
                                className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-teal-500 leading-none inline-block cursor-default"
                            >
                                80%
                            </motion.span>
                            <p className="text-[#CCCCCC] text-xs font-bold uppercase tracking-widest mt-2">das conversas</p>
                        </motion.div>

                        {/* Texto explicativo */}
                        <div className="space-y-3">
                            <p className="text-slate-300 text-lg leading-relaxed font-light">
                                Cerca de <strong className="text-white font-semibold">80% das conversas do dia a dia</strong> em inglês são sustentadas por um grupo relativamente pequeno de palavras.
                            </p>
                            <p className="text-[#E2E2E2] text-lg leading-relaxed font-light">
                                O problema é que ninguém te ensinou a dominar <span className="text-white font-medium">primeiro o que realmente importa.</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ── Punchline final ─────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mb-16"
                >
                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-2">
                        O <strong className="text-white font-black">Método ITR</strong> <span className="text-emerald-400 font-bold">(Inglês em Tempo Recorde)</span>
                    </p>
                    <p className="text-lg md:text-xl text-[#E2E2E2] font-light">
                        foi criado exatamente para <span className="text-white font-semibold">inverter essa lógica ultrapassada.</span>
                    </p>
                </motion.div>

                {/* ── Transição visual e CTA ───────── */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-6 mt-8"
                >
                    <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

                    <MagneticButton onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}>
                        <span className="hidden sm:inline">QUERO ACELERAR MEU INGLÊS AGORA</span>
                        <span className="sm:hidden">ACELERAR MEU INGLÊS</span>
                    </MagneticButton>
                </motion.div>

            </div>
        </section>
    );
}
