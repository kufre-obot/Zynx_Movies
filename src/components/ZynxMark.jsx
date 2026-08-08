import { GOLD } from "../theme";

/* ------------------------------------------------------------------ */
/*  Brand glyph — small reel icon                                       */
/* ------------------------------------------------------------------ */
export function ZynxMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke={GOLD} strokeWidth="1.6" />
      <circle cx="16" cy="16" r="4" fill={GOLD} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 16 + Math.cos(rad) * 9.5;
        const cy = 16 + Math.sin(rad) * 9.5;
        return <circle key={deg} cx={cx} cy={cy} r="2" fill={GOLD} />;
      })}
    </svg>
  );
}