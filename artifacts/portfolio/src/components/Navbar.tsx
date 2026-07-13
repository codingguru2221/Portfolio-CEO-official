import { useState } from "react";
import { useLocation } from "wouter";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "JOURNEY", path: "/journey" },
  { name: "COMPANY", path: "/company" },
  { name: "TECH", path: "/tech" },
  { name: "PROJECTS", path: "/projects" },
  { name: "ACHIEVEMENTS", path: "/achievements" },
  { name: "CONTACT", path: "/contact" },
];

export default function Navbar() {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <span
          className="text-cyan-400 font-mono font-bold text-xl cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          TheCOdex<span className="animate-pulse">_</span>
        </span>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {navLinks.map(({ name, path }) => {
            const isActive = path === "/" ? location === "/" : location.startsWith(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`text-xs font-mono tracking-widest transition-all duration-200 hover:text-cyan-400 pb-0.5 ${
                  isActive
                    ? "text-cyan-400 border-b border-cyan-400"
                    : "text-gray-400"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ name, path }) => {
            const isActive = path === "/" ? location === "/" : location.startsWith(path);
            return (
              <button
                key={path}
                onClick={() => { navigate(path); setMenuOpen(false); }}
                className={`text-sm font-mono tracking-widest text-left transition-colors hover:text-cyan-400 ${
                  isActive ? "text-cyan-400" : "text-gray-400"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
