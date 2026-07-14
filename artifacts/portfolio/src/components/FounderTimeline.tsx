import { motion } from "framer-motion";

const steps = [
  {
    year: "2021",
    context: "11th Class + ITI (2021-2022)",
    title: "Discovering Programming",
    icon: "🌱",
    desc: "Started my journey into technology during 11th grade while pursuing ITI alongside school. Learned the fundamentals of programming and discovered a passion for software development, exploring languages like C, C++, and the basics of web technologies.",
  },
  {
    year: "2022",
    context: "12th Class + ITI (2022-2023)",
    title: "Problem Solver",
    icon: "🧩",
    desc: "Focused on strengthening programming fundamentals and logical thinking. Built small applications and practice projects while improving problem-solving skills through consistent coding and self-learning.",
  },
  {
    year: "July 2023",
    context: "Started B.Tech (Computer Science Engineering)",
    title: "Engineering Journey",
    icon: "🎓",
    desc: "Joined B.Tech in Computer Science Engineering in July 2023. Entered a professional learning environment where software engineering, databases, networking, operating systems, and development became the foundation of my career.",
  },
  {
    year: "2023-2024",
    context: "Developer Growth",
    title: "Becoming a Developer",
    icon: "💻",
    desc: "Started building real-world applications using Java, Python, web technologies, databases, and backend development. Explored AI, cybersecurity, and full-stack development while continuously improving development skills.",
  },
  {
    year: "2025",
    context: "First Hackathon Journey",
    title: "Entering Hackathons",
    icon: "🏆",
    desc: "Started participating in national hackathons and innovation competitions. Collaborated with teams, built working prototypes, solved real-world challenges, and gained valuable experience in product development under time constraints.",
    highlights: [
      "Navonmesh Hackathon",
      "HackPrix",
      "AI for Bharat",
      "Other hackathons and technical events",
    ],
  },
  {
    year: "2026",
    context: "Founder Journey",
    title: "Founded TheCOdex Software Solutions",
    icon: "🚀",
    desc: "Turned years of learning and project experience into a software company focused on building scalable web applications, AI-powered solutions, automation systems, cybersecurity products, and digital transformation services.",
  },
  {
    year: "2026 - Present",
    context: "Founder & CEO",
    title: "Leading Innovation",
    icon: "👑",
    desc: "Currently serving as Founder & CEO of TheCOdex Software Solutions while pursuing B.Tech (3rd Year). Focused on building innovative software products, AI solutions, cybersecurity platforms, and helping startups and businesses with modern technology.",
  },
  {
    year: "Future",
    context: "Building the Digital Universe",
    title: "Engineering the Future",
    icon: "🌌",
    desc: "Working towards creating a technology ecosystem where artificial intelligence, cybersecurity, automation, and cloud computing come together to build secure, scalable, and impactful digital solutions for the future.",
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
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

          <div className="space-y-10 md:space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={`${step.year}-${step.title}`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 pl-12 md:pl-0 md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <div
                      className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] text-left ${
                        isLeft ? "md:text-right" : "md:text-left"
                      }`}
                      style={{
                        background: "rgba(0,212,255,0.04)",
                        border: "1px solid rgba(0,212,255,0.15)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 0 20px rgba(0,212,255,0.05)",
                      }}
                    >
                      <div
                        className={`flex flex-col gap-1 mb-3 items-start ${
                          isLeft ? "md:items-end" : "md:items-start"
                        }`}
                      >
                        <span className="text-xs font-mono text-purple-400 tracking-widest">
                          {step.year}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-300/70 uppercase tracking-[0.18em]">
                          {step.context}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-mono mb-2">
                        {step.icon} {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      {"highlights" in step && step.highlights && (
                        <div
                          className={`mt-4 flex flex-wrap gap-2 justify-start ${
                            isLeft ? "md:justify-end" : "md:justify-start"
                          }`}
                        >
                          {step.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[11px] font-mono text-cyan-200/80"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute left-2 md:static flex-shrink-0 z-10">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-cyan-400"
                      style={{
                        background: "#030712",
                        boxShadow: "0 0 15px rgba(0,212,255,0.8)",
                      }}
                    />
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
