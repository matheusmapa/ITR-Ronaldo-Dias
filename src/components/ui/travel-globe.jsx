import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';
import { cn } from '../../lib/utils';

const TOPO_JSON_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

// Cidades da rota para simular a expansão (Inglês)
const ROUTE = [
    { lat: -23.5505, lng: -46.6333, label: "Você", id: "br" }, // São Paulo, Brasil
    { lat: 40.7128, lng: -74.0060, label: "You", id: "ny" },   // New York, US
    { lat: 51.5074, lng: -0.1278, label: "You", id: "lon" },   // London, UK
    { lat: -33.8688, lng: 151.2093, label: "You", id: "syd" }, // Sydney, AU
    { lat: 43.6532, lng: -79.3832, label: "You", id: "tor" },  // Toronto, CA
];

export function TravelGlobe({
    className,
    size = 600,
    globeColor = "rgba(5, 150, 105, 0.05)", // Emerald 600 muito transparente
    countryStroke = "rgba(16, 185, 129, 0.4)", // Emerald 500
    trailColor = "rgba(52, 211, 153, 0.6)", // Teal 400
    activeColor = "#34d399",
    autoRotateSpeed = 0.003
}) {
    const canvasRef = useRef(null);
    const worldRef = useRef(null);
    const rotationRef = useRef([0, -15, 0]); // Começa focando um pouco pra Cima/Brasil

    // Simple linear interpolation
    const lerp = useCallback((a, b, t) => a + (b - a) * t, []);

    // Controle de Animação da Viagem
    const stateRef = useRef({
        currentIndex: 0,
        progress: 0, // 0 a 1 (andando no trajeto atual)
        pauseFrames: 60, // frames para pausar na cidade
        currentPause: 0,
        pulses: [] // ondas geradas nos pousos
    });

    // Carrega o mapa
    useEffect(() => {
        fetch(TOPO_JSON_URL)
            .then((res) => res.json())
            .then((topology) => {
                worldRef.current = topojson.feature(topology, topology.objects.countries);
            })
            .catch((err) => console.error("Erro ao carregar mapa", err));
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        if (canvas.width !== w * dpr) canvas.width = w * dpr;
        if (canvas.height !== h * dpr) canvas.height = h * dpr;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        const radius = Math.min(w, h) * 0.4;
        const cx = w / 2;
        const cy = h / 2;

        // Projeção Ortográfica do D3
        const projection = d3.geoOrthographic()
            .translate([cx, cy])
            .scale(radius)
            .rotate(rotationRef.current);

        const pathGenerator = d3.geoPath().projection(projection).context(ctx);

        // Auto Rotação base (um pouco para dar vida)
        rotationRef.current[0] += autoRotateSpeed * 60; // D3 rotação em graus

        // Limpa canvas
        ctx.clearRect(0, 0, w, h);

        // Fundo do Mar (Oceano/Glow)
        const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.3);
        glowGrad.addColorStop(0, "rgba(5, 150, 105, 0.08)");
        glowGrad.addColorStop(1, "rgba(5, 150, 105, 0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, w, h);

        // Borda do Globo
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.fillStyle = globeColor;
        ctx.fill();
        ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Desenha Países se carregado
        if (worldRef.current) {
            ctx.beginPath();
            pathGenerator(worldRef.current);
            ctx.fillStyle = "rgba(4, 47, 46, 0.3)"; // Preenchimento bem escuro (teal-950)
            ctx.fill();
            ctx.strokeStyle = countryStroke;
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

        // --- LÓGICA DA VIAGEM ---
        const s = stateRef.current;

        // Atualiza lógica
        if (s.currentPause > 0) {
            s.currentPause--;
        } else {
            s.progress += 0.008; // velocidade do voo
            if (s.progress >= 1) {
                s.progress = 0;
                s.currentIndex = (s.currentIndex + 1) % ROUTE.length;
                s.currentPause = 60; // Pausa 1 seg quando chega (assumindo 60fps)

                // Adiciona "onda" (pulse)
                const city = ROUTE[s.currentIndex];
                s.pulses.push({
                    lng: city.lng, lat: city.lat,
                    radius: 0, maxRadius: 40, alpha: 1
                });
            }
        }

        const cityA = ROUTE[s.currentIndex];
        const cityB = ROUTE[(s.currentIndex + 1) % ROUTE.length];

        // Força a rotação do globo para seguir o ponto atual para não perdermos de vista!
        // Interpola a rotação ideal (centro = longitude/latitude ativa invertida)
        const t = s.currentPause > 0 ? 0 : s.progress;
        const activeLng = lerp(cityA.lng, cityB.lng, t);
        const activeLat = lerp(cityA.lat, cityB.lat, t);

        // Suaviza a rotação do globo em direção ao pontinho ativo
        const targetRotX = -activeLng;
        const targetRotY = -activeLat;
        rotationRef.current[0] += (targetRotX - rotationRef.current[0]) * 0.02;
        rotationRef.current[1] += (targetRotY - rotationRef.current[1]) * 0.02;

        // Renderiza trilhas passadas e o voo atual usando GeoStream
        ctx.beginPath();
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]); // Linha pontilhada (rastro de avião)

        // Desenha linha curvada (geodesic curve) entre as duas cidades
        const routeFeature = {
            type: "LineString",
            coordinates: [[cityA.lng, cityA.lat], [cityB.lng, cityB.lat]]
        };
        pathGenerator(routeFeature);
        ctx.stroke();
        ctx.setLineDash([]); // volta ao normal

        // --- Renderiza Pulses (Ondinhas) ---
        for (let i = s.pulses.length - 1; i >= 0; i--) {
            const p = s.pulses[i];
            p.radius += 0.5;
            p.alpha -= 0.02;

            // Projeta e checa se tá visível de frente
            if (p.alpha <= 0) {
                s.pulses.splice(i, 1);
                continue;
            }

            const pt = projection([p.lng, p.lat]);
            if (pt) {
                ctx.beginPath(); // Consertado: sempre precisa de beginPath na hora de desenhar uma shape. Senão linka com a ultima.
                ctx.arc(pt[0], pt[1], p.radius, 0, 2 * Math.PI);
                ctx.strokeStyle = `rgba(52, 211, 153, ${Math.max(0, p.alpha)})`; // Teal-400
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        // --- Renderiza o "Avião"/Ponteiro Atual ---
        const currentT = s.currentPause > 0 ? 0 : s.progress;
        const currentPosLng = lerp(cityA.lng, cityB.lng, currentT);
        const currentPosLat = lerp(cityA.lat, cityB.lat, currentT);

        // Para desenhar a bolinha atual de forma correta (respeitando clipping do horizonte):
        const pt = projection([currentPosLng, currentPosLat]);
        if (pt) {
            // Glow atrás do ponto atual
            ctx.beginPath();
            ctx.arc(pt[0], pt[1], 8, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(52, 211, 153, 0.4)";
            ctx.fill();

            // Ponto Base
            ctx.beginPath();
            ctx.arc(pt[0], pt[1], 4, 0, 2 * Math.PI);
            ctx.fillStyle = activeColor;
            ctx.fill();

            // Desenha a Label flutuando junto com o ponto
            const text = ROUTE[s.currentIndex].label; // Label do destino

            // Label Background
            ctx.font = "bold 13px system-ui, sans-serif";
            const textMetrics = ctx.measureText(text);
            const padX = 8, padY = 4;

            ctx.fillStyle = "rgba(4, 47, 46, 0.9)"; // Fundo ultra escuro (teal-950) com opacidade
            ctx.beginPath();
            ctx.roundRect(pt[0] + 12, pt[1] - 12 - 14, textMetrics.width + padX * 2, 14 + padY * 2, 6);
            ctx.fill();
            ctx.strokeStyle = "rgba(52, 211, 153, 0.5)"; // Borda
            ctx.lineWidth = 1;
            ctx.stroke();

            // Label Text
            ctx.fillStyle = activeColor;
            ctx.fillText(text, pt[0] + 12 + padX, pt[1] - 12 - 14 + padY + 11);
        }

        // eslint-disable-next-line
        animRef.current = requestAnimationFrame(draw);
    }, [globeColor, countryStroke, trailColor, activeColor, autoRotateSpeed]);

    useEffect(() => {
        let animId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animId);
    }, [draw]);

    return (
        <div className={cn("w-full h-full relative cursor-crosshair", className)} style={{ minHeight: size }}>
            <canvas
                ref={canvasRef}
                className="w-full h-full absolute inset-0"
            />
        </div>
    );
}
