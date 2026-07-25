import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/heritage", label: "Heritage" },
  { to: "/atelier", label: "Atelier" },
  { to: "/journal", label: "Journal" },
  { to: "/store", label: "Store" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(5,5,5,0)", "rgba(5,5,5,0.72)"]);
  const blur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(14px)"]);
  const borderColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      style={{ backgroundColor: mounted ? bg : undefined, backdropFilter: mounted ? blur : undefined, borderBottom: "1px solid", borderColor: mounted ? borderColor : "transparent" }}
      className="pointer-events-auto fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-6 py-5 md:px-14 md:py-6"
    >
      <Link
        to="/"
        className="tracking-luxe pointer-events-auto text-[0.6rem] text-chrome md:text-[0.7rem] transition-opacity hover:opacity-70"
      >
        Waliya
      </Link>
      <nav className="pointer-events-auto hidden items-center gap-7 md:flex">
        {NAV.slice(1).map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className="tracking-luxe relative text-[0.62rem] text-[color:var(--steel)] transition-colors duration-500 hover:text-chrome"
            activeProps={{ className: "tracking-luxe relative text-[0.62rem] text-chrome" }}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <button
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto tracking-luxe text-[0.6rem] text-chrome md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-md md:hidden"
          >
            {NAV.map((n, i) => (
              <motion.div
                key={n.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="font-serif text-4xl text-chrome"
                >
                  {n.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-[15] border-t border-[color:var(--border)] bg-background px-6 py-14 md:px-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <span className="tracking-luxe text-[0.6rem] text-chrome">Waliya · Est. Ethiopia</span>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="tracking-luxe text-[0.6rem] text-[color:var(--steel)] hover:text-chrome"
            >
              {n.label}
            </Link>
          ))}
        </div>
        <span className="tracking-luxe text-[0.6rem] text-[color:var(--steel)]">
          © {new Date().getFullYear()} Waliya Atelier
        </span>
      </div>
    </footer>
  );
}

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background grain vignette">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,#0a0a0a_0%,#050505_60%,#000_100%)]" />
      <SiteHeader />
      <main className="relative z-[15] px-6 pb-24 pt-40 md:px-14 md:pt-52">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-6xl"
        >
          <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)]">
            {eyebrow}
          </span>
          <h1 className="font-serif mt-8 text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] text-chrome">
            {title}
          </h1>
          {intro && (
            <>
              <div className="hairline my-10 w-32" />
              <p className="font-serif max-w-2xl text-[clamp(1.05rem,1.6vw,1.5rem)] leading-relaxed text-[color:var(--chrome)]/80">
                {intro}
              </p>
            </>
          )}
        </motion.div>
        <div className="mx-auto mt-20 max-w-6xl">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
