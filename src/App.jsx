import  { useState, useEffect, useCallback } from "react";
import { Lock } from "lucide-react";
import { GOLD, CARD, TEXT, BG, MUTED, THEME_VARS, THEME_ORDER, btnGold, btnGhost, FONT_IMPORT } from "./theme";
import { LS_KEYS, loadSet, loadList, loadStr, saveSet, saveList } from "./utils/storage";
import { TRENDING, TOP_RATED, NEW_RELEASES, MOVIES_BY_ID } from "./data/movies";
import { PageLoader } from "./components/PageLoader";
import { LightSweep, JourneyToast } from "./components/Effects";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MovieRow } from "./components/MovieRow";
import { SprocketDivider } from "./components/UIBits";
import { GenresGrid, FeaturedCollection, Newsletter, Footer } from "./components/HomeSections";
import { SearchView } from "./components/SearchView";
import { LibraryView } from "./components/LibraryView";
import { GenreView, CategoryView } from "./components/BrowseViews";
import { ProfileView } from "./components/ProfileView";
import { DetailsView } from "./components/DetailsView";
import { FlyingBackdrop } from "./components/FlyingBackdrop";
import { MobileBottomNav } from "./components/MobileBottomNav";

/* ------------------------------------------------------------------ */
/*  App                                                                 */
/* ------------------------------------------------------------------ */
export default function CineviaApp() {
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => loadStr(LS_KEYS.theme, "dark"));
  const [sweepKey, setSweepKey] = useState(0);
  const fireSweep = useCallback(() => setSweepKey((k) => k + 1), []);

  const [favorites, setFavorites] = useState(() => loadSet(LS_KEYS.favorites));
  const [watchlist, setWatchlist] = useState(() => loadSet(LS_KEYS.watchlist));
  const [watched, setWatched] = useState(() => loadSet(LS_KEYS.watched));
  const [recentIds, setRecentIds] = useState(() => loadList(LS_KEYS.recent));
  useEffect(() => saveSet(LS_KEYS.favorites, favorites), [favorites]);
  useEffect(() => saveSet(LS_KEYS.watchlist, watchlist), [watchlist]);
  useEffect(() => saveSet(LS_KEYS.watched, watched), [watched]);
  useEffect(() => saveList(LS_KEYS.recent, recentIds), [recentIds]);
  useEffect(() => { try { localStorage.setItem(LS_KEYS.theme, theme); } catch { /* storage unavailable — ignore */ } }, [theme]);

  const [background, setBackground] = useState("grid"); // grid | search | library | genre | category
  const [activeGenre, setActiveGenre] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [overlay, setOverlay] = useState(null); // null | opening | details | closing
  const [activeMovie, setActiveMovie] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showJourneyToast, setShowJourneyToast] = useState(false);
  const WATCHLIST_FREE_CAP = 3;

  useEffect(() => {
    const t1 = setTimeout(() => { setLoading(false); fireSweep(); }, 1700);
    const t2 = setTimeout(() => setContentReady(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [fireSweep]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);

  const cycleTheme = useCallback(() => setTheme((t) => THEME_ORDER[(THEME_ORDER.indexOf(t) + 1) % THEME_ORDER.length]), []);

  const toggleFavorite = useCallback((id) => setFavorites((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; }), []);
  const toggleWatchlist = useCallback((id) => setWatchlist((prev) => {
    const next = new Set(prev);
    if (next.has(id)) { next.delete(id); return next; }
    if (next.size >= WATCHLIST_FREE_CAP) { setShowUpgrade(true); return prev; }
    next.add(id); return next;
  }), []);
  const toggleWatched = useCallback((id) => setWatched((prev) => {
    const next = new Set(prev);
    if (next.has(id)) { next.delete(id); } else { next.add(id); setShowJourneyToast(true); setTimeout(() => setShowJourneyToast(false), 2200); }
    return next;
  }), []);

  const handleSelect = useCallback((movie, rect) => {
    setActiveMovie(movie); setOriginRect(rect); setOverlay("opening");
    document.body.style.overflow = "hidden";
    setRecentIds((prev) => [movie.id, ...prev.filter((id) => id !== movie.id)].slice(0, 8));
    setTimeout(() => { setOverlay("details"); document.body.style.overflow = "auto"; window.scrollTo(0, 0); }, 640);
  }, []);
  const handleBack = useCallback(() => {
    document.body.style.overflow = "hidden"; setOverlay("closing");
    setTimeout(() => { setOverlay(null); setActiveMovie(null); document.body.style.overflow = "auto"; fireSweep(); }, 380);
  }, [fireSweep]);

  const handleSearchOpen = useCallback(() => { setBackground("search"); window.scrollTo(0, 0); fireSweep(); }, [fireSweep]);
  const handleLibraryOpen = useCallback(() => { setBackground("library"); window.scrollTo(0, 0); fireSweep(); }, [fireSweep]);
  const handleGenreOpen = useCallback((g) => { setActiveGenre(g); setBackground("genre"); window.scrollTo(0, 0); fireSweep(); }, [fireSweep]);
  const handleCategoryOpen = useCallback((title, movies) => { setActiveCategory({ title, movies }); setBackground("category"); window.scrollTo(0, 0); fireSweep(); }, [fireSweep]);
  const handleProfileOpen = useCallback(() => { setBackground("profile"); window.scrollTo(0, 0); fireSweep(); }, [fireSweep]);
  const handleBackgroundClose = useCallback(() => { setBackground("grid"); window.scrollTo(0, 0); fireSweep(); }, [fireSweep]);
  const handleNavigate = useCallback((targetId) => {
    if (background !== "grid") { setBackground("grid"); fireSweep(); }
    setTimeout(() => {
      if (!targetId) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      const el = document.getElementById(targetId);
      el && el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, background !== "grid" ? 60 : 0);
  }, [background, fireSweep]);

  const showBackground = overlay === null || overlay === "opening" || overlay === "closing";
  const dimmed = overlay === "opening" || overlay === "closing";
  const tv = THEME_VARS[theme] || THEME_VARS.dark;

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, "--cinevia-bg": tv.bg, "--cinevia-card": tv.card, "--cinevia-text": tv.text, "--cinevia-muted": tv.muted }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { height: 0; width: 8px; }
        @keyframes cinevia-logo-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes cinevia-fade-slide { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes cinevia-poster-in { from { opacity: 0; transform: translateY(20px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes cinevia-zoom { from { transform: scale(1); } to { transform: scale(1.08); } }
        @keyframes cinevia-mark-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes cinevia-tab-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cinevia-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes cinevia-particle { 0% { transform: translateY(0) translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100vh) translateX(var(--drift)); opacity: 0; } }
        .cinevia-kenburns { animation: cinevia-zoom 16s ease-in-out infinite alternate; }

        .cinevia-beam { position: fixed; inset: 0; z-index: 95; pointer-events: none; overflow: hidden; }
        .cinevia-beam::before { content: ''; position: absolute; top: -10%; left: -35%; width: 32%; height: 120%; background: linear-gradient(100deg, transparent, rgba(232,181,74,0.30), rgba(243,241,234,0.14), transparent); transform: skewX(-18deg) translateX(-100%); filter: blur(1px); animation: cinevia-beam-sweep 200ms cubic-bezier(.3,.7,.3,1) forwards; }
        @keyframes cinevia-beam-sweep { 0% { transform: skewX(-18deg) translateX(-100%); opacity: 0; } 22% { opacity: 1; } 100% { transform: skewX(-18deg) translateX(340%); opacity: 0; } }

        .cinevia-card-sweep { position: relative; overflow: hidden; }
        .cinevia-card-sweep::after { content: ''; position: absolute; top: 0; left: -60%; width: 34%; height: 100%; background: linear-gradient(100deg, transparent, rgba(232,181,74,0.22), transparent); transform: skewX(-18deg); transition: left 480ms cubic-bezier(.2,.8,.2,1); pointer-events: none; z-index: 3; }
        .cinevia-card-sweep:hover::after { left: 140%; }

        @media (max-width: 860px) {
          .cinevia-nav-links { display: none !important; }
          .cinevia-mobile-btn { display: flex !important; }
          .cinevia-bottom-nav { display: flex !important; }
          body { padding-bottom: 64px; }
        }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
        input:focus, button:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 2px; }
      `}</style>

      <PageLoader visible={loading} />
      <LightSweep trigger={sweepKey} />
      <JourneyToast visible={showJourneyToast} />

      {showBackground && (
        <div style={{ opacity: dimmed ? 0.25 : 1, filter: dimmed ? "blur(6px)" : "none", transition: "opacity 420ms ease, filter 420ms ease" }}>
          {background === "grid" && (
            <>
              <Navbar scrolled={scrolled} theme={theme} cycleTheme={cycleTheme} onSearchClick={handleSearchOpen} onLibraryClick={handleLibraryOpen} onNavigate={handleNavigate} />
              <Hero onSelect={handleSelect} onSlideChange={fireSweep} />
              <div style={{ paddingTop: 56 }}>
                {recentIds.length > 0 && <MovieRow eyebrow="Pick up where you left off" title="Continue Exploring" movies={recentIds.map((id) => MOVIES_BY_ID[id]).filter(Boolean)} onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} onViewAll={handleCategoryOpen} />}
                <MovieRow id="section-trending" eyebrow="Right now" title="Trending Movies" movies={TRENDING} onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} loading={!contentReady} onViewAll={handleCategoryOpen} />
                <SprocketDivider />
                <MovieRow eyebrow="Critically acclaimed" title="Top Rated" movies={TOP_RATED} onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} loading={!contentReady} onViewAll={handleCategoryOpen} />
                <SprocketDivider />
                <MovieRow eyebrow="Just landed" title="New Releases" movies={NEW_RELEASES} onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} loading={!contentReady} onViewAll={handleCategoryOpen} />
                <GenresGrid onOpenGenre={handleGenreOpen} />
                <FeaturedCollection onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} />
                <Newsletter />
                <Footer />
              </div>
            </>
          )}
          {background === "search" && <SearchView onBack={handleBackgroundClose} onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} />}
          {background === "library" && <LibraryView onBack={handleBackgroundClose} onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} watchlist={watchlist} watched={watched} recentIds={recentIds} />}
          {background === "genre" && <GenreView genre={activeGenre} onBack={handleBackgroundClose} onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} />}
          {background === "category" && activeCategory && <CategoryView title={activeCategory.title} movies={activeCategory.movies} onBack={handleBackgroundClose} onSelect={handleSelect} favorites={favorites} toggleFavorite={toggleFavorite} />}
          {background === "profile" && <ProfileView onBack={handleBackgroundClose} onOpenLibrary={handleLibraryOpen} favorites={favorites} watchlist={watchlist} watched={watched} theme={theme} cycleTheme={cycleTheme} />}
        </div>
      )}

      {(overlay === "opening" || overlay === "closing") && activeMovie && originRect && <FlyingBackdrop movie={activeMovie} originRect={originRect} mode={overlay === "opening" ? "opening" : "closing"} />}
      {overlay === "details" && activeMovie && <DetailsView movie={activeMovie} onBack={handleBack} favorites={favorites} toggleFavorite={toggleFavorite} watchlist={watchlist} toggleWatchlist={toggleWatchlist} watched={watched} toggleWatched={toggleWatched} />}

      <MobileBottomNav active={background === "grid" ? "home" : background} onHome={() => { setBackground("grid"); fireSweep(); }} onSearch={handleSearchOpen} onLibrary={handleLibraryOpen} onProfile={handleProfileOpen} />

      {showUpgrade && (
        <div onClick={() => setShowUpgrade(false)} style={{ position: "fixed", inset: 0, background: "rgba(6,7,11,0.8)", backdropFilter: "blur(4px)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 380, width: "100%", background: CARD, borderRadius: 18, padding: 32, border: "1px solid rgba(232,181,74,0.3)", textAlign: "center" }}>
            <Lock size={28} color={GOLD} style={{ marginBottom: 14 }} />
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 22, color: TEXT, margin: "0 0 10px" }}>Unlock unlimited watchlists</h3>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: MUTED, marginBottom: 22 }}>You've hit the {WATCHLIST_FREE_CAP}-title free limit. Go Premium for unlimited watchlists, early access to new releases, and no caps.</p>
            <button style={{ ...btnGold, width: "100%" }} onClick={() => setShowUpgrade(false)}>Go Premium</button>
            <button style={{ ...btnGhost, width: "100%", marginTop: 10, border: "none", background: "none" }} onClick={() => setShowUpgrade(false)}>Not now</button>
          </div>
        </div>
      )}
    </div>
  );
}

