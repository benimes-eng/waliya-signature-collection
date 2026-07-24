import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { PageShell } from "../components/SiteChrome";
import { Reveal, RevealStagger, RevealChild } from "../components/Reveal";
import piece01 from "../assets/piece-01.jpg";
import piece02 from "../assets/piece-02.jpg";
import piece03 from "../assets/piece-03.jpg";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Store — WALIYA" },
      {
        name: "description",
        content:
          "Acquire WALIYA premium garments through our curated storefronts on Shopify, Printify, and Etsy.",
      },
      { property: "og:title", content: "Store — WALIYA" },
      {
        property: "og:description",
        content: "Premium Ethiopian luxury clothing, curated across Shopify, Printify, and Etsy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StorePage,
});

type Vendor = {
  name: string;
  tag: string;
  copy: string;
  href: string;
  mark: ReactNode;
};

const VENDORS: Vendor[] = [
  {
    name: "Shopify",
    tag: "Flagship Boutique",
    copy: "The full atelier collection, numbered and shipped from Addis Ababa. Made-to-measure requests handled here.",
    href: "https://www.shopify.com",
    mark: <ShopifyMark />,
  },
  {
    name: "Printify",
    tag: "Signature Editions",
    copy: "Print-refined capsule pieces — bronze-embroidered tees, atelier hoodies, silk-lined scarves.",
    href: "https://printify.com",
    mark: <PrintifyMark />,
  },
  {
    name: "Etsy",
    tag: "Archive & Rare",
    copy: "Archive pieces, single-cut samples, and heritage textiles. Rare, one-of-one, curated by hand.",
    href: "https://www.etsy.com",
    mark: <EtsyMark />,
  },
];

const PRODUCTS = [
  {
    n: "01",
    title: "Highland Wool Overcoat",
    price: "€ 4,200",
    tag: "Shopify · Made-to-Order",
    img: piece01,
    href: "https://www.shopify.com",
  },
  {
    n: "02",
    title: "Bronze-Warp Silk Scarf",
    price: "€ 320",
    tag: "Printify · Capsule",
    img: piece02,
    href: "https://printify.com",
  },
  {
    n: "03",
    title: "Obsidian Archive Suit",
    price: "€ 5,600",
    tag: "Etsy · One-of-One",
    img: piece03,
    href: "https://www.etsy.com",
  },
];

function StorePage() {
  return (
    <PageShell
      eyebrow="V · The Store"
      title="Acquire the Atelier."
      intro="WALIYA is stocked across three curated storefronts. Choose your entrance — each carries a different chapter of the collection."
    >
      <RevealStagger
        className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        stagger={0.12}
      >
        {VENDORS.map((v) => (
          <RevealChild key={v.name}>
            <VendorCard vendor={v} />
          </RevealChild>
        ))}
      </RevealStagger>

      <Reveal className="mt-32">
        <span className="tracking-luxe text-[0.62rem] text-[color:var(--bronze)]">
          Featured Pieces
        </span>
        <h2 className="font-serif mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-chrome">
          Six pieces per season. Three storefronts.
        </h2>
        <div className="hairline mt-8 w-32" />
      </Reveal>

      <RevealStagger className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3" stagger={0.1}>
        {PRODUCTS.map((p) => (
          <RevealChild key={p.n}>
            <ProductCard product={p} />
          </RevealChild>
        ))}
      </RevealStagger>

      <Reveal className="mt-32 flex flex-col items-center gap-6 border-t border-[color:var(--border)] pt-16 text-center">
        <span className="tracking-luxe text-[0.6rem] text-[color:var(--steel)]">
          For private commissions & wholesale
        </span>
        <a href="/contact" className="btn-luxe">
          <span className="dot" />
          Contact the Atelier
        </a>
      </Reveal>
    </PageShell>
  );
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-40, 40], [6, -6]), {
    stiffness: 120,
    damping: 15,
  });
  const ry = useSpring(useTransform(mx, [-40, 40], [-6, 6]), {
    stiffness: 120,
    damping: 15,
  });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={vendor.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative block h-full overflow-hidden border border-[color:var(--border)] bg-gradient-to-b from-white/[0.02] to-transparent p-8 transition-colors duration-700 hover:border-[color:var(--bronze)]/60"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(176,133,88,0.10), transparent 40%)",
        }}
      />
      <div className="relative flex h-16 items-center">{vendor.mark}</div>
      <div className="hairline my-8 w-16" />
      <span className="tracking-luxe text-[0.6rem] text-[color:var(--bronze)]">
        {vendor.tag}
      </span>
      <h3 className="font-serif mt-3 text-3xl text-chrome md:text-4xl">{vendor.name}</h3>
      <p className="font-serif mt-4 text-[color:var(--chrome)]/70">{vendor.copy}</p>
      <div className="mt-10 flex items-center justify-between">
        <span className="tracking-luxe text-[0.6rem] text-chrome">Enter Store →</span>
        <span className="h-px w-10 origin-left scale-x-0 bg-[color:var(--bronze)] transition-transform duration-700 group-hover:scale-x-100" />
      </div>
    </motion.a>
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
      <div className="relative aspect-[3/4] overflow-hidden border border-[color:var(--border)]">
        <motion.img
          src={product.img}
          alt={product.title}
          loading="lazy"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover grayscale-[35%] transition-all duration-1000 group-hover:scale-[1.05] group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
        <span className="tracking-luxe absolute left-4 top-4 text-[0.6rem] text-[color:var(--bronze)]">
          {product.n}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-chrome">{product.title}</h3>
          <p className="tracking-luxe mt-2 text-[0.58rem] text-[color:var(--steel)]">
            {product.tag}
          </p>
        </div>
        <span className="font-serif text-lg text-[color:var(--bronze)]">{product.price}</span>
      </div>
    </motion.a>
  );
}

/* ------------ In-theme vendor wordmarks (SVG) ------------ */

function ShopifyMark() {
  return (
    <svg viewBox="0 0 220 48" className="h-8 w-auto text-chrome" fill="none">
      <path
        d="M24 6c-4 0-7 3-8 7l-6 2c-1 0-1 0-1 1l-4 26 20 4V6zm2 0v40l14-3-4-27c0-1-1-1-1-1l-3-1c0-5-3-8-6-8zm-2 4c1 0 3 1 3 5l-6 2c1-4 2-7 3-7z"
        fill="currentColor"
      />
      <text
        x="56"
        y="32"
        fontFamily="Cormorant Garamond, serif"
        fontSize="26"
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
    <svg viewBox="0 0 230 48" className="h-8 w-auto text-chrome" fill="none">
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
        fontSize="26"
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
    <svg viewBox="0 0 180 48" className="h-8 w-auto text-chrome" fill="none">
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
        fontSize="26"
        fontWeight="400"
        letterSpacing="0.22em"
        fill="currentColor"
      >
        ETSY
      </text>
    </svg>
  );
}
