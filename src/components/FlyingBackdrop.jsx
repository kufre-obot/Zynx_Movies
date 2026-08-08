import  { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Flying backdrop                                                    */
/* ------------------------------------------------------------------ */
export function FlyingBackdrop({ movie, originRect, mode }) {
  const [expanded, setExpanded] = useState(mode === "closing");
  useEffect(() => { const id = requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(mode === "opening"))); return () => cancelAnimationFrame(id); }, [mode]);
  const collapsed = { top: originRect.top, left: originRect.left, width: originRect.width, height: originRect.height, borderRadius: 16 };
  const full = { top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 };
  const box = expanded ? full : collapsed;
  return <div style={{ position: "fixed", zIndex: 70, background: movie.bg, overflow: "hidden", transition: "all 620ms cubic-bezier(.22,.9,.28,1)", ...box }} />;
}
