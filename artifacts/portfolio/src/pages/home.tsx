import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import TechUniverse from '@/components/TechUniverse';
import photo1 from "@assets/bhai_1783940902236.jpeg";
import photo2 from "@assets/Hackthon__1783941038153.jpg";
import cert1 from "@assets/Hackthon__1783941038153.jpg";
import cert2 from "@assets/image_1783941205684.png";
import cert3 from "@assets/image_1783941239713.png";

import { 
  SiPython, SiJavascript, SiKotlin, SiCplusplus, SiHtml5, SiCss,
  SiMysql, SiPostgresql, SiMongodb, SiRedis, SiVercel,
  SiDocker, SiGit, SiLinux, SiGithub, SiGooglegemini, SiOpenaigym, 
  SiTensorflow, SiSpringboot, SiReact
} from 'react-icons/si';

import { 
  LuCode, LuServer, LuShield, LuBrainCircuit, LuRocket, 
  LuMail, LuLinkedin, LuGithub, LuGlobe, LuMessageCircle
} from 'react-icons/lu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Company', id: 'company' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Tech Stack', id: 'tech' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-heading font-bold text-primary tracking-wider cursor-pointer" onClick={() => scrollTo('hero')}>
          TheCOdex<span className="text-white">_</span>
        </div>
        <div className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <button 
              key={link.id} 
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Section = ({ id, title, children }: { id: string, title?: string, children: React.ReactNode }) => (
  <section id={id} className="min-h-screen py-24 relative flex items-center">
    <div className="container mx-auto px-6 relative z-10">
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-5xl font-heading font-bold mb-12 text-center text-white"
        >
          {title}
        </motion.h2>
      )}
      {children}
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="text-white selection:bg-primary/30 min-h-screen relative overflow-x-hidden">
      <TechUniverse />
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-48 h-48 md:w-64 md:h-64 mb-8 group rounded-full p-2"
          >
            {/* Animated glowing border */}
            <div className="absolute inset-0 rounded-full border-[3px] border-primary/50 animate-[spin_10s_linear_infinite] border-t-secondary border-b-transparent"></div>
            <div className="absolute inset-[-10px] rounded-full border-[1px] border-secondary/30 animate-[spin_15s_linear_infinite_reverse] border-l-primary border-r-transparent"></div>
            
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img src={photo1} alt="Veerendra Vishwakarma" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
              <img src={photo2} alt="Veerendra at Hackathon" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary"
          >
            Veerendra Vishwakarma
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl text-primary font-medium tracking-widest uppercase mb-2 drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]"
          >
            Founder & CEO
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-secondary mb-6 font-heading"
          >
            TheCOdex Software Solutions
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 border-l-2 border-primary pl-4 text-left italic"
          >
            "Architecting the Digital Future | Engineering Solutions That Scale"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-3 rounded-md bg-primary text-background font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,212,255,0.5)]">
              Explore My Universe
            </button>
            <button className="px-8 py-3 rounded-md border border-primary/50 text-white font-bold uppercase tracking-wider hover:bg-primary/20 transition-all">
              View Projects
            </button>
            <button className="px-8 py-3 rounded-md text-gray-400 font-medium hover:text-white transition-all">
              +91 8305223353
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="About the Architect">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass-panel p-8 rounded-xl"
          >
            <h3 className="text-2xl font-heading text-primary mb-4">Engineering Enthusiast | Innovator in the Making | Future Tech Trailblazer</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              3rd Year Engineering Student exploring the Tech Field through Hackathons, TechFests & Conferences.
            </p>
            <div className="space-y-4">
              {[
                "Passionate about AI, Cybersecurity, and Building Tech Solutions",
                "Currently exploring Internet & Cyber Security",
                "Currently working on Cyber Projects",
                "Currently learning Java (Spring Boot)"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <LuCode className="text-secondary shrink-0" />
                  <span className="text-sm md:text-base text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass-panel p-8 rounded-xl border-t-4 border-t-secondary"
          >
            <h3 className="text-xl font-heading mb-4 text-white">Professional Journey</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-primary font-semibold mb-1">What I build:</h4>
                <p className="text-gray-300 text-sm">Custom software solutions, cybersecurity tools, and AI-powered applications that solve real-world problems.</p>
              </div>
              <div>
                <h4 className="text-primary font-semibold mb-1">What problems I solve:</h4>
                <p className="text-gray-300 text-sm">Bridging the gap between complex technology and practical business needs — making tech accessible, secure, and scalable.</p>
              </div>
              <div>
                <h4 className="text-primary font-semibold mb-1">Vision:</h4>
                <p className="text-gray-300 text-sm">To become a leading tech architect who builds systems that protect, empower, and transform how people interact with technology.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Company Section */}
      <Section id="company" title="TheCOdex Software Solutions">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-panel p-10 rounded-2xl border-l-4 border-l-primary relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <LuRocket size={120} />
          </div>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed relative z-10">
            TheCOdex Software Solutions designs and develops custom web applications for startups, service businesses, and growing teams that need software aligned with their actual workflows. We build SaaS products, internal platforms, client portals, and automation systems that reduce manual effort, improve visibility, and create room for scale.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {[
              "Custom Web Application Development",
              "Web App Management & Maintenance",
              "SaaS Product Development",
              "Business Automation Systems",
              "Google Ads Management",
              "Social Media Management"
            ].map((service, i) => (
              <div key={i} className="glass-card p-4 rounded-lg flex items-center justify-center text-center text-sm font-medium text-primary border border-primary/20">
                {service}
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Deployment Satellites (Projects)">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "CryptoShield",
              desc: "Pendrive-Based Password Manager. Responsible and portable password security. User credentials accessible only when registered pendrive is connected.",
              tech: "Python | Cryptography | Tkinter"
            },
            {
              title: "AI-Powered Study Platform",
              desc: "Educational web app with AI-driven learning. Features syllabus creation, smart exam preparation, and study packages.",
              tech: "Flask | Gemini API | Python | JS"
            },
            {
              title: "Trinetra Sentinel",
              desc: "Log-EDR-Detection System. Lightweight offline EDR prototype. Real-time monitoring, behavioral anomaly detection, threat scoring.",
              tech: "Cybersecurity | AI | Monitoring"
            },
            {
              title: "AI Secure Digital Identity Verifier",
              desc: "AI-powered cybersecurity solution preventing digital identity fraud. Uses OCR, AI-based forgery detection, risk scoring.",
              tech: "AI | OCR | Privacy"
            },
            {
              title: "TheStudyCore",
              desc: "Web-based educational platform — free, AI-integrated study companion. Trusted links, instant AI-powered answers.",
              tech: "Web | AI Integration"
            }
          ].map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-xl group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <h3 className="text-xl font-heading text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{project.desc}</p>
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-secondary font-mono bg-secondary/10 px-2 py-1 rounded">{project.tech}</span>
                <LuGithub className="text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Achievements Section */}
      <Section id="achievements" title="Hackathons & Certifications">
        <div className="mb-16">
          <h3 className="text-2xl font-heading text-primary mb-6 flex items-center gap-3"><LuShield /> Battle Grounds (Hackathons)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Qualified Prototype Builder – AI for Bharat Hackathon 2026 (AWS & Hack2Skill)",
              "Runner Up – RNTU Tech Fest Hackathon 2025",
              "Finalist – HackPrix National Level Hackathon, Hyderabad (S2 & S3)",
              "Navonmesh Binary Battle Hackathon Bhopal | EcoCode Delhi Participant"
            ].map((hack, i) => (
              <div key={i} className="glass-panel p-4 rounded flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/50 text-primary">
                  {i + 1}
                </div>
                <p className="text-sm md:text-base text-gray-200">{hack}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-heading text-secondary mb-6 flex items-center gap-3"><LuRocket /> Trophies (Certificates)</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: cert1, title: "Navonmesh 2025", sub: "Binary Battle Hackathon" },
              { img: cert2, title: "HackPrix Season 2", sub: "Hyderabad" },
              { img: cert3, title: "HackPrix Season 3", sub: "Hyderabad" }
            ].map((cert, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-xl overflow-hidden group relative aspect-[4/3]"
              >
                <img src={cert.img} alt={cert.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h4 className="text-lg font-bold text-white">{cert.title}</h4>
                  <p className="text-sm text-primary">{cert.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section id="tech" title="Technology Arsenal">
        <div className="glass-panel rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-center">
            {[
              { Icon: SiPython, name: "Python", color: "text-yellow-400" },
              { Icon: SiJavascript, name: "JavaScript", color: "text-yellow-300" },
              { Icon: SiKotlin, name: "Java", color: "text-red-500" },
              { Icon: SiCplusplus, name: "C++", color: "text-blue-500" },
              { Icon: SiReact, name: "React", color: "text-cyan-400" },
              { Icon: SiMysql, name: "MySQL", color: "text-orange-400" },
              { Icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-400" },
              { Icon: SiMongodb, name: "MongoDB", color: "text-green-500" },
              { Icon: SiVercel, name: "AWS/Cloud", color: "text-orange-500" },
              { Icon: SiDocker, name: "Docker", color: "text-blue-500" },
              { Icon: SiGit, name: "Git", color: "text-orange-600" },
              { Icon: SiLinux, name: "Linux", color: "text-yellow-200" },
              { Icon: SiGooglegemini, name: "Gemini", color: "text-blue-400" },
              { Icon: SiOpenaigym, name: "OpenAI", color: "text-white" },
              { Icon: SiTensorflow, name: "TensorFlow", color: "text-orange-500" },
            ].map((tech, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:border-primary">
                  <tech.Icon className={`text-3xl ${tech.color} opacity-70 group-hover:opacity-100 drop-shadow-[0_0_8px_currentColor]`} />
                </div>
                <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Establish Connection">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 mb-8 font-light">Ready to build the future? Reach out to start a conversation about your next big idea.</p>
            
            <a href="mailto:thecodexofficial001@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 glass-card rounded-lg w-full">
              <LuMail className="text-2xl text-secondary" />
              <span>thecodexofficial001@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/veerendra-vishwakarma-041584393/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 glass-card rounded-lg w-full">
              <LuLinkedin className="text-2xl text-secondary" />
              <span>LinkedIn Profile</span>
            </a>
            <a href="https://github.com/codingguru2221" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 glass-card rounded-lg w-full">
              <LuGithub className="text-2xl text-secondary" />
              <span>GitHub /codingguru2221</span>
            </a>
            <a href="https://thecodexss.in/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 glass-card rounded-lg w-full">
              <LuGlobe className="text-2xl text-secondary" />
              <span>thecodexss.in</span>
            </a>
            <div className="flex items-center gap-4 text-gray-300 p-4 glass-card rounded-lg w-full">
              <LuMessageCircle className="text-2xl text-secondary" />
              <span>+91 8305223353 (WhatsApp)</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl border-t-4 border-t-primary"
          >
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="How can I help you?"></textarea>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-md uppercase tracking-wider hover:opacity-90 transition-opacity">
                Send Transmission
              </button>
            </form>
          </motion.div>
        </div>
      </Section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center glass-panel mt-20 relative z-10">
        <p className="text-gray-500 font-mono text-sm">© {new Date().getFullYear()} TheCOdex Software Solutions. All systems operational.</p>
      </footer>
    </div>
  );
}