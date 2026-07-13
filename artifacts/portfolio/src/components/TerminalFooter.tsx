import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";

export default function TerminalFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-md py-12 relative z-10 font-mono text-sm text-gray-400">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <p className="text-cyan-400">
              TheCOdex Digital Universe v2.0.26
              <span className="animate-pulse">_</span>
            </p>
            <p>Architect: Veerendra Vishwakarma</p>
            <p className="flex items-center gap-2">
              Status: <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ONLINE
            </p>
            <p>Mission: Building the Future of Technology</p>
            <p className="pt-4 text-xs text-gray-600">
              © {new Date().getFullYear()} TheCOdex Software Solutions. All systems operational.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-6">
            <div className="flex gap-4">
              <a href="https://github.com/codingguru2221" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500 hover:text-cyan-400 transition-all group">
                <LuGithub className="text-xl group-hover:animate-pulse" />
              </a>
              <a href="https://www.linkedin.com/in/veerendra-vishwakarma-041584393/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500 hover:text-cyan-400 transition-all group">
                <LuLinkedin className="text-xl group-hover:animate-pulse" />
              </a>
              <a href="mailto:thecodexofficial001@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500 hover:text-cyan-400 transition-all group">
                <LuMail className="text-xl group-hover:animate-pulse" />
              </a>
            </div>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 border border-white/10 hover:border-cyan-500 text-xs tracking-widest uppercase hover:bg-cyan-500/10 hover:text-cyan-400 transition-all"
            >
              ↑ REBOOT SEQUENCE
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
