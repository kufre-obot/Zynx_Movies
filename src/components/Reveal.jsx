import  { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                       */
/* ------------------------------------------------------------------ */
export function Reveal({ children, style }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ ...style, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "opacity 700ms ease, transform 700ms cubic-bezier(.2,.8,.2,1)" }}>
      {children}
    </div>
  );
}
