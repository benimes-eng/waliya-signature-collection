import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import ibexSrc from "../assets/ibex.png";
import mountainsSrc from "../assets/mountains.jpg";
import piece01 from "../assets/piece-01.jpg";
import piece02 from "../assets/piece-02.jpg";
import piece03 from "../assets/piece-03.jpg";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "google-site-verification",
        content: "Lmh1uo8bkGySb0d5KGmvM_QrI-YvjW6Ho_xStpq89gk",
      },
      { title: "WALIYA — Forged Above. Crafted Beyond Trends." },
      {
        name: "description",
        content:
          "WALIYA is a luxury Ethiopian fashion house. Forged above the Simien Mountains, crafted for the world. Discover the collection.",
      },
      { property: "og:title", content: "WALIYA — Forged Above" },
      {
        property: "og:description",
        content:
          "Luxury Ethiopian craftsmanship. Wear the Peak. Discover the WALIYA collection.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/favicon-512x512.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { property: "og:image:alt", content: "WALIYA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/favicon-512x512.png" },
    ],
  }),
  component: WaliyaPage,
});

/* ------------------------------------------------------------------ */
/*  Particles — drifting metallic dust                                */
/* ------------------------------------------------------------------ */
function Particles({ opacity }: { opacity: MotionValue<number> }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.6,
        delay: Math.random() * 8,
        duration: Math.random() * 14 + 10,
        drift: (Math.random() - 0.5) * 30,
        tone: Math.random() > 0.7 ? "bronze" : "chrome",
      })),
    [],
  );
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-[5]"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.tone === "bronze" ? "#b08558" : "#d9dcdf",
            boxShadow:
              p.tone === "bronze"
                ? "0 0 8px rgba(176,133,88,0.7)"
                : "0 0 6px rgba(217,220,223,0.6)",
          }}
          animate={{
            x: [0, p.drift, 0],
            y: [0, -40, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating luxury items — drifting emblems around the hero          */
/* ------------------------------------------------------------------ */
function FloatingLuxe() {
  const items = useMemo(
    () => [
      { left: "8%", top: "18%", size: 42, delay: 0, dur: 9, glyph: "◆" },
      { left: "88%", top: "22%", size: 32, delay: 1.2, dur: 11, glyph: "✦" },
      { left: "14%", top: "72%", size: 38, delay: 0.6, dur: 10, glyph: "❖" },
      { left: "84%", top: "68%", size: 46, delay: 1.8, dur: 12, glyph: "◇" },
      { left: "50%", top: "12%", size: 24, delay: 2.4, dur: 8, glyph: "✧" },
      { left: "6%", top: "45%", size: 28, delay: 3, dur: 13, glyph: "•" },
      { left: "94%", top: "48%", size: 28, delay: 0.9, dur: 14, glyph: "•" },
    ],
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-[7] hidden sm:block">
      {items.map((it, i) => (
        <motion.span
          key={i}
          className="absolute font-serif"
          style={{
            left: it.left,
            top: it.top,
            fontSize: it.size,
            color:
              i % 2 === 0 ? "rgba(176,133,88,0.45)" : "rgba(217,220,223,0.32)",
            textShadow:
              i % 2 === 0
                ? "0 0 16px rgba(176,133,88,0.45)"
                : "0 0 12px rgba(217,220,223,0.3)",
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, i % 2 === 0 ? 8 : -8, 0],
            rotate: [0, 6, 0],
            opacity: [0.25, 0.85, 0.25],
          }}
          transition={{
            duration: it.dur,
            delay: it.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {it.glyph}
        </motion.span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Utility: split-word reveal                                        */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection — instant cinematic hero with rich entrance & motion  */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const ibexY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ibexScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 22, mass: 1 });
  const sy = useSpring(my, { stiffness: 45, damping: 22, mass: 1 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 22;
      const ny = (e.clientY / window.innerHeight - 0.5) * 22;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-6 pt-24 pb-16 md:pt-28 md:pb-20"
    >
      {/* Background radial bronze glow */}
      <div
        className="pointer-events-none absolute h-[70vh] w-[70vh] rounded-full sm:h-[85vh] sm:w-[85vh]"
        style={{
          background:
            "radial-gradient(circle, rgba(176,133,88,0.20) 0%, rgba(176,133,88,0.06) 35%, transparent 70%)",
        }}
      />

      {/* Floating luxury glyphs */}
      <FloatingLuxe />

      {/* Ibex artwork — visible immediately on page load with smooth breathing animation */}
      <motion.div
        style={{
          y: ibexY,
          scale: ibexScale,
          x: sx,
        }}
        initial={{ opacity: 0, scale: 0.94, filter: "blur(18px)" }}
        animate={{ opacity: 0.58, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center select-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-full"
        >
          <motion.img
            src={ibexSrc}
            alt="WALIYA Golden Mountain and Ibex emblem"
            className="w-[96vw] max-w-[1320px] h-auto max-h-[82vh] object-contain select-none"
            style={{
              filter:
                "drop-shadow(0 30px 70px rgba(0,0,0,0.95)) drop-shadow(0 0 60px rgba(234,179,8,0.25))",
              mixBlendMode: "screen",
            }}
            animate={{ scale: [1, 1.018, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Hero Typography & CTA — loaded immediately with staggered luxury animations */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-[20] flex flex-col items-center px-6 text-center max-w-4xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="tracking-luxe mb-6 text-[0.62rem] text-[color:var(--bronze)] md:mb-8 md:text-[0.68rem]"
        >
          A House Forged in Altitude
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(3.8rem,14vw,12rem)] leading-[0.9] text-chrome tracking-tight"
        >
          WALIYA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="tracking-luxe mt-4 text-[clamp(0.68rem,1.2vw,0.95rem)] font-light text-[color:var(--bronze)] md:mt-5"
        >
          Signature Collection
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="hairline my-7 w-32 md:my-9 md:w-44 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif max-w-xl text-[clamp(1.05rem,2vw,1.75rem)] leading-snug text-[color:var(--chrome)]/90"
        >
          Forged Above.
          <br />
          Crafted Beyond Trends.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="/collection"
            className="btn-luxe mt-10 md:mt-12"
          >
            <span className="dot" />
            Explore Collection
          </a>
        </motion.div>
      </motion.div>

      {/* Ambient scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="scroll-hint tracking-luxe absolute inset-x-0 bottom-6 z-[25] text-center text-[0.58rem] text-[color:var(--steel)] md:bottom-10"
      >
        Scroll · Discover
      </motion.div>
    </section>
  );
}



/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
function WaliyaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });
  // Softer, more cinematic spring — reduces jitter and eases scroll-linked motion.
  const progress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 24,
    mass: 1,
    restDelta: 0.0005,
  });

  // Particle opacity: shimmering gently across the page
  const particleOpacity = useTransform(
    progress,
    [0, 0.3, 0.7, 1],
    [0.85, 0.3, 0.35, 0.75],
  );

  // Background fog — eased in/out with soft wash
  const fogOpacity = useTransform(
    progress,
    [0, 0.3, 0.6, 1],
    [0.3, 0.5, 0.45, 0.25],
  );

  return (
    <div ref={rootRef} className="relative grain vignette bg-background">
      {/* ---- Fixed layers ---- */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,#0a0a0a_0%,#050505_60%,#000_100%)]" />
      <motion.div
        style={{ opacity: fogOpacity }}
        className="pointer-events-none fixed inset-0 z-[3]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 55%, rgba(120,120,130,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      <Particles opacity={particleOpacity} />
      <SiteHeader />
      <HeroSection />

      {/* ============================================================ */}
      {/*  HERITAGE                                                    */}
      {/* ============================================================ */}
      <section className="relative z-[15] min-h-[110vh] bg-background px-6 md:px-14">
        <div
          className="topo pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] overflow-hidden opacity-30">
          <img
            src={mountainsSrc}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(1) contrast(1.2) brightness(0.35)" }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="relative mx-auto flex min-h-[110vh] max-w-6xl flex-col justify-center py-24 md:py-36">
          <Reveal>
            <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)]">
              I · Heritage
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-serif mt-10 text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.08] text-chrome">
              Born from the mountains.
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.08] text-[color:var(--chrome)]/85">
              Crafted for the world.
            </h2>
          </Reveal>
          <Reveal delay={0.32}>
            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.08] text-[color:var(--bronze)]">
              Inspired by the Walia Ibex,
            </h2>
          </Reveal>
          <Reveal delay={0.42}>
            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.08] text-[color:var(--chrome)]/65">
              WALIYA Signature Collection is for those
            </h2>
          </Reveal>
          <Reveal delay={0.52}>
            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.08] text-[color:var(--chrome)]/45">
              who rise above the ordinary to reach
            </h2>
          </Reveal>
          <Reveal delay={0.62}>
            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.08] text-chrome font-normal">
              the extraordinary.
            </h2>
          </Reveal>
        </div>
      </section>




      {/* ============================================================ */}
      {/*  COLLECTION — museum exhibits                                */}
      {/* ============================================================ */}
      <section className="relative z-[15] bg-background py-24 md:py-40">
        <Reveal className="mx-auto max-w-6xl px-6 md:px-14">
          <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)]">
            II · The Collection
          </span>
          <h3 className="font-serif mt-8 text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-chrome">
            Objects of Elevation
          </h3>
          <div className="hairline mt-14 w-full" />
        </Reveal>

        <Exhibit
          index="01"
          title="The Ascension Coat"
          material="Ethiopian Highland Wool · Hand-Tailored"
          copy="Weight and silence. A coat cut for cold air and long silences, structured to hold its shape at 4,000 metres."
          image={piece01}
          align="left"
        />
        <Exhibit
          index="02"
          title="The Weaver's Thread"
          material="Hand-woven Cotton · Bronze Silk Warp"
          copy="Every thread is drawn by hand on a wooden loom. The geometry is inherited, not designed — a language spoken through cloth."
          image={piece02}
          align="right"
        />
        <Exhibit
          index="03"
          title="The Obsidian Suit"
          material="Volcanic Black Wool · Structured Shoulder"
          copy="Cut from a single bolt of matte black wool. Nothing shines. Nothing wavers. Made to stand still and be seen."
          image={piece03}
          align="left"
        />
      </section>

      {/* ============================================================ */}
      {/*  ABOUT                                                       */}
      {/* ============================================================ */}
      <section className="relative z-[15] min-h-[120vh] bg-background px-6 md:px-14">
        <div className="mx-auto flex min-h-[120vh] max-w-6xl flex-col justify-center py-24 md:py-40">

          <Reveal>
            <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)]">
              III · Philosophy
            </span>
          </Reveal>
          <div className="mt-16 space-y-10">
            {[
              "Not Fast Fashion.",
              "Made to Endure.",
              "Luxury Born in Ethiopia.",
              "Elevated by Design.",
            ].map((line, i) => (
              <Reveal key={line} delay={i * 0.1}>
                <p className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1] text-chrome">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section className="relative z-[15] flex min-h-[100vh] items-center justify-center overflow-hidden bg-background px-5 py-20 md:px-6 md:py-24">
        {/* Ibex watermark background */}
        <motion.img
          src={ibexSrc}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[95vw] max-w-[1240px] h-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
          style={{
            filter:
              "drop-shadow(0 30px 80px rgba(0,0,0,0.9)) drop-shadow(0 0 60px rgba(234,179,8,0.22))",
            mixBlendMode: "screen",
          }}
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(5,5,5,0) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.95) 100%)",
          }}
        />
        <div className="relative flex flex-col items-center text-center">
          <Reveal>
            <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)]">
              Wear the Peak
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif mt-10 text-[clamp(4rem,14vw,13rem)] leading-[0.9] text-chrome">
              WALIYA
            </h2>
            <p className="tracking-luxe mt-4 text-[clamp(0.65rem,1.1vw,0.85rem)] font-light text-[color:var(--bronze)]">
              Signature Collection
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif mt-6 text-[clamp(1.1rem,2vw,1.6rem)] text-[color:var(--chrome)]/80">
              Wear the Peak.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <a href="/collection" className="btn-luxe mt-16">
              <span className="dot" />
              Explore the Collection
            </a>
          </Reveal>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}



