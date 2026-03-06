import React from 'react';
import { TiltCard } from './Common';

export default function ProvasSociais() {
    return (
        <section className="py-12 md:py-16 px-6 bg-[#050510] relative overflow-hidden border-t border-slate-900">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        O que dizem os <span className="text-emerald-400">Grandes Nomes</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bill Gates */}
                    <TiltCard className="p-8 bg-slate-900/60 border-slate-800 relative group">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-4xl text-emerald-400 font-serif leading-none mt-2">"</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <p className="text-lg text-slate-300 italic leading-relaxed mb-8 relative z-10">
                                "Em um mundo que está cada vez mais conectado, quem domina o inglês sai na frente."
                            </p>
                            <div>
                                <h4 className="text-white font-bold text-lg">Bill Gates</h4>
                                <p className="text-emerald-400 text-sm">Fundador da Microsoft</p>
                            </div>
                        </div>
                    </TiltCard>

                    {/* Warren Buffett */}
                    <TiltCard className="p-8 bg-slate-900/60 border-slate-800 relative group">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-4xl text-emerald-400 font-serif leading-none mt-2">"</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <p className="text-lg text-slate-300 italic leading-relaxed mb-8 relative z-10">
                                "O melhor investimento que você pode fazer é em si mesmo. Quanto mais você aprende, mais você ganha."
                            </p>
                            <div>
                                <h4 className="text-white font-bold text-lg">Warren Buffett</h4>
                                <p className="text-emerald-400 text-sm text-balance">Considerado o mais bem sucedido investidor do século XX</p>
                            </div>
                        </div>
                    </TiltCard>

                    {/* Gustavo Kuerten */}
                    <TiltCard className="p-8 bg-slate-900/60 border-slate-800 relative group">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-4xl text-emerald-400 font-serif leading-none mt-2">"</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <p className="text-lg text-slate-300 italic leading-relaxed mb-8 relative z-10">
                                "O inglês abriu portas na minha carreira internacional. Se eu não falasse, ia perder metade das oportunidades."
                            </p>
                            <div>
                                <h4 className="text-white font-bold text-lg">Gustavo Kuerten</h4>
                                <p className="text-emerald-400 text-sm">Maior tenista do Brasil</p>
                            </div>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}
