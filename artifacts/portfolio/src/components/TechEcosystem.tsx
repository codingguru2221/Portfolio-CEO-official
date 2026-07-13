import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const orbits = [
  {
    radius: 110,
    speed: 0.006,
    color: "#00d4ff",
    label: "Languages",
    nodes: ["Python", "JavaScript", "Java", "C++", "HTML/CSS"],
  },
  {
    radius: 190,
    speed: 0.004,
    color: "#a855f7",
    label: "Databases",
    nodes: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    radius: 280,
    speed: 0.0025,
    color: "#22d3ee",
    label: "Cloud",
    nodes: ["AWS", "Docker", "Git", "Linux", "GitHub"],
  },
  {
    radius: 375,
    speed: 0.0018,
    color: "#f59e0b",
    label: "AI Tools",
    nodes: ["Gemini", "OpenAI", "TensorFlow", "Ollama", "LangChain"],
  },
  {
    radius: 465,
    speed: 0.0012,
    color: "#ef4444",
    label: "Security",
    nodes: ["Cryptography", "EDR", "OCR", "Pen Testing", "Firewalls"],
    isShield: true,
  },
];

export default function TechEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Core glow
      const coreGlow = Math.abs(Math.sin(time * 0.04)) * 12 + 22;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreGlow * 3);
      grad.addColorStop(0, "rgba(0,212,255,0.7)");
      grad.addColorStop(1, "rgba(0,212,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreGlow * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#00d4ff";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#00d4ff";
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px Orbitron, monospace";
      ctx.textAlign = "center";
      ctx.fillText("FOUNDER", cx, cy + 30);

      orbits.forEach((orbit) => {
        // Draw orbit ring
        ctx.save();
        ctx.strokeStyle = orbit.isShield
          ? `rgba(239,68,68,${0.12 + Math.abs(Math.sin(time * 0.02)) * 0.2})`
          : "rgba(255,255,255,0.06)";
        ctx.lineWidth = orbit.isShield ? 2 : 1;
        ctx.setLineDash(orbit.isShield ? [6, 4] : []);
        ctx.beginPath();
        ctx.arc(cx, cy, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Draw nodes
        orbit.nodes.forEach((node, j) => {
          const angle = time * orbit.speed + (j * Math.PI * 2) / orbit.nodes.length;
          const x = cx + Math.cos(angle) * orbit.radius;
          const y = cy + Math.sin(angle) * orbit.radius;

          // Node dot
          ctx.fillStyle = orbit.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = orbit.color;
          ctx.beginPath();
          ctx.arc(x, y, orbit.isShield ? 4 : 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Label
          if (!orbit.isShield) {
            ctx.fillStyle = "rgba(255,255,255,0.75)";
            ctx.font = "10px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(node, x, y + 16);
          }

          // Occasional line to center
          if (Math.sin(time * 0.08 + j * 1.3) > 0.97) {
            ctx.strokeStyle = orbit.color;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 0.25;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      time += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      id="tech-ecosystem"
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-start py-16 px-6 min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">
          Signature Section
        </p>
        <h2
          className="text-3xl md:text-5xl font-black font-mono"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Technology Ecosystem
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Tech nodes orbit the founder core — live animation
        </p>
      </motion.div>

      <canvas
        ref={canvasRef}
        className="w-full rounded-2xl"
        style={{
          maxWidth: 1000,
          height: 600,
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {orbits.map((o) => (
          <div key={o.label} className="flex items-center gap-2 text-xs font-mono">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: o.color, boxShadow: `0 0 8px ${o.color}` }}
            />
            <span style={{ color: o.color }}>{o.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
