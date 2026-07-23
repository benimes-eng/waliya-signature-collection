import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const dx = useMotionValue(-100);
  const dy = useMotionValue(-100);

  const sx = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 28, mass: 0.4 });
  const rx = useSpring(dx, { stiffness: 500, damping: 30, mass: 0.2 });
  const ry = useSpring(dy, { stiffness: 500, damping: 30, mass: 0.2 });

  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      dx.set(e.clientX);
      dy.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHover(!!el?.closest("a,button,[role='button'],input,textarea,select,label"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [mx, my, dx, dy]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: hover ? 56 : 32,
            height: hover ? 56 : 32,
            borderColor: hover ? "rgba(176,133,88,0.9)" : "rgba(217,220,223,0.55)",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="rounded-full border backdrop-blur-[1px]"
          style={{ boxShadow: "0 0 24px rgba(176,133,88,0.15)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[201] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "#b08558", boxShadow: "0 0 10px rgba(176,133,88,0.8)" }}
        />
      </motion.div>
    </>
  );
}