/* ------------------------------------------------------------------ */
/*  Exhibit — scroll-driven parallax + camera zoom on image           */
/* ------------------------------------------------------------------ */
function Exhibit({
  index,
  title,
  material,
  copy,
  image,
  align,
}: {
  index: string;
  title: string;
  material: string;
  copy: string;
  image: string;
  align: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.1]);
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 1, 0.7],
  );
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div
      ref={ref}
      className="relative mx-auto my-20 grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:my-40 md:grid-cols-12 md:gap-16 md:px-14"
    >
      <div
        className={`md:col-span-7 ${align === "right" ? "md:order-2" : ""}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--charcoal)]">
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale, filter }}
          />
          {/* Chrome sweep */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, transparent 45%, rgba(255,255,255,0.06) 50%, transparent 55%)",
            }}
            animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
        </div>
      </div>

      <motion.div
        style={{ y }}
        className={`md:col-span-5 ${align === "right" ? "md:order-1" : ""}`}
      >
        <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)]">
          Piece {index}
        </span>
        <h4 className="font-serif mt-6 text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.05] text-chrome">
          {title}
        </h4>
        <p className="mt-4 text-xs tracking-[0.28em] uppercase text-[color:var(--steel)]">
          {material}
        </p>
        <div className="hairline my-8 w-24" />
        <p className="font-serif text-lg leading-relaxed text-[color:var(--chrome)]/75">
          {copy}
        </p>
        <button className="btn-luxe mt-10">
          <span className="dot" />
          View Piece
        </button>
      </motion.div>
    </div>
  );
}
