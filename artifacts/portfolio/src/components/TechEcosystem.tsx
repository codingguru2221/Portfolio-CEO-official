import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "ai",
    label: "AI",
    color: "#ec4899",
    angle: 90,
    items: ["Gemini", "OpenAI", "TensorFlow", "LangChain", "OpenCV", "Ollama"],
  },
  {
    id: "cloud",
    label: "Cloud",
    color: "#3b82f6",
    angle: 38,
    items: ["AWS", "Docker", "Linux", "GitHub", "Git", "Vercel"],
  },
  {
    id: "security",
    label: "Security",
    color: "#ef4444",
    angle: 142,
    items: ["Cryptography", "EDR", "OCR", "Pen Testing", "Firewalls"],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#22d3ee",
    angle: 0,
    items: ["Flask", "Spring Boot", "Express", "Python", "Java"],
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#a855f7",
    angle: 180,
    items: ["React", "HTML5", "CSS3", "JavaScript", "Tailwind"],
  },
  {
    id: "database",
    label: "Database",
    color: "#f59e0b",
    angle: 322,
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#10b981",
    angle: 218,
    items: ["VS Code", "Postman", "Linux Terminal", "GitHub Actions"],
  },
  {
    id: "projects",
    label: "Projects",
    color: "#6366f1",
    angle: 270,
    items: ["CryptoShield", "Trinetra", "AI Study", "TheStudyCore", "Identity Verifier"],
  },
];

export default function TechEcosystem() {
  const [active, setActive] = useState<string | null>(null);
  const R = 220;

  return (
    <section id="tech-ecosystem" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">Signature Section</p>
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
          <p className="text-gray-400 text-sm mt-3">Hover a category to explore the tools</p>
        </motion.div>

        <div className="flex items-center justify-center">
          <div className="relative" style={{ width: R * 2 + 160, height: R * 2 + 160 }}>
            {/* Rings */}
            <div
              className="absolute rounded-full border border-cyan-500/10"
              style={{ inset: 0, margin: 20 }}
            />
            <div
              className="absolute rounded-full border border-purple-500/10 animate-[spin_40s_linear_infinite]"
              style={{ inset: 30 }}
            />

            {/* Center founder node */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,212,255,0.2), rgba(0,0,0,0))",
                border: "2px solid rgba(0,212,255,0.5)",
                boxShadow: "0 0 40px rgba(0,212,255,0.3)",
              }}
            >
              <div className="text-center">
                <div className="text-cyan-400 font-mono text-xs font-bold">FOUNDER</div>
                <div className="text-[10px] text-gray-500 font-mono">CORE</div>
              </div>
            </div>

            {/* Category nodes */}
            {categories.map((cat) => {
              const rad = ((cat.angle - 90) * Math.PI) / 180;
              const x = Math.cos(rad) * R;
              const y = Math.sin(rad) * R;
              const isActive = active === cat.id;

              return (
                <div
                  key={cat.id}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                  }}
                >
                  {/* Connection line */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: 0,
                      height: 0,
                      overflow: "visible",
                    }}
                  />

                  {/* Sub-items */}
                  <AnimatePresence>
                    {isActive &&
                      cat.items.map((item, i) => {
                        const spread = 45;
                        const total = cat.items.length;
                        const offsetAngle = ((i - (total - 1) / 2) * spread * Math.PI) / 180;
                        const outRad = rad + Math.PI + offsetAngle;
                        const dist = 100;
                        const sx = Math.cos(outRad) * dist;
                        const sy = Math.sin(outRad) * dist;
                        return (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                            animate={{ x: sx, y: sy, opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                            transition={{ delay: i * 0.04, type: "spring", stiffness: 300 }}
                            className="absolute px-2 py-1 rounded-full text-[10px] font-mono whitespace-nowrap"
                            style={{
                              transform: `translate(calc(${sx}px - 50%), calc(${sy}px - 50%))`,
                              background: `${cat.color}18`,
                              border: `1px solid ${cat.color}66`,
                              color: cat.color,
                              boxShadow: `0 0 12px ${cat.color}33`,
                              left: 0,
                              top: 0,
                            }}
                          >
                            {item}
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>

                  {/* Node button */}
                  <motion.button
                    onMouseEnter={() => setActive(cat.id)}
                    onMouseLeave={() => setActive(null)}
                    whileHover={{ scale: 1.15 }}
                    className="px-4 py-2 rounded-full font-mono text-xs font-bold transition-all relative z-10"
                    style={{
                      background: isActive ? `${cat.color}33` : `${cat.color}11`,
                      border: `1px solid ${isActive ? cat.color : cat.color + "44"}`,
                      color: cat.color,
                      boxShadow: isActive ? `0 0 25px ${cat.color}55` : "none",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {cat.label}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
