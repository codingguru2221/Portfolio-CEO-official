import { useEffect, useRef } from "react";

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      opacity: Math.random(),
      speed: (Math.random() - 0.5) * 0.02,
    }));

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      // Draw nebulas (simple slow moving blobs)
      const cx = width / 2;
      const cy = height / 2;

      ctx.globalCompositeOperation = "lighter";
      
      const grad1 = ctx.createRadialGradient(
        cx + Math.sin(time * 0.001) * 200,
        cy + Math.cos(time * 0.001) * 200,
        0,
        cx + Math.sin(time * 0.001) * 200,
        cy + Math.cos(time * 0.001) * 200,
        500
      );
      grad1.addColorStop(0, "rgba(168, 85, 247, 0.05)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        cx + Math.cos(time * 0.0015) * 300,
        cy + Math.sin(time * 0.0015) * 300,
        0,
        cx + Math.cos(time * 0.0015) * 300,
        cy + Math.sin(time * 0.0015) * 300,
        600
      );
      grad2.addColorStop(0, "rgba(0, 212, 255, 0.05)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${
          Math.abs(Math.sin(time * 0.01 + star.opacity)) * 0.8
        })`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed * 10;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
