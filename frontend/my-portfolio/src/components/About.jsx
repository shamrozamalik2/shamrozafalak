import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Globe, MapPin, Workflow, Zap } from "lucide-react";
import GlassCard from "./GlassCard";
import { EXPERIENCE_ROLES } from "../data/content";

const ROLE_ICONS = [Code2, Workflow, Globe];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cell = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 mb-4">
            About Me
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-white">Who I Am</h2>
        </motion.div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-3 gap-6"
        >
          <motion.div variants={cell} className="lg:col-span-2">
            <GlassCard className="h-full" hover={false}>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 mb-5">
                Philosophy
              </span>
              <p className="font-serif text-2xl md:text-3xl text-white leading-snug mb-6">
                “I don't just write code — I architect{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">
                  the systems businesses rely on to scale.
                </span>
                ”
              </p>
              <p className="text-neutral-400 leading-relaxed font-light">
                My approach is simple: understand the real bottleneck, design something reliable around
                it, and ship it properly — whether that's a MERN stack API, a GoHighLevel automation, or a
                webhook pipeline handling real production traffic.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={cell}>
            <GlassCard className="h-full" hover={false}>
              <div className="flex items-baseline justify-between gap-2 mb-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Currently Building
                </span>
                <span className="text-xs text-cyan-300/70 truncate">@ LevelUp Marketplace</span>
              </div>
              <div className="space-y-4">
                {EXPERIENCE_ROLES.map((r, i) => {
                  const Icon = ROLE_ICONS[i];
                  return (
                    <div key={r.role} className="flex items-center gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center">
                        <Icon size={16} className="text-violet-300" />
                      </div>
                      <p className="text-sm font-medium text-white leading-snug flex-1">{r.role}</p>
                      <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-violet-300 bg-violet-400/10 border border-violet-400/20 rounded-full px-2.5 py-1">
                        {r.period}
                      </span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={cell}>
            <GlassCard className="h-full" hover={false}>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-5">
                The Story
              </span>
              <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                Started building full-stack apps and GHL integrations as a Software Engineering student at
                NUML. Today I ship production MERN stack systems and GoHighLevel marketplace apps for real
                client traffic.
              </p>
              <p className="inline-flex items-center gap-2 text-xs font-medium text-violet-300">
                <Zap size={13} /> 4+ years hands-on in the ecosystem
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={cell}>
            <GlassCard className="h-full" hover={false}>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-5">
                Based In
              </span>
              <p className="inline-flex items-center gap-2 font-serif text-2xl text-white mb-1.5">
                <MapPin size={18} className="text-cyan-400" /> Pakistan
              </p>
              <p className="text-sm text-neutral-500 mb-5">GMT+5 · Available globally</p>
              <p className="inline-flex items-center gap-2 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Open to remote collaborations
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={cell}>
            <GlassCard className="h-full flex flex-col justify-between" hover={false}>
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-5">
                  Let's Work
                </span>
                <p className="font-serif text-2xl text-white leading-snug mb-2">Got a project in mind?</p>
                <p className="text-sm text-neutral-400">Let's build something great together.</p>
              </div>
              <a
                href="#contact"
                aria-label="Go to contact section"
                className="mt-6 self-end w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                <ArrowUpRight size={20} />
              </a>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
