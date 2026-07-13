import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";

export default function JarvisOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        }) + " IST"
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[8000] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-lg mb-4 w-64 shadow-[0_0_20px_rgba(0,212,255,0.15)] font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-bold">JARVIS ONLINE</span>
            </div>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>SYS.TIME</span>
                <span className="text-white">{time}</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS</span>
                <span className="text-green-400">OPERATIONAL</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3 justify-center">
              <a href="https://github.com/codingguru2221" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <LuGithub className="text-xl" />
              </a>
              <a href="https://www.linkedin.com/in/veerendra-vishwakarma-041584393/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <LuLinkedin className="text-xl" />
              </a>
              <a href="mailto:thecodexofficial001@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <LuMail className="text-xl" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full group"
      >
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/50 animate-[spin_4s_linear_infinite] border-t-transparent" />
        <div className="absolute inset-1 rounded-full border-2 border-purple-500/50 animate-[spin_3s_linear_infinite_reverse] border-b-transparent" />
        <div className="absolute inset-2 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/40 backdrop-blur-sm transition-colors flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.5)]">
          <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#00d4ff] animate-pulse" />
        </div>
      </button>
    </div>
  );
}
