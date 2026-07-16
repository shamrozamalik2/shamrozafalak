import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PROJECTS } from "../data/content";

const EASE = [0.23, 1, 0.32, 1];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cell = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function ProjectCard({ project, index }) {
  const Icon = project.icon;

  return (
    <motion.div variants={cell} className="group">
      <div className="h-full flex flex-col rounded-3xl border border-white/10 bg-[#0d0d10] shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:border-violet-400/30">
        <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-violet-600/25 via-violet-950/20 to-cyan-600/10 overflow-hidden">
          <span className="absolute -top-4 -left-1 font-serif text-7xl leading-none text-white/[0.06] select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:-rotate-6">
            <Icon size={24} className="text-cyan-200" />
          </div>
        </div>

        <div className="p-7 flex flex-col flex-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-violet-300 mb-2">
            {String(index + 1).padStart(2, "0")} · Project
          </span>
          <h3 className="font-serif text-xl text-white mb-2.5">{project.title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed mb-5 flex-1">{project.desc}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-[10px] font-mono text-cyan-200 bg-cyan-400/10 border border-cyan-400/20 rounded-md px-2 py-0.5"
              >
                {s}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} code`}
            className="mt-auto self-start w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Projects"
          title="Things I've Built"
          sub="A selection of work spanning backend engineering, GHL integrations, and full-stack delivery."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </motion.div>

        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
          <GitBranch size={13} /> Full source available on request or via the links above.
        </div>
      </div>
    </section>
  );
}
