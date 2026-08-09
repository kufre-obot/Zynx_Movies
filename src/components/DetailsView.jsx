import { useState, useEffect } from "react";
import { Play, Info, Heart, Star, CheckCircle2, ExternalLink, ChevronLeft } from "lucide-react";
import { GOLD, CRIMSON, CARD, TEXT, MUTED, btnGold, btnGhost } from "../theme";
import { getMovieDetails, getSimilarMovies } from "../services/tmdb";
import { GenreChip } from "./UIBits";
import { Reveal } from "./Reveal";
import { Footer } from "./HomeSections";

/* ------------------------------------------------------------------ */
/*  Details view                                                       */
/*  `movie` arrives from a list endpoint (title/poster/rating/genres    */
/*  only — no cast, director, trailer, runtime, or overview). On open,  */
/*  we fetch the full record and layer it on top once it arrives.      */
/* ------------------------------------------------------------------ */
export function DetailsView({ movie, onBack, favorites, toggleFavorite, watchlist, toggleWatchlist, watched, toggleWatched, cacheMovies }) {
  const [stage, setStage] = useState(0);
  const [details, setDetails] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(true);

  useEffect(() => { const timers = [80, 260, 440, 620].map((d, i) => setTimeout(() => setStage(i + 1), d)); return () => timers.forEach(clearTimeout); }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getMovieDetails(movie.id), getSimilarMovies(movie.id)])
      .then(([fullDetails, similarMovies]) => {
        if (cancelled) return;
        setDetails(fullDetails);
        setSimilar(similarMovies.slice(0, 8));
        cacheMovies([fullDetails, ...similarMovies]);
      })
      .catch(() => { /* keep showing the light movie data if the detail fetch fails */ })
      .finally(() => { if (!cancelled) setDetailsLoading(false); });
    return () => { cancelled = true; };
  }, [movie.id, cacheMovies]);

  // Merge: fields already known from the list endpoint show immediately;
  // richer fields fall back to "loading" placeholders until `details` arrives.
  const d = details || {};
  const isFav = favorites.has(movie.id);
  const isInWatchlist = watchlist.has(movie.id);
  const isWatched = watched.has(movie.id);
  const reveal = (n) => ({ opacity: stage >= n ? 1 : 0, transform: stage >= n ? "translateY(0)" : "translateY(14px)", transition: "opacity 450ms ease, transform 450ms ease" });

  return (
    <div style={{ position: "relative" }}>
      <div style={{ padding: "22px 5vw", position: "sticky", top: 0, zIndex: 30 }}><button style={{ ...btnGhost, padding: "10px 16px", display: "inline-flex" }} onClick={onBack}><ChevronLeft size={16} /> Back</button></div>
      <header style={{ position: "relative", minHeight: "68vh", display: "flex", alignItems: "flex-end", padding: "0 5vw 48px", background: movie.bg, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 100% at 20% 20%, rgba(10,12,18,0.1), rgba(10,12,18,0.97))" }} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", width: "100%", gap: 40, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ width: 220, aspectRatio: "2/3", borderRadius: 16, background: movie.bg, flexShrink: 0, border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7)", ...reveal(1) }} />
          <div style={{ maxWidth: 640, paddingBottom: 8 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, ...reveal(1) }}>{movie.genres.map((g) => <GenreChip key={g}>{g}</GenreChip>)}</div>
            <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "clamp(2rem,4.5vw,3.6rem)", lineHeight: 1.04, color: "#F3F1EA", margin: 0, ...reveal(1) }}>{movie.title}</h1>
            {(d.tagline || movie.tagline) && <p style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 17, color: "#C9CBD6", marginTop: 12, ...reveal(2) }}>{d.tagline || movie.tagline}</p>}
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 15, color: "#9AA0AE", marginTop: 16, lineHeight: 1.6, maxWidth: 560, ...reveal(3) }}>
              {detailsLoading ? "Loading synopsis…" : (d.overview || movie.overview || "No synopsis available.")}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16, fontFamily: "Manrope, sans-serif", fontSize: 14, color: "#9AA0AE", ...reveal(2) }}>
              <span>{movie.year}</span><span>·</span><span>{d.runtime || movie.runtime || (detailsLoading ? "…" : "—")}</span><span>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: GOLD, fontWeight: 700 }}><Star size={13} fill={GOLD} strokeWidth={0} /> {movie.rating}</span>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", ...reveal(4) }}>
              {d.trailerKey ? (
                <a href={`https://www.youtube.com/watch?v=${d.trailerKey}`} target="_blank" rel="noreferrer" style={{ ...btnGold, flex: "none", padding: "12px 22px", fontSize: 14, textDecoration: "none" }}>
                  <Play size={15} fill="#0A0C12" /> Watch Trailer
                </a>
              ) : (
                <button disabled style={{ ...btnGold, flex: "none", padding: "12px 22px", fontSize: 14, opacity: 0.5, cursor: "default" }}>
                  <Play size={15} fill="#0A0C12" /> {detailsLoading ? "Loading…" : "No Trailer"}
                </button>
              )}
              <button style={{ ...btnGhost, flex: "none", padding: "12px 22px", fontSize: 14, background: isInWatchlist ? "rgba(232,181,74,0.15)" : "rgba(255,255,255,0.08)", borderColor: isInWatchlist ? "rgba(232,181,74,0.4)" : "rgba(255,255,255,0.14)" }} onClick={() => toggleWatchlist(movie.id)}>
                <Info size={15} color={isInWatchlist ? GOLD : "#F3F1EA"} /> {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
              <button style={{ ...btnGhost, flex: "none", padding: "12px 22px", fontSize: 14, background: isWatched ? "rgba(232,181,74,0.15)" : "rgba(255,255,255,0.08)", borderColor: isWatched ? "rgba(232,181,74,0.4)" : "rgba(255,255,255,0.14)" }} onClick={() => toggleWatched(movie.id)}>
                <CheckCircle2 size={15} color={isWatched ? GOLD : "#F3F1EA"} /> {isWatched ? "Watched" : "Mark as Watched"}
              </button>
              <button style={{ ...btnGhost, flex: "none", width: 48, padding: 0 }} onClick={() => toggleFavorite(movie.id)} aria-label="Favorite"><Heart size={16} color={isFav ? CRIMSON : "#F3F1EA"} fill={isFav ? CRIMSON : "none"} /></button>
            </div>
          </div>
        </div>
      </header>
      <div style={{ paddingTop: 48 }}>
        <Reveal><section style={{ padding: "0 5vw", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 16 }}>Where to Watch</h2>
          {detailsLoading ? (
            <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>Loading…</p>
          ) : !d.providers || d.providers.length === 0 ? (
            <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>Not currently available to stream in your region.</p>
          ) : (
            <>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {d.providers.map((s) => (
                  <a key={s.name} href="#" onClick={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: 12, background: CARD, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 18px", textDecoration: "none", minWidth: 200, transition: "border-color 200ms, transform 200ms" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(232,181,74,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <img src={s.logo} alt="" width={34} height={34} style={{ borderRadius: 8, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}><div style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: TEXT }}>{s.name}</div><div style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: MUTED }}>Subscription</div></div>
                    <ExternalLink size={14} color={MUTED} />
                  </a>
                ))}
              </div>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: "#5C5F6B", marginTop: 10 }}>Streaming availability via TMDB / JustWatch — Cinevia may earn a commission from purchases made through these links.</p>
            </>
          )}
        </section></Reveal>

        <Reveal><section style={{ padding: "0 5vw", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 20 }}>Cast</h2>
          {detailsLoading ? (
            <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>Loading…</p>
          ) : !d.cast || d.cast.length === 0 ? (
            <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>No cast information available.</p>
          ) : (
            <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 8 }}>
              {d.cast.map((c) => (
                <div key={c.name} className="cinevia-card-sweep" style={{ flex: "0 0 140px", textAlign: "center" }}>
                  <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 12px", background: "linear-gradient(160deg,#27272A,#12141C)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 600, color: GOLD }}>{c.initials}</div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: TEXT }}>{c.name}</div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: MUTED, marginTop: 2 }}>{c.character}</div>
                </div>
              ))}
            </div>
          )}
        </section></Reveal>

        <Reveal><section style={{ padding: "0 5vw", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 20 }}>Trailer</h2>
          {d.trailerKey ? (
            <div style={{ position: "relative", width: "100%", maxWidth: 820, aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#000" }}>
              <iframe title="Movie trailer" src={`https://www.youtube.com/embed/${d.trailerKey}`} style={{ width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : (
            <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>{detailsLoading ? "Loading…" : "No trailer available for this title."}</p>
          )}
        </section></Reveal>

        <Reveal><section style={{ padding: "0 5vw", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 20 }}>Details</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 20, background: CARD, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
            {[
              ["Release Date", d.releaseDate || "—"],
              ["Language", d.language || "—"],
              ["Country", d.country || "—"],
              ["Studio", d.studio || "—"],
              ["Director", d.director || (detailsLoading ? "…" : "Unknown")],
              ["Writers", d.writers ? d.writers.join(", ") : "—"],
              ["Budget", d.budget || "—"],
              ["Revenue", d.revenue || "—"],
            ].map(([label, value]) => (
              <div key={label}><div style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6E7180" }}>{label}</div><div style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: TEXT, marginTop: 6 }}>{value}</div></div>
            ))}
          </div>
        </section></Reveal>

        <Reveal><section style={{ padding: "0 5vw", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600, color: TEXT, marginBottom: 20 }}>Similar Movies</h2>
          {detailsLoading ? (
            <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>Loading…</p>
          ) : similar.length === 0 ? (
            <p style={{ fontFamily: "Manrope, sans-serif", color: MUTED }}>No similar titles found.</p>
          ) : (
            <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 8 }}>
              {similar.map((m) => (
                <div key={m.id} className="cinevia-card-sweep" style={{ flex: "0 0 180px", aspectRatio: "2/3", borderRadius: 12, background: m.bg, position: "relative", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>
                  <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 4, background: "rgba(10,12,18,0.75)", borderRadius: 8, padding: "3px 7px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: GOLD }}><Star size={10} fill={GOLD} strokeWidth={0} /> {m.rating}</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "linear-gradient(180deg,transparent,rgba(10,12,18,0.9))" }}><div style={{ fontFamily: "Fraunces, serif", fontSize: 15, fontWeight: 600, color: "#F3F1EA" }}>{m.title}</div><div style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: "#9AA0AE" }}>{m.year}</div></div>
                </div>
              ))}
            </div>
          )}
        </section></Reveal>
        <Footer />
      </div>
    </div>
  );
}