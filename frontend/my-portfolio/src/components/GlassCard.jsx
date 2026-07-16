import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = true, ...rest }) {
  return (
    <motion.div
      className={`rounded-3xl border border-white/5 bg-white/[0.02] p-10 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        hover ? "hover:-translate-y-3 hover:border-violet-400/40 hover:bg-white/[0.04] hover:shadow-[0_0_20px_-10px_rgba(139,92,246,0.4)]" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
