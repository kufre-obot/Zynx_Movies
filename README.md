# Zynx Movies

A premium movie discovery frontend — dark/light/OLED theming, a cinematic
click-to-expand transition into movie details, search across titles/genres/
actors/directors, and a localStorage-backed library (recently viewed,
favorites, watchlist, watched).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
cinevia/
├─ index.html              # Vite entry HTML
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.jsx              # React root
   ├─ App.jsx                # Top-level app: state, routing between views, layout
   ├─ index.css              # Minimal baseline reset
   ├─ theme.js                # Colors, theme variants (dark/light/oled), shared button styles
   ├─ data/
   │  └─ movies.js            # Mock movie data, cast/director generation, search helper
   ├─ utils/
   │  └─ storage.js           # localStorage read/write helpers
   └─ components/
      ├─ ZynxMark.jsx      # Brand glyph (reel icon)
      ├─ PageLoader.jsx       # Splash/loading screen
      ├─ Effects.jsx          # LightSweep (brand motion), JourneyToast, Particles
      ├─ Reveal.jsx           # Scroll-into-view fade/slide wrapper
      ├─ UIBits.jsx           # SprocketDivider, GenreChip, RatingBadge
      ├─ MovieCard.jsx        # Poster card + loading skeleton
      ├─ MovieRow.jsx         # Horizontal scrolling row of MovieCards
      ├─ Navbar.jsx           # Top navigation (desktop + mobile menu)
      ├─ Hero.jsx             # Landing hero: rotating slides, arrows, swipe
      ├─ HomeSections.jsx     # GenresGrid, FeaturedCollection, Newsletter, Footer
      ├─ SearchView.jsx       # Search page
      ├─ BrowseViews.jsx      # GenreView + CategoryView ("View All" destination)
      ├─ LibraryView.jsx      # Recently Viewed / Favorites / Watchlist / Watched tabs
      ├─ ProfileView.jsx      # Guest profile: stats, theme control
      ├─ DetailsView.jsx      # Full movie details page
      ├─ FlyingBackdrop.jsx   # Shared-element transition (poster → fullscreen)
      └─ MobileBottomNav.jsx  # Bottom nav for small screens
```

## Notes

- All movie data in `src/data/movies.js` is mock/placeholder — swap it for a
  real source (e.g. TMDB) when ready. `MovieCard`, `Hero`, and the detail
  views all just expect objects shaped like the ones in that file.
- Favorites, watchlist, watched, and recently-viewed all persist to
  `localStorage` via `src/utils/storage.js`.
- The `<style>` block inside `App.jsx` carries all animation keyframes and a
  few utility classes (the signature beam sweep, card hover sweep, Ken Burns
  zoom, etc). It's intentionally left inline rather than split into a
  separate CSS file to keep it next to the state that drives it.
