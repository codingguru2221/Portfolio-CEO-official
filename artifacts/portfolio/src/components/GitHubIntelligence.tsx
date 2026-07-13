import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  bio: string;
};

type Repo = {
  name: string;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  description: string | null;
  forks_count: number;
};

const LANG_COLORS: Record<string, string> = {
  Python: "#3b82f6",
  JavaScript: "#f59e0b",
  TypeScript: "#22d3ee",
  Java: "#ef4444",
  "C++": "#a855f7",
  HTML: "#f97316",
  CSS: "#10b981",
  Shell: "#6366f1",
};

export default function GitHubIntelligence() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/codingguru2221"),
          fetch("https://api.github.com/users/codingguru2221/repos?sort=updated&per_page=6"),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("API error");
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        setUser(userData);
        setRepos(reposData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Aggregate languages from repos
  const langMap: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
  });
  const langTotal = Object.values(langMap).reduce((a, b) => a + b, 0);

  return (
    <section id="github" className="relative z-10 py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-3">Live Data</p>
          <h2
            className="text-3xl md:text-5xl font-black font-mono"
            style={{
              background: "linear-gradient(135deg, #6366f1, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            GitHub Intelligence
          </h2>
          <a
            href="https://github.com/codingguru2221"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400/60 font-mono text-sm hover:text-cyan-400 transition-colors"
          >
            @codingguru2221
          </a>
        </motion.div>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl animate-pulse"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
            ))}
          </div>
        )}

        {!loading && !error && user && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Repositories", value: user.public_repos, icon: "📦" },
                { label: "Followers", value: user.followers, icon: "👥" },
                { label: "Following", value: user.following, icon: "🔗" },
                { label: "Total Repos", value: repos.length, icon: "🌟" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl text-center"
                  style={{
                    background: "rgba(99,102,241,0.06)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black font-mono text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400 font-mono tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Language breakdown */}
            {langTotal > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl mb-8"
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="font-mono text-xs text-gray-400 tracking-widest mb-4">
                  LANGUAGE DISTRIBUTION
                </div>
                {/* Bar chart */}
                <div className="space-y-3">
                  {Object.entries(langMap)
                    .sort(([, a], [, b]) => b - a)
                    .map(([lang, count]) => (
                      <div key={lang} className="flex items-center gap-3">
                        <div
                          className="w-24 text-xs font-mono text-right"
                          style={{ color: LANG_COLORS[lang] || "#9ca3af" }}
                        >
                          {lang}
                        </div>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(count / langTotal) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                              background: LANG_COLORS[lang] || "#9ca3af",
                              boxShadow: `0 0 8px ${LANG_COLORS[lang] || "#9ca3af"}88`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 font-mono w-8">{count}</div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Repos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="p-4 rounded-xl block"
                  style={{
                    background: "rgba(99,102,241,0.04)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-sm text-white font-bold">{repo.name}</span>
                    {repo.language && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                        style={{
                          background: `${LANG_COLORS[repo.language] || "#9ca3af"}18`,
                          border: `1px solid ${LANG_COLORS[repo.language] || "#9ca3af"}44`,
                          color: LANG_COLORS[repo.language] || "#9ca3af",
                        }}
                      >
                        {repo.language}
                      </span>
                    )}
                  </div>
                  {repo.description && (
                    <p className="text-gray-500 text-xs mb-3 leading-relaxed line-clamp-2">{repo.description}</p>
                  )}
                  <div className="flex gap-4 text-xs text-gray-600 font-mono">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}

        {!loading && error && (
          <div
            className="p-8 rounded-xl text-center font-mono"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="text-4xl mb-4">⚠️</div>
            <div className="text-gray-400 mb-3">GitHub API rate limited. Visit profile directly:</div>
            <a
              href="https://github.com/codingguru2221"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline"
            >
              github.com/codingguru2221
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
