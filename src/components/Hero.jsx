import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Info, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { GOLD, btnGold, btnGhost } from "../theme";
import { accentOf } from "../services/movieUtils";
import { GenreChip } from "./UIBits";
import { Particles } from "./Effects";

/* ------------------------------------------------------------------ */
/*  Hero — arrows, swipe, segmented progress bar, mouse-follow glow    */
/*  + parallax, floating particles, slow zoom                          */
/*  `movies` is passed in from App.jsx (fetched from TMDB there)       */
/* ------------------------------------------------------------------ */
export function Hero({ movies, onSelect, onSlideChange }) {
  const HERO_MOVIES = movies;
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0); // restarts the progress-bar animation
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const touchStart = useRef(null);
  const timerRef = useRef(null);
  const isFirst = useRef(true);

  const goTo = useCallback((i) => {
    setIndex(((i % HERO_MOVIES.length) + HERO_MOVIES.length) % HERO_MOVIES.length);
    setTick((t) => t + 1);
  }, [HERO_MOVIES.length]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (!HERO_MOVIES || HERO_MOVIES.length === 0) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((i) => { const n = (i + 1) % HERO_MOVIES.length; return n; }), 9000);
    return () => clearInterval(timerRef.current);
  }, [tick, HERO_MOVIES]);

  useEffect(() => { if (isFirst.current) { isFirst.current = false; return; } onSlideChange && onSlideChange(); }, [index, onSlideChange]);

  // All hooks above run unconditionally on every render — safe to bail out now.
  if (!HERO_MOVIES || HERO_MOVIES.length === 0) return null;

  const movie = HERO_MOVIES[index];
  const accent = accentOf(movie.bg);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touchStart.current = null;
  };

  const parallaxX = (mouse.x - 0.5) * 14;
  const parallaxY = (mouse.y - 0.5) * 10;

  return (
    <header
      onMouseMove={handleMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ position: "relative", height: "92vh", minHeight: 560, display: "flex", alignItems: "center", padding: "0 5vw", overflow: "hidden" }}
    >
      <div className="cinevia-kenburns" style={{ position: "absolute", inset: 0, background: movie.bg, transition: "background 900ms ease" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 100% at 15% 30%, rgba(10,12,18,0.15), rgba(10,12,18,0.95))" }} />
      {/* mouse-follow spotlight */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: `radial-gradient(340px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(232,181,74,0.10), transparent 60%)` }} />
      <Particles count={14} />

      {/* arrows */}
      <button onClick={prev} aria-label="Previous movie" style={{ position: "absolute", left: 14, top: "calc(50% + 44px)", transform: "translateY(-50%)", zIndex: 3, width: 40, height: 40, borderRadius: "50%", background: "rgba(10,12,18,0.5)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <ChevronLeft size={20} color="#F3F1EA" />
      </button>
      <button onClick={next} aria-label="Next movie" style={{ position: "absolute", right: 14, top: "calc(50% + 44px)", transform: "translateY(-50%)", zIndex: 3, width: 40, height: 40, borderRadius: "50%", background: "rgba(10,12,18,0.5)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <ChevronRight size={20} color="#F3F1EA" />
      </button>

      <div style={{ position: "relative", zIndex: 2, display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap", paddingTop: 88 }}>
        <div key={movie.id} style={{ maxWidth: 560, animation: "cinevia-fade-slide 700ms ease" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>{movie.genres.map((g) => <GenreChip key={g}>{g}</GenreChip>)}</div>
          <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "clamp(2.4rem,5vw,4.2rem)", lineHeight: 1.02, color: "#F3F1EA", margin: 0 }}>{movie.title}</h1>
          <p style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 18, color: "#C9CBD6", marginTop: 14 }}>{movie.tagline}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18, fontFamily: "Manrope, sans-serif", fontSize: 14, color: "#9AA0AE" }}>
            <span>{movie.year}</span><span>·</span><span>{movie.runtime}</span><span>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, color: GOLD, fontWeight: 700 }}><Star size={13} fill={GOLD} strokeWidth={0} /> {movie.rating}</span>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 32 }}>
            <button style={{ ...btnGold, flex: "none", padding: "13px 24px", fontSize: 14 }}><Play size={15} fill="#0A0C12" /> Watch Trailer</button>
            <button style={{ ...btnGhost, flex: "none", padding: "13px 24px", fontSize: 14 }} onClick={(e) => onSelect(movie, e.currentTarget.getBoundingClientRect())}><Info size={15} /> View Details</button>
          </div>
        </div>
        <div key={`poster-${movie.id}`} style={{ position: "relative", animation: "cinevia-poster-in 800ms cubic-bezier(.2,.8,.2,1)", transform: `translate(${parallaxX}px, ${parallaxY}px)`, transition: "transform 200ms ease-out" }}>
          <div style={{ position: "absolute", inset: -30, background: accent, opacity: 0.25, filter: "blur(50px)", borderRadius: "50%", zIndex: -1 }} />
          <div className="cinevia-card-sweep" style={{ width: 260, aspectRatio: "2/3", borderRadius: 16, background: movie.bg, border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,181,74,0.08)", display: "flex", alignItems: "flex-end", padding: 20 }}>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 600, color: "#F3F1EA" }}>{movie.title}</div>
          </div>
        </div>
      </div>
    </header>
  );
}