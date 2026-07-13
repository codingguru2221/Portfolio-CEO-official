import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  { year: "2021", title: "Started Learning", desc: "First Python script. The spark that changed everything.", icon: "💡" },
  { year: "2022", title: "First Projects", desc: "Web apps, security scripts, Python tools. Building momentum.", icon: "⚙️" },
  { year: "2023", title: "First Hackathon", desc: "RNTU Tech Fest — Runner Up. Competing under pressure, winning respect.", icon: "🏆" },
  { year: "2024", title: "Founded TheCOdex", desc: "Skills became a company. TheCOdex Software Solutions launched.", icon: "🚀" },
  { year: "2025", title: "HackPrix Finalist", desc: "HackPrix National Hackathon Hyderabad. AI for Bharat Qualifier (AWS).", icon: "🥇" },
  { year: "2026", title: "AI for Bharat", desc: "Multiple products. Expanding team. Cybersecurity + AI focus.", icon: "🌐" },
  { year: "2027+", title: "Future", desc: "AI products at scale. Digital security for everyone. Building the future.", icon: "🌌" },
];

export default function InnovationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rocketY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="innovation-timeline" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">Mission Log</p>
          <h2
            className="text-3xl md:text-5xl font-black font-mono"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Innovation Timeline
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Track */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

          {/* Rocket */}
          <motion.div
            className="absolute left-4 text-2xl z-10 pointer-events-none select-none"
            style={{ top: rocketY }}
          >
            🚀
          </motion.div>

          <div className="space-y-10 pl-20">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[52px] top-5 w-4 h-4 rounded-full border-2 border-cyan-400"
                  style={{
                    background: "#030712",
                    boxShadow: "0 0 12px rgba(0,212,255,0.8)",
                  }}
                />

                <div
                  className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] group"
                  style={{
                    background: "rgba(0,212,255,0.04)",
                    border: "1px solid rgba(0,212,255,0.12)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-xs font-mono text-purple-400 tracking-widest">{m.year}</span>
                    <span
                      className="text-sm font-bold font-mono text-white group-hover:text-cyan-400 transition-colors"
                    >
                      {m.title}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
