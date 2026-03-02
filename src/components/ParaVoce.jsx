import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function ParaVoce() {
    const items = [
        { text: "Já fez curso de inglês e desistiu no meio do caminho", delay: 0 },
        { text: "Está fazendo inglês e quer acelerar brutalmente seus resultados", delay: 0.1 },
        { text: "Terminou um curso, mas sente que empacou na conversação", delay: 0.2 },
        { text: "Nunca aprendeu inglês até hoje por causa de métodos travados", delay: 0.3 },
        { text: "Quer atingir a fluência em tempo recorde de uma vez por todas", delay: 0.4 }
    ];

    return (
        <section className="py-24 px-6 bg-[#050510]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
                    Esse curso é <span className="text-emerald-400 font-black">para você</span>
                </h2>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.5 }}
                            className="group flex items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 transition-all cursor-default"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-6 shrink-0 group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                            </div>
                            <p className="text-slate-300 font-medium md:text-lg">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
