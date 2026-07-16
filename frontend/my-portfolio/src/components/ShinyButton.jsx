export default function ShinyButton({ as = "a", className = "", children, ...rest }) {
  const Comp = as;
  return (
    <div className="shiny-btn inline-block">
      <Comp
        {...rest}
        className={`flex items-center gap-2 rounded-full bg-[#0a0a0a] px-10 py-4 font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] ${className}`}
      >
        {children}
      </Comp>
    </div>
  );
}
