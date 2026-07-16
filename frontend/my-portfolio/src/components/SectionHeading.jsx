import { motion } from "framer-motion";

export default function SectionHeading({ label, title, sub, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`mb-14 ${align === "center" ? "text-center mx-auto" : ""}`}
    >
      <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 mb-4">
        {label}
      </span>
      <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-white mb-4">{title}</h2>
      {sub && <p className={`text-white/40 max-w-xl font-light ${align === "center" ? "mx-auto" : ""}`}>{sub}</p>}
    </motion.div>
  );
}
