export const LS_KEYS = { favorites: "cinevia_favorites", watchlist: "cinevia_watchlist", watched: "cinevia_watched", recent: "cinevia_recent", theme: "cinevia_theme" };
export const loadSet = (key) => { try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch { return new Set(); } };
export const loadList = (key) => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
export const loadStr = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
export const saveSet = (key, set) => { try { localStorage.setItem(key, JSON.stringify([...set])); } catch { /* storage unavailable — ignore */ } };
export const saveList = (key, list) => { try { localStorage.setItem(key, JSON.stringify(list)); } catch { /* storage unavailable — ignore */ } };