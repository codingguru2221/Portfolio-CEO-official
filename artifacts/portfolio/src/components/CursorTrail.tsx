import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    type Point = { x: number; y: number; age: number };
    const trail: Point[] = [];
    let mouseX = width / 2;
    let mouseY = height / 2;
    let previousMouseX = mouseX;
    let previousMouseY = mouseY;
    let rocketAngle = -Math.PI / 4;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", move);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      trail.push({ x: mouseX, y: mouseY, age: 0 });

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.age++;
        
        const t = Math.max(0, 1 - p.age / 24);
        const opacity = t;
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, t * 5), 0, Math.PI * 2);
        ctx.fill();
      }

      const dx = mouseX - previousMouseX;
      const dy = mouseY - previousMouseY;

      if (Math.hypot(dx, dy) > 1) {
        rocketAngle = Math.atan2(dy, dx) + Math.PI / 2;
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }

      ctx.save();
      ctx.translate(mouseX, mouseY);
      ctx.rotate(rocketAngle);
      ctx.shadowColor = "rgba(0, 212, 255, 0.75)";
      ctx.shadowBlur = 16;

      // Flame
      const flamePulse = 1 + Math.sin(Date.now() / 70) * 0.2;
      const flameGradient = ctx.createLinearGradient(0, 13, 0, 27);
      flameGradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      flameGradient.addColorStop(0.35, "rgba(0, 212, 255, 0.9)");
      flameGradient.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.fillStyle = flameGradient;
      ctx.beginPath();
      ctx.moveTo(-5, 12);
      ctx.quadraticCurveTo(0, 27 * flamePulse, 5, 12);
      ctx.closePath();
      ctx.fill();

      // Rocket body
      ctx.fillStyle = "#f8fafc";
      ctx.strokeStyle = "rgba(0, 212, 255, 0.85)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(0, -17);
      ctx.quadraticCurveTo(12, -4, 7, 12);
      ctx.lineTo(-7, 12);
      ctx.quadraticCurveTo(-12, -4, 0, -17);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Window
      ctx.fillStyle = "#00d4ff";
      ctx.beginPath();
      ctx.arc(0, -5, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Fins
      ctx.fillStyle = "#a855f7";
      ctx.beginPath();
      ctx.moveTo(-7, 8);
      ctx.lineTo(-15, 16);
      ctx.lineTo(-5, 14);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(7, 8);
      ctx.lineTo(15, 16);
      ctx.lineTo(5, 14);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      while (trail.length > 0 && trail[0].age > 24) {
        trail.shift();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}
