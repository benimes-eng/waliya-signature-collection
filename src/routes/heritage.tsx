import { createFileRoute } from "@tanstack/react-router";
import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import heritageOriginSrc from "../assets/heritage-origin.jpg";
import videoStrengthSrc from "../assets/Waliya01.mp4";
import videoHarmonySrc from "../assets/Waliya02.mp4";

export const Route = createFileRoute("/heritage")({
  head: () => ({
    meta: [
      { title: "Heritage — WALIYA" },
      {
        name: "description",
        content:
          "The story of WALIYA — a house forged above the Simien Mountains, inspired by the Walia Ibex and the Ethiopian highlands.",
      },
      { property: "og:title", content: "Heritage — WALIYA" },
      {
        property: "og:description",
        content: "Forged above. Rooted in Ethiopia. Crafted for the world.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HeritagePage,
});

/* ── Continuous Background Video ──────────────────────────── */
function BackgroundVideo({
  src,
  fallbackSrc,
  className,
  style,
}: {
  src?: string;
  fallbackSrc?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Strict muted requirements for Chrome, Safari, iOS, Edge
    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const playVideo = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // If browser autoplay policy temporarily restricted playback,
          // instantly play on first touch, scroll, or click
          const unlock = () => {
            video.play().catch(() => {});
            window.removeEventListener("touchstart", unlock);
            window.removeEventListener("click", unlock);
            window.removeEventListener("scroll", unlock);
          };
          window.addEventListener("touchstart", unlock, { once: true, passive: true });
          window.addEventListener("click", unlock, { once: true, passive: true });
          window.addEventListener("scroll", unlock, { once: true, passive: true });
        });
      }
    };

    video.load();

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
      video.addEventListener("canplay", playVideo, { once: true });
    }
  }, [src, fallbackSrc]);

  return (
    <video
      ref={ref}
      src={src || fallbackSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
      style={style}
    >
      {src && <source src={src} type="video/mp4" />}
      {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
    </video>
  );
}

/* ── Video Placeholder (shown when no src) ────────────────── */
function VideoPlaceholder({
  label,
  className,
  style,
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background:
          "linear-gradient(135deg, #0d0d0c 0%, #111110 40%, #0a0a09 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        border: "1px solid rgba(154,117,68,0.2)",
        ...style,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "1px solid rgba(154,117,68,0.4)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polygon
            points="4,2 14,8 4,14"
            fill="none"
            stroke="rgba(154,117,68,0.8)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <span
        style={{
          fontFamily: "inherit",
          fontSize: "0.6rem",
          letterSpacing: "0.24em",
          color: "rgba(154,117,68,0.6)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Section 01 — Origin / Image ──────────────────────────── */
function OriginSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.75]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "72vh", minHeight: 520 }}
    >
      {/* Cinematic image with smooth entrance */}
      <motion.img
        src={heritageOriginSrc}
        alt="Walia Ibex above the Simien Mountains"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.04, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ scale: imgScale }}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Black transparent container to make image darker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.46)",
        }}
      />

      {/* Left-side editorial gradient ramp */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
        initial={false}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.72) 38%, rgba(5,5,5,0.22) 68%, rgba(5,5,5,0.06) 100%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 42%)",
          }}
        />
      </motion.div>

      {/* Text overlay — left aligned */}
      <motion.div
        style={{ y: textY }}
        className="relative z-[3] flex h-full flex-col justify-center px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-lg">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block mb-6"
            style={{
              fontFamily: "inherit",
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#9A7544",
            }}
          >
            I · Origin
          </motion.span>

          {/* Hero headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-[1.0] tracking-tight"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "#E8E4DC",
            }}
          >
            Forged Above.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif mt-4"
            style={{
              fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
              color: "rgba(232,228,220,0.7)",
              lineHeight: 1.6,
              maxWidth: "36ch",
            }}
          >
            A house shaped by altitude.
          </motion.p>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-serif"
            style={{
              fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
              color: "rgba(167,162,154,0.85)",
              lineHeight: 1.75,
              maxWidth: "32ch",
            }}
          >
            The Simien range rises to 4,550 metres.
            <br />
            Wind, silence, obsidian rock.
            <br />
            It is here that the Walia Ibex
            <br />
            learned to stand alone.
          </motion.p>

          {/* Meta tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex items-center gap-4"
          >
            <span
              style={{
                display: "block",
                width: 24,
                height: 1,
                background: "rgba(154,117,68,0.5)",
              }}
            />
            <span
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(154,117,68,0.7)",
              }}
            >
              The Highlands · 3,000 BC
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 left-8 md:left-16 lg:left-24 flex items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1,
              height: 36,
              background:
                "linear-gradient(to bottom, transparent, rgba(154,117,68,0.6))",
            }}
          />
          <span
            style={{
              fontSize: "0.52rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(154,117,68,0.5)",
              writingMode: "vertical-lr",
            }}
          >
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Section 02 — Strength (Video L / Text R) ─────────────── */
function StrengthSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.8], [20, -20]);

  // Video src — Waliya01.mp4
  const VIDEO_SRC = videoStrengthSrc;

  return (
    <section
      ref={ref}
      className="relative bg-[#050505]"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2"
        style={{ minHeight: "min(50vw, 720px)" }}
      >
        {/* LEFT — Video */}
        <div className="relative flex items-center justify-center overflow-hidden bg-[#080808]">
          <motion.div
            style={{ scale: videoScale }}
            className="w-full h-full"
          >
            <BackgroundVideo
              src={VIDEO_SRC}
              fallbackSrc="/Waliya01.mp4"
              className="block w-full h-full object-cover"
              style={{ aspectRatio: "1 / 1" }}
            />
          </motion.div>

          {/* Black transparent container to make video darker and smoother */}
          <div
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.44)",
            }}
          />

          {/* Subtle cinematic edge vignette blending into text column */}
          <div
            className="pointer-events-none absolute inset-0 z-[6]"
            style={{
              background:
                "linear-gradient(to right, rgba(5,5,5,0.2) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.4) 100%)",
            }}
          />
        </div>

        {/* RIGHT — Text */}
        <motion.div
          style={{ y: textY }}
          className="flex flex-col justify-center px-10 py-16 md:px-14 lg:px-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#9A7544",
            }}
          >
            II · Strength
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light tracking-tight mt-6"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              color: "#E8E4DC",
              lineHeight: 1.05,
            }}
          >
            The Loom
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif mt-5"
            style={{
              fontSize: "clamp(1rem, 1.7vw, 1.25rem)",
              color: "rgba(232,228,220,0.72)",
              lineHeight: 1.55,
              maxWidth: "28ch",
            }}
          >
            Before the garment,
            <br />
            there is the hand.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.34 }}
            style={{ originX: 0 }}
            className="my-7"
          >
            <div style={{ width: 40, height: 1, background: "rgba(154,117,68,0.35)" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif"
            style={{
              fontSize: "clamp(0.82rem, 1.2vw, 0.98rem)",
              color: "rgba(167,162,154,0.8)",
              lineHeight: 1.8,
              maxWidth: "30ch",
            }}
          >
            Our first weavers set up a wooden loom
            <br />
            in Addis Ababa. No electricity. One pattern.
            <br />
            One promise: to make cloth that outlives us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <div style={{ width: 18, height: 1, background: "rgba(154,117,68,0.4)" }} />
            <span
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(154,117,68,0.65)",
              }}
            >
              1970
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 03 — Harmony (Text L / Video R) ──────────────── */
function HarmonySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.8], [20, -20]);

  // Video src — Waliya02.mp4
  const VIDEO_SRC = videoHarmonySrc;

  return (
    <section
      ref={ref}
      className="relative bg-[#050505]"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2"
        style={{ minHeight: "min(50vw, 720px)" }}
      >
        {/* LEFT — Text (reversed from Section 02) */}
        <motion.div
          style={{ y: textY }}
          className="flex flex-col justify-center px-10 py-16 md:px-14 lg:px-20 order-2 md:order-1"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#9A7544",
            }}
          >
            III · Harmony
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light tracking-tight mt-6"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              color: "#E8E4DC",
              lineHeight: 1.05,
            }}
          >
            The Atelier
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif mt-5"
            style={{
              fontSize: "clamp(1rem, 1.7vw, 1.25rem)",
              color: "rgba(232,228,220,0.72)",
              lineHeight: 1.55,
              maxWidth: "26ch",
            }}
          >
            Tradition, refined
            <br />
            for today.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.34 }}
            style={{ originX: 0 }}
            className="my-7"
          >
            <div style={{ width: 40, height: 1, background: "rgba(154,117,68,0.35)" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif"
            style={{
              fontSize: "clamp(0.82rem, 1.2vw, 0.98rem)",
              color: "rgba(167,162,154,0.8)",
              lineHeight: 1.8,
              maxWidth: "30ch",
            }}
          >
            Waliya is founded. A studio of nine artisans
            <br />
            commits to six pieces per season —
            <br />
            nothing more, nothing faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <div style={{ width: 18, height: 1, background: "rgba(154,117,68,0.4)" }} />
            <span
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(154,117,68,0.65)",
              }}
            >
              2011
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT — Video */}
        <div className="relative flex items-center justify-center overflow-hidden bg-[#080808] order-1 md:order-2">
          <motion.div style={{ scale: videoScale }} className="w-full h-full">
            <BackgroundVideo
              src={VIDEO_SRC}
              fallbackSrc="/Waliya02.mp4"
              className="block w-full h-full object-cover"
              style={{ aspectRatio: "1 / 1" }}
            />
          </motion.div>

          {/* Black transparent container to make video darker and smoother */}
          <div
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.44)",
            }}
          />

          {/* Subtle cinematic edge vignette blending from text column */}
          <div
            className="pointer-events-none absolute inset-0 z-[6]"
            style={{
              background:
                "linear-gradient(to left, rgba(5,5,5,0.2) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.4) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Heritage Footer ──────────────────────────────────────── */
function HeritageFooter() {
  return (
    <footer
      className="relative bg-[#050505] text-center"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "4rem",
        paddingBottom: "3rem",
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="font-serif block"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            color: "#E8E4DC",
            fontWeight: 300,
            letterSpacing: "0.12em",
          }}
        >
          WALIYA
        </span>
        <span
          className="block mt-2"
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(154,117,68,0.7)",
          }}
        >
          Est. Ethiopia
        </span>
      </motion.div>

      {/* Divider */}
      <div
        className="mx-auto my-8"
        style={{
          width: 48,
          height: 1,
          background: "rgba(154,117,68,0.3)",
        }}
      />

      {/* Nav links */}
      <motion.nav
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-6"
      >
        {["Heritage", "Atelier", "Journal", "Store", "Contact"].map((label) => (
          <a
            key={label}
            href={`/${label.toLowerCase()}`}
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(167,162,154,0.7)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#E8E4DC")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(167,162,154,0.7)")
            }
          >
            {label}
          </a>
        ))}
      </motion.nav>

      {/* Bottom line */}
      <div
        className="mx-auto mt-10"
        style={{
          width: "100%",
          maxWidth: 480,
          height: 1,
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <div className="mt-6 flex flex-col items-center gap-1">
        <span
          style={{
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(167,162,154,0.4)",
          }}
        >
          © 2026 Waliya Atelier
        </span>
        <span
          style={{
            fontSize: "0.52rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(154,117,68,0.35)",
            marginTop: 4,
          }}
        >
          A Heritage of Tomorrow
        </span>
      </div>
    </footer>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
function HeritagePage() {
  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "#050505",
        color: "#E8E4DC",
        // Subtle film grain via CSS noise
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      }}
    >
      {/* Smooth cinematic curtain reveal on initial page load */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="pointer-events-none fixed inset-0 z-[200] bg-[#050505]"
      />

      {/* Opaque header backdrop so navbar sits on a solid dark base */}
      <div
        className="fixed inset-x-0 top-0 z-[100] h-[60px] md:h-[76px] border-b border-white/[0.08]"
        style={{ backgroundColor: "#050505" }}
      />
      {/* Existing global navbar */}
      <SiteHeader />

      {/* Content starts strictly below the navbar — smooth entrance */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="pt-[60px] md:pt-[76px]"
      >
        <OriginSection />
        <StrengthSection />
        <HarmonySection />
      </motion.div>

      <HeritageFooter />
    </div>
  );
}
