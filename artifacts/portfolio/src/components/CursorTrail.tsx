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
        
        const t = Math.max(0, 1 - p.age / 20);
        const opacity = t;
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, t * 4), 0, Math.PI * 2);
        ctx.fill();
      }

      // Main cursor dot
      ctx.fillStyle = "#00d4ff";
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Crosshair
      ctx.strokeStyle = "rgba(0, 212, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mouseX - 10, mouseY);
      ctx.lineTo(mouseX + 10, mouseY);
      ctx.moveTo(mouseX, mouseY - 10);
      ctx.lineTo(mouseX, mouseY + 10);
      ctx.stroke();

      while (trail.length > 0 && trail[0].age > 20) {
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
