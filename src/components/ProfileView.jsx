import "react";
import { User, Bookmark, ChevronRight, ChevronLeft, Sun, Moon, Contrast } from "lucide-react";
import { GOLD, TEXT, MUTED, CARD, btnGhost } from "../theme";
import { Footer } from "./HomeSections";

/* ------------------------------------------------------------------ */
/*  Profile page — lightweight: stats + theme control + library        */
/*  shortcuts. No account system exists, so this stays guest-only.     */
/* ------------------------------------------------------------------ */
export function ProfileView({ onBack, onOpenLibrary, favorites, watchlist, watched, theme, cycleTheme }) {
  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Contrast;
  const stats = [
    { label: "Favorites", value: favorites.size },
    { label: "Watchlist", value: watchlist.size },
    { label: "Watched", value: watched.size },
  ];
  return (
    <div>
      <div style={{ padding: "22px 5vw", position: "sticky", top: 0, zIndex: 30, background: "rgba(10,12,18,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <button style={{ ...btnGhost, padding: "10px 16px", display: "inline-flex" }} onClick={onBack}><ChevronLeft size={16} /> Back</button>
      </div>

      <div style={{ padding: "48px 5vw", maxWidth: 560 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 36 }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(160deg,#27272A,#12141C)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={28} color={GOLD} />
          </div>
          <div>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 600, color: TEXT }}>Guest</div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: MUTED }}>Browsing without an account</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36 }}>
          {stats.map((s) => (
            <div key={s.label} onClick={onOpenLibrary} style={{ background: CARD, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 12px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 700, color: GOLD }}>{s.value}</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: MUTED, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>Preferences</div>
        <button onClick={cycleTheme} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: CARD, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 18px", cursor: "pointer", marginBottom: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Manrope, sans-serif", fontSize: 14, color: TEXT, fontWeight: 600 }}><ThemeIcon size={17} color={GOLD} /> Theme</span>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: MUTED, textTransform: "capitalize" }}>{theme}</span>
        </button>
        <button onClick={onOpenLibrary} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: CARD, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 18px", cursor: "pointer" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Manrope, sans-serif", fontSize: 14, color: TEXT, fontWeight: 600 }}><Bookmark size={17} color={GOLD} /> My Library</span>
          <ChevronRight size={16} color={MUTED} />
        </button>

        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "#5C5F6B", marginTop: 28 }}>Account creation and sign-in aren't part of this build yet — everything above is saved locally on this device.</p>
      </div>
      <Footer />
    </div>
  );
}
