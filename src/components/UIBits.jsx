import "react";
import { Star } from "lucide-react";
import { GOLD } from "../theme";

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
export function SprocketDivider() {
  const holes = Array.from({ length: 28 });
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 14, padding: "6px 0", opacity: 0.35 }} aria-hidden="true">
      {holes.map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />)}
    </div>
  );
}
export function GenreChip({ children, active, onClick }) {
  return (
    <span onClick={onClick} style={{
      fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
      color: active ? "#0A0C12" : "#C9CBD6", background: active ? GOLD : "transparent",
      border: `1px solid ${active ? GOLD : "rgba(255,255,255,0.14)"}`, borderRadius: 999, padding: "5px 12px",
      cursor: onClick ? "pointer" : "default", transition: "all 180ms", userSelect: "none",
    }}>{children}</span>
  );
}
export function RatingBadge({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(10,12,18,0.75)", backdropFilter: "blur(6px)", border: "1px solid rgba(232,181,74,0.35)", borderRadius: 8, padding: "3px 8px", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: GOLD }}>
      <Star size={11} fill={GOLD} strokeWidth={0} /> {rating.toFixed(1)}
    </div>
  );
}
