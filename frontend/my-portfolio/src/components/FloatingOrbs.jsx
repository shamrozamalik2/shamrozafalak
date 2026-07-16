export default function FloatingOrbs({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="animate-orb absolute -top-24 left-1/3 w-[36rem] h-[36rem] rounded-full blur-[100px]"
        style={{ background: "rgba(139,92,246,0.4)", animationDuration: "13s" }}
      />
      <div
        className="animate-orb absolute top-1/3 -left-32 w-[28rem] h-[28rem] rounded-full blur-[100px]"
        style={{ background: "rgba(6,182,212,0.08)", animationDuration: "9s", animationDelay: "-4s" }}
      />
    </div>
  );
}
