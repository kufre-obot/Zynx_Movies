import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Signature motion — the Cinevia beam sweep (brand constant)          */
/* ------------------------------------------------------------------ */
export function LightSweep({ trigger }) {
  if (!trigger) return null;
  return <div key={trigger} className="cinevia-beam" aria-hidden="true" />;
}

export function JourneyToast({ visible }) {
  return (
    <div style={{ position: "fixed", top: 24, left: "50%", zIndex: 98, pointerEvents: "none", transform: visible ? "translate(-50%,0)" : "translate(-50%,-16px)", opacity: visible ? 1 : 0, transition: "transform 320ms cubic-bezier(.2,.8,.2,1), opacity 320ms" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(18,20,28,0.92)", backdropFilter: "blur(10px)", border: "1px solid rgba(232,181,74,0.35)", borderRadius: 999, padding: "10px 18px", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>
        <span style={{ fontSize: 16 }}>🎉</span>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: "#F3F1EA" }}>Added to your Movie Journey</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating particles — subtle ambient dust in the hero                */
/* ------------------------------------------------------------------ */
export function Particles({ count = 16 }) {
  const [particles] = useState(() => Array.from({ length: count }).map((_, i) => ({
    id: i, left: Math.random() * 100, size: 1 + Math.random() * 2.2,
    duration: 10 + Math.random() * 12, delay: -(Math.random() * 20), drift: (Math.random() - 0.5) * 40,
  })));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }} aria-hidden="true">
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.left}%`, bottom: -10, width: p.size, height: p.size, borderRadius: "50%",
          background: "rgba(232,181,74,0.55)", filter: "blur(0.3px)",
          animation: `cinevia-particle ${p.duration}s linear infinite`, animationDelay: `${p.delay}s`,
          "--drift": `${p.drift}px`,
        }} />
      ))}
    </div>
  );
}
