import { motion } from "framer-motion";

const nodes = [
  { label: "Gemini", color: "#3b82f6", angle: 90, use: "Conversational AI, content generation, study tools" },
  { label: "OpenAI", color: "#e5e7eb", angle: 30, use: "GPT-based automation, code generation" },
  { label: "TensorFlow", color: "#f97316", angle: 330, use: "ML models, anomaly detection in EDR" },
  { label: "Ollama", color: "#a855f7", angle: 210, use: "Local LLM inference, offline AI" },
  { label: "LangChain", color: "#22c55e", angle: 150, use: "AI pipelines, RAG, agent orchestration" },
  { label: "OpenCV", color: "#ef4444", angle: 270, use: "OCR, identity verification, image processing" },
];

export default function AIBrain() {
  const R = 180;

  return (
    <section id="ai-brain" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">Neural Network</p>
          <h2
            className="text-3xl md:text-5xl font-black font-mono"
            style={{
              background: "linear-gradient(135deg, #ec4899, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Brain
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
            Actively exploring and integrating AI into every product at TheCOdex
          </p>
        </motion.div>

        <div className="flex items-center justify-center">
          <div className="relative" style={{ width: R * 2 + 160, height: R * 2 + 160 }}>
            {/* SVG connection lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${R * 2 + 160} ${R * 2 + 160}`}
            >
              {nodes.map((node, i) => {
                const rad = ((node.angle - 90) * Math.PI) / 180;
                const cx = R + 80;
                const cy = R + 80;
                const nx = cx + Math.cos(rad) * R;
                const ny = cy + Math.sin(rad) * R;
                return (
                  <motion.line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={nx}
                    y2={ny}
                    stroke={node.color}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    style={{
                      filter: `drop-shadow(0 0 4px ${node.color})`,
                    }}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="20;0"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </motion.line>
                );
              })}
            </svg>

            {/* Center Brain node */}
            <motion.div
              className="absolute flex items-center justify-center"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,212,255,0.25), rgba(168,85,247,0.1))",
                border: "2px solid rgba(0,212,255,0.6)",
                boxShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(168,85,247,0.2)",
              }}
              animate={{ boxShadow: [
                "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(168,85,247,0.2)",
                "0 0 60px rgba(0,212,255,0.7), 0 0 100px rgba(168,85,247,0.4)",
                "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(168,85,247,0.2)",
              ]}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-2xl">🧠</div>
                <div className="text-cyan-400 font-mono text-[10px] font-bold mt-1">AI CORE</div>
              </div>
            </motion.div>

            {/* AI nodes */}
            {nodes.map((node, i) => {
              const rad = ((node.angle - 90) * Math.PI) / 180;
              const x = Math.cos(rad) * R;
              const y = Math.sin(rad) * R;

              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  className="absolute group"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                  }}
                >
                  <div
                    className="relative px-4 py-2 rounded-xl font-mono text-xs font-bold cursor-default"
                    style={{
                      background: `${node.color}18`,
                      border: `1px solid ${node.color}66`,
                      color: node.color,
                      boxShadow: `0 0 20px ${node.color}44`,
                    }}
                  >
                    <motion.div
                      animate={{ boxShadow: [`0 0 10px ${node.color}44`, `0 0 25px ${node.color}88`, `0 0 10px ${node.color}44`] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl"
                    />
                    {node.label}

                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20"
                      style={{
                        background: "rgba(0,0,0,0.9)",
                        border: `1px solid ${node.color}44`,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {node.use}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
