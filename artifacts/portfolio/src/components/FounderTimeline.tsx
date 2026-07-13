import { motion } from "framer-motion";

const steps = [
  {
    year: "2021",
    title: "Student",
    icon: "🎓",
    desc: "3rd Year Engineering Student, ignited by curiosity about how systems work. Discovered the world of programming and never looked back.",
  },
  {
    year: "2022",
    title: "Problem Solver",
    icon: "🔍",
    desc: "Discovered passion for identifying and solving real-world tech problems. Built first scripts in Python. Learned to see technology as a tool, not just a subject.",
  },
  {
    year: "2022",
    title: "Developer",
    icon: "💻",
    desc: "Started building projects: Python scripts, web apps, security tools. Explored cybersecurity, AI, and backend development simultaneously.",
  },
  {
    year: "2023–2026",
    title: "Hackathons",
    icon: "🏆",
    desc: "RNTU Runner Up, HackPrix Finalist (Season 2 & 3), AI for Bharat Qualifier (AWS), Navonmesh Participant. Each hackathon sharpened problem-solving under pressure.",
  },
  {
    year: "2024",
    title: "Founder",
    icon: "🚀",
    desc: "Founded TheCOdex Software Solutions — turning skills and passion into a real company. Started delivering custom web apps to real clients.",
  },
  {
    year: "2024",
    title: "CEO",
    icon: "👑",
    desc: "Leading a software company focused on custom web apps, SaaS products, AI integration, and cybersecurity solutions for startups and growing teams.",
  },
  {
    year: "2026+",
    title: "Building Future",
    icon: "🌌",
    desc: "Engineering the Digital Universe — AI, Cybersecurity, and Scale. Building products that protect, empower, and transform how people interact with technology.",
  },
];

export default function FounderTimeline() {
  return (
    <section id="founder-story" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">
            Origin Story
          </p>
          <h2
            className="text-3xl md:text-5xl font-black font-mono"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

          <div className="space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div
                      className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                        isLeft ? "text-right" : "text-left"
                      }`}
                      style={{
                        background: "rgba(0,212,255,0.04)",
                        border: "1px solid rgba(0,212,255,0.15)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 0 20px rgba(0,212,255,0.05)",
                      }}
                    >
                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-end" : "justify-start"}`}>
                        <span className="text-xs font-mono text-purple-400 tracking-widest">{step.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-mono mb-2">
                        {step.icon} {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-cyan-400"
                      style={{
                        background: "#030712",
                        boxShadow: "0 0 15px rgba(0,212,255,0.8)",
                      }}
                    />
                  </div>

                  {/* Empty side */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
