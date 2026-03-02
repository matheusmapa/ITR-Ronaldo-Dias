import React from 'react';
import { TiltCard } from './Common';

export default function Modulos() {
    const modulos = [
        { num: "0", title: "Comece por aqui", desc: "Apresentação detalhada da metodologia." },
        { num: "1", title: "A Base do Método", desc: "Técnicas iniciais para preparar sua mente." },
        { num: "2", title: "Inglês Zero e Básico", desc: "Direcionamento p/ quem está começando do zero." },
        { num: "3", title: "Inglês Intermediário", desc: "Focado em quem entende algo, mas trava ao evoluir." },
        { num: "4", title: "Inglês Avançado", desc: "Destrave dificuldades em níveis profundos." },
        { num: "5", title: "O Próximo Nível", desc: "Kit prático para manter sua evolução eterna." }
    ];

    return (
        <section className="py-32 px-6 bg-[#030308] border-t border-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-white">
                    Estrutura <span className="text-teal-400 font-black">Completa</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modulos.map((mod, i) => (
                        <TiltCard key={i} className="bg-slate-900/40 p-8 border-slate-800/80 hover:border-teal-500/30 group">
                            <span className="text-teal-400/20 text-6xl font-black absolute top-4 right-4 pointer-events-none group-hover:text-teal-400/40 transition-colors">{mod.num}</span>
                            <h3 className="text-xl font-bold text-white mb-3 mt-4 relative z-10">
                                Módulo {mod.num} <br />
                                <span className="text-teal-400">{mod.title}</span>
                            </h3>
                            <p className="text-slate-400 font-light relative z-10">{mod.desc}</p>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
