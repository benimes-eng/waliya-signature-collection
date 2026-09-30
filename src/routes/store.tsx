// Store — Waliya Collection v3 (Stores + Featured Pieces)
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "../components/SiteChrome";
import { Reveal, RevealStagger, RevealChild } from "../components/Reveal";
import piece01 from "../assets/piece-01.jpg";
import piece02 from "../assets/piece-02.jpg";
import piece03 from "../assets/piece-03.jpg";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "The Waliya Collection — Store" },
      {
        name: "description",
        content:
          "Three expressions of the atelier, crafted for different moments. Explore Everyday Essentials, Sport & Active, and Baby & Kids.",
      },
      { property: "og:title", content: "The Waliya Collection — Store" },
      {
        property: "og:description",
        content:
          "Three collections. One Waliya. Explore Everyday Essentials, Sport & Active, and Baby & Kids.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/favicon-512x512.png" },
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
  tagline: string;
  description: string;
  cta: string;
  href: string;
};

/* ── Data ───────────────────────────────────────────────── */

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
    image: piece01,
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
    image: piece02,
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
    image: piece03,
    align: "left",
  },
];

const STOREFRONTS: Storefront[] = [
  {
    id: "shopify",
    n: "I",
    name: "Flagship Boutique",
    platform: "Shopify",
    tagline: "Made-to-Measure & Ready-to-Wear",
    description:
      "Our primary storefront. Explore the full Waliya collection — bespoke tailoring, signature pieces, and seasonal releases.",
    cta: "Enter Boutique →",
    href: "https://www.shopify.com",
  },
  {
    id: "printify",
    n: "II",
    name: "Signature Editions",
    platform: "Printify",
    tagline: "Capsule & Print Editions",
    description:
      "Limited capsule editions and signature printed pieces. Each run is small, intentional, and numbered.",
    cta: "View Editions →",
    href: "https://printify.com",
  },
  {
    id: "etsy",
    n: "III",
    name: "Archive & Rare",
    platform: "Etsy",
    tagline: "Archival & One-of-a-Kind",
    description:
      "Rare pieces from past collections, hand-finished samples, and archival finds. For those who seek the extraordinary.",
    cta: "Browse Archive →",
    href: "https://www.etsy.com",
  },
];

const PRODUCTS = [
  {
    n: "01",
    title: "Highland Wool Overcoat",
    collection: "EVERYDAY ESSENTIALS",
    price: "€ 4,200",
    platform: "Shopify · Made-to-Measure",
    img: piece01,
    href: "https://www.shopify.com",
  },
  {
    n: "02",
    title: "Bronze-Warp Silk Scarf",
    collection: "SPORT & ACTIVE",
    price: "€ 320",
    platform: "Printify · Capsule Edition",
    img: piece02,
    href: "https://printify.com",
  },
  {
    n: "03",
    title: "Obsidian Archive Suit",
    collection: "EVERYDAY ESSENTIALS",
    price: "€ 5,600",
    platform: "Etsy · Archive Rare",
    img: piece03,
    href: "https://www.etsy.com",
  },
];

/* ── Page ───────────────────────────────────────────────── */

