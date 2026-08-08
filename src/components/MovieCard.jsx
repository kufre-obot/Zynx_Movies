import  { useState, useEffect, useRef } from "react";
import { Heart, Info, Play } from "lucide-react";
import { CRIMSON, btnGold, btnGhost } from "../theme";
import { RatingBadge } from "./UIBits";

/* ------------------------------------------------------------------ */
/*  Movie card — now with blur-to-sharp load-in                        */
/* ------------------------------------------------------------------ */
export function MovieCard({ movie, onSelect, favorites, toggleFavorite, fixedWidth = true }) {
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const isFav = favorites.has(movie.id);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60 + Math.random() * 260); return () => clearTimeout(t); }, []);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onSelect(movie, ref.current.getBoundingClientRect())}
      className="cinevia-card-sweep"
      style={{
        position: "relative", flex: fixedWidth ? "0 0 200px" : "1 1 160px", width: fixedWidth ? 200 : "100%", maxWidth: fixedWidth ? 200 : 220,
        aspectRatio: "2/3", borderRadius: 12, overflow: "hidden", cursor: "pointer",
        transform: hover ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        boxShadow: hover ? "0 20px 40px -12px rgba(232,181,74,0.25), 0 8px 20px rgba(0,0,0,0.5)" : "0 4px 14px rgba(0,0,0,0.35)",
        transition: "transform 320ms cubic-bezier(.2,.8,.2,1), box-shadow 320ms",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: movie.bg, filter: loaded ? "blur(0px) saturate(1)" : "blur(14px) saturate(0.6)", transform: loaded ? "scale(1)" : "scale(1.08)", transition: "filter 650ms ease, transform 650ms ease" }} />
      <div style={{ position: "absolute", top: 10, left: 10 }}><RatingBadge rating={movie.rating} /></div>
      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(movie.id); }} aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        style={{ position: "absolute", top: 10, right: 10, background: "rgba(10,12,18,0.75)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)" }}>
        <Heart size={14} color={isFav ? CRIMSON : "#F3F1EA"} fill={isFav ? CRIMSON : "none"} strokeWidth={2} />
      </button>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: 14 }}>
        <div>
          <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "#9AA0AE" }}>{movie.year}</div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 17, fontWeight: 600, color: "#F3F1EA", lineHeight: 1.15, marginTop: 2 }}>{movie.title}</div>
        </div>
      </div>
      <div style={{
        position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,12,18,0.1) 0%, rgba(10,12,18,0.96) 100%)",
        display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16, gap: 8,
        transform: hover ? "translateY(0%)" : "translateY(12%)", opacity: hover ? 1 : 0,
        transition: "transform 300ms cubic-bezier(.2,.8,.2,1), opacity 260ms",
      }}>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 18, fontWeight: 600, color: "#F3F1EA" }}>{movie.title}</div>
        <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "#9AA0AE" }}>{movie.runtime || "—"} · {movie.genres.join(", ")}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button style={btnGold} onClick={(e) => { e.stopPropagation(); onSelect(movie, ref.current.getBoundingClientRect()); }}><Info size={13} /> Details</button>
          <button style={btnGhost} onClick={(e) => e.stopPropagation()}><Play size={12} fill="#F3F1EA" /> Trailer</button>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return <div style={{ flex: "0 0 200px", width: 200, aspectRatio: "2/3", borderRadius: 12, background: "linear-gradient(100deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 37%, rgba(255,255,255,0.04) 63%)", backgroundSize: "400% 100%", animation: "cinevia-shimmer 1.6s ease-in-out infinite", border: "1px solid rgba(255,255,255,0.06)" }} />;
}
