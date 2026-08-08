/* ------------------------------------------------------------------ */
/*  Mock data — cast/director now assigned per movie (not shared),     */
/*  so genre/actor/director search actually differentiates results    */
/* ------------------------------------------------------------------ */
export const GRADIENTS = [
  "linear-gradient(160deg,#3a1c1c,#0a0c12)",
  "linear-gradient(160deg,#1c2b3a,#0a0c12)",
  "linear-gradient(160deg,#2b1c3a,#0a0c12)",
  "linear-gradient(160deg,#1c3a2e,#0a0c12)",
  "linear-gradient(160deg,#3a2e1c,#0a0c12)",
  "linear-gradient(160deg,#3a1c33,#0a0c12)",
];
export const accentOf = (bg) => (bg.match(/#[0-9a-fA-F]{6}/) || ["#E8B54A"])[0];

export const ACTORS = ["Vivian Okoye", "Daniel Kwan", "Priya Advani", "Marcus Webb", "Lucia Ferrante", "Sofia Ruiz", "Ben Whitfield", "Aiko Tanaka"];
export const CHARACTERS = ["the Archivist", "the Detective", "the Rival", "the Mentor", "the Stranger", "the Sister", "the Captain", "the Informant"];
export const DIRECTORS = ["Elena Marsh", "Victor Hale", "Priya Chandran", "Tomas Reyes", "Naomi Cole", "Derek Osei"];
export const castFor = (id) => [0, 1, 2, 3, 4].map((i) => {
  const idx = (id + i) % ACTORS.length;
  return { name: ACTORS[idx], character: CHARACTERS[idx], initials: ACTORS[idx].split(" ").map((w) => w[0]).join("") };
});

export const mk = (id, title, year, rt, rating, genres, tagline) => ({
  id, title, year, runtime: rt, rating, genres, tagline, bg: GRADIENTS[id % GRADIENTS.length],
  director: DIRECTORS[id % DIRECTORS.length], cast: castFor(id),
});

export const HERO_MOVIES = [
  mk(1, "The Last Reel", 2026, "2h 18m", 8.7, ["Drama", "Mystery"], "Every frame hides a secret."),
  mk(2, "Nightshade City", 2026, "1h 56m", 8.2, ["Sci-Fi", "Thriller"], "The future was never invited."),
  mk(3, "Marigold & Ash", 2025, "2h 04m", 8.9, ["Romance", "Drama"], "Some love stories burn twice."),
];
export const TRENDING = [
  mk(4, "Velvet Horizon", 2026, "1h 47m", 7.8, ["Action", "Adventure"]),
  mk(5, "Static Bloom", 2026, "1h 39m", 7.5, ["Horror"]),
  mk(6, "The Cartographer's Wife", 2025, "2h 11m", 8.4, ["Drama"]),
  mk(7, "Low Tide", 2026, "1h 52m", 7.9, ["Thriller"]),
  mk(8, "Paper Moons", 2025, "1h 44m", 8.0, ["Comedy", "Romance"]),
  mk(9, "Iron Meridian", 2026, "2h 22m", 8.3, ["Sci-Fi", "Action"]),
];
export const TOP_RATED = [
  mk(10, "Glasshouse", 2024, "2h 09m", 9.1, ["Drama"]),
  mk(11, "The Quiet Engine", 2023, "1h 58m", 8.8, ["Mystery"]),
  mk(12, "Salt & Static", 2025, "2h 01m", 8.7, ["Thriller"]),
  mk(13, "Amber Season", 2024, "1h 49m", 8.6, ["Romance"]),
  mk(14, "Hollow Point", 2022, "2h 15m", 8.5, ["Action"]),
  mk(15, "Ferrotype", 2025, "1h 41m", 8.5, ["Drama", "Mystery"]),
];
export const NEW_RELEASES = [
  mk(16, "Cinder Row", 2026, "1h 55m", 7.6, ["Horror", "Thriller"]),
  mk(17, "Departure Lounge", 2026, "1h 48m", 7.7, ["Comedy"]),
  mk(18, "The Understudy", 2026, "2h 06m", 8.1, ["Drama"]),
  mk(19, "Wildfire Radio", 2026, "1h 51m", 7.4, ["Adventure"]),
  mk(20, "Nocturne Ave", 2026, "1h 59m", 8.0, ["Mystery", "Noir"]),
  mk(21, "Second Light", 2026, "2h 12m", 8.2, ["Sci-Fi"]),
];
export const COLLECTION = [
  mk(22, "Deep Field", 2021, "2h 08m", 8.6, ["Sci-Fi"]),
  mk(23, "Orbital Drift", 2019, "2h 14m", 8.3, ["Sci-Fi", "Drama"]),
  mk(24, "The Long Dark", 2023, "1h 57m", 8.5, ["Sci-Fi", "Thriller"]),
  mk(25, "Signal Lost", 2020, "1h 52m", 7.9, ["Sci-Fi", "Horror"]),
];
export const GENRES = ["Action", "Comedy", "Horror", "Romance", "Sci-Fi", "Drama", "Thriller", "Animation", "Mystery", "Adventure"];
export const ALL_MOVIES = [...HERO_MOVIES, ...TRENDING, ...TOP_RATED, ...NEW_RELEASES, ...COLLECTION];
export const MOVIES_BY_ID = Object.fromEntries(ALL_MOVIES.map((m) => [m.id, m]));
export const TRENDING_SEARCHES = ["sci-fi", "2026 releases", "top rated", "horror night", "The Last Reel", "space movies", "Elena Marsh", "Vivian Okoye"];
export const WHERE_TO_WATCH = [
  { name: "StreamPlex", tier: "Subscription", color: "#7C4DFF" },
  { name: "PrimeVision", tier: "Rent · $4.99", color: "#3A9BDC" },
  { name: "CinePlay", tier: "Buy · $14.99", color: "#E85A4F" },
];
export const GENERIC_DETAILS = {
  overview: "A retired film archivist discovers a reel of unreleased footage that implicates her late mentor in a decades-old disappearance. As she pieces together the truth frame by frame, she realizes someone doesn't want the story finished.",
  releaseDate: "March 14, 2026", language: "English", country: "United States", studio: "Meridian Pictures",
  writers: ["Elena Marsh", "Tomas Reyes"], budget: "$28M", revenue: "$142M",
};
export const searchableText = (m) => `${m.title} ${m.genres.join(" ")} ${m.director} ${m.cast.map((c) => c.name).join(" ")}`.toLowerCase();
