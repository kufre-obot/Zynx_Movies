import "react";
import { ChevronRight } from "lucide-react";
import { GOLD, TEXT } from "../theme";
import { Reveal } from "./Reveal";
import { MovieCard, CardSkeleton } from "./MovieCard";

export function MovieRow({ id, eyebrow, title, movies, onSelect, favorites, toggleFavorite, loading, onViewAll }) {
  return (
    <Reveal>
      <section id={id} style={{ padding: "0 5vw", marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, marginBottom: 4 }}>{eyebrow}</div>
            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 600, color: TEXT, margin: 0 }}>{title}</h2>
          </div>
          <button onClick={() => onViewAll && onViewAll(title, movies)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#C9CBD6", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>View All <ChevronRight size={15} /></button>
        </div>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
          {loading ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />) : movies.map((m) => <MovieCard key={m.id} movie={m} onSelect={onSelect} favorites={favorites} toggleFavorite={toggleFavorite} />)}
        </div>
      </section>
    </Reveal>
  );
}
