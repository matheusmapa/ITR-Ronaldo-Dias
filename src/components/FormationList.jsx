import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { MagneticButton } from './Common';

export default function FormationList() {
    return (
        <section className="py-12 md:py-16 px-6 bg-[#030308] border-t border-slate-900">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Tudo que você precisa para <span className="text-teal-400">destravar</span>
                    </h2>
                    <p className="text-[#E2E2E2] text-lg mb-8 leading-relaxed">
                        O Método ITR não é apenas um punhado de aulas gravadas. É uma experiência imersiva com começo, meio e fluência.
                    </p>
                    <MagneticButton onClick={() => document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' })}>
                        QUERO ACESSAR AGORA
                    </MagneticButton>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="space-y-4">
                        {[
                            "Módulos direcionados para o seu nível",
                            "Acesso imediato ao curso completo",
                            "Aulas curtas e práticas",
                            "Material de apoio exclusivo",
                            "Suporte direto com o criador do método",
                            "Diversos Bônus de aceleração"
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center p-4 bg-slate-900/50 rounded-xl border border-slate-800/80 hover:border-teal-500/50 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center mr-4 shrink-0">
                                    <CheckCircle className="w-4 h-4 text-teal-400" />
                                </div>
                                <span className="text-slate-200 font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
