import  { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, ChevronLeft, SlidersHorizontal, TrendingUp } from "lucide-react";
import { GOLD, TEXT, MUTED, CARD, iconBtn } from "../theme";
import { ALL_MOVIES, GENRES, TRENDING_SEARCHES, searchableText } from "../data/movies";
import { GenreChip } from "./UIBits";
import { MovieCard } from "./MovieCard";
import { Footer } from "./HomeSections";

/* ------------------------------------------------------------------ */
/*  Search page — now matches title, genres, actors, and directors     */
/* ------------------------------------------------------------------ */
export function SearchView({ onBack, onSelect, favorites, toggleFavorite }) {
  const [query, setQuery] = useState("");
  const [activeGenres, setActiveGenres] = useState(new Set());
  const [sort, setSort] = useState("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  const toggleGenre = (g) => setActiveGenres((prev) => { const next = new Set(prev); next.has(g) ? next.delete(g) : next.add(g); return next; });
  const isSearching = query.trim().length > 0 || activeGenres.size > 0;

  const results = useMemo(() => {
    let list = ALL_MOVIES.filter((m) => {
      const matchesQuery = query.trim() === "" || searchableText(m).includes(query.trim().toLowerCase());
      const matchesGenre = activeGenres.size === 0 || m.genres.some((g) => activeGenres.has(g));
      return matchesQuery && matchesGenre;
    });
    return [...list].sort((a, b) => (sort === "rating" ? b.rating - a.rating : b.year - a.year));
  }, [query, activeGenres, sort]);
  const popular = useMemo(() => [...ALL_MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 8), []);

  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(10,12,18,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "18px 5vw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, maxWidth: 760, margin: "0 auto" }}>
          <button style={iconBtn} onClick={onBack} aria-label="Back"><ChevronLeft size={20} color={TEXT} /></button>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: CARD, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 14px" }}>
            <Search size={16} color={MUTED} />
            <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search titles, genres, actors, directors..." style={{ flex: 1, background: "none", border: "none", outline: "none", color: TEXT, fontFamily: "Manrope, sans-serif", fontSize: 15 }} />
            {query && <button style={{ ...iconBtn, padding: 0 }} onClick={() => setQuery("")}><X size={15} color={MUTED} /></button>}
          </div>
          <button style={{ ...iconBtn, background: filtersOpen ? "rgba(232,181,74,0.15)" : "none", borderRadius: 8 }} onClick={() => setFiltersOpen((v) => !v)} aria-label="Filters"><SlidersHorizontal size={18} color={filtersOpen ? GOLD : TEXT} /></button>
        </div>
        {filtersOpen && (
          <div style={{ maxWidth: 760, margin: "16px auto 0" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>{GENRES.map((g) => <GenreChip key={g} active={activeGenres.has(g)} onClick={() => toggleGenre(g)}>{g}</GenreChip>)}</div>
            <div style={{ display: "flex", gap: 8, fontFamily: "Manrope, sans-serif", fontSize: 12 }}>
              <button onClick={() => setSort("rating")} style={{ ...iconBtn, padding: "5px 10px", borderRadius: 8, color: sort === "rating" ? GOLD : MUTED, fontWeight: 700 }}>Top Rated</button>
              <button onClick={() => setSort("year")} style={{ ...iconBtn, padding: "5px 10px", borderRadius: 8, color: sort === "year" ? GOLD : MUTED, fontWeight: 700 }}>Newest</button>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "40px 5vw 0" }}>
        {!isSearching && (
          <>
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><TrendingUp size={16} color={GOLD} /><h2 style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 600, color: TEXT, margin: 0 }}>Trending Searches</h2></div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{TRENDING_SEARCHES.map((t) => <button key={t} onClick={() => setQuery(t)} style={{ background: CARD, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "8px 16px", color: "#C9CBD6", fontFamily: "Manrope, sans-serif", fontSize: 13, cursor: "pointer" }}>{t}</button>)}</div>
            </section>
            <section style={{ marginBottom: 8 }}>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 20 }}>Popular Movies</h2>
              <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 24 }}>{popular.map((m) => <MovieCard key={m.id} movie={m} onSelect={onSelect} favorites={favorites} toggleFavorite={toggleFavorite} />)}</div>
            </section>
          </>
        )}
        {isSearching && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 20 }}>{results.length} result{results.length !== 1 ? "s" : ""} {query && <span style={{ color: MUTED, fontWeight: 400 }}>for "{query}"</span>}</h2>
            {results.length === 0 ? <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>No movies match that search yet — try a different title, genre, actor, or director.</p> : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>{results.map((m) => <MovieCard key={m.id} movie={m} onSelect={onSelect} favorites={favorites} toggleFavorite={toggleFavorite} fixedWidth={false} />)}</div>
            )}
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
