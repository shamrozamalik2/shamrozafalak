import { Briefcase, GitBranch, Link } from "lucide-react";
import { NAV_LINKS, SOCIALS, CONTACT_INFO } from "../data/content";

const SOCIAL_ICONS = { linkedin: Link, github: GitBranch, upwork: Briefcase };

export default function Footer() {
  const email = CONTACT_INFO.find((c) => c.label === "Email");

  return (
    <footer className="relative border-t border-white/5 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <span className="font-serif text-2xl text-white block mb-3">Shamroza Falak</span>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-[220px]">
              MERN Stack &amp; GoHighLevel developer building production-grade web applications.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-4">Sections</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-4">Connect</p>
            <ul className="space-y-2.5">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.key];
                return (
                  <li key={s.label}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    >
                      <Icon size={14} /> {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-4">Get In Touch</p>
            <a href={email.href} className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] break-words">
              {email.val}
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Shamroza Falak · MERN Stack &amp; GHL Developer
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for Work
          </div>
        </div>
      </div>
    </footer>
  );
}
