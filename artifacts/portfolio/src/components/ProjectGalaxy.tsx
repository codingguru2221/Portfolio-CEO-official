import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    name: "CryptoShield",
    color: "#3b82f6",
    orbitRadius: 120,
    speed: 0.004,
    startAngle: 0,
    desc: "Pendrive-based password manager. Credentials are accessible only when the registered pendrive is physically connected. Secure, portable, offline.",
    tech: ["Python", "Cryptography", "Tkinter"],
    github: "https://github.com/codingguru2221",
    type: "Security Tool",
  },
  {
    name: "Trinetra Sentinel",
    color: "#ef4444",
    orbitRadius: 200,
    speed: 0.003,
    startAngle: Math.PI * 0.4,
    desc: "Lightweight offline EDR prototype with real-time monitoring, behavioral anomaly detection, and AI-assisted threat analysis.",
    tech: ["Python", "ML", "EDR"],
    github: "https://github.com/codingguru2221",
    type: "Cybersecurity",
  },
  {
    name: "AI Study Platform",
    color: "#f59e0b",
    orbitRadius: 290,
    speed: 0.0022,
    startAngle: Math.PI * 0.9,
    desc: "Educational web app with AI-driven learning, syllabus creation, smart exam prep, and personalized study packages powered by Gemini.",
    tech: ["Flask", "Gemini API", "Python", "HTML/CSS/JS"],
    github: "https://github.com/codingguru2221",
    type: "EdTech",
  },
  {
    name: "Identity Verifier",
    color: "#a855f7",
    orbitRadius: 375,
    speed: 0.0016,
    startAngle: Math.PI * 1.5,
    desc: "AI-powered digital identity fraud prevention using OCR, AI forgery detection, and privacy-preserving risk scoring.",
    tech: ["AI", "OCR", "Python"],
    github: "https://github.com/codingguru2221",
    type: "AI Security",
  },
  {
    name: "TheStudyCore",
    color: "#10b981",
    orbitRadius: 455,
    speed: 0.001,
    startAngle: Math.PI * 0.2,
    desc: "Free AI-integrated study companion with accessible resources, trusted links, and instant AI-powered answers. Learning made simpler.",
    tech: ["Web", "AI", "HTML/CSS/JS"],
    github: "https://github.com/codingguru2221",
    type: "EdTech",
  },
];

type NodePos = { x: number; y: number };

export default function ProjectGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const posRef = useRef<NodePos[]>(projects.map(() => ({ x: 0, y: 0 })));
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Stars
      ctx.fillStyle = "rgba(255,255,255,0.0)";
      ctx.fillRect(0, 0, w, h);

      // Center core
      const coreGlow = Math.abs(Math.sin(t * 0.04)) * 8 + 18;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreGlow * 2.5);
      grad.addColorStop(0, "rgba(0,212,255,0.7)");
      grad.addColorStop(1, "rgba(0,212,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreGlow * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 20;
      ctx.shadowColor = "#00d4ff";
      ctx.fillStyle = "#00d4ff";
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#fff";
      ctx.font = "bold 10px Orbitron, monospace";
      ctx.textAlign = "center";
      ctx.fillText("PROJECTS", cx, cy + 26);

      // Orbits + project nodes
      projects.forEach((proj, i) => {
        const angle = proj.startAngle + t * proj.speed;
        const x = cx + Math.cos(angle) * proj.orbitRadius;
        const y = cy + Math.sin(angle) * proj.orbitRadius;
        posRef.current[i] = { x, y };

        // Orbit ring
        ctx.strokeStyle =
          i === selected
            ? `${proj.color}88`
            : "rgba(255,255,255,0.06)";
        ctx.lineWidth = i === selected ? 2 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, proj.orbitRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Planet glow
        if (i === selected) {
          ctx.shadowBlur = 30;
          ctx.shadowColor = proj.color;
        }

        // Planet body
        const r = i === selected ? 14 : 10;
        const planetGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
        planetGrad.addColorStop(0, proj.color + "ff");
        planetGrad.addColorStop(1, proj.color + "55");
        ctx.fillStyle = planetGrad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = i === selected ? proj.color : "rgba(255,255,255,0.65)";
        ctx.font = i === selected ? "bold 11px Inter, sans-serif" : "10px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(proj.name, x, y + r + 14);
      });

      timeRef.current += 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [selected]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (mx * scaleX);
    const cy = (my * scaleY);

    let hit = false;
    posRef.current.forEach((pos, i) => {
      const dist = Math.hypot(cx - pos.x, cy - pos.y);
      if (dist < 22) {
        setSelected((prev) => (prev === i ? null : i));
        hit = true;
      }
    });
    if (!hit) setSelected(null);
  };

  const sel = selected !== null ? projects[selected] : null;

  return (
    <div id="project-galaxy" className="relative z-10 flex flex-col items-center justify-start py-16 px-6 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">
          Deployed Missions
        </p>
        <h2
          className="text-3xl md:text-5xl font-black font-mono"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Project Galaxy
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Click a planet to reveal the mission details
        </p>
      </motion.div>

      <div className="relative w-full flex flex-col lg:flex-row gap-6 items-start justify-center" style={{ maxWidth: 1100 }}>
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="rounded-2xl cursor-pointer flex-shrink-0"
          style={{
            width: "min(600px, 100%)",
            height: 600,
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(4px)",
          }}
        />

        {/* Project detail panel */}
        <div className="flex-1 min-w-0 lg:min-w-[320px]">
          <AnimatePresence mode="wait">
            {sel !== null && selected !== null ? (
              <motion.div
                key={sel.name}
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-6"
                style={{
                  background: `${sel.color}0d`,
                  border: `1px solid ${sel.color}44`,
                  backdropFilter: "blur(16px)",
                  boxShadow: `0 0 40px ${sel.color}18`,
                }}
              >
                <div
                  className="text-xs font-mono tracking-widest uppercase mb-2"
                  style={{ color: sel.color }}
                >
                  {sel.type}
                </div>
                <h3 className="text-2xl font-black font-mono text-white mb-4">
                  {sel.name}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {sel.desc}
                </p>

                <div className="mb-5">
                  <div className="text-xs font-mono text-gray-500 tracking-widest mb-2">
                    TECH STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sel.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-mono"
                        style={{
                          background: `${sel.color}18`,
                          border: `1px solid ${sel.color}44`,
                          color: sel.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={sel.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: `${sel.color}22`,
                    border: `1px solid ${sel.color}66`,
                    color: sel.color,
                    boxShadow: `0 0 15px ${sel.color}22`,
                  }}
                >
                  ⬡ View on GitHub
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  minHeight: 280,
                }}
              >
                <div className="text-4xl">🪐</div>
                <p className="text-gray-500 font-mono text-sm">
                  Click any planet to explore the mission
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  {projects.map((p) => (
                    <div key={p.name} className="flex items-center gap-2 text-xs font-mono">
                      <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                      <span style={{ color: p.color }}>{p.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
