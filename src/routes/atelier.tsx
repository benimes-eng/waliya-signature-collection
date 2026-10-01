import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "../components/SiteChrome";
import collectionEssentials from "../assets/collection-essentials.jpg";
import collectionSport from "../assets/collection-sport.jpg";
import collectionBaby from "../assets/collection-baby.jpg";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "The Atelier — WALIYA" },
      {
        name: "description",
        content:
          "Inside the WALIYA atelier — master craftsmanship, heritage loom weaving, and three expressions of elevation: Everyday Essentials, Sport & Active, and Baby & Kids.",
      },
      { property: "og:title", content: "The Atelier — WALIYA" },
      {
        property: "og:description",
        content:
          "Hand-cut, hand-stitched, stamped at 2,355 metres. Discover the craft behind the WALIYA Signature Collection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AtelierPage,
});

const NUMBERS = [
  { k: "9", v: "Master Artisans" },
  { k: "3", v: "Primary Collections" },
  { k: "1970", v: "Loom Heritage" },
  { k: "2,355m", v: "Atelier Altitude" },
];

const CRAFT = [
  {
    step: "01",
    title: "The Loom",
    body: "Bronze-warp silk and highland cotton drawn by hand on traditional wooden looms in Addis Ababa. Inherited geometry, spoken through cloth.",
  },
  {
    step: "02",
    title: "The Cut",
    body: "One master tailor. One chalk line. Every panel is drafted and cut by hand against the natural grain of the fabric.",
  },
  {
    step: "03",
    title: "The Three Expressions",
    body: "From tailored Everyday Essentials to performance-led Sport & Active and delicate Baby & Kids — each collection is engineered for quiet presence and endurance.",
  },
  {
    step: "04",
    title: "The Bronze Seal",
    body: "Every finished piece carries a stamped bronze tag with the maker's initials and the atelier's altitude: 2,355m.",
  },
];

const CHAPTERS = [
  {
    n: "01",
    name: "Everyday Essentials",
    desc: "Polo shirts, dress shirts, knitwear, and trousers crafted for refined daily movement.",
    img: collectionEssentials,
    href: "/store#everyday-essentials",
  },
  {
    n: "02",
    name: "Sport & Active",
    desc: "Technical activewear, mountain headwear, and performance textiles built to move.",
    img: collectionSport,
    href: "/store#sport-active",
  },
  {
    n: "03",
    name: "Baby & Kids",
    desc: "Gentle natural fibers, tailored warmth, and thoughtful essentials for the next generation.",
    img: collectionBaby,
    href: "/store#baby-kids",
  },
];

function AtelierPage() {
  return (
    <PageShell
      eyebrow="III · The Atelier"
      title="Made by Hand. Made to Endure."
      intro="Nine artisans, one heritage studio, three expressions of elevation. Everyday Essentials, Sport & Active, and Baby & Kids — crafted above 2,355 metres in Addis Ababa."
    >
      {/* Atelier Metrics */}
      <div className="grid grid-cols-2 gap-6 border-y border-[color:var(--border)] py-12 md:grid-cols-4 md:gap-10">
        {NUMBERS.map((n, i) => (
          <motion.div
            key={n.v}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-4xl text-chrome md:text-6xl">{n.k}</p>
            <p className="mt-2 text-[0.62rem] tracking-[0.3em] uppercase text-[color:var(--steel)]">
              {n.v}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Craft Steps */}
      <div className="mt-24 space-y-16 md:space-y-20">
        {CRAFT.map((c, i) => (
          <motion.div
            key={c.step}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-baseline"
          >
            <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)] md:col-span-2">
              {c.step}
            </span>
            <h3 className="font-serif text-3xl text-chrome md:col-span-4 md:text-4xl">
              {c.title}
            </h3>
            <p className="font-serif text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-[color:var(--chrome)]/75 md:col-span-6">
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Atelier Collections Showcase */}
      <div className="mt-32 border-t border-[color:var(--border)] pt-20 md:mt-40">
        <div className="mb-14">
          <span className="tracking-luxe text-[0.62rem] text-[color:var(--bronze)]">
            The Output
          </span>
          <h2 className="font-serif mt-4 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] text-chrome">
            Three Expressions of the Atelier.
          </h2>
          <p className="font-serif mt-4 max-w-xl text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed text-[color:var(--chrome)]/70">
            Every garment from the Addis Ababa studio belongs to one of three curated chapters.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {CHAPTERS.map((ch) => (
            <a
              key={ch.n}
              href={ch.href}
              className="group block border border-[color:var(--border)] bg-white/[0.015] p-6 transition-all duration-500 hover:border-[color:var(--bronze)] hover:bg-white/[0.03]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--charcoal)]">
                <img
                  src={ch.img}
                  alt={ch.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[20%] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="tracking-luxe absolute left-3 top-3 text-[0.58rem] text-[color:var(--bronze)]">
                  {ch.n}
                </span>
              </div>
              <h3 className="font-serif mt-6 text-2xl text-chrome transition-colors group-hover:text-white">
                {ch.name}
              </h3>
              <p className="font-serif mt-3 text-sm leading-relaxed text-[color:var(--steel)]">
                {ch.desc}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-[0.62rem] tracking-luxe text-[color:var(--bronze)]">
                <span>View Collection</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Private Commissions Callout */}
      <div className="mt-28 flex flex-col items-center gap-6 border-t border-[color:var(--border)] pt-16 text-center">
        <span className="tracking-luxe text-[0.6rem] text-[color:var(--steel)]">
          Bespoke Tailoring &amp; Studio Inquiries
        </span>
        <a href="/contact" className="btn-luxe">
          <span className="dot" />
          Contact the Atelier
        </a>
      </div>
    </PageShell>
  );
}
