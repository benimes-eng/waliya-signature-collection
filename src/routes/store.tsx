import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "../components/SiteChrome";
import { Reveal, RevealStagger, RevealChild } from "../components/Reveal";

// Images for the 3 Waliya Collections
import collectionEssentials from "../assets/collection-essentials.jpg";
import collectionSport from "../assets/collection-sport.jpg";
import collectionBaby from "../assets/collection-baby.jpg";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Store — WALIYA" },
      {
        name: "description",
        content:
          "Explore the WALIYA collection across three primary chapters: Everyday Essentials, Sport & Active, and Baby & Kids.",
      },
      { property: "og:title", content: "Store — WALIYA" },
      {
        property: "og:description",
        content:
          "Shopify Flagship Boutique · Printify Signature Editions · Etsy Archival Pieces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StorePage,
});

/* ── Types ─────────────────────────────────────────────── */

type Collection = {
  n: string;
  id: string;
  label: string;
  title: string;
  description: string;
  categories: string[];
  cta: string;
  href: string;
  image: string;
  align: "left" | "right";
};

type Storefront = {
  id: string;
  n: string;
  name: string;
  platform: string;
  description: string;
  cta: string;
  href: string;
};

/* ── Data ───────────────────────────────────────────────── */

const STOREFRONTS: Storefront[] = [
  {
    id: "shopify",
    n: "01",
    name: "Flagship Boutique",
    platform: "SHOPIFY",
    description: "Full collection, signature tailoring & made-to-measure.",
    cta: "Enter Boutique →",
    href: "https://waliya-signature.myshopify.com/",
  },
  {
    id: "printify",
    n: "02",
    name: "Signature Editions",
    platform: "PRINTIFY",
    description: "Limited capsule prints & numbered seasonal releases.",
    cta: "View Editions →",
    href: "https://waliya-signaturecollection.printify.me/",
  },
  {
    id: "etsy",
    n: "03",
    name: "Archive & Rare",
    platform: "ETSY",
    description: "Archival pieces, artisan samples & rare studio finds.",
    cta: "Browse Archive →",
    href: "https://www.etsy.com/shop/WaliyaSignature",
  },
];

const COLLECTIONS: Collection[] = [
  {
    n: "01",
    id: "everyday-essentials",
    label: "01 — EVERYDAY ESSENTIALS",
    title: "EVERYDAY ESSENTIALS",
    description:
      "Essential pieces, elevated. Everyday clothing crafted for movement, comfort, and understated presence.",
    categories: [
      "Polo Shirts",
      "Dress Shirts",
      "Hoodies",
      "Sweaters",
      "Jackets",
      "Shorts",
      "Boxer Shorts",
      "Socks",
    ],
    cta: "EXPLORE ESSENTIALS →",
    href: "/collection",
    image: collectionEssentials,
    align: "left",
  },
  {
    n: "02",
    id: "sport-active",
    label: "02 — SPORT & ACTIVE",
    title: "SPORT & ACTIVE",
    description:
      "Made for movement. Performance-inspired essentials designed to move with you, wherever the journey leads.",
    categories: ["Sportswear", "Sports Hats", "Scarves", "Headwear"],
    cta: "EXPLORE SPORT →",
    href: "/collection",
    image: collectionSport,
    align: "right",
  },
  {
    n: "03",
    id: "baby-kids",
    label: "03 — BABY & KIDS",
    title: "BABY & KIDS",
    description:
      "The next generation of elevation. Thoughtful essentials made for the smallest members of the Waliya family.",
    categories: [
      "Baby Clothing",
      "Baby Sweatshirts",
      "Baby Shirts",
      "Baby Pants",
      "Baby Hats",
      "Baby Socks",
    ],
    cta: "EXPLORE BABY & KIDS →",
    href: "/collection",
    image: collectionBaby,
    align: "left",
  },
];

/* ── Page ───────────────────────────────────────────────── */

