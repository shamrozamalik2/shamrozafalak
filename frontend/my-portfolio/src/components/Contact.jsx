import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, CircleCheck, GitBranch, Link, Send } from "lucide-react";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import ShinyButton from "./ShinyButton";
import { CONTACT_INFO, SOCIALS } from "../data/content";
import { sendContactEmail } from "../lib/emailjs";

const SOCIAL_ICONS = { linkedin: Link, github: GitBranch, upwork: Briefcase };

const inputClass =
  "w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-violet-400/50 focus:bg-white/[0.05]";

export default function Contact() {
  const [form, setForm] = useState({ fname: "", lname: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await sendContactEmail(form);
      setDone(true);
      setForm({ fname: "", lname: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong sending your message. Please try again, or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          sub="Have a project or role in mind? Reach out — I reply within 24 hours."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <h3 className="font-serif text-2xl text-white mb-4">Get In Touch</h3>
            <p className="text-neutral-400 leading-relaxed mb-8 font-light">
              I'm open to freelance projects, full-time roles, and collaborations.
              Whether it's a MERN app, a GHL integration, or something more custom — let's talk.
            </p>

            <div className="space-y-4 mb-8">
              {CONTACT_INFO.map((it) => {
                const Icon = it.icon;
                return (
                  <div key={it.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-violet-300">
                      <Icon size={16} />
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-neutral-500">{it.label}</span>
                      {it.href ? (
                        <a href={it.href} className="text-white font-medium hover:text-violet-300 transition-colors duration-300 break-words">
                          {it.val}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{it.val}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.key];
                return (
                  <a
                    key={s.label}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:border-violet-400/40 hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  >
                    <Icon size={16} /> {s.label}
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <GlassCard hover={false}>
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      First Name
                    </label>
                    <input name="fname" value={form.fname} onChange={change} placeholder="John" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      Last Name
                    </label>
                    <input name="lname" value={form.lname} onChange={change} placeholder="Doe" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={change}
                    placeholder="john@example.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={change}
                    placeholder="Project collaboration, freelance, hiring..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={change}
                    placeholder="Tell me about your project or what you're looking for..."
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <ShinyButton as="button" type="submit" className="w-full justify-center" disabled={sending}>
                  <Send size={16} /> {sending ? "Sending..." : "Send Message"}
                </ShinyButton>

                <AnimatePresence>
                  {done && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 justify-center rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 font-medium py-3.5"
                    >
                      <CircleCheck size={18} /> Message sent! I'll reply within 24 hours.
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && <p className="text-sm text-red-400 text-center">{error}</p>}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
