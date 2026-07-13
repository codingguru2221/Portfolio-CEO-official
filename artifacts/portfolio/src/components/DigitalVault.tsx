import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cert1 from "@assets/Hackthon__1783941038153.jpg";
import cert2 from "@assets/image_1783941205684.png";
import cert3 from "@assets/image_1783941239713.png";

type Tab = "All" | "Hackathons" | "Certificates";

const hackathons = [
  { emoji: "🥇", title: "AI for Bharat Hackathon 2026", result: "Qualified Prototype Builder", sub: "Powered by AWS & Hack2Skill", color: "#f59e0b" },
  { emoji: "🥈", title: "RNTU Tech Fest Hackathon 2025", result: "Runner Up", sub: "Rajiv Gandhi Proudyogiki Vishwavidyalaya", color: "#a855f7" },
  { emoji: "🏅", title: "HackPrix Season 2 — Hyderabad", result: "Finalist", sub: "National Level Hackathon", color: "#3b82f6" },
  { emoji: "🏅", title: "HackPrix Season 3 — Hyderabad", result: "Finalist", sub: "National Level Hackathon", color: "#22d3ee" },
  { emoji: "🎯", title: "Navonmesh Binary Battle — Bhopal", result: "Participant", sub: "Innovation Hackathon 2025", color: "#10b981" },
  { emoji: "🎯", title: "EcoCode — Delhi", result: "Participant", sub: "Sustainability Tech Challenge", color: "#6366f1" },
];

const certificates = [
  { title: "Navonmesh 2025", img: cert1, color: "#10b981" },
  { title: "HackPrix Season 2", img: cert2, color: "#3b82f6" },
  { title: "HackPrix Season 3", img: cert3, color: "#a855f7" },
];

export default function DigitalVault() {
  const [tab, setTab] = useState<Tab>("All");
  const [openVault, setOpenVault] = useState<number | null>(null);

  const tabs: Tab[] = ["All", "Hackathons", "Certificates"];

  return (
    <section id="achievements" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">Achievement Archive</p>
          <h2
            className="text-3xl md:text-5xl font-black font-mono"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digital Vault
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-3 justify-center mb-10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-2 rounded-full font-mono text-xs tracking-widest transition-all duration-200"
              style={
                tab === t
                  ? { background: "rgba(0,212,255,0.2)", border: "1px solid #00d4ff", color: "#00d4ff" }
                  : { background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }
              }
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Hackathons */}
        {(tab === "All" || tab === "Hackathons") && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {hackathons.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="p-5 rounded-xl"
                style={{
                  background: `${h.color}08`,
                  border: `1px solid ${h.color}25`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="text-3xl mb-3">{h.emoji}</div>
                <div
                  className="font-bold font-mono text-sm mb-1"
                  style={{ color: h.color }}
                >
                  {h.result}
                </div>
                <div className="text-white text-sm font-medium mb-1">{h.title}</div>
                <div className="text-gray-500 text-xs">{h.sub}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificates — vault doors */}
        {(tab === "All" || tab === "Certificates") && (
          <div>
            <h3 className="text-center font-mono text-xs text-purple-400 tracking-[0.3em] uppercase mb-8">
              — Certificate Vault — Click to Open —
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificates.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                  style={{ perspective: 1000 }}
                >
                  {/* Vault container */}
                  <div
                    className="relative cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      height: 240,
                    }}
                    onClick={() => setOpenVault(openVault === i ? null : i)}
                  >
                    {/* Vault door (front) */}
                    <motion.div
                      animate={{ rotateY: openVault === i ? -120 : 0 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      style={{
                        transformOrigin: "left center",
                        transformStyle: "preserve-3d",
                        position: "absolute",
                        inset: 0,
                        zIndex: openVault === i ? 0 : 2,
                      }}
                    >
                      <div
                        className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-3"
                        style={{
                          background: `linear-gradient(135deg, ${cert.color}22, rgba(0,0,0,0.6))`,
                          border: `2px solid ${cert.color}44`,
                          backdropFilter: "blur(10px)",
                          boxShadow: `0 0 30px ${cert.color}22`,
                        }}
                      >
                        <div className="text-5xl">🔒</div>
                        <div className="font-mono text-sm font-bold" style={{ color: cert.color }}>
                          {cert.title}
                        </div>
                        <div className="text-gray-500 text-xs font-mono">CLICK TO UNLOCK</div>
                        {/* Vault dials */}
                        <div className="flex gap-2">
                          {[0, 1, 2].map((d) => (
                            <div
                              key={d}
                              className="w-4 h-4 rounded-full border"
                              style={{ borderColor: `${cert.color}44`, background: `${cert.color}11` }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Certificate inside */}
                    <div
                      className="absolute inset-0 rounded-xl overflow-hidden"
                      style={{ zIndex: 1 }}
                    >
                      <img
                        src={cert.img}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 flex items-end p-3"
                        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
                      >
                        <span className="text-white text-xs font-mono">{cert.title}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Fullscreen cert viewer */}
        <AnimatePresence>
          {openVault !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[5000] flex items-center justify-center p-8"
              style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)" }}
              onClick={() => setOpenVault(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-3xl w-full rounded-2xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={certificates[openVault].img}
                  alt={certificates[openVault].title}
                  className="w-full h-auto"
                />
                <button
                  onClick={() => setOpenVault(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