function StorePage() {
  return (
    <PageShell
      eyebrow="IV · The Store"
      title="The Waliya Collection."
      intro="Acquire the atelier through three curated storefronts, or explore the three primary chapters below."
    >
      {/* ── STORES SECTION (TOP) ── */}
      <section id="stores" className="scroll-mt-32 mb-24 md:mb-32">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="tracking-luxe text-[0.62rem] text-[color:var(--bronze)]">
                Acquire the Atelier
              </span>
              <h2 className="font-serif mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] text-chrome">
                Stores.
              </h2>
            </div>
            <p className="font-serif text-sm text-[color:var(--chrome)]/60 max-w-sm">
              Choose your entrance — each carries a curated chapter of the collection.
            </p>
          </div>
          <div className="hairline mt-6 w-20" />
        </Reveal>

        <RevealStagger
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7"
          stagger={0.1}
        >
          {STOREFRONTS.map((s) => (
            <RevealChild key={s.id}>
              <StoreCard store={s} />
            </RevealChild>
          ))}
        </RevealStagger>
      </section>

      {/* Quick Anchor Navigation */}
      <Reveal className="mb-20 flex flex-wrap items-center gap-3 md:gap-4 border-t border-[color:var(--border)] pt-12">
        <span className="tracking-luxe text-[0.58rem] text-[color:var(--steel)] mr-2">
          Collections:
        </span>
        {COLLECTIONS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="group inline-flex items-center gap-2 border border-[color:var(--border)] bg-white/[0.015] px-4 py-2 transition-all duration-500 hover:border-[color:var(--bronze)] hover:bg-white/[0.03]"
          >
            <span className="font-serif text-xs text-[color:var(--bronze)]">{c.n}</span>
            <span className="tracking-luxe text-[0.58rem] text-[color:var(--steel)] group-hover:text-chrome transition-colors">
              {c.title}
            </span>
          </a>
        ))}
      </Reveal>

      {/* Primary Collections */}
      <div className="space-y-28 md:space-y-40">
        {COLLECTIONS.map((c) => (
          <CollectionSection key={c.id} collection={c} />
        ))}
      </div>

      {/* Contact */}
      <Reveal className="mt-28 flex flex-col items-center gap-6 border-t border-[color:var(--border)] pt-16 text-center">
        <span className="tracking-luxe text-[0.6rem] text-[color:var(--steel)]">
          For private commissions &amp; bespoke orders
        </span>
        <a href="/contact" className="btn-luxe">
          <span className="dot" />
          Contact the Atelier
        </a>
      </Reveal>
    </PageShell>
  );
}

/* ── StoreCard (Minimal, No Icons) ──────────────────────── */

function StoreCard({ store }: { store: Storefront }) {
  return (
    <motion.a
      href={store.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group relative flex flex-col justify-between border border-[color:var(--border)] bg-white/[0.012] p-7 md:p-8 transition-all duration-500 hover:border-[color:var(--bronze)]/60 hover:bg-white/[0.025]"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="tracking-luxe text-[0.6rem] text-[color:var(--bronze)]">
            {store.platform}
          </span>
          <span className="font-serif text-xs text-[color:var(--steel)]/60">
            {store.n}
          </span>
        </div>

        <h3 className="font-serif mt-5 text-[clamp(1.3rem,2vw,1.6rem)] leading-tight text-chrome transition-colors group-hover:text-white">
          {store.name}
        </h3>

        <p className="font-serif mt-3 text-sm leading-relaxed text-[color:var(--chrome)]/65">
          {store.description}
        </p>
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-xs tracking-luxe text-chrome transition-colors duration-500 group-hover:text-[color:var(--bronze)]">
        <span>{store.cta}</span>
      </div>

      {/* Subtle corner accent */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at bottom right, rgba(176,133,88,0.18) 0%, transparent 70%)",
        }}
      />
    </motion.a>
  );
}

/* ── CollectionSection ──────────────────────────────────── */

function CollectionSection({ collection }: { collection: Collection }) {
  const isRight = collection.align === "right";

  return (
    <article
      id={collection.id}
      className="scroll-mt-32 border-b border-[color:var(--border)]/60 pb-24 md:pb-36"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
        {/* Large Editorial Image */}
        <div className={`md:col-span-7 ${isRight ? "md:order-2" : "md:order-1"}`}>
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--charcoal)] border border-[color:var(--border)] group">
              <img
                src={collection.image}
                alt={collection.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <span className="font-serif text-3xl font-light text-white/90">
                  {collection.n}
                </span>
                <span className="h-px w-8 bg-white/40" />
                <span className="tracking-luxe text-[0.62rem] uppercase text-white/70">
                  {collection.title}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Content Column */}
        <div className={`md:col-span-5 ${isRight ? "md:order-1" : "md:order-2"}`}>
          <Reveal>
            <span className="tracking-luxe text-[0.62rem] text-[color:var(--bronze)]">
              {collection.label}
            </span>
            <h2 className="font-serif mt-3 text-[clamp(1.9rem,3.5vw,2.8rem)] leading-[1.05] tracking-tight text-chrome">
              {collection.title}
            </h2>
            <p className="font-serif mt-5 text-base leading-relaxed text-[color:var(--chrome)]/75">
              {collection.description}
            </p>
          </Reveal>

          {/* Categories Pill Grid */}
          <Reveal className="mt-8">
            <span className="tracking-luxe text-[0.55rem] text-[color:var(--steel)] uppercase block mb-3">
              Included Pieces
            </span>
            <div className="flex flex-wrap gap-2">
              {collection.categories.map((cat) => (
                <span
                  key={cat}
                  className="tracking-luxe inline-block border border-[color:var(--border)] bg-white/[0.02] px-3 py-1.5 text-[0.58rem] text-[color:var(--chrome)]/80 transition-colors hover:border-[color:var(--bronze)] hover:text-white"
                >
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>

          {/* CTA Link */}
          <Reveal className="mt-10">
            <a
              href={collection.href}
              className="inline-flex items-center gap-3 text-xs tracking-luxe text-chrome transition-colors hover:text-[color:var(--bronze)]"
            >
              <span>{collection.cta}</span>
              <span className="h-px w-8 origin-left bg-[color:var(--bronze)] transition-transform duration-300 hover:scale-x-125" />
            </a>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
