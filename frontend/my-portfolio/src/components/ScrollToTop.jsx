import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-7 right-7 z-[900] w-12 h-12 rounded-full flex items-center justify-center text-white bg-white/5 border border-white/10 backdrop-blur-xl hover:border-violet-400/40 hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
