import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import ReactPlayer from 'react-player';

/* ───────────────────────────────────────────────
   VÍDEOS DE DEPOIMENTO — adicione/remova aqui
   ─────────────────────────────────────────────── */
const videos = [
    { id: 'MfdTXirx7fY' },
    { id: 'tTuSQtRSjlM' },
    { id: 'XmFx6DuvEIc' },
    // duplicados pro carrossel funcionar — troque pelos links reais
    { id: 'MfdTXirx7fY' },
    { id: 'tTuSQtRSjlM' },
    { id: 'XmFx6DuvEIc' },
];

const VIDEOS_PER_PAGE = 3;
const AUTO_ADVANCE_MS = 10000;

/* ── Player individual para cada vídeo ── */
function VideoCard({ videoId, globalIndex, onPlayingChange, activePlayingIndex }) {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [showThumbnail, setShowThumbnail] = useState(true);
    const [ready, setReady] = useState(false);

    // Pausa este vídeo se outro começou a tocar
    useEffect(() => {
        if (activePlayingIndex !== null && activePlayingIndex !== globalIndex && isPlaying) {
            const el = playerRef.current;
            if (el) { el.pause(); }
            setIsPlaying(false);
        }
    }, [activePlayingIndex]);

    const handlePlay = () => {
        setShowThumbnail(false);
        const el = playerRef.current;
        if (el) {
            el.muted = false;
            el.play();
            setIsPlaying(true);
            onPlayingChange?.(true);
        }
    };

    const handleTogglePlay = (e) => {
        e.stopPropagation();
        const el = playerRef.current;
        if (!el) return;
        if (el.paused) {
            el.play();
            setIsPlaying(true);
            onPlayingChange?.(true);
        } else {
            el.pause();
            setIsPlaying(false);
            onPlayingChange?.(false);
        }
    };

    const handleRestart = (e) => {
        e.stopPropagation();
        const el = playerRef.current;
        if (el) {
            el.currentTime = 0;
            el.play();
            setIsPlaying(true);
            onPlayingChange?.(true);
            setPlayed(0);
        }
    };

    const handleTimeUpdate = () => {
        const el = playerRef.current;
        if (el && el.duration) {
            setPlayed(el.currentTime / el.duration);
            if (!ready) setReady(true);
        }
    };

    const handleSeek = (e) => {
        const el = playerRef.current;
        if (!el || !el.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, x / rect.width));
        el.currentTime = pct * el.duration;
        setPlayed(pct);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        onPlayingChange?.(false);
        setPlayed(1);
    };

    const url = `https://www.youtube.com/watch?v=${videoId}`;

    return (
        <div className="relative aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden bg-black border border-white/[0.08] shadow-2xl group/card">
            {/* ReactPlayer — escondido atrás do overlay */}
            <div className="absolute inset-0 z-0 scale-[1.08]">
                <ReactPlayer
                    ref={playerRef}
                    src={url}
                    width="100%"
                    height="100%"
                    muted={showThumbnail}
                    autoPlay={false}
                    controls={false}
                    playsInline={true}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: 0,
                                mute: 1,
                                modestbranding: 1,
                                showinfo: 0,
                                rel: 0,
                                controls: 0,
                                disablekb: 1,
                                fs: 0,
                                playsinline: 1,
                                cc_load_policy: 0,
                                iv_load_policy: 3,
                            },
                        },
                    }}
                />
            </div>

            {/* Thumbnail overlay — mostra até o user clicar em play */}
            {showThumbnail && (
                <button
                    onClick={handlePlay}
                    className="absolute inset-0 z-20 w-full h-full cursor-pointer group/thumb"
                    aria-label={`Assistir depoimento ${globalIndex + 1}`}
                >
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={`Depoimento ${globalIndex + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/15 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center group-hover/thumb:scale-110 group-hover/thumb:bg-white/30 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                            <Play className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white fill-white ml-0.5" />
                        </div>
                    </div>
                </button>
            )}

            {/* Controles customizados — aparecem quando o vídeo foi ativado */}
            {!showThumbnail && (
                <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                    style={{ opacity: isPlaying ? undefined : 1 }}
                >
                    {/* Barra de progresso */}
                    <div
                        className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-3 group/bar"
                        onClick={handleSeek}
                    >
                        <div
                            className="h-full bg-emerald-400 rounded-full relative transition-[width] duration-100"
                            style={{ width: `${played * 100}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-md" />
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleTogglePlay}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label={isPlaying ? 'Pausar' : 'Play'}
                        >
                            {isPlaying
                                ? <Pause className="w-3.5 h-3.5 text-white" />
                                : <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                            }
                        </button>
                        <button
                            onClick={handleRestart}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Reiniciar"
                        >
                            <RotateCcw className="w-3.5 h-3.5 text-white" />
                        </button>
                    </div>
                </div>
            )}

            {/* Bloqueio de cliques no player do YouTube (evita abrir YouTube) */}
            {!showThumbnail && (
                <div
                    className="absolute inset-0 z-10"
                    onClick={handleTogglePlay}
                    style={{ cursor: 'pointer' }}
                />
            )}
        </div>
    );
}

/* ── Carrossel principal ── */
export default function VideoTestimonials() {
    const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
    const [page, setPage] = useState(0);
    const [anyPlaying, setAnyPlaying] = useState(false);
    const [activePlayingIndex, setActivePlayingIndex] = useState(null);
    const timerRef = useRef(null);

    const currentVideos = videos.slice(
        page * VIDEOS_PER_PAGE,
        page * VIDEOS_PER_PAGE + VIDEOS_PER_PAGE
    );

    /* ── Auto-advance (desativado enquanto algum vídeo toca) ── */
    const resetTimer = useCallback(() => {
        clearTimeout(timerRef.current);
        if (totalPages > 1 && !anyPlaying) {
            timerRef.current = setTimeout(() => {
                setPage((prev) => (prev + 1) % totalPages);
            }, AUTO_ADVANCE_MS);
        }
    }, [totalPages, anyPlaying]);

    useEffect(() => {
        resetTimer();
        return () => clearTimeout(timerRef.current);
    }, [page, resetTimer]);

    const goTo = (idx) => setPage(idx);
    const prev = () => goTo((page - 1 + totalPages) % totalPages);
    const next = () => goTo((page + 1) % totalPages);

    /* ── Swipe ── */
    const touchStart = useRef(0);
    const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    };

    return (
        <div
            className="relative w-full max-w-5xl mx-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Grid 3 colunas */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
                {currentVideos.map((video, i) => {
                    const globalIndex = page * VIDEOS_PER_PAGE + i;
                    return (
                        <VideoCard
                            key={`${page}-${i}`}
                            videoId={video.id}
                            globalIndex={globalIndex}
                            activePlayingIndex={activePlayingIndex}
                            onPlayingChange={(playing) => {
                                setAnyPlaying(playing);
                                setActivePlayingIndex(playing ? globalIndex : null);
                            }}
                        />
                    );
                })}
            </div>

            {/* Setas */}
            {totalPages > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-white hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-200 cursor-pointer"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-white hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-200 cursor-pointer"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Dots */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === page
                                ? 'w-8 bg-emerald-400'
                                : 'w-1.5 bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Página ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
