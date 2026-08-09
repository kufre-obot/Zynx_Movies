import { useState } from "react";
import { GOLD, TEXT, MUTED, CARD, btnGold } from "../theme";
import { Reveal } from "./Reveal";
import { MovieCard } from "./MovieCard";

const CARD_GRADIENTS = [
  "linear-gradient(160deg,#3a1c1c,#0a0c12)",
  "linear-gradient(160deg,#1c2b3a,#0a0c12)",
  "linear-gradient(160deg,#2b1c3a,#0a0c12)",
  "linear-gradient(160deg,#1c3a2e,#0a0c12)",
  "linear-gradient(160deg,#3a2e1c,#0a0c12)",
  "linear-gradient(160deg,#3a1c33,#0a0c12)",
];

/* ------------------------------------------------------------------ */
/*  Genres + Collection + Newsletter + Footer                          */
/*  `genres` (array of {id,name}) and `collectionMovies` come from     */
/*  App.jsx, which fetches them from TMDB.                             */
/* ------------------------------------------------------------------ */
export function GenresGrid({ genres, onOpenGenre }) {
  if (!genres || genres.length === 0) return null;
  return (
    <Reveal>
      <section id="section-genres" style={{ padding: "0 5vw", marginBottom: 56 }}>
        <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, marginBottom: 4 }}>Browse</div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 600, color: TEXT, margin: "0 0 20px" }}>Genres</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))", gap: 14 }}>
          {genres.slice(0, 8).map((g, i) => (
            <div key={g.id} className="cinevia-card-sweep" onClick={() => onOpenGenre(g.id, g.name)} style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length], border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "26px 18px", cursor: "pointer", transition: "transform 220ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 19, fontWeight: 600, color: "#F3F1EA" }}>{g.name}</div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
export function FeaturedCollection({ movies, onSelect, favorites, toggleFavorite }) {
  if (!movies || movies.length === 0) return null;
  return (
    <Reveal>
      <section id="section-collections" style={{ padding: "0 5vw", marginBottom: 56 }}>
        <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", padding: "48px 40px", background: "linear-gradient(120deg,#12141C,#1c2b3a)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 24 }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>Featured Collection</div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 34, fontWeight: 600, color: "#F3F1EA", margin: 0 }}>Top Space Movies</h2>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: "#9AA0AE", marginTop: 10, maxWidth: 480 }}>Vast, quiet, and a little terrifying — the definitive films for staring into the dark.</p>
        </div>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 8 }}>
          {movies.map((m) => <MovieCard key={m.id} movie={m} onSelect={onSelect} favorites={favorites} toggleFavorite={toggleFavorite} />)}
        </div>
      </section>
    </Reveal>
  );
}
export function Newsletter() {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false);
  return (
    <Reveal>
      <section style={{ padding: "60px 5vw", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 600, color: TEXT, margin: 0 }}>Get early access to new releases</h2>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: MUTED, marginTop: 8 }}>Curated picks, once a week. No noise.</p>
        {sent ? (
          <div style={{ fontFamily: "Manrope, sans-serif", color: GOLD, marginTop: 20, fontWeight: 700 }}>You're on the list.</div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8, padding: "12px 16px", color: TEXT, fontFamily: "Manrope, sans-serif", fontSize: 14, width: 260, outline: "none" }} />
            <button style={{ ...btnGold, flex: "none", padding: "12px 22px" }} onClick={() => email && setSent(true)}>Subscribe</button>
          </div>
        )}
      </section>
    </Reveal>
  );
}
export function Footer() {
  return (
    <footer style={{ padding: "40px 5vw 96px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 20 }}>
      <div style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 19, color: TEXT }}>Cine<span style={{ color: GOLD }}>via</span></div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#8C8E9B" }}><span>About</span><span>Privacy</span><span>Terms</span><span>DMCA</span><span>Contact</span></div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#8C8E9B" }}>© 2026 Cinevia</div>
    </footer>
  );
}