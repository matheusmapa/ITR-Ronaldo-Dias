import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function HistoriaMetodo() {
    return (
        <section className="relative py-10 md:py-16 px-6 bg-[#030308] overflow-hidden">

            <div className="absolute top-1/3 left-0 w-[500px] h-[400px] bg-emerald-900/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">

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
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[#E2E2E2] text-xs font-bold uppercase tracking-widest">A origem de tudo</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                        A história por trás{' '}<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">do método</span>
                    </h2>
                </motion.div>

                {/* Story card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ scale: 1.005 }}
                    className="bg-[#080c15] border border-white/[0.05] rounded-[2rem] p-8 md:p-12 relative overflow-hidden hover:border-emerald-500/15 transition-all duration-500"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                    <div className="space-y-5 text-slate-300 text-base md:text-lg leading-relaxed">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                        >
                            Durante anos, eu tentei aprender inglês da forma tradicional. Passei por <strong className="text-white font-semibold">quatro escolas</strong>, fiz centenas de exercícios, segui os métodos prontos... e a sensação era sempre a mesma: <em className="text-slate-200">muito esforço, pouco resultado.</em>
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="text-[#E2E2E2]"
                        >
                            Era cansativo, desmotivador e parecia que eu nunca saía do lugar.
                        </motion.p>

                        {/* Quote destacado */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            whileHover={{ x: 4 }}
                            className="border-l-2 border-emerald-500/40 pl-6 py-2 my-8 cursor-default"
                        >
                            <p className="text-white text-lg md:text-xl font-medium italic leading-relaxed">
                                "Tudo mudou quando meu pai sugeriu que eu fizesse um curso de memorização. Foi ali que eu entendi algo fundamental: o problema nunca foi a minha capacidade. <span className="text-emerald-400 font-bold not-italic">Era o método.</span>"
                            </p>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.45 }}
                        >
                            Eu estava tentando aprender um idioma sem entender <strong className="text-white font-medium">como o cérebro realmente fixa informações</strong>. A partir desse momento, mergulhei no estudo da memorização aplicada a idiomas.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.55 }}
                        >
                            Absorvi <strong className="text-white font-semibold">centenas de palavras em tempo recorde</strong> — e, mais importante, mantive tudo na memória de longo prazo. Quando compartilhei essa estrutura com amigos e familiares, o padrão se repetiu: <span className="text-emerald-400 font-medium">menos frustração e evolução perceptível.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.65 }}
                            className="pt-6 mt-6 border-t border-white/5"
                        >
                            <p className="text-white text-xl md:text-2xl font-black tracking-tight">
                                Foi assim que nasceu o Método ITR.
                            </p>
                            <p className="text-[#CCCCCC] mt-2">
                                Não é um curso cheio de teoria inútil. É a organização que eu gostaria de ter encontrado anos atrás.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
