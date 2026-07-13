import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "Booting TheCOdex AI Core...",
  "Establishing secure connection...",
  "[████████░░] Loading Modules...",
  "✓ AI Systems Online",
  "✓ Cloud Infrastructure Ready",
  "✓ Security Protocols Active",
  "✓ Projects Initialized",
  "✓ Databases Connected",
  "System Ready.",
  "Welcome, Founder."
];

export default function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (isSkipped) return;

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setVisibleLines(prev => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSkipped(true);
        }, 1000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isSkipped]);

  useEffect(() => {
    if (isSkipped) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isSkipped, onComplete]);

  return (
    <AnimatePresence>
      {!isSkipped && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9000] bg-black text-cyan-400 font-mono flex flex-col justify-center items-start p-10 md:p-20 overflow-hidden"
        >
          <button
            onClick={() => setIsSkipped(true)}
            className="absolute top-8 right-8 text-white/50 hover:text-white border border-white/20 hover:border-white/50 px-4 py-1 rounded transition-colors text-sm"
          >
            Skip
          </button>
          
          <div className="space-y-2 max-w-2xl text-sm md:text-lg">
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-5 bg-cyan-400 ml-2 align-middle"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
