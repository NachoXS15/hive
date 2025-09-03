/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Fondo exportado multi-capa (canvas)
// No requiere librerías externas.
// Añade "use client" si usas Next.js (App Router).
// IMPORTANTE: El fondo tiene z-index: -9999 para estar siempre debajo del contenido

'use client'
import React, { useEffect, useRef } from 'react';

interface LayerProps { color: string; speed: 'slow' | 'normal' | 'fast'; intensity: number; theme?: 'light' | 'dark'; particleCount?: number; speedMultiplier?: number; }
function speedMul(s: 'slow' | 'normal' | 'fast') { if (s === 'slow') return 0.5; if (s === 'fast') return 2; return 1; }
const CrystalLayer: React.FC<LayerProps> = ({ color, speed, intensity }) => {
    const ref = useRef<HTMLCanvasElement>(null); useEffect(() => { const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return; const resize = () => { c.width = innerWidth; c.height = innerHeight }; resize(); addEventListener('resize', resize); const mul = speedMul(speed); const polys: any[] = []; const count = 25 + Math.floor(25 * intensity); for (let i = 0; i < count; i++) { const sides = 5 + Math.floor(Math.random() * 3); polys.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: 20 + Math.random() * 50, sides, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.01 * mul, vx: (Math.random() - 0.5) * mul, vy: (Math.random() - 0.5) * mul }); } let f: number; const loop = () => { ctx.clearRect(0, 0, c.width, c.height); polys.forEach((p: any) => { p.x += p.vx; p.y += p.vy; p.rot += p.vr; if (p.x < -p.r) p.x = c.width + p.r; if (p.x > c.width + p.r) p.x = -p.r; if (p.y < -p.r) p.y = c.height + p.r; if (p.y > c.height + p.r) p.y = -p.r; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); for (let i = 0; i < p.sides; i++) { const ang = i / p.sides * Math.PI * 2; const x = Math.cos(ang) * p.r; const y = Math.sin(ang) * p.r; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); ctx.strokeStyle = color; ctx.globalAlpha = 0.25 + 0.75 * intensity; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }); f = requestAnimationFrame(loop); }; loop(); return () => { removeEventListener('resize', resize); cancelAnimationFrame(f); }; }, [color, speed, intensity]); return <canvas ref={ref} className='layer' style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
};

const CodeElementsLayer: React.FC<LayerProps> = ({ color, speed, intensity }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => { const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return; const resize = () => { c.width = innerWidth; c.height = innerHeight }; resize(); addEventListener('resize', resize); const speedMultiplier = speedMul(speed); const codes = Array.from({ length: Math.floor(20 * intensity) }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, text: ['</>', '{}', '()', '[]', '=', '!=', '&&', '||', 'if', 'while', 'function', 'const', 'let', 'var'][Math.floor(Math.random() * 14)], size: Math.random() * 16 + 10, opacity: Math.random() * 0.4 + 0.1, vx: (Math.random() - 0.5) * speedMultiplier * 30, vy: (Math.random() - 0.5) * speedMultiplier * 30, life: Math.random() * 200 + 100 })); let f: number; const loop = () => { ctx.clearRect(0, 0, c.width, c.height); codes.forEach((cd, i) => { cd.x += cd.vx * 0.016; cd.y += cd.vy * 0.016; cd.life--; if (cd.x < -50 || cd.x > c.width + 50 || cd.y < -50 || cd.y > c.height + 50 || cd.life <= 0) { codes[i] = { x: Math.random() * c.width, y: Math.random() * c.height, text: ['</>', '{}', '()', '[]', '=', '!=', '&&', '||', 'if', 'while', 'function', 'const', 'let', 'var'][Math.floor(Math.random() * 14)], size: Math.random() * 16 + 10, opacity: Math.random() * 0.4 + 0.1, vx: (Math.random() - 0.5) * speedMultiplier * 30, vy: (Math.random() - 0.5) * speedMultiplier * 30, life: Math.random() * 200 + 100 }; } ctx.save(); ctx.globalAlpha = cd.opacity * intensity; ctx.fillStyle = color; ctx.font = `${cd.size}px monospace`; ctx.textAlign = 'center'; ctx.fillText(cd.text, cd.x, cd.y); ctx.restore(); }); f = requestAnimationFrame(loop); }; loop(); return () => { removeEventListener('resize', resize); cancelAnimationFrame(f); }; }, [color, speed, intensity]);
    return <canvas ref={ref} className='layer' style={{ position: 'absolute', inset: 0, zIndex: 7, pointerEvents: 'none' }} />;
};

interface BackgroundExportProps { animationColor?: string; intensity?: number; speed?: 'slow' | 'normal' | 'fast'; theme?: 'light' | 'dark'; particleCount?: number; speedMultiplier?: number; }
export default function BackgroundExport(props: BackgroundExportProps) {
    const { animationColor, intensity, speed, theme, particleCount, speedMultiplier } = props || {};
    // Valor base exportado (capturado al momento de exportar): 23
    const rawIntensity = typeof intensity === 'number' ? intensity : 23;
    const intensityNorm = rawIntensity > 1 ? Math.min(Math.max(rawIntensity, 0), 100) / 100 : Math.max(rawIntensity, 0);
    const color = animationColor || '#FFA000';
    const speedSafe: 'slow' | 'normal' | 'fast' = (speed === 'slow' || speed === 'fast' || speed === 'normal') ? speed : 'normal';
    const themeSafe: 'light' | 'dark' = (theme === 'light' || theme === 'dark') ? theme : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const particleCountSafe = typeof particleCount === 'number' ? particleCount : 180;
    const speedMultiplierSafe = typeof speedMultiplier === 'number' ? speedMultiplier : 0.8;
    return (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: -9999 }} className='export-background-root'>
            <div style={{ position: 'absolute', inset: 0, background: "radial-gradient(ellipse at top left, #FFD54F40, transparent 20%), radial-gradient(ellipse at bottom right, #FFEB3B30, transparent 80%), linear-gradient(90deg,rgba(237, 229, 195, 1) 0%, rgba(237, 229, 195, 1) 45%, rgba(237, 229, 195, 1) 100%)"  }} />
            <CrystalLayer color={color} speed={speedSafe} intensity={intensityNorm} theme={themeSafe} particleCount={particleCountSafe} speedMultiplier={speedMultiplierSafe} />
            <CodeElementsLayer color={color} speed={speedSafe} intensity={intensityNorm} theme={themeSafe} particleCount={particleCountSafe} speedMultiplier={speedMultiplierSafe} />
        </div>
    );
}
