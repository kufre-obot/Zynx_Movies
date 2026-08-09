const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BACKDROP = "https://image.tmdb.org/t/p/original";
const IMG_POSTER = "https://image.tmdb.org/t/p/w342";

const FALLBACK_GRADIENTS = [
  "linear-gradient(160deg,#3a1c1c,#0a0c12)",
  "linear-gradient(160deg,#1c2b3a,#0a0c12)",
  "linear-gradient(160deg,#2b1c3a,#0a0c12)",
  "linear-gradient(160deg,#1c3a2e,#0a0c12)",
  "linear-gradient(160deg,#3a2e1c,#0a0c12)",
  "linear-gradient(160deg,#3a1c33,#0a0c12)",
];

let genreMapPromise = null;

async function tmdbFetch(path, params = {}) {
  if (!API_KEY) throw new Error("Missing VITE_TMDB_API_KEY — add it to a .env file at your project root.");
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => { if (v != null && v !== "") url.searchParams.set(k, v); });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB request failed (${res.status}): ${path}`);
  return res.json();
}

/* Genre id <-> name map, fetched once and cached for the session */
export async function getGenreMap() {
  if (!genreMapPromise) {
    genreMapPromise = tmdbFetch("/genre/movie/list").then((data) => {
      const map = {};
      data.genres.forEach((g) => { map[g.id] = g.name; });
      return map;
    });
  }
  return genreMapPromise;
}

export async function getGenreList() {
  const data = await tmdbFetch("/genre/movie/list");
  return data.genres; // [{ id, name }]
}

function backdropOrFallback(m) {
  if (m.backdrop_path) return `url('${IMG_BACKDROP}${m.backdrop_path}') center/cover no-repeat`;
  if (m.poster_path) return `url('${IMG_POSTER}${m.poster_path}') center/cover no-repeat`;
  return FALLBACK_GRADIENTS[Math.abs(m.id) % FALLBACK_GRADIENTS.length];
}

/* Normalizes a TMDB movie object into the shape every Cinevia component expects */
export function mapMovie(m, genreMap) {
  const genreIds = m.genre_ids || (m.genres ? m.genres.map((g) => g.id) : []);
  return {
    id: m.id,
    title: m.title || m.name || "Untitled",
    year: m.release_date ? Number(m.release_date.slice(0, 4)) : "—",
    runtime: m.runtime ? `${Math.floor(m.runtime / 60)}h ${m.runtime % 60}m` : null,
    rating: m.vote_average ? Math.round(m.vote_average * 10) / 10 : 0,
    genres: genreIds.map((id) => genreMap[id]).filter(Boolean),
    tagline: m.tagline || "",
    overview: m.overview || "",
    bg: backdropOrFallback(m),
    poster: m.poster_path ? `${IMG_POSTER}${m.poster_path}` : null,
  };
}

async function fetchAndMap(path, params) {
  const [data, genreMap] = await Promise.all([tmdbFetch(path, params), getGenreMap()]);
  return data.results.map((m) => mapMovie(m, genreMap));
}

export const getTrending = () => fetchAndMap("/trending/movie/week");
export const getTopRated = () => fetchAndMap("/movie/top_rated");
export const getNowPlaying = () => fetchAndMap("/movie/now_playing");
export const getPopular = () => fetchAndMap("/movie/popular");

export async function searchMovies(query) {
  if (!query || !query.trim()) return [];
  return fetchAndMap("/search/movie", { query });
}

export async function discoverByGenre(genreId, sortBy = "popularity.desc") {
  return fetchAndMap("/discover/movie", { with_genres: genreId, sort_by: sortBy });
}

export async function getMovieBasic(id) {
  const [data, genreMap] = await Promise.all([tmdbFetch(`/movie/${id}`), getGenreMap()]);
  return mapMovie(data, genreMap);
}

export async function getSimilarMovies(id) {
  return fetchAndMap(`/movie/${id}/similar`);
}

/* Full detail fetch — credits (cast/director), trailer, and watch providers
   only get pulled when a movie is actually opened, not for every card in a row. */
export async function getMovieDetails(id) {
  const [details, genreMap] = await Promise.all([
    tmdbFetch(`/movie/${id}`, { append_to_response: "credits,videos,watch/providers" }),
    getGenreMap(),
  ]);
  const mapped = mapMovie(details, genreMap);
  const director = details.credits?.crew?.find((c) => c.job === "Director");
  const writers = (details.credits?.crew || [])
    .filter((c) => c.department === "Writing")
    .slice(0, 3)
    .map((c) => c.name);
  const cast = (details.credits?.cast || []).slice(0, 8).map((c) => ({
    name: c.name,
    character: c.character,
    initials: c.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
  }));
  const trailer = (details.videos?.results || []).find((v) => v.type === "Trailer" && v.site === "YouTube");
  const providers = details["watch/providers"]?.results?.US?.flatrate || [];

  return {
    ...mapped,
    director: director ? director.name : "Unknown",
    writers: writers.length ? writers : ["Unknown"],
    cast,
    trailerKey: trailer ? trailer.key : null,
    releaseDate: details.release_date || "—",
    language: details.original_language ? details.original_language.toUpperCase() : "—",
    country: details.production_countries?.[0]?.name || "—",
    studio: details.production_companies?.[0]?.name || "—",
    budget: details.budget ? `$${(details.budget / 1e6).toFixed(0)}M` : "—",
    revenue: details.revenue ? `$${(details.revenue / 1e6).toFixed(0)}M` : "—",
    providers: providers.map((p) => ({ name: p.provider_name, logo: `https://image.tmdb.org/t/p/w45${p.logo_path}` })),
  };
}