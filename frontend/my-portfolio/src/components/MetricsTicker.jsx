import { STATS } from "../data/content";

function TickerItem({ label, value }) {
  return (
    <div className="flex items-center gap-3 px-8 shrink-0">
      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{label}</span>
      <span className="font-mono text-base text-white">{value}</span>
      <span className="text-violet-400/40 pl-5">/</span>
    </div>
  );
}

export default function MetricsTicker() {
  const items = [...STATS, ...STATS];
  return (
    <div className="relative w-full h-[60px] bg-black/40 border-y border-white/5 overflow-hidden flex items-center">
      <div className="ticker-track">
        {items.map((s, i) => (
          <TickerItem key={`${s.label}-${i}`} label={s.label} value={s.value} />
        ))}
      </div>
    </div>
  );
}