function StorePage() {
  return (
    <PageShell
      eyebrow="V · The Store"
      title="The Waliya Collection."
      intro="Three expressions of the atelier, crafted for different moments."
    >
      {/* Quick Anchor Navigation */}
      <Reveal className="mb-20 flex flex-wrap items-center gap-3 md:gap-4">
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
        <a
          href="#stores"
          className="group inline-flex items-center gap-2 border border-[color:var(--border)] bg-white/[0.015] px-4 py-2 transition-all duration-500 hover:border-[color:var(--bronze)] hover:bg-white/[0.03]"
        >
          <span className="font-serif text-xs text-[color:var(--bronze)]">⬡</span>
          <span className="tracking-luxe text-[0.58rem] text-[color:var(--steel)] group-hover:text-chrome transition-colors">
            Stores
          </span>
        </a>
      </Reveal>

      {/* Primary Collections */}
      <div className="space-y-28 md:space-y-40">
        {COLLECTIONS.map((c) => (
          <CollectionSection key={c.id} collection={c} />
        ))}
      </div>

      {/* ── STORES ── */}
      <section id="stores" className="scroll-mt-32 mt-36 md:mt-52">
        <Reveal>
          <span className="tracking-luxe text-[0.62rem] text-[color:var(--bronze)]">
            Acquire the Atelier
          </span>
          <h2 className="font-serif mt-4 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-chrome">
            Stores.
          </h2>
          <p className="font-serif mt-4 text-[clamp(0.95rem,1.6vw,1.2rem)] leading-relaxed text-[color:var(--chrome)]/60 max-w-xl">
            WALIYA is stocked across three curated storefronts. Choose your entrance — each carries a different chapter of the collection.
          </p>
          <div className="hairline mt-8 w-28 md:w-36" />
        </Reveal>

        <RevealStagger
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
          stagger={0.14}
        >
          {STOREFRONTS.map((s) => (
            <RevealChild key={s.id}>
              <StoreCard store={s} />
            </RevealChild>
          ))}
        </RevealStagger>
      </section>

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
            <a
              href={collection.href}
              className="group relative block aspect-[4/3] w-full overflow-hidden border border-[color:var(--border)] bg-[color:var(--charcoal)]"
            >
              <img
                src={collection.image}
                alt={collection.title}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[20%] transition-all duration-[1400ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                style={{ filter: "brightness(0.9)" }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
              <span className="tracking-luxe absolute left-4 top-4 text-[0.6rem] text-[color:var(--bronze)]">
                {collection.n}
              </span>
            </a>
          </Reveal>
        </div>

        {/* Editorial Text & Category List */}
        <div className={`md:col-span-5 ${isRight ? "md:order-1" : "md:order-2"}`}>
          <Reveal delay={0.1}>
            <span className="tracking-luxe text-[0.62rem] text-[color:var(--bronze)]">
              {collection.label}
            </span>
          </Reveal>

          <Reveal delay={0.18}>
            <h2 className="font-serif mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1] text-chrome tracking-tight">
              {collection.title}
            </h2>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="hairline my-6 w-20 md:w-24" />
          </Reveal>

          <Reveal delay={0.32}>
            <p className="font-serif text-[clamp(1.05rem,1.8vw,1.4rem)] leading-relaxed text-[color:var(--chrome)]/85">
              {collection.description}
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-8">
            <span className="tracking-luxe block text-[0.58rem] text-[color:var(--steel)] mb-3">
              Included Categories:
            </span>
            <div className="flex flex-wrap gap-2">
              {collection.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-block border border-[color:var(--border)] bg-white/[0.015] px-3 py-1 text-[0.65rem] tracking-[0.16em] uppercase text-[color:var(--chrome)]/75"
                >
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.48} className="mt-10">
            <a
              href={collection.href}
              className="group/cta inline-flex items-center gap-3 text-xs tracking-luxe text-chrome transition-colors duration-500 hover:text-[color:var(--bronze)]"
            >
              <span>{collection.cta}</span>
              <span className="h-px w-8 origin-left scale-x-75 bg-[color:var(--bronze)] transition-transform duration-500 group-hover/cta:scale-x-125" />
            </a>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/* ── StoreCard ──────────────────────────────────────────── */

function StoreCard({ store }: { store: Storefront }) {
  const Logo =
    store.id === "shopify"
      ? ShopifyLogo
      : store.id === "printify"
      ? PrintifyLogo
      : EtsyLogo;

  return (
    <motion.a
      href={store.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group relative flex flex-col border border-[color:var(--border)] bg-white/[0.012] p-8 md:p-10 transition-colors duration-500 hover:border-[color:var(--bronze)]/60 hover:bg-white/[0.025]"
    >
      {/* top number */}
      <span className="tracking-luxe text-[0.58rem] text-[color:var(--bronze)] mb-8">
        {store.n}
      </span>

      {/* Platform logo */}
      <div className="mb-8 flex items-center">
        <Logo />
      </div>

      {/* Boutique name */}
      <h3 className="font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.1] text-chrome tracking-tight">
        {store.name}
      </h3>

      {/* Tagline */}
      <p className="tracking-luxe mt-2 text-[0.58rem] text-[color:var(--steel)]">
        {store.tagline}
      </p>

      {/* Hairline */}
      <div className="hairline my-6 w-16 transition-all duration-500 group-hover:w-28" />

      {/* Description */}
      <p className="font-serif text-sm leading-relaxed text-[color:var(--chrome)]/70 flex-1">
        {store.description}
      </p>

      {/* CTA */}
      <div className="mt-8 inline-flex items-center gap-3 text-xs tracking-luxe text-chrome transition-colors duration-500 group-hover:text-[color:var(--bronze)]">
        <span>{store.cta}</span>
        <span className="h-px w-6 origin-left bg-[color:var(--bronze)] transition-transform duration-500 group-hover:scale-x-150" />
      </div>

      {/* corner accent */}
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

/* ── ProductCard ─────────────────────────────────────────── */

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  return (
    <motion.a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden border border-[color:var(--border)] bg-[color:var(--charcoal)]">
        <motion.img
          src={product.img}
          alt={product.title}
          loading="lazy"
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover grayscale-[25%] transition-all duration-1000 group-hover:scale-[1.05] group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75" />
        <span className="tracking-luxe absolute left-4 top-4 text-[0.6rem] text-[color:var(--bronze)]">
          {product.n}
        </span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-chrome group-hover:text-white transition-colors">
            {product.title}
          </h3>
          <p className="tracking-luxe mt-2 text-[0.6rem] text-[color:var(--steel)]">
            {product.collection}
          </p>
          <span className="mt-1 block text-[0.65rem] text-[color:var(--steel)]/60">
            {product.platform}
          </span>
        </div>
        <span className="font-serif text-lg text-[color:var(--bronze)]">{product.price}</span>
      </div>
    </motion.a>
  );
}

/* ── Platform Logos (SVG, Waliya dark theme) ──────────────── */

function ShopifyLogo() {
  return (
    <svg viewBox="0 0 110 32" className="h-7 w-auto" fill="none" aria-label="Shopify">
      {/* Shopify bag icon */}
      <path
        d="M18 4c-2.5 0-4.5 1.8-5 4.3L9 9.4C8.4 9.6 8 10 8 10.7L5.5 27l13 2.5V4H18zm1.5 0V29.5l9-1.8L27 12c-.1-.6-.5-1-1.1-1.1l-2-.7C23.3 6.2 21.5 4 19.5 4zM18 6.6c.8 0 1.8.8 2.2 3.2l-4.2 1.4c.5-2.8 1.4-4.6 2-4.6z"
        fill="url(#shopify-gold)"
      />
      {/* Wordmark */}
      <text
        x="32"
        y="22"
        fontFamily="Cormorant Garamond, serif"
        fontSize="16"
        fontWeight="400"
        letterSpacing="0.22em"
        fill="url(#shopify-text)"
      >
        SHOPIFY
      </text>
      <defs>
        <linearGradient id="shopify-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b08558" />
        </linearGradient>
        <linearGradient id="shopify-text" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9dcdf" />
          <stop offset="100%" stopColor="#a0a4a8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PrintifyLogo() {
  return (
    <svg viewBox="0 0 120 32" className="h-7 w-auto" fill="none" aria-label="Printify">
      {/* Printify P icon */}
      <rect x="2" y="4" width="24" height="24" stroke="url(#printify-gold)" strokeWidth="1.2" />
      <path
        d="M9 22V10h7c2.5 0 4 1.5 4 4s-1.5 4-4 4H9"
        stroke="url(#printify-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wordmark */}
      <text
        x="32"
        y="22"
        fontFamily="Cormorant Garamond, serif"
        fontSize="16"
        fontWeight="400"
        letterSpacing="0.22em"
        fill="url(#printify-text)"
      >
        PRINTIFY
      </text>
      <defs>
        <linearGradient id="printify-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b08558" />
        </linearGradient>
        <linearGradient id="printify-text" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9dcdf" />
          <stop offset="100%" stopColor="#a0a4a8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EtsyLogo() {
  return (
    <svg viewBox="0 0 80 32" className="h-7 w-auto" fill="none" aria-label="Etsy">
      {/* Etsy circle-E icon */}
      <circle cx="16" cy="16" r="13" stroke="url(#etsy-gold)" strokeWidth="1.2" />
      <path
        d="M10 10h12M10 16h9M10 22h12"
        stroke="url(#etsy-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Wordmark */}
      <text
        x="34"
        y="22"
        fontFamily="Cormorant Garamond, serif"
        fontSize="16"
        fontWeight="400"
        letterSpacing="0.22em"
        fill="url(#etsy-text)"
      >
        ETSY
      </text>
      <defs>
        <linearGradient id="etsy-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b08558" />
        </linearGradient>
        <linearGradient id="etsy-text" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9dcdf" />
          <stop offset="100%" stopColor="#a0a4a8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
