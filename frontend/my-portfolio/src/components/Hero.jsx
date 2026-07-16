import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import FloatingOrbs from "./FloatingOrbs";
import TubesCursor from "./TubesCursor";
import ShinyButton from "./ShinyButton";

// ogl is a large dependency purely for this decorative background effect. It's code-split
// (its own chunk, not in the critical bundle) AND deferred until the browser reports idle
// time — splitting the chunk alone still runs the WebGL/shader setup immediately after
// mount, which lands squarely in the window Lighthouse counts as blocking time. Waiting
// for idle keeps that work off the critical path entirely. TubesCursor doesn't need the
// same lazy() treatment: its own heavy dependency (threejs-components) is behind a dynamic
// import() inside the component itself, so Vite already splits it into its own chunk
// regardless of how the thin wrapper component is imported.
const LightRays = lazy(() => import("./LightRays"));

function useIdle() {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 300));
    const cic = window.cancelIdleCallback ?? clearTimeout;
    const id = ric(() => setIdle(true), { timeout: 2000 });
    return () => cic(id);
  }, []);
  return idle;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

export default function Hero() {
  const showHeroFx = useIdle();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.4), transparent 70%), radial-gradient(ellipse 60% 50% at 0% 50%, rgba(6,182,212,0.08), transparent 70%)",
        }}
      />
      {showHeroFx && (
        <Suspense fallback={null}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#8b5cf6"
            raysSpeed={1}
            lightSpread={0.6}
            rayLength={1.4}
            followMouse
            mouseInfluence={0.15}
            noiseAmount={0.04}
            distortion={0.04}
          />
        </Suspense>
      )}

      <FloatingOrbs className="opacity-60" />

      {showHeroFx && <TubesCursor zIndex={5} />}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none"
      >
        <motion.h1
          variants={item}
          className="font-serif font-normal leading-[0.9] tracking-[-0.04em] text-6xl md:text-8xl lg:text-9xl text-white mb-8"
        >
          <span className="text-shimmer">Shamroza Falak</span>
        </motion.h1>

        <motion.p variants={item} className="max-w-2xl mx-auto text-lg text-neutral-400 font-light mb-10">
          Full Stack Software Engineer &amp; GoHighLevel developer building
          production-grade web apps, CRM marketplace integrations, and custom
          e-commerce experiences, from RESTful APIs to browser extensions.
        </motion.p>

        <motion.div variants={item} className="flex flex-col items-center gap-5 pointer-events-auto">
          <ShinyButton href="#projects">
            <Rocket size={16} /> View My Work
          </ShinyButton>
          <a
            href="#contact"
            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            Get in touch →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
