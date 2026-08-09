/* Pulls a hex color out of a CSS gradient string, for the hero's ambient
   glow behind the poster. Real TMDB images use url(...) backgrounds instead
   of gradients, so this falls back to the brand gold in that case — that's
   expected, not a bug. */
export const accentOf = (bg) => (bg && bg.match(/#[0-9a-fA-F]{6}/) ? bg.match(/#[0-9a-fA-F]{6}/)[0] : "#E8B54A");