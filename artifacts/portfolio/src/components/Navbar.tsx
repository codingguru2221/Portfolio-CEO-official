import { useState, useEffect } from "react";

const navLinks = [
  { name: "HOME", id: "hero" },
  { name: "JOURNEY", id: "founder-story" },
  { name: "COMPANY", id: "company" },
  { name: "TECH", id: "tech-ecosystem" },
  { name: "PROJECTS", id: "project-galaxy" },
  { name: "ACHIEVEMENTS", id: "achievements" },
  { name: "CONTACT", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md border-b border-white/10" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <span
          className="text-cyan-400 font-mono font-bold text-xl cursor-pointer"
          onClick={() => scrollTo("hero")}
        >
          TheCOdex<span className="animate-pulse">_</span>
        </span>
        <div className="hidden md:flex gap-6">
          {navLinks.map(({ name, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-xs font-mono tracking-widest transition-all duration-200 hover:text-cyan-400 ${
                activeSection === id
                  ? "text-cyan-400 border-b border-cyan-400"
                  : "text-gray-400"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
