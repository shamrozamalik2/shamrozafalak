import { motion } from "framer-motion";
import { NAV_LINKS } from "../data/content";

export default function NavPill() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl rounded-full border border-white/10 bg-[#0a0a0a]/70 backdrop-blur-2xl px-3 py-2.5"
    >
      <div className="flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2 shrink-0 pl-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" />
          <span className="font-serif text-lg text-white">Shamroza</span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="shrink-0 rounded-full bg-white text-black text-[12px] font-semibold px-5 py-2.5 hover:bg-neutral-200 transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
