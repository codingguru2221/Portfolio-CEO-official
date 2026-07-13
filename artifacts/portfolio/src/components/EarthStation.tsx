import { useState } from "react";
import { motion } from "framer-motion";

const contactLinks = [
  { label: "EMAIL_1", value: "thecodexofficial001@gmail.com", href: "mailto:thecodexofficial001@gmail.com", color: "#00d4ff" },
  { label: "EMAIL_2", value: "codexveer@gmail.com", href: "mailto:codexveer@gmail.com", color: "#00d4ff" },
  { label: "LINKEDIN", value: "linkedin.com/in/veerendra-vishwakarma-041584393/", href: "https://www.linkedin.com/in/veerendra-vishwakarma-041584393/", color: "#3b82f6" },
  { label: "GITHUB", value: "github.com/codingguru2221", href: "https://github.com/codingguru2221", color: "#a855f7" },
  { label: "WEBSITE", value: "thecodexss.in", href: "https://thecodexss.in", color: "#10b981" },
  { label: "WHATSAPP", value: "+91 8305223353", href: "https://wa.me/918305223353", color: "#22c55e" },
];

export default function EarthStation() {
  const [form, setForm] = useState({ name: "", subject: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nSubject: ${form.subject}\n\n${form.message}`
    );
    window.open(
      `mailto:thecodexofficial001@gmail.com?subject=${encodeURIComponent(form.subject || "Contact from Portfolio")}&body=${body}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">Establish Contact</p>
          <h2
            className="text-3xl md:text-5xl font-black font-mono"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Earth Station
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Satellite animation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            {/* Satellite SVG */}
            <div className="relative w-48 h-48">
              {/* Signal waves */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full border border-cyan-500/20"
                  style={{
                    inset: -ring * 20,
                  }}
                  animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, delay: ring * 0.4, repeat: Infinity }}
                />
              ))}

              {/* Satellite body */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 flex items-center justify-center"
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-4xl"
                  style={{
                    background: "radial-gradient(circle, rgba(0,212,255,0.15), rgba(168,85,247,0.1))",
                    border: "2px solid rgba(0,212,255,0.3)",
                    boxShadow: "0 0 40px rgba(0,212,255,0.2)",
                  }}
                >
                  📡
                </div>
              </motion.div>
            </div>

            {/* Contact links */}
            <div className="w-full space-y-2">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg font-mono text-xs transition-all hover:scale-[1.02] group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="text-gray-600 group-hover:text-gray-400 transition-colors w-24 flex-shrink-0">
                    {link.label}:
                  </span>
                  <span
                    className="truncate transition-colors group-hover:opacity-100 opacity-70"
                    style={{ color: link.color }}
                  >
                    {link.value}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Mission Control form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(0,212,255,0.03)",
                border: "1px solid rgba(0,212,255,0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                MISSION CONTROL — SEND TRANSMISSION
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name", label: "OPERATOR NAME", type: "text", placeholder: "Your name" },
                  { key: "subject", label: "MISSION BRIEF", type: "text", placeholder: "Subject / project idea" },
                  { key: "email", label: "TRANSMISSION CODE", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[10px] font-mono text-gray-500 tracking-widest mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-cyan-500/60"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 tracking-widest mb-1">
                    MESSAGE PAYLOAD
                  </label>
                  <textarea
                    placeholder="Describe your mission..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-cyan-500/60 resize-none"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-lg font-mono text-sm font-bold tracking-widest transition-all"
                  style={{
                    background: sent
                      ? "rgba(16,185,129,0.2)"
                      : "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.3))",
                    border: `1px solid ${sent ? "#10b981" : "#00d4ff"}`,
                    color: sent ? "#10b981" : "#00d4ff",
                    boxShadow: `0 0 20px ${sent ? "rgba(16,185,129,0.3)" : "rgba(0,212,255,0.3)"}`,
                  }}
                >
                  {sent ? "✓ TRANSMISSION SENT" : "🚀 SEND TRANSMISSION"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
