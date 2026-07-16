import { motion } from "framer-motion";
import NavPill from "./components/NavPill";
import Hero from "./components/Hero";
import MetricsTicker from "./components/MetricsTicker";
import About from "./components/About";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import CodeBlock from "./components/CodeBlock";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <NavPill />
      <main>
        <Hero />
        <MetricsTicker />
        <About />
        <Expertise />
        <Projects />
        <CodeBlock />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </motion.div>
  );
}
