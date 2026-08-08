import  { useState, useEffect } from "react";
import { GOLD } from "../theme";
import { ZynxMark } from "./ZynxMark";

/* ------------------------------------------------------------------ */
/*  Page loader                                                        */
/* ------------------------------------------------------------------ */
export function PageLoader({ visible }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const t = setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + Math.random() * 18)), 140); return () => clearInterval(t); }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0A0C12", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none", transition: "opacity 500ms ease" }}>
      <div style={{ animation: "cinevia-logo-in 900ms cubic-bezier(.2,.8,.2,1)", marginBottom: 10 }}>
        <div style={{ display: "inline-flex", animation: "cinevia-mark-spin 2.4s linear infinite" }}>
          <ZynxMark size={34} />
        </div>
      </div>
      <div style={{ fontFamily: "Fraunces, serif", fontSize: 34, fontWeight: 600, color: GOLD, animation: "cinevia-logo-in 900ms cubic-bezier(.2,.8,.2,1)" }}>ZynxMovies</div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8C8E9B", marginTop: 8 }}>Every film, in focus</div>
      <div style={{ width: 180, height: 2, background: "rgba(255,255,255,0.1)", marginTop: 28, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${Math.min(progress, 100)}%`, height: "100%", background: GOLD, transition: "width 140ms linear" }} />
      </div>
    </div>
  );
}
