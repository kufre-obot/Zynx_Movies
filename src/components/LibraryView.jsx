import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { GOLD, TEXT, MUTED, iconBtn } from "../theme";
import { MovieCard } from "./MovieCard";
import { Footer } from "./HomeSections";

/* ------------------------------------------------------------------ */
/*  Library page                                                       */
/*  `movieCache` (id -> movie object) comes from App.jsx, populated as  */
/*  movies get fetched from TMDB — there's no static "all movies" list. */
/* ------------------------------------------------------------------ */
export function LibraryView({ onBack, onSelect, favorites, toggleFavorite, watchlist, watched, recentIds, movieCache }) {
  const [tab, setTab] = useState("recent");
  const TABS = [{ key: "recent", label: "Recently Viewed" }, { key: "favorites", label: "Favorites" }, { key: "watchlist", label: "Watchlist" }, { key: "watched", label: "Watched" }];
  const listFor = {
    recent: recentIds.map((id) => movieCache[id]).filter(Boolean),
    favorites: [...favorites].map((id) => movieCache[id]).filter(Boolean),
    watchlist: [...watchlist].map((id) => movieCache[id]).filter(Boolean),
    watched: [...watched].map((id) => movieCache[id]).filter(Boolean),
  }[tab];
  const emptyCopy = { recent: "Movies you open will show up here.", favorites: "Tap the heart on any movie to save it here.", watchlist: "Add movies to your watchlist from their details page.", watched: "Mark a movie as watched to start your journey." }[tab];

  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(10,12,18,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "18px 5vw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <button style={iconBtn} onClick={onBack} aria-label="Back"><ChevronLeft size={20} color={TEXT} /></button>
          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: TEXT, margin: 0 }}>My Library</h1>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ background: tab === t.key ? GOLD : "transparent", color: tab === t.key ? "#0A0C12" : "#C9CBD6", border: `1px solid ${tab === t.key ? GOLD : "rgba(255,255,255,0.14)"}`, borderRadius: 999, padding: "8px 16px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 220ms" }}>
              {t.label} <span style={{ opacity: 0.7 }}>({{ recent: recentIds.length, favorites: favorites.size, watchlist: watchlist.size, watched: watched.size }[t.key]})</span>
            </button>
          ))}
        </div>
      </div>
      <div key={tab} style={{ padding: "40px 5vw 60px", animation: "cinevia-tab-fade 420ms cubic-bezier(.2,.8,.2,1)" }}>
        {listFor.length === 0 ? <div style={{ textAlign: "center", padding: "60px 20px", color: MUTED, fontFamily: "Manrope, sans-serif" }}>{emptyCopy}</div> : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>{listFor.map((m) => <MovieCard key={m.id} movie={m} onSelect={onSelect} favorites={favorites} toggleFavorite={toggleFavorite} fixedWidth={false} />)}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}