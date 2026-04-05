"use client";

import { useEffect, useRef } from "react";

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  speed: number;
  offset: number;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  golden: boolean;
}

interface FloatingRect {
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  rotationSpeed: number;
  driftX: number;
  driftY: number;
  opacity: number;
  golden: boolean;
}

export function HeroVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w: number;
    let h: number;

    const lines: Line[] = [];
    const particles: Particle[] = [];
    const rects: FloatingRect[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      lines.length = 0;
      particles.length = 0;
      rects.length = 0;

      // Horizontal construction lines
      for (let i = 0; i < 15; i++) {
        lines.push({
          x1: Math.random() * w * 0.2,
          y1: Math.random() * h,
          x2: Math.random() * w * 0.4 + w * 0.6,
          y2: Math.random() * h,
          speed: 0.08 + Math.random() * 0.25,
          offset: Math.random() * Math.PI * 2,
          opacity: 0.15 + Math.random() * 0.25,
        });
      }

      // Vertical structural lines
      for (let i = 0; i < 10; i++) {
        lines.push({
          x1: Math.random() * w,
          y1: Math.random() * h * 0.1,
          x2: Math.random() * w,
          y2: Math.random() * h * 0.3 + h * 0.7,
          speed: 0.04 + Math.random() * 0.15,
          offset: Math.random() * Math.PI * 2,
          opacity: 0.1 + Math.random() * 0.2,
        });
      }

      // Floating particles
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.25,
          size: 1.5 + Math.random() * 2.5,
          opacity: 0.3 + Math.random() * 0.5,
          golden: Math.random() > 0.5,
        });
      }

      // Floating architectural rectangles
      for (let i = 0; i < 8; i++) {
        const scale = 0.6 + Math.random() * 1.4;
        rects.push({
          x: Math.random() * w,
          y: Math.random() * h,
          w: (50 + Math.random() * 130) * scale,
          h: (70 + Math.random() * 200) * scale,
          rotation: Math.random() * Math.PI * 0.08 - Math.PI * 0.04,
          rotationSpeed: (Math.random() - 0.5) * 0.0004,
          driftX: (Math.random() - 0.5) * 0.2,
          driftY: (Math.random() - 0.5) * 0.12,
          opacity: 0.08 + Math.random() * 0.14,
          golden: Math.random() > 0.4,
        });
      }
    }

    function drawGrid(time: number) {
      if (!ctx) return;
      const spacing = 60;
      const sway = Math.sin(time * 0.0001) * 5;

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 0.5;

      for (let y = sway % spacing; y < h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      for (let x = sway % spacing; x < w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    }

    function drawLines(time: number) {
      if (!ctx) return;
      for (const line of lines) {
        const t = time * 0.001;
        const sway = Math.sin(t * line.speed + line.offset) * 25;
        const progress =
          (Math.sin(t * line.speed * 0.5 + line.offset) + 1) * 0.5;

        ctx.globalAlpha = line.opacity * (0.5 + progress * 0.5);
        ctx.strokeStyle = "rgba(176,141,79,0.6)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(line.x1 + sway, line.y1);
        ctx.lineTo(line.x2 - sway, line.y2);
        ctx.stroke();

        // Measurement tick marks
        const dx = line.x2 - sway - (line.x1 + sway);
        const dy = line.y2 - line.y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) continue;
        const steps = Math.floor(len / 40);
        const nx = -dy / len;
        const ny = dx / len;

        ctx.strokeStyle = "rgba(176,141,79,0.4)";
        ctx.lineWidth = 0.5;
        for (let i = 1; i < steps * progress; i++) {
          const frac = i / steps;
          const px = line.x1 + sway + dx * frac;
          const py = line.y1 + dy * frac;
          ctx.beginPath();
          ctx.moveTo(px - nx * 5, py - ny * 5);
          ctx.lineTo(px + nx * 5, py + ny * 5);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    function drawParticles(time: number) {
      if (!ctx) return;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const pulse = Math.sin(time * 0.002 + p.x * 0.01) * 0.3 + 0.7;
        ctx.globalAlpha = p.opacity * pulse;
        ctx.fillStyle = p.golden ? "#b08d4f" : "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function drawRects(time: number) {
      if (!ctx) return;
      for (const r of rects) {
        r.x += r.driftX;
        r.y += r.driftY;
        r.rotation += r.rotationSpeed;

        if (r.x < -r.w * 2) r.x = w + r.w;
        if (r.x > w + r.w * 2) r.x = -r.w;
        if (r.y < -r.h * 2) r.y = h + r.h;
        if (r.y > h + r.h * 2) r.y = -r.h;

        const breathe = Math.sin(time * 0.0004 + r.x * 0.002) * 0.3 + 0.7;

        ctx.save();
        ctx.translate(r.x + r.w / 2, r.y + r.h / 2);
        ctx.rotate(r.rotation);

        ctx.globalAlpha = r.opacity * breathe;
        ctx.strokeStyle = r.golden
          ? "rgba(176,141,79,0.5)"
          : "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;

        // Main outline
        ctx.strokeRect(-r.w / 2, -r.h / 2, r.w, r.h);

        // Floor plates
        ctx.lineWidth = 0.5;
        const floors = Math.floor(r.h / 25);
        for (let i = 1; i < floors; i++) {
          const fy = -r.h / 2 + (r.h / floors) * i;
          ctx.beginPath();
          ctx.moveTo(-r.w / 2, fy);
          ctx.lineTo(r.w / 2, fy);
          ctx.stroke();
        }

        // Window columns
        const cols = Math.floor(r.w / 30);
        for (let i = 1; i < cols; i++) {
          const cx = -r.w / 2 + (r.w / cols) * i;
          ctx.beginPath();
          ctx.moveTo(cx, -r.h / 2);
          ctx.lineTo(cx, r.h / 2);
          ctx.stroke();
        }

        // Structural diagonal
        ctx.globalAlpha = r.opacity * breathe * 0.4;
        ctx.beginPath();
        ctx.moveTo(-r.w / 2, -r.h / 2);
        ctx.lineTo(r.w / 2, r.h / 2);
        ctx.stroke();

        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    function drawCenterGlow(time: number) {
      if (!ctx) return;
      const pulse = Math.sin(time * 0.0005) * 0.2 + 0.8;
      const gradient = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        w * 0.6,
      );
      gradient.addColorStop(0, `rgba(176,141,79,${0.1 * pulse})`);
      gradient.addColorStop(0.4, `rgba(176,141,79,${0.04 * pulse})`);
      gradient.addColorStop(1, "rgba(176,141,79,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    function animate(time: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, w, h);

      drawGrid(time);
      drawRects(time);
      drawLines(time);
      drawParticles(time);
      drawCenterGlow(time);

      animId = requestAnimationFrame(animate);
    }

    init();
    animId = requestAnimationFrame(animate);

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" />
  );
}
