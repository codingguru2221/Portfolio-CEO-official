import { useEffect, useRef } from "react";

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
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

    const orbits = [
      { radius: 100, speed: 0.005, nodes: ["Python", "JS", "Java", "C++", "HTML/CSS"], color: "#00d4ff" },
      { radius: 180, speed: 0.003, nodes: ["MySQL", "PostgreSQL", "MongoDB", "Redis"], color: "#a855f7" },
      { radius: 270, speed: 0.002, nodes: ["AWS", "Docker", "Git", "Linux", "GitHub"], color: "#00d4ff" },
      { radius: 370, speed: 0.0015, nodes: ["Gemini", "OpenAI", "TensorFlow", "Ollama"], color: "#ffaa00" },
      { radius: 480, speed: 0.001, nodes: ["Firewall Layer", "IDS", "Zero Trust"], color: "#ff0055", isShield: true },
      { radius: 600, speed: 0.0008, nodes: ["CryptoShield", "AI Study Platform", "Trinetra Sentinel"], color: "#00ffaa" },
    ];

    let time = 0;

    const draw = () => {
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Nebula blobs
      ctx.globalCompositeOperation = "lighter";
      const grad1 = ctx.createRadialGradient(
        centerX + Math.sin(time * 0.001) * 150, centerY + Math.cos(time * 0.001) * 150, 0,
        centerX + Math.sin(time * 0.001) * 150, centerY + Math.cos(time * 0.001) * 150, 400
      );
      grad1.addColorStop(0, "rgba(168,85,247,0.04)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      // Stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255,255,255,${Math.abs(Math.sin(time * 0.01 + star.opacity)) * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      // Core glow
      const coreGlow = Math.abs(Math.sin(time * 0.05)) * 10 + 20;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreGlow * 2);
      gradient.addColorStop(0, "rgba(0,212,255,0.8)");
      gradient.addColorStop(1, "rgba(0,212,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreGlow * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#00d4ff";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#00d4ff";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px Orbitron, monospace";
      ctx.textAlign = "center";
      ctx.fillText("TheCOdex Core", centerX, centerY + 32);

      // Orbits and nodes
      orbits.forEach((orbit) => {
        ctx.strokeStyle = orbit.isShield
          ? `rgba(255,0,85,${0.1 + Math.abs(Math.sin(time * 0.02)) * 0.2})`
          : "rgba(255,255,255,0.05)";
        ctx.lineWidth = orbit.isShield ? 3 : 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();

        orbit.nodes.forEach((node, j) => {
          const angle = time * orbit.speed + (j * (Math.PI * 2)) / orbit.nodes.length;
          const x = centerX + Math.cos(angle) * orbit.radius;
          const y = centerY + Math.sin(angle) * orbit.radius;

          ctx.fillStyle = orbit.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = orbit.color;
          ctx.beginPath();
          ctx.arc(x, y, orbit.isShield ? 3 : 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          if (!orbit.isShield) {
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.font = "10px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(node, x, y + 15);

            if (Math.sin(time * 0.1 + j) > 0.98) {
              ctx.strokeStyle = orbit.color;
              ctx.lineWidth = 0.5;
              ctx.globalAlpha = 0.3;
              ctx.beginPath();
              ctx.moveTo(centerX, centerY);
              ctx.lineTo(x, y);
              ctx.stroke();
              ctx.globalAlpha = 1.0;
            }
          }
        });
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
