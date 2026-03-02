import React from 'react';
import { Shield, Award } from 'lucide-react';
import { TiltCard, MagneticButton } from './Common';

export default function Oferta() {
    return (
        <section id="oferta" className="py-32 px-6 bg-[#030308] flex justify-center items-center">
            <div className="w-full max-w-4xl">
                <TiltCard className="bg-gradient-to-b from-slate-900 to-[#0A0D14] border-t-4 border-t-emerald-500 border-x-slate-800 border-b-slate-800 overflow-hidden relative">

                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTYsMTg1LDEyOSwwLjA1KSIvPjwvc3ZnPg==')] opacity-40"></div>

                    <div className="p-10 md:p-16 text-center relative z-10 flex flex-col items-center">
                        <p className="text-base md:text-lg text-emerald-400/90 mb-6 max-w-2xl mx-auto leading-relaxed font-medium italic border-l-2 border-r-2 border-emerald-500/30 px-6">
                            "Você não precisa de mais anos pagando mensalidades para aprender gramática na teoria. Você precisa da ordem certa para construir a sua fluência."
                        </p>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">A hora de agir é <span className="text-emerald-400">agora</span></h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-xl">
                            Tenha acesso imediato a todo o método ITR, todos os módulos e todos os bônus exclusivos.
                        </p>

                        <div className="mb-10 flex flex-col items-center">
                            <span className="text-slate-500 font-medium line-through mb-2 text-xl">De R$ 399,00</span>
                            <div className="flex items-start justify-center gap-3">
                                <span className="text-2xl font-bold text-slate-400 mt-2">por</span>
                                <span className="text-7xl md:text-8xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">R$ 200</span>
                            </div>
                            <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full font-medium text-sm mt-6 border border-emerald-500/20">Acesso Vitalício</span>
                        </div>

                        <MagneticButton className="w-full md:w-auto shadow-2xl shadow-emerald-500/50">
                            GARANTIR MINHA VAGA AGORA
                        </MagneticButton>

                        <div className="flex gap-6 mt-8 opacity-60">
                            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium"><Shield className="w-4 h-4 text-emerald-400" /> Compra Segura</div>
                            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium"><Award className="w-4 h-4 text-emerald-400" /> 7 Dias de Garantia</div>
                        </div>
                    </div>
                </TiltCard>
            </div>
        </section>
    );
}
