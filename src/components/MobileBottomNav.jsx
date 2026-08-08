import { Home, Search, Bookmark, User } from "lucide-react";
import { GOLD } from "../theme";

/* ------------------------------------------------------------------ */
/*  Mobile bottom navigation                                           */
/* ------------------------------------------------------------------ */
export function MobileBottomNav({ onHome, onSearch, onLibrary, onProfile, active }) {
  const items = [
    { key: "home", label: "Home", icon: Home, onClick: onHome },
    { key: "search", label: "Search", icon: Search, onClick: onSearch },
    { key: "library", label: "Library", icon: Bookmark, onClick: onLibrary },
    { key: "profile", label: "Profile", icon: User, onClick: onProfile },
  ];
  return (
    <div className="cinevia-bottom-nav" style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, background: "rgba(10,12,18,0.92)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "10px 6px calc(10px + env(safe-area-inset-bottom))" }}>
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.key;
        return (
          <button key={it.key} onClick={it.onClick} style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 0" }}>
            <Icon size={20} color={isActive ? GOLD : "#8C8E9B"} fill={it.key === "library" && isActive ? GOLD : "none"} />
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 700, color: isActive ? GOLD : "#8C8E9B" }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}