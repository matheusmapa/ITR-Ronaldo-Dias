import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Play, Pause, VolumeX, Volume2, Maximize2 } from 'lucide-react';
import ReactPlayer from 'react-player';
import { MagneticButton } from './Common';
import { TravelGlobe } from './ui/travel-globe';

export default function HeroPlus() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const playerRef = useRef(null);

    const handleInteract = () => {
        setIsMuted(false);
        setHasInteracted(true);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleFullscreen = () => {
        const rect = document.getElementById('hero-video-container');
        if (rect) {
            if (rect.requestFullscreen) {
                rect.requestFullscreen();
            } else if (rect.webkitRequestFullscreen) {
                rect.webkitRequestFullscreen();
            } else if (rect.msRequestFullscreen) {
                rect.msRequestFullscreen();
            }
        }
    };

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
                        className="text-sm md:text-base text-[#E2E2E2] mb-6 max-w-xl leading-relaxed font-light"
                    >
                        Descubra o método exato de memorização que desbloqueia a sua mente para aprender dezenas de palavras por dia, eliminando os "brancos" na hora de conversar — mesmo que você já tenha tentado de tudo.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col items-start gap-6 w-full md:w-auto"
                    >
                        {/* Custom Video Player Area */}
                        <div id="hero-video-container" className="w-full max-w-xl aspect-video relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20 border border-slate-800/50 bg-black group z-20">

                            {/* Player Wrapper to scale up and hide YT UI */}
                            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'scale(1.3)' }}>
                                <ReactPlayer
                                    ref={playerRef}
                                    url="https://www.youtube.com/watch?v=b0l5aMp5fHc"
                                    width="100%"
                                    height="100%"
                                    playing={isPlaying}
                                    muted={isMuted}
                                    controls={false}
                                    playsinline={true}
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                autoplay: 1,
                                                mute: 1,
                                                modestbranding: 1,
                                                showinfo: 0,
                                                rel: 0,
                                                controls: 0,
                                                disablekb: 1,
                                                fs: 0,
                                                playsinline: 1
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Transparent overlay to catch clicks when active so YouTube doesn't pause/play unexpectedly */}
                            <div
                                className={`absolute inset-0 z-10 ${hasInteracted ? 'cursor-pointer' : 'pointer-events-none'}`}
                                onClick={() => hasInteracted && togglePlay()}
                            />

                            {/* Initial Sound overlay (Click to listen) */}
                            <AnimatePresence>
                                {!hasInteracted && (
                                    <motion.div
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors flex items-center justify-center cursor-pointer z-30"
                                        onClick={handleInteract}
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse">
                                                <VolumeX className="w-8 h-8 ml-1" />
                                            </div>
                                            <span className="text-white font-bold tracking-wide shadow-black drop-shadow-md">
                                                Toque para ouvir
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Custom Controls when interacting */}
                            <AnimatePresence>
                                {hasInteracted && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black/90 to-transparent z-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2"
                                    >
                                        {/* Progress Bar placeholder - Native iframe can't easily sync state, so we remove the scrubber to prevent timeline desync. */}

                                        {/* Controls Row */}
                                        <div className="flex items-center justify-between mt-1">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                                    className="text-white hover:text-emerald-400 transition-colors"
                                                >
                                                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                                                </button>

                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                                                    className="text-white hover:text-emerald-400 transition-colors"
                                                >
                                                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                                </button>
                                            </div>

                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
                                                className="text-white hover:text-emerald-400 transition-colors"
                                            >
                                                <Maximize2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-3 w-full">
                            <MagneticButton className="w-full md:w-auto text-center" onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}>
                                QUERO ACELERAR MEU INGLÊS AGORA
                            </MagneticButton>
                            <p className="text-[10px] text-slate-500 font-medium tracking-widest w-full text-center uppercase">
                                Acesso Imediato • 7 Dias de Garantia
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/50 w-full md:w-auto justify-center md:justify-start">
                            <div className="flex -space-x-3">
                                <img src="https://randomuser.me/api/portraits/women/30.jpg" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                                <img src="https://randomuser.me/api/portraits/women/38.jpg" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                                <img src="https://randomuser.me/api/portraits/men/93.jpg" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex text-yellow-500 gap-0.5">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold tracking-tight whitespace-nowrap">+200 alunos satisfeitos</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Globe 3D */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="hidden lg:flex items-center justify-center relative min-h-[400px]"
                >
                    {/* Add a subtle glow behind the globe to make it pop like the demo */}
                    <div className="absolute w-[80%] h-[80%] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                    <TravelGlobe size={600} autoRotateSpeed={0.002} />
                </motion.div>

            </div>
        </section>
    );
}
