import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "ai",
    name: "AI Integration",
    icon: "🤖",
    color: "#ec4899",
    desc: "Embed Gemini, OpenAI, custom ML models into your products for intelligent automation and insights.",
    features: ["Gemini & OpenAI API integration", "Custom ML pipeline deployment", "AI-powered chatbots & assistants"],
  },
  {
    id: "web",
    name: "Web Development",
    icon: "⚡",
    color: "#00d4ff",
    desc: "Full-stack custom web applications built for speed, scalability, and clean UX.",
    features: ["React & modern frontend stacks", "Express / Flask / Spring Boot APIs", "PostgreSQL / MongoDB databases"],
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    icon: "☁️",
    color: "#3b82f6",
    desc: "Scalable cloud architectures on AWS with containerization and automated deployments.",
    features: ["AWS EC2, S3, Lambda setup", "Docker containerization", "CI/CD pipeline automation"],
  },
  {
    id: "automation",
    name: "Automation Systems",
    icon: "⚙️",
    color: "#f59e0b",
    desc: "Eliminate manual workflows with smart automation systems that save time and reduce errors.",
    features: ["Workflow bots & scheduled tasks", "API integration connectors", "Data scraping & processing"],
  },
  {
    id: "security",
    name: "Cyber Security",
    icon: "🛡️",
    color: "#ef4444",
    desc: "Protect your digital assets with security audits, EDR setups, and identity verification systems.",
    features: ["Security vulnerability audits", "EDR implementation & monitoring", "Digital identity fraud prevention"],
  },
  {
    id: "saas",
    name: "SaaS Products",
    icon: "📦",
    color: "#10b981",
    desc: "Build subscription-based software from scratch with multi-tenant architecture and payment systems.",
    features: ["Multi-tenant architecture", "Stripe/Razorpay payment integration", "Admin dashboards & analytics"],
  },
  {
    id: "consulting",
    name: "Tech Consulting",
    icon: "🎯",
    color: "#a855f7",
    desc: "Strategic technology guidance for startups — from architecture decisions to vendor selection.",
    features: ["System architecture review", "Tech stack & vendor selection", "MVP planning & roadmap"],
  },
];

export default function CommandCenter() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="services" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">Service Modules</p>
          <h2
            className="text-3xl md:text-5xl font-black font-mono"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Command Center
          </h2>
          <p className="text-gray-400 text-sm mt-3">Hover or click a module to deploy</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => {
            const isOpen = expanded === svc.id;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setExpanded(isOpen ? null : svc.id)}
                className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: isOpen ? `${svc.color}0d` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isOpen ? svc.color + "55" : "rgba(255,255,255,0.08)"}`,
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Module header */}
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{
                    background: `${svc.color}18`,
                    borderBottom: `1px solid ${svc.color}22`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{svc.icon}</span>
                    <span
                      className="font-mono text-xs font-bold tracking-widest uppercase"
                      style={{ color: svc.color }}
                    >
                      {svc.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 font-mono text-[10px]">ACTIVE</span>
                  </div>
                </div>

                {/* Module body */}
                <div className="p-5">
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{svc.desc}</p>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 mb-4">
                          {svc.features.map((f, fi) => (
                            <div key={fi} className="flex items-start gap-2">
                              <span style={{ color: svc.color }} className="text-xs mt-0.5">▸</span>
                              <span className="text-gray-300 text-xs">{f}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="w-full py-2 rounded-lg font-mono text-xs font-bold transition-all hover:opacity-90 tracking-widest"
                          style={{
                            background: `${svc.color}22`,
                            border: `1px solid ${svc.color}55`,
                            color: svc.color,
                          }}
                        >
                          ▶ DEPLOY SERVICE
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isOpen && (
                    <div
                      className="font-mono text-[10px] tracking-widest opacity-40"
                      style={{ color: svc.color }}
                    >
                      CLICK TO EXPAND
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
