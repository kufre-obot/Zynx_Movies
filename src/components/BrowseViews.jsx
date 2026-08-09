import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { GOLD, TEXT, MUTED, btnGhost } from "../theme";
import { discoverByGenre } from "../services/tmdb";
import { MovieCard } from "./MovieCard";
import { Footer } from "./HomeSections";

/* ------------------------------------------------------------------ */
/*  Category page — the "View All" destination for any movie row      */
/*  (unchanged — it already just renders whatever movies it's given)   */
/* ------------------------------------------------------------------ */
export function CategoryView({ title, movies, onBack, onSelect, favorites, toggleFavorite }) {
  return (
    <div>
      <div style={{ padding: "22px 5vw", position: "sticky", top: 0, zIndex: 30, background: "rgba(10,12,18,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <button style={{ ...btnGhost, padding: "10px 16px", display: "inline-flex" }} onClick={onBack}><ChevronLeft size={16} /> Back</button>
      </div>
      <div style={{ padding: "40px 5vw" }}>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 36, fontWeight: 700, color: TEXT, margin: "0 0 28px" }}>{title}</h1>
        {movies.length === 0 ? <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>Nothing here yet.</p> : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>{movies.map((m) => <MovieCard key={m.id} movie={m} onSelect={onSelect} favorites={favorites} toggleFavorite={toggleFavorite} fixedWidth={false} />)}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Genre page — fetches live from TMDB's /discover/movie              */
/* ------------------------------------------------------------------ */
export function GenreView({ genreId, genreName, onBack, onSelect, favorites, toggleFavorite, cacheMovies }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    discoverByGenre(genreId, "vote_average.desc")
      .then((movies) => { if (!cancelled) { setResults(movies); cacheMovies(movies); } })
      .catch(() => { if (!cancelled) setResults([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [genreId, cacheMovies]);

  return (
    <div>
      <div style={{ padding: "22px 5vw", position: "sticky", top: 0, zIndex: 30, background: "rgba(10,12,18,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <button style={{ ...btnGhost, padding: "10px 16px", display: "inline-flex" }} onClick={onBack}><ChevronLeft size={16} /> Back</button>
      </div>
      <div style={{ padding: "40px 5vw" }}>
        <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>Genre</div>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 36, fontWeight: 700, color: TEXT, margin: "0 0 28px" }}>{genreName}</h1>
        {loading ? <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>Loading…</p> : results.length === 0 ? <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>Nothing in this genre yet.</p> : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>{results.map((m) => <MovieCard key={m.id} movie={m} onSelect={onSelect} favorites={favorites} toggleFavorite={toggleFavorite} fixedWidth={false} />)}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}