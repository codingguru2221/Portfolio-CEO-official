import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Founded", value: "2024", suffix: "" },
  { label: "Projects", value: "5", suffix: "+" },
  { label: "Services", value: "6", suffix: "" },
  { label: "Products", value: "3", suffix: "" },
  { label: "Clients", value: "Growing", suffix: "" },
];

const services = [
  {
    icon: "⚡",
    name: "Custom Web Apps",
    color: "#00d4ff",
    desc: "Full-stack web applications aligned with your business workflows — React, Flask, Spring Boot.",
  },
  {
    icon: "🤖",
    name: "AI Integration",
    color: "#a855f7",
    desc: "Embedding Gemini, OpenAI, custom ML models into your products. Chatbots, automation, analysis.",
  },
  {
    icon: "☁️",
    name: "Cloud & DevOps",
    color: "#3b82f6",
    desc: "AWS, Docker, CI/CD pipelines, scalable infrastructure. Production-ready deployments.",
  },
  {
    icon: "🛡️",
    name: "Cyber Security",
    color: "#ef4444",
    desc: "EDR systems, identity verification, security audits. Protecting your digital assets.",
  },
  {
    icon: "⚙️",
    name: "Business Automation",
    color: "#f59e0b",
    desc: "Reduce manual effort with smart automation. Workflow bots, scheduled tasks, API connectors.",
  },
  {
    icon: "📦",
    name: "SaaS Products",
    color: "#10b981",
    desc: "Multi-tenant architecture, payment integration, analytics dashboards. Scale from day one.",
  },
];

function CountUp({ target, suffix }: { target: string; suffix: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const num = parseInt(target);
    if (isNaN(num)) {
      setDisplay(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const val = Math.floor(progress * num);
            setDisplay(String(val));
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(String(num));
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl font-black font-mono text-white">
      {display}
      {suffix}
    </div>
  );
}

export default function CompanyDashboard() {
  return (
    <section id="company" className="relative z-10 py-24 px-6">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">
            Company Dashboard
          </p>
          <h2
            className="text-3xl md:text-5xl font-black font-mono"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TheCOdex Command
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            TheCOdex Software Solutions designs and develops custom web applications for startups,
            service businesses, and growing teams. We build SaaS products, internal platforms, and
            automation systems that reduce manual effort and create room for scale.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl text-center"
              style={{
                background: "rgba(0,212,255,0.04)",
                border: "1px solid rgba(0,212,255,0.2)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 20px rgba(0,212,255,0.05)",
              }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} />
              <div className="text-xs font-mono text-cyan-400/60 tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-xl group transition-all duration-300"
              style={{
                background: `${svc.color}08`,
                border: `1px solid ${svc.color}30`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 inline-block"
              >
                {svc.icon}
              </div>
              <h3
                className="font-bold font-mono text-base mb-2 group-hover:opacity-100"
                style={{ color: svc.color }}
              >
                {svc.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
              <div
                className="mt-3 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity tracking-widest"
                style={{ color: svc.color }}
              >
                ▶ ACTIVE MODULE
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
