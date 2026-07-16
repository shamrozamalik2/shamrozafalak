import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import { EXPERTISE_CARDS } from "../data/content";

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cell = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Area of Expertise"
          title="What I Bring to the Table"
          sub="Core disciplines I work across on every project, from schema to shipped UI."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {EXPERTISE_CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title} variants={cell} className="group">
                <GlassCard>
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center mb-6 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={20} className="text-violet-300" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{c.desc}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
