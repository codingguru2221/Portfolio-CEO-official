import { useEffect, useState } from "react";

const navLinks = [
  { name: "HOME", target: "hero" },
  { name: "JOURNEY", target: "founder-story" },
  { name: "COMPANY", target: "company" },
  { name: "TECH", target: "tech-ecosystem" },
  { name: "PROJECTS", target: "project-galaxy" },
  { name: "ACHIEVEMENTS", target: "achievements" },
  { name: "CONTACT", target: "contact" },
];

export default function Navbar() {
  const [activeTarget, setActiveTarget] = useState(navLinks[0].target);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.target);

    const updateActiveSection = () => {
      const currentSection =
        sectionIds
          .map((id) => document.getElementById(id))
          .filter((section): section is HTMLElement => section !== null)
          .findLast((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 140;
          })?.id ?? navLinks[0].target;

      setActiveTarget(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const hashTarget = window.location.hash.replace("#", "");

    if (hashTarget) {
      window.setTimeout(() => {
        document.getElementById(hashTarget)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const scrollToSection = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${target}`);
    setActiveTarget(target);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <span
          className="text-cyan-400 font-mono font-bold text-xl cursor-pointer select-none"
          onClick={() => scrollToSection("hero")}
        >
          TheCOdex<span className="animate-pulse">_</span>
        </span>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {navLinks.map(({ name, target }) => {
            const isActive = activeTarget === target;
            return (
              <button
                key={target}
                onClick={() => scrollToSection(target)}
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
          {navLinks.map(({ name, target }) => {
            const isActive = activeTarget === target;
            return (
              <button
                key={target}
                onClick={() => scrollToSection(target)}
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
