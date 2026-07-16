import { useEffect, useRef } from "react";

// Curated theme-harmonious palette (violet/cyan/blue family) — click-to-randomize samples
// from this pool rather than fully random RGB, so it can never land on a muddy/clashing
// color combination that breaks the site's palette.
const PALETTE = ["#8b5cf6", "#06b6d4", "#a78bfa", "#22d3ee", "#c4b5fd", "#60a5fa", "#7c3aed", "#67e8f9"];

function sampleColors(count) {
  const pool = [...PALETTE];
  const picked = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

/**
 * TubesCursor — interactive 3D neon tubes that follow the cursor, from the
 * `threejs-components` package (pinned npm dependency, not a runtime CDN import).
 * Click anywhere in the container to reshuffle the tube/light colors.
 */
export default function TubesCursor({ className = "", zIndex = 5, enableClickInteraction = true }) {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    import("threejs-components/build/cursors/tubes1.min.js")
      .then(({ default: createTubesCursor }) => {
        if (!mounted || !canvasRef.current) return;
        appRef.current = createTubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#8b5cf6", "#06b6d4", "#a78bfa"],
            lights: {
              intensity: 200,
              colors: ["#8b5cf6", "#06b6d4", "#22d3ee", "#c4b5fd"],
            },
          },
        });
      })
      .catch((err) => {
        console.error("Failed to load TubesCursor:", err);
      });

    return () => {
      mounted = false;
      // The reference implementation never actually disposed the WebGL context on unmount
      // (only removed a resize listener) — this app instance exposes a real dispose(), so
      // clean it up properly to avoid leaking GL contexts.
      appRef.current?.dispose?.();
      appRef.current = null;
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !appRef.current) return;
    appRef.current.tubes.setColors(sampleColors(3));
    appRef.current.tubes.setLightsColors(sampleColors(4));
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex }}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ touchAction: "none" }} />
    </div>
  );
}
