import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const planets = [
  {
    name: "CryptoShield",
    color: "#3b82f6",
    size: 70,
    x: "15%",
    y: "20%",
    ring: true,
    desc: "Pendrive-based password manager. Credentials accessible only when registered pendrive is connected. Responsible and portable security.",
    tech: ["Python", "Cryptography", "Tkinter"],
    github: "https://github.com/codingguru2221",
    type: "Security Tool",
  },
  {
    name: "Trinetra Sentinel",
    color: "#ef4444",
    size: 80,
    x: "75%",
    y: "15%",
    ring: true,
    desc: "Lightweight offline EDR prototype with real-time monitoring, behavioral anomaly detection, threat scoring, and AI-assisted threat analysis.",
    tech: ["Python", "ML", "EDR", "AI"],
    github: "https://github.com/codingguru2221",
    type: "Cybersecurity",
  },
  {
    name: "AI Study Platform",
    color: "#f59e0b",
    size: 65,
    x: "50%",
    y: "25%",
    ring: false,
    desc: "Educational web app with AI-driven learning. Features syllabus creation, smart exam prep, and personalized study packages.",
    tech: ["Flask", "Gemini API", "Python", "HTML/CSS/JS"],
    github: "https://github.com/codingguru2221",
    type: "EdTech",
  },
  {
    name: "Identity Verifier",
    color: "#a855f7",
    size: 72,
    x: "20%",
    y: "65%",
    ring: true,
    desc: "AI-powered cybersecurity solution preventing digital identity fraud using OCR, AI forgery detection, and privacy-preserving risk scoring.",
    tech: ["AI", "OCR", "Python", "ML"],
    github: "https://github.com/codingguru2221",
    type: "AI Security",
  },
  {
    name: "TheStudyCore",
    color: "#10b981",
    size: 68,
    x: "72%",
    y: "65%",
    ring: false,
    desc: "Free AI-integrated study companion with accessible resources, trusted links, and instant AI-powered answers. Learning made simpler.",
    tech: ["Web", "AI", "HTML/CSS/JS"],
    github: "https://github.com/codingguru2221",
    type: "EdTech",
  },
];

export default function ProjectGalaxy() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="project-galaxy" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">Deployed Missions</p>
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
          <p className="text-gray-400 text-sm mt-3">Hover a planet to explore the mission</p>
        </motion.div>

        {/* Galaxy container */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            height: "550px",
            background: "radial-gradient(ellipse at center, rgba(168,85,247,0.06) 0%, rgba(0,212,255,0.03) 50%, transparent 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Floating stars */}
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}

          {planets.map((planet) => {
            const isHov = hovered === planet.name;

            return (
              <div
                key={planet.name}
                className="absolute"
                style={{ left: planet.x, top: planet.y, transform: "translate(-50%, -50%)" }}
              >
                {/* Planet hover popup */}
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute z-20 w-64 rounded-xl p-4 pointer-events-none"
                      style={{
                        bottom: planet.size / 2 + 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(3,7,18,0.95)",
                        border: `1px solid ${planet.color}44`,
                        backdropFilter: "blur(16px)",
                        boxShadow: `0 0 30px ${planet.color}22`,
                      }}
                    >
                      <div className="text-xs font-mono mb-1" style={{ color: planet.color }}>
                        {planet.type}
                      </div>
                      <div className="font-bold text-white text-sm mb-2">{planet.name}</div>
                      <p className="text-gray-400 text-xs leading-relaxed mb-3">{planet.desc}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {planet.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                            style={{
                              background: `${planet.color}18`,
                              border: `1px solid ${planet.color}44`,
                              color: planet.color,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 pointer-events-auto">
                        <a
                          href={planet.github}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded text-[10px] font-mono transition-all hover:opacity-80"
                          style={{ background: `${planet.color}33`, color: planet.color, border: `1px solid ${planet.color}44` }}
                        >
                          View Code
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Planet */}
                <motion.div
                  onMouseEnter={() => setHovered(planet.name)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    y: [0, -8, 0],
                    rotateZ: isHov ? 360 : 0,
                  }}
                  transition={{
                    y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                    rotateZ: { duration: 1.5 },
                  }}
                  className="relative cursor-pointer"
                  style={{ width: planet.size, height: planet.size }}
                >
                  {/* Ring */}
                  {planet.ring && (
                    <div
                      className="absolute"
                      style={{
                        width: planet.size * 1.8,
                        height: planet.size * 0.35,
                        borderRadius: "50%",
                        border: `2px solid ${planet.color}55`,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%) rotateX(75deg)",
                        boxShadow: `0 0 10px ${planet.color}33`,
                      }}
                    />
                  )}

                  {/* Planet body */}
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${planet.color}cc, ${planet.color}44)`,
                      boxShadow: isHov
                        ? `0 0 40px ${planet.color}88, 0 0 80px ${planet.color}44`
                        : `0 0 20px ${planet.color}44`,
                      transition: "box-shadow 0.3s",
                    }}
                  />

                  {/* Label */}
                  <div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap font-bold"
                    style={{ color: planet.color }}
                  >
                    {planet.name}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
