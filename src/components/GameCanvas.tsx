import { useEffect, useRef } from 'react';
import { TERRAIN_COLORS } from '../data/questions';

interface GameCanvasProps {
  carX: number; // 0 to 100
  activeCarEmoji: string;
  terrain: string;
  carMoving: boolean;
  wrongAnswerShake: number;
}

export default function GameCanvas({
  carX,
  activeCarEmoji,
  terrain,
  carMoving,
  wrongAnswerShake,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Keep track of scroll offset & animations
  const bgScrollRef = useRef(0);
  const carAnimRef = useRef(0);
  const particlesRef = useRef<{ x: number; y: number; speedY: number; size: number }[]>([]);

  // Generate particles based on terrain
  useEffect(() => {
    const list = [];
    if (terrain === 'Snow') {
      for (let i = 0; i < 30; i++) {
        list.push({
          x: Math.random() * 800,
          y: Math.random() * 200,
          speedY: 0.5 + Math.random() * 1,
          size: 1.5 + Math.random() * 2,
        });
      }
    } else if (terrain === 'Volcano Path') {
      for (let i = 0; i < 15; i++) {
        list.push({
          x: Math.random() * 800,
          y: Math.random() * 200,
          speedY: -0.5 - Math.random() * 1,
          size: 1 + Math.random() * 3,
        });
      }
    }
    particlesRef.current = list;
  }, [terrain]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 180;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Terrain profile points
    const generateTerrainPoints = (W: number, H: number) => {
      const points: { x: number; y: number }[] = [];
      const baseY = H - 40;
      const segments = 24;

      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * W;
        let y = baseY;

        if (terrain === 'Mountain' || terrain === 'Steep Hill') {
          y = baseY - Math.sin((i / segments) * Math.PI) * (H * 0.35);
        } else if (terrain === 'Rocky Road') {
          y = baseY - Math.abs(Math.sin(i * 1.2)) * 12 - (i % 2 === 0 ? 4 : 0);
        } else if (terrain === 'Bridge') {
          y = i < 4 || i > 20 ? baseY : baseY - 12;
        } else if (terrain === 'Volcano Path') {
          y = baseY - Math.sin((i / segments) * Math.PI * 1.5) * (H * 0.25);
        } else if (terrain === 'Snow') {
          y = baseY - Math.sin(i * 0.4) * 8;
        } else if (terrain === 'Dirt Road' || terrain === 'Desert') {
          y = baseY - Math.sin(i * 0.3) * 6;
        } else {
          y = baseY; // flat road
        }

        points.push({ x, y });
      }
      return points;
    };

    // Calculate Y height for the car
    const getCarY = (xPct: number, points: { x: number; y: number }[], W: number) => {
      const targetX = (xPct / 100) * W;
      if (points.length === 0) return 140;

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        if (targetX >= p1.x && targetX <= p2.x) {
          const ratio = (targetX - p1.x) / (p2.x - p1.x);
          return p1.y + ratio * (p2.y - p1.y) - 18;
        }
      }
      return points[points.length - 1].y - 18;
    };

    // Main render loop
    const render = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Sky gradient
      const skyColors: Record<string, string> = {
        'Flat Road': '#0f172a',
        'Dirt Road': '#2d1a04',
        'Forest Trail': '#022c22',
        'Rocky Road': '#18181b',
        'Desert': '#451a03',
        'Snow': '#1e3a5f',
        'Mountain': '#1e1b4b',
        'Steep Hill': '#0f172a',
        'Bridge': '#020617',
        'Volcano Path': '#3b0712',
      };

      const skyColor = skyColors[terrain] || '#0f172a';
      ctx.fillStyle = skyColor;
      ctx.fillRect(0, 0, W, H);

      // Scroll speed
      if (carMoving) {
        bgScrollRef.current = (bgScrollRef.current + 1.2) % 1000;
        carAnimRef.current = (carAnimRef.current + 0.15) % (Math.PI * 2);
      }

      // Draw stars/embers background elements
      if (terrain === 'Mountain' || terrain === 'Bridge' || terrain === 'Volcano Path') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let i = 0; i < 15; i++) {
          const sx = (i * 97) % W;
          const sy = (i * 37) % (H - 60);
          ctx.fillRect(sx, sy, 1.5, 1.5);
        }
      }

      // Update and draw weather particles
      if (terrain === 'Snow' || terrain === 'Volcano Path') {
        const isVolcano = terrain === 'Volcano Path';
        ctx.fillStyle = isVolcano ? 'rgba(239, 68, 68, 0.7)' : 'rgba(255, 255, 255, 0.7)';
        particlesRef.current.forEach((p) => {
          p.y += p.speedY;
          if (carMoving) {
            p.x = (p.x - 1 + W) % W;
          }
          if (isVolcano && p.y < 0) {
            p.y = H - 50;
            p.x = Math.random() * W;
          } else if (!isVolcano && p.y > H - 40) {
            p.y = 0;
            p.x = Math.random() * W;
          }
          ctx.beginPath();
          ctx.arc(p.x % W, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Draw clouds/mountains in deep background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < 3; i++) {
        const cx = ((i * 280 - bgScrollRef.current * 0.4 + 1000) % (W + 200)) - 100;
        const cy = 25 + i * 15;
        ctx.beginPath();
        ctx.arc(cx, cy, 25, 0, Math.PI * 2);
        ctx.arc(cx + 20, cy - 8, 20, 0, Math.PI * 2);
        ctx.arc(cx - 20, cy - 5, 16, 0, Math.PI * 2);
        ctx.fill();
      }

      // Get current terrain points & draw
      const points = generateTerrainPoints(W, H);
      const colors = TERRAIN_COLORS[terrain] || ['#4a5568', '#718096', '#a0aec0'];

      ctx.beginPath();
      ctx.moveTo(0, H);
      points.forEach((p) => {
        ctx.lineTo(p.x, p.y);
      });
      ctx.lineTo(W, H);
      ctx.closePath();

      const terrainGrad = ctx.createLinearGradient(0, H - 100, 0, H);
      terrainGrad.addColorStop(0, colors[0]);
      terrainGrad.addColorStop(0.4, colors[1]);
      terrainGrad.addColorStop(1, colors[2]);
      ctx.fillStyle = terrainGrad;
      ctx.fill();

      // Terrain edge highlight
      ctx.beginPath();
      points.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bridge arches if Bridge terrain
      if (terrain === 'Bridge') {
        ctx.strokeStyle = '#3e2723';
        ctx.lineWidth = 3;
        ctx.beginPath();
        const bStart = points[4].x;
        const bEnd = points[20].x;
        ctx.moveTo(bStart, points[4].y);
        ctx.bezierCurveTo(
          (bStart + bEnd) / 2,
          H + 10,
          (bStart + bEnd) / 2,
          H + 10,
          bEnd,
          points[20].y
        );
        ctx.stroke();

        // Support pillars
        ctx.fillStyle = '#271510';
        ctx.fillRect(bStart + 30, points[4].y, 8, H - points[4].y);
        ctx.fillRect(bEnd - 38, points[20].y, 8, H - points[20].y);
      }

      // Draw Checkered Finish Flag
      const flagX = W - 50;
      const flagY = getCarY(90, points, W);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(flagX, flagY - 25, 3, 35); // pole

      const boxSize = 5;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          ctx.fillStyle = (r + c) % 2 === 0 ? '#000000' : '#ffffff';
          ctx.fillRect(flagX + 3 + c * boxSize, flagY - 25 + r * boxSize, boxSize, boxSize);
        }
      }

      // Calculate car coordinates with micro bouncing and shake effects
      const baseCarY = getCarY(carX, points, W);
      const shakeY = wrongAnswerShake > 0 ? Math.sin(Date.now() * 0.05) * 4 : 0;
      const bounceY = carMoving ? Math.sin(carAnimRef.current) * 2.2 : 0;
      const finalCarY = baseCarY + bounceY + shakeY;
      const finalCarX = (carX / 100) * W;

      // Draw Car Emoji
      ctx.save();
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(activeCarEmoji, finalCarX, finalCarY);
      ctx.restore();

      // Sparkles/smoke behind car when moving
      if (carMoving) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let s = 0; s < 3; s++) {
          ctx.beginPath();
          ctx.arc(finalCarX - 16 - s * 5, finalCarY + 8 + (Math.sin(Date.now() * 0.01 + s) * 2), 2 + s, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Progress bar tracks at the top
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(12, 10, W - 24, 6);
      ctx.fillStyle = '#eab308'; // Gold
      ctx.fillRect(12, 10, (carX / 100) * (W - 24), 6);

      // Start/Finish tiny text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px monospace';
      ctx.fillText('START', 12, 26);
      ctx.fillText('FINISH', W - 48, 26);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [carX, activeCarEmoji, terrain, carMoving, wrongAnswerShake]);

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 border-b border-slate-800">
      <canvas
        ref={canvasRef}
        id="gameCanvas"
        className="block w-full h-[180px] bg-slate-950"
      />
    </div>
  );
}
