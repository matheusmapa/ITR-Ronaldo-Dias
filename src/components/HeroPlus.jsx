import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Play, Pause, VolumeX, Volume2, Maximize2 } from 'lucide-react';
import ReactPlayer from 'react-player';
import { MagneticButton } from './Common';
import { TravelGlobe } from './ui/travel-globe';

export default function HeroPlus() {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [played, setPlayed] = useState(0);
    const playerRef = useRef(null);

    const handleInteract = () => {
        setHasInteracted(true);
        setIsPlaying(true);
        // Restart the video from the beginning when the user unmutes
        // ReactPlayer v3 uses youtube-video-element which has HTMLMediaElement API
        const el = playerRef.current;
        if (el) {
            el.currentTime = 0;
            el.muted = false;
            el.play();
        }
    };

    const handlePlayPause = (e) => {
        e.stopPropagation();
        const el = playerRef.current;
        if (el) {
            if (el.paused) {
                el.play();
                setIsPlaying(true);
            } else {
                el.pause();
                setIsPlaying(false);
            }
        }
    };

    // Track progress using native HTMLMediaElement timeupdate event
    const handleTimeUpdate = () => {
        const el = playerRef.current;
        if (el && el.duration) {
            setPlayed(el.currentTime / el.duration);
        }
    };

    // Calculate non-linear progress for the visual bar.
    // Math.pow(x, 0.4) creates a curve where:
    // 10% real = 40% visual, 30% real = 62% visual, 80% real = 91% visual
    const visualProgress = Math.min(Math.pow(played, 0.4), 1);

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
        <section className="relative flex items-center justify-center overflow-hidden bg-[#050510] pt-10 pb-12 md:pt-14 md:pb-24 lg:min-h-[92vh]">
            {/* Background Gradients (Apple Style) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 blur-3xl rounded-full pointer-events-none"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUscDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

            <div className="relative z-10 max-w-7xl w-full mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-8 items-center">

                {/* Left Column: Copy & CTA */}
                <div className="text-left flex flex-col items-start pt-2 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 backdrop-blur-md"
                    >
                        <span>ITR | Inglês em Tempo Recorde</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-2 md:mb-4 tracking-tight"
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
                        className="text-sm md:text-lg text-emerald-400 mb-2 md:mb-3 max-w-xl leading-relaxed font-bold uppercase tracking-widest"
                    >
                        Destrave sua Fluência e Fale Inglês com Naturalidade.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-xs md:text-base text-[#E2E2E2] mb-4 md:mb-6 max-w-xl leading-relaxed font-light"
                    >
                        Descubra o método exato de memorização que desbloqueia a sua mente para aprender dezenas de palavras por dia, eliminando os "brancos" na hora de conversar — mesmo que você já tenha tentado de tudo.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col items-start gap-4 md:gap-6 w-full md:w-auto"
                    >
                        {/* Video Player Area */}
                        <div id="hero-video-container" className="w-full max-w-xl aspect-video relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20 border border-slate-800/50 bg-black group z-20">

                            {/* Video wrapper: No zoom to keep the whole video visible. Clicks blocked by overlays. */}
                            <div className="absolute inset-0 z-0 bg-black">
                                <ReactPlayer
                                    ref={playerRef}
                                    src="https://www.youtube.com/watch?v=b0l5aMp5fHc"
                                    width="100%"
                                    height="100%"
                                    autoPlay={true}
                                    muted={!hasInteracted}
                                    controls={false}
                                    playsInline={true}
                                    onTimeUpdate={handleTimeUpdate}
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
                                                playsinline: 1,
                                                cc_load_policy: 0,
                                                iv_load_policy: 3
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Protective Invisible Overlay to block interactions after start */}
                            {hasInteracted && (
                                <div
                                    className="absolute inset-0 z-10 w-full h-full cursor-pointer"
                                    onClick={handlePlayPause}
                                />
                            )}

                            {/* Initial Sound overlay (Click to hear) */}
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

                            {/* Custom Controls Bar */}
                            {hasInteracted && (
                                <div className="absolute inset-x-0 bottom-0 max-h-20 pt-10 pb-4 px-5 bg-gradient-to-t from-black via-black/80 to-transparent z-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-4">
                                    <button
                                        onClick={handlePlayPause}
                                        className="text-white hover:text-emerald-400 transition-colors"
                                    >
                                        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                                    </button>

                                    {/* Fake Progress Bar (Read-only, Non-linear) */}
                                    <div className="flex-1 flex items-center relative h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
                                            style={{ width: `${visualProgress * 100}%` }}
                                            transition={{ type: "tween", ease: "linear", duration: 0.5 }}
                                        />
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
                                        className="text-white/80 hover:text-white transition-opacity p-1"
                                    >
                                        <Maximize2 className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-3 w-full">
                            <MagneticButton className="w-full md:w-auto text-center" onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}>
                                <span className="hidden sm:inline">QUERO ACELERAR MEU INGLÊS AGORA</span>
                                <span className="sm:hidden">ACELERAR MEU INGLÊS</span>
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
