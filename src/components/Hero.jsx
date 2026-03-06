import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, CheckCircle } from 'lucide-react';
import { MagneticButton } from './Common';
import HeroVisuals from './HeroVisuals';

export default function Hero() {
    return (
        <section className="relative min-h-screen lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#050510] pt-20 pb-24 md:pb-32">
            {/* Background Gradients (Apple Style) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 blur-3xl rounded-full pointer-events-none"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUscDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

            <div className="relative z-10 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                {/* Left Column: Copy & CTA */}
                <div className="text-left flex flex-col items-start pt-8 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3 backdrop-blur-md"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>ITR | Inglês em Tempo Recorde</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-4 tracking-tight"
                    >
                        O Fim da <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 text-glow">
                            Tradução Mental
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-emerald-400 mb-3 max-w-xl leading-relaxed font-bold uppercase tracking-widest"
                    >
                        Destrave sua Fluência e Fale Inglês com Naturalidade.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-sm md:text-base text-[#E2E2E2] mb-10 max-w-xl leading-relaxed font-light"
                    >
                        Descubra o método exato de memorização que desbloqueia a sua mente para aprender dezenas de palavras por dia, eliminando os "brancos" na hora de conversar — mesmo que você já tenha tentado de tudo.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col items-start gap-5 w-full md:w-auto"
                    >
                        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                            <MagneticButton className="w-full md:w-auto text-center" onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}>
                                QUERO ACELERAR MEU INGLÊS AGORA
                            </MagneticButton>
                            <p className="text-[10px] text-[#CCCCCC] font-medium tracking-widest w-full text-center uppercase">
                                Acesso Imediato • 7 Dias de Garantia
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/50 w-full md:w-auto justify-center md:justify-start">
                            <div className="flex -space-x-3">
                                <img src="https://i.pravatar.cc/100?img=1" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                                <img src="https://i.pravatar.cc/100?img=2" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                                <img src="https://i.pravatar.cc/100?img=3" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex text-yellow-500 gap-0.5">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                                <span className="text-[10px] text-[#E2E2E2] font-bold tracking-tight whitespace-nowrap">+1.200 alunos satisfeitos</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Floating Visuals (Visível apenas em desktop) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="hidden lg:flex items-center justify-center"
                >
                    <HeroVisuals />
                </motion.div>

            </div>
        </section>
    );
}
