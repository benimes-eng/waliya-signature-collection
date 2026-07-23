import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "../components/SiteChrome";
import piece01 from "../assets/piece-01.jpg";
import piece02 from "../assets/piece-02.jpg";
import piece03 from "../assets/piece-03.jpg";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection — WALIYA" },
      {
        name: "description",
        content:
          "Objects of elevation. Hand-tailored Ethiopian luxury garments, cut from highland wool, hand-woven cotton, and volcanic black wool.",
      },
      { property: "og:title", content: "The Collection — WALIYA" },
      {
        property: "og:description",
        content: "Explore WALIYA's atelier pieces — cinematic Ethiopian luxury.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionPage,
});

const PIECES = [
  {
    n: "01",
    title: "The Ascension Coat",
    tag: "Highland Wool · Hand-Tailored",
    price: "€ 4,200",
    img: piece01,
    copy: "Weight and silence. Cut for cold air and long silences, structured to hold its shape at 4,000 metres.",
  },
  {
    n: "02",
    title: "The Weaver's Thread",
    tag: "Hand-woven Cotton · Bronze Silk Warp",
    price: "€ 2,850",
    img: piece02,
    copy: "Every thread drawn by hand on a wooden loom. Inherited geometry, spoken through cloth.",
  },
  {
    n: "03",
    title: "The Obsidian Suit",
    tag: "Volcanic Black Wool · Structured Shoulder",
    price: "€ 5,600",
    img: piece03,
    copy: "Cut from a single bolt of matte black wool. Nothing shines. Nothing wavers.",
  },
  {
    n: "04",
    title: "The Simien Cape",
    tag: "Alpaca Blend · Chrome Clasp",
    price: "€ 3,400",
    img: piece01,
    copy: "A single silhouette shaped by wind. Wearable weather.",
  },
  {
    n: "05",
    title: "The Bronze Sash",
    tag: "Hand-loom Silk · Bronze Thread",
    price: "€ 980",
    img: piece02,
    copy: "The finishing line of the atelier. Tied once, worn always.",
  },
  {
    n: "06",
    title: "The Peak Trouser",
    tag: "Twill Wool · Tapered",
    price: "€ 1,650",
    img: piece03,
    copy: "Architecture for the leg. A trouser that stands when you sit down.",
  },
];

function CollectionPage() {
  return (
    <PageShell
      eyebrow="II · The Collection"
      title="Objects of Elevation"
      intro="Six pieces released each season. Each one is finished by hand in our Addis Ababa atelier, numbered, and shipped in a bronze-sealed case."
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        {PIECES.map((p, i) => (
          <motion.article
            key={p.n}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--charcoal)]">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                style={{ filter: "brightness(0.85)" }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
              <span className="tracking-luxe absolute left-4 top-4 text-[0.6rem] text-chrome">
                {p.n}
              </span>
              <span className="tracking-luxe absolute right-4 top-4 text-[0.6rem] text-[color:var(--bronze)]">
                {p.price}
              </span>
            </div>
            <h3 className="font-serif mt-6 text-2xl text-chrome md:text-3xl">
              {p.title}
            </h3>
            <p className="mt-2 text-[0.65rem] tracking-[0.28em] uppercase text-[color:var(--steel)]">
              {p.tag}
            </p>
            <p className="font-serif mt-4 text-[color:var(--chrome)]/75">{p.copy}</p>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
