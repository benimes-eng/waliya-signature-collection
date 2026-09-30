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

function StorePage() {
  return (
    <PageShell
      eyebrow="V · The Store"
      title="The Waliya Collection."
      intro="Three expressions of the atelier, crafted for different moments."
    >
      {/* Quick Collection Anchor Navigation */}
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
          href="#featured-pieces"
          className="group inline-flex items-center gap-2 border border-[color:var(--border)] bg-white/[0.015] px-4 py-2 transition-all duration-500 hover:border-[color:var(--bronze)] hover:bg-white/[0.03]"
        >
          <span className="font-serif text-xs text-[color:var(--bronze)]">✦</span>
          <span className="tracking-luxe text-[0.58rem] text-[color:var(--steel)] group-hover:text-chrome transition-colors">
            Featured Pieces
          </span>
        </a>
      </Reveal>

      {/* Primary Collections — Editorial Chapters */}
      <div className="space-y-28 md:space-y-40">
        {COLLECTIONS.map((c) => (
          <CollectionSection key={c.id} collection={c} />
        ))}
      </div>

      {/* Featured Pieces */}
      <section id="featured-pieces" className="scroll-mt-32 mt-36 md:mt-48">
        <Reveal>
          <span className="tracking-luxe text-[0.62rem] text-[color:var(--bronze)]">
            Featured Pieces
          </span>
          <h2 className="font-serif mt-4 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-chrome">
            Selected from the collection.
          </h2>
          <div className="hairline mt-8 w-28 md:w-36" />
        </Reveal>

        <RevealStagger className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12" stagger={0.12}>
          {PRODUCTS.map((p) => (
            <RevealChild key={p.n}>
              <ProductCard product={p} />
            </RevealChild>
          ))}
        </RevealStagger>
      </section>

      {/* Commerce Partners Footer Note */}
      <Reveal className="mt-32 border-t border-[color:var(--border)] pt-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <span className="tracking-luxe text-[0.58rem] text-[color:var(--steel)]">
            Curated & Fulfilled via Atelier Partners on Shopify · Printify · Etsy
          </span>
          <div className="flex items-center gap-7 opacity-50 transition-opacity hover:opacity-85">
            <ShopifyMark />
            <PrintifyMark />
            <EtsyMark />
          </div>
        </div>
      </Reveal>

      {/* Private Commissions & Contact */}
      <Reveal className="mt-20 flex flex-col items-center gap-6 border-t border-[color:var(--border)] pt-16 text-center">
        <span className="tracking-luxe text-[0.6rem] text-[color:var(--steel)]">
          For private commissions & bespoke orders
        </span>
        <a href="/contact" className="btn-luxe">
          <span className="dot" />
          Contact the Atelier
        </a>
      </Reveal>
    </PageShell>
  );
}

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
              {/* Subtle chrome sweep highlight */}
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

          {/* Categories pill list */}
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

          {/* Subtle text CTA */}
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

/* ------------ In-theme vendor wordmarks (SVG) ------------ */

function ShopifyMark() {
  return (
    <svg viewBox="0 0 220 48" className="h-6 w-auto text-chrome" fill="none">
      <path
        d="M24 6c-4 0-7 3-8 7l-6 2c-1 0-1 0-1 1l-4 26 20 4V6zm2 0v40l14-3-4-27c0-1-1-1-1-1l-3-1c0-5-3-8-6-8zm-2 4c1 0 3 1 3 5l-6 2c1-4 2-7 3-7z"
        fill="currentColor"
      />
      <text
        x="56"
        y="32"
        fontFamily="Cormorant Garamond, serif"
        fontSize="24"
        fontWeight="400"
        letterSpacing="0.18em"
        fill="currentColor"
      >
        SHOPIFY
      </text>
    </svg>
  );
}

function PrintifyMark() {
  return (
    <svg viewBox="0 0 230 48" className="h-6 w-auto text-chrome" fill="none">
      <rect x="4" y="8" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M12 32V16h8c3 0 5 2 5 5s-2 5-5 5h-4v6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="32"
        fontFamily="Cormorant Garamond, serif"
        fontSize="24"
        fontWeight="400"
        letterSpacing="0.18em"
        fill="currentColor"
      >
        PRINTIFY
      </text>
    </svg>
  );
}

function EtsyMark() {
  return (
    <svg viewBox="0 0 180 48" className="h-6 w-auto text-chrome" fill="none">
      <circle cx="22" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M15 16h14M15 24h10M15 32h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="32"
        fontFamily="Cormorant Garamond, serif"
        fontSize="24"
        fontWeight="400"
        letterSpacing="0.22em"
        fill="currentColor"
      >
        ETSY
      </text>
    </svg>
  );
}
