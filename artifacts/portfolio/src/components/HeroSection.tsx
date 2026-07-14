import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import photo1 from "@assets/bhai_1783940902236.jpeg";
import photo2 from "@assets/2_nd__1783944009550.jpeg";

const categories = [
  {
    label: "Programming",
    angle: 0,
    color: "#00d4ff",
    items: ["Python", "JavaScript", "Java", "C++"],
  },
  {
    label: "Frontend",
    angle: 45,
    color: "#a855f7",
    items: ["React", "HTML5", "CSS3", "Tailwind"],
  },
  {
    label: "Backend",
    angle: 90,
    color: "#22d3ee",
    items: ["Flask", "Spring Boot", "Express", "Node.js"],
  },
  {
    label: "Database",
    angle: 135,
    color: "#f59e0b",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "AI",
    angle: 180,
    color: "#ec4899",
    items: ["Gemini", "OpenAI", "TensorFlow", "Ollama"],
  },
  {
    label: "Security",
    angle: 225,
    color: "#ef4444",
    items: ["Cryptography", "EDR", "OCR", "Pen Testing"],
  },
  {
    label: "Cloud",
    angle: 270,
    color: "#3b82f6",
    items: ["AWS", "Docker", "Git", "Linux"],
  },
  {
    label: "Projects",
    angle: 315,
    color: "#10b981",
    items: ["CryptoShield", "Trinetra", "AI Study", "TheStudyCore"],
  },
];

export default function HeroSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouseOffset({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const radius = 280;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ cursor: "none" }}
    >
      <motion.div
        className="relative flex flex-col items-center"
        style={{
          translateX: mouseOffset.x * -12,
          translateY: mouseOffset.y * -12,
        }}
      >
        {/* Big circle */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: radius * 2 + 120, height: radius * 2 + 120 }}
        >
          {/* Outer ring */}
          <div
            className="absolute rounded-full border border-cyan-500/20"
            style={{
              width: radius * 2 + 80,
              height: radius * 2 + 80,
              boxShadow: "0 0 60px rgba(0,212,255,0.05)",
            }}
          />
          <div
            className="absolute rounded-full border border-purple-500/15 animate-[spin_30s_linear_infinite]"
            style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}
          />

          {/* Category nodes on circle */}
          {categories.map((cat) => {
            const rad = (cat.angle * Math.PI) / 180;
            const x = Math.cos(rad) * (radius + 40);
            const y = Math.sin(rad) * (radius + 40);
            const isHov = hovered === cat.label;

            return (
              <div
                key={cat.label}
                className="absolute flex items-center justify-center"
                style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
              >
                <div
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className="absolute"
                >
                  {/* Sub-items */}
                  {isHov &&
                    cat.items.map((item, i) => {
                      const spread = 60;
                      const baseRad = rad + Math.PI;
                      const startAngle = baseRad - ((cat.items.length - 1) * (spread * Math.PI) / 180) / 2;
                      const itemRad = startAngle + i * (spread * Math.PI) / 180;
                      const ix = Math.cos(itemRad) * 90;
                      const iy = Math.sin(itemRad) * 90;
                      return (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="absolute px-2 py-0.5 rounded-full text-xs font-mono whitespace-nowrap"
                          style={{
                            transform: `translate(calc(${ix}px - 50%), calc(${iy}px - 50%))`,
                            background: `${cat.color}22`,
                            border: `1px solid ${cat.color}88`,
                            color: cat.color,
                            boxShadow: `0 0 10px ${cat.color}44`,
                          }}
                        >
                          {item}
                        </motion.div>
                      );
                    })}

                  {/* Node */}
                  <motion.button
                    onMouseEnter={() => setHovered(cat.label)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.2 }}
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border relative"
                    style={{
                      transform: "translate(-50%, -50%)",
                      background: isHov ? `${cat.color}33` : `${cat.color}11`,
                      border: `1px solid ${isHov ? cat.color : cat.color + "55"}`,
                      color: cat.color,
                      boxShadow: isHov ? `0 0 20px ${cat.color}66` : "none",
                    }}
                  >
                    {cat.label}
                  </motion.button>
                </div>
              </div>
            );
          })}

          {/* Center: profile + text */}
          <div className="relative z-10 flex flex-col items-center gap-3 select-none">
            {/* Firewall rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-cyan-500/30 animate-[spin_8s_linear_infinite]" />
              <div className="absolute w-56 h-56 rounded-full border border-purple-500/20 animate-[spin_6s_linear_infinite_reverse]" />
            </div>

            {/* Profile photo */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
            >
              <div className="w-44 h-44 md:w-48 md:h-48 rounded-full overflow-hidden ring-2 ring-cyan-500/60 shadow-[0_0_40px_rgba(0,212,255,0.45)] relative">
                <img
                  src={photo1}
                  alt="Veerendra"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHoveringPhoto ? "opacity-0" : "opacity-100"}`}
                />
                <img
                  src={photo2}
                  alt="Veerendra"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHoveringPhoto ? "opacity-100" : "opacity-0"}`}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-black animate-pulse" />
            </div>

            <div className="text-center">
              <div className="text-xs font-mono text-cyan-400/60 tracking-[0.24em] uppercase">Founder &amp; CEO</div>
              <div className="text-xl font-bold text-white font-mono">Veerendra Vishwakarma</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <img
                  src="/thecodex-logo.png"
                  alt="TheCOdex Software Solutions logo"
                  className="h-6 w-6 rounded-full object-cover bg-white"
                />
                <span className="text-[11px] text-purple-300 font-mono tracking-widest">
                  TheCOdex Software Solutions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Name + title */}
        <motion.div
          className="text-center -mt-4 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1
            className="text-4xl md:text-6xl font-black font-mono mb-2"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Veerendra Vishwakarma
          </h1>
          <p className="text-cyan-400 font-mono tracking-[0.2em] text-lg mb-1">
            FOUNDER &amp; CEO
          </p>
          <div className="mb-3 flex items-center justify-center gap-3">
            <img
              src="/thecodex-logo.png"
              alt="TheCOdex Software Solutions logo"
              className="h-10 w-10 rounded-full bg-white object-cover p-0.5 shadow-[0_0_20px_rgba(0,102,255,0.35)]"
            />
            <p className="text-purple-300 font-mono text-sm md:text-base tracking-widest">
              TheCOdex Software Solutions
            </p>
          </div>
          <p className="text-gray-400 text-sm italic max-w-lg mx-auto">
            "Architecting the Digital Future | Engineering Solutions That Scale"
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mt-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => document.getElementById("tech-ecosystem")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-explore-universe"
            className="px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00d4ff22, #00d4ff44)",
              border: "1px solid #00d4ff",
              color: "#00d4ff",
              boxShadow: "0 0 20px rgba(0,212,255,0.3)",
            }}
          >
            ◈ Explore Universe
          </button>
          <a
            href="https://github.com/codingguru2221"
            target="_blank"
            rel="noreferrer"
            data-testid="button-download-resume"
            className="px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300 hover:scale-105 border border-purple-500/60 text-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            ⬡ GitHub Projects
          </a>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-start-mission"
            className="px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300 hover:scale-105 border border-white/20 text-white/70 hover:bg-white/5 hover:text-white"
          >
            ▶ Start Mission
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
