import  { useState } from "react";
import { Search, Sun, Moon, Contrast, Menu, X, Bookmark } from "lucide-react";
import { GOLD, TEXT, BG, iconBtn } from "../theme";
import { ZynxMark } from "./ZynxMark";

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Home", targetId: null },
  { label: "Trending", targetId: "section-trending" },
  { label: "Genres", targetId: "section-genres" },
  { label: "Collections", targetId: "section-collections" },
];

export function Navbar({ scrolled, theme, cycleTheme, onSearchClick, onLibraryClick, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Contrast;
  const go = (targetId) => { onNavigate(targetId); setMobileOpen(false); };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: scrolled ? "12px 5vw" : "22px 5vw", background: scrolled ? "rgba(10,12,18,0.72)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent", boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.35)" : "none", transition: "all 280ms ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ZynxMark size={20} />
        <div style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 21, color: TEXT }}>Zynx<span style={{ color: GOLD }}>Movies</span></div>
      </div>
      <div className="cinevia-nav-links" style={{ display: "flex", gap: 32 }}>
        {NAV_LINKS.map((l) => (
          <button key={l.label} onClick={() => go(l.targetId)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 600, color: "#D6D8E0" }}>{l.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button aria-label="Search" style={iconBtn} onClick={onSearchClick}><Search size={17} color={TEXT} /></button>
        <button aria-label="My Library" style={iconBtn} onClick={onLibraryClick}><Bookmark size={17} color={TEXT} /></button>
        <button aria-label={`Theme: ${theme}. Click to cycle.`} style={iconBtn} onClick={cycleTheme} title={`Theme: ${theme}`}><ThemeIcon size={17} color={TEXT} /></button>
        <button className="cinevia-mobile-btn" aria-label="Menu" style={{ ...iconBtn, display: "none" }} onClick={() => setMobileOpen(true)}><Menu size={19} color={TEXT} /></button>
      </div>
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: BG, zIndex: 60, display: "flex", flexDirection: "column", padding: "24px 6vw" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><ZynxMark size={20} /><div style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 19, color: TEXT }}>Cine<span style={{ color: GOLD }}>via</span></div></div>
            <button style={iconBtn} onClick={() => setMobileOpen(false)}><X size={22} color={TEXT} /></button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 40 }}>
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => go(l.targetId)} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "Fraunces, serif", fontSize: 28, color: TEXT }}>{l.label}</button>
            ))}
          </div>
          <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 20 }}>
            <button onClick={() => { onSearchClick(); setMobileOpen(false); }} style={{ ...iconBtn }}><Search size={20} color={TEXT} /></button>
            <button onClick={() => { onLibraryClick(); setMobileOpen(false); }} style={{ ...iconBtn }}><Bookmark size={20} color={TEXT} /></button>
            <button onClick={cycleTheme} style={{ ...iconBtn }}><ThemeIcon size={20} color={TEXT} /></button>
          </div>
        </div>
      )}
    </nav>
  );
}
