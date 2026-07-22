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
import ibexAsset from "../assets/ibex.png.asset.json";
const ibexSrc = ibexAsset.url;
import mountainsSrc from "../assets/mountains.jpg";
import piece01 from "../assets/piece-01.jpg";
import piece02 from "../assets/piece-02.jpg";
import piece03 from "../assets/piece-03.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
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
      { name: "twitter:card", content: "summary_large_image" },
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
/*  Fixed Ibex layer — the emotional anchor                           */
/* ------------------------------------------------------------------ */
function IbexLayer({ progress }: { progress: MotionValue<number> }) {
  // Stage 1: 0–0.06 forge-in
  // Stage 2: 0.06–0.14 alive
  // Stage 3: 0.14–0.20 recede to watermark
  // Watermark: 0.20–0.85 stays behind
  // Final: 0.85–1 returns fully
  const opacity = useTransform(
    progress,
    [0, 0.04, 0.14, 0.2, 0.5, 0.85, 0.95, 1],
    [0, 1, 1, 0.18, 0.12, 0.2, 1, 1],
  );
  const scale = useTransform(
    progress,
    [0, 0.06, 0.14, 0.2, 0.85, 1],
    [0.6, 1, 1, 0.7, 0.72, 0.95],
  );
  const blur = useTransform(
    progress,
    [0, 0.05, 0.14, 0.2, 0.85, 1],
    [30, 0, 0, 6, 4, 0],
  );
  const rotate = useTransform(progress, [0, 1], [-1.5, 1.5]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 1.2 });
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 1.2 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 24;
      const ny = (e.clientY / window.innerHeight - 0.5) * 24;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10] flex items-center justify-center">
      {/* Radial glow behind */}
      <motion.div
        style={{ opacity }}
        className="absolute h-[80vh] w-[80vh] rounded-full"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(176,133,88,0.14) 0%, rgba(176,133,88,0.05) 30%, transparent 65%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          opacity,
          scale,
          filter,
          rotate,
          x: sx,
          y: sy,
        }}
        className="relative"
      >
        {/* Breathing float */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img
            src={ibexSrc}
            alt="WALIYA Ibex emblem"
            className="h-[78vh] w-auto max-w-none select-none"
            style={{
              filter:
                "drop-shadow(0 30px 60px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(176,133,88,0.15))",
            }}
            animate={{ scale: [1, 1.012, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        </motion.div>

        {/* Chrome sweep highlight */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%)",
            mixBlendMode: "overlay",
          }}
          animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
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
/*  Page                                                              */
/* ------------------------------------------------------------------ */
function WaliyaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.6,
  });

  // Particle opacity strong during forge, fades later
  const particleOpacity = useTransform(
    progress,
    [0, 0.05, 0.18, 0.22, 0.85, 0.95],
    [1, 0.9, 0.4, 0.15, 0.15, 0.5],
  );

  // Background fog wash
  const fogOpacity = useTransform(progress, [0, 0.2, 0.4, 0.7, 1], [0, 0.4, 0.6, 0.5, 0.2]);

  // Hero text lives inside the intro section (sticky-contained).
  // Fades in during Stage 4 and out well before Heritage starts.
  const heroOpacity = useTransform(progress, [0.16, 0.20, 0.24, 0.28], [0, 1, 1, 0]);
  const heroY = useTransform(progress, [0.16, 0.22], [40, 0]);

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
      <IbexLayer progress={progress} />

      {/* Fixed brand mark */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[50] flex items-center justify-between px-8 py-6 md:px-14">
        <span className="tracking-luxe text-[0.65rem] text-chrome">Waliya</span>
        <span className="tracking-luxe text-[0.65rem] text-[color:var(--steel)]">
          Est. Ethiopia
        </span>
      </div>

      {/* ============================================================ */}
      {/*  STAGE 1–4  (0–200vh) — Cinematic Introduction               */}
      {/* ============================================================ */}
      <section className="relative h-[200vh]">
        {/* Sticky stage — scoped to the intro; cannot bleed into later sections */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Scroll hint */}
          <motion.div
            style={{
              opacity: useTransform(progress, [0, 0.04, 0.08], [1, 0.6, 0]),
            }}
            className="scroll-hint tracking-luxe absolute inset-x-0 bottom-14 text-center text-[0.6rem] text-[color:var(--steel)]"
          >
            Scroll · Begin
          </motion.div>

          {/* Hero copy fades in during Stage 4 */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0 z-[20] flex items-center justify-center"
          >
            <div className="flex flex-col items-center px-6 text-center">
              <span className="tracking-luxe mb-8 text-[0.65rem] text-[color:var(--bronze)]">
                A House Forged in Altitude
              </span>
              <h1 className="font-serif text-[clamp(4rem,14vw,13rem)] leading-[0.9] text-chrome">
                WALIYA
              </h1>
              <div className="hairline my-10 w-40" />
              <p className="font-serif text-[clamp(1.1rem,2vw,1.8rem)] text-[color:var(--chrome)]/85 max-w-xl">
                Forged Above.
                <br />
                Crafted Beyond Trends.
              </p>
              <button className="btn-luxe mt-14">
                <span className="dot" />
                Explore Collection
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ============================================================ */}
      {/*  HERITAGE                                                    */}
      {/* ============================================================ */}
      <section className="relative z-[15] min-h-[140vh] px-6 md:px-14">
        <div
          className="topo pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
        />
        {/* Distant mountain silhouette */}
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

        <div className="relative mx-auto flex min-h-[140vh] max-w-6xl flex-col justify-center py-40">
          <Reveal>
            <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)]">
              I · Heritage
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif mt-10 text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-chrome">
              Forged Above.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-[color:var(--chrome)]/70">
              Inspired by Altitude.
            </h2>
          </Reveal>
          <Reveal delay={0.45}>
            <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-[color:var(--chrome)]/45">
              Rooted in Ethiopia.
            </h2>
          </Reveal>
          <Reveal delay={0.6}>
            <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-[color:var(--chrome)]/25">
              Crafted for the World.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  COLLECTION — museum exhibits                                */}
      {/* ============================================================ */}
      <section className="relative z-[15] py-40">
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
      <section className="relative z-[15] min-h-[120vh] px-6 md:px-14">
        <div className="mx-auto flex min-h-[120vh] max-w-6xl flex-col justify-center py-40">
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
      <section className="relative z-[15] flex min-h-[100vh] items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)]">
              Wear the Peak
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif mt-10 text-[clamp(4rem,14vw,13rem)] leading-[0.9] text-chrome">
              WALIYA
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif mt-6 text-[clamp(1.1rem,2vw,1.6rem)] text-[color:var(--chrome)]/80">
              Wear the Peak.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <button className="btn-luxe mt-16">
              <span className="dot" />
              Explore the Collection
            </button>
          </Reveal>
          <Reveal delay={0.7}>
            <div className="mt-28 flex items-center gap-6 text-[0.6rem]">
              <span className="tracking-luxe text-[color:var(--steel)]">
                © Waliya Atelier
              </span>
              <span className="h-3 w-px bg-[color:var(--steel)]/40" />
              <span className="tracking-luxe text-[color:var(--steel)]">
                Addis Ababa · The World
              </span>
            </div>
          </Reveal>
        </div>
      </section>
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
      className="relative mx-auto my-40 grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-12 md:px-14"
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
