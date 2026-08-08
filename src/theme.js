export const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap');";
export const GOLD = "#E8B54A";
export const CRIMSON = "#B23A2E";
export const BG = "var(--cinevia-bg)";
export const CARD = "var(--cinevia-card)";
export const TEXT = "var(--cinevia-text)";
export const MUTED = "var(--cinevia-muted)";

export const THEME_VARS = {
  dark: { bg: "#0A0C12", card: "#12141C", text: "#F3F1EA", muted: "#9AA0AE" },
  light: { bg: "#F3F1EA", card: "#FFFFFF", text: "#15161B", muted: "#5C5F6B" },
  oled: { bg: "#000000", card: "#0A0A0A", text: "#F3F1EA", muted: "#8C8E9B" },
};
export const THEME_ORDER = ["dark", "light", "oled"];

export const btnGold = { display: "flex", alignItems: "center", gap: 6, background: GOLD, color: "#0A0C12", border: "none", borderRadius: 8, padding: "7px 12px", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", flex: 1, justifyContent: "center" };
export const btnGhost = { display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", color: TEXT, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8, padding: "7px 12px", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", flex: 1, justifyContent: "center" };
export const iconBtn = { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 };

