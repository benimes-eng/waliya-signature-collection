import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "../components/SiteChrome";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "The Atelier — WALIYA" },
      {
        name: "description",
        content:
          "Inside the WALIYA atelier — nine artisans, a wooden loom, and a promise: six pieces per season, made to endure.",
      },
      { property: "og:title", content: "The Atelier — WALIYA" },
      {
        property: "og:description",
        content: "Hand-cut, hand-stitched, hand-numbered. Meet the WALIYA atelier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AtelierPage,
});

const CRAFT = [
  {
    step: "01",
    title: "The Loom",
    body: "Bronze-warp silk is drawn by hand on a wooden loom. Ninety minutes yields one metre.",
  },
  {
    step: "02",
    title: "The Cut",
    body: "One master tailor. One chalk line. Every panel cut against the grain of the wool.",
  },
  {
    step: "03",
    title: "The Seam",
    body: "Hand-basted, then closed with a slow lockstitch. No glue. No fusing. No shortcuts.",
  },
  {
    step: "04",
    title: "The Bronze Tag",
    body: "Struck by hand with the artisan's initials and the atelier's altitude: 2,355m.",
  },
];

const NUMBERS = [
  { k: "9", v: "Artisans" },
  { k: "6", v: "Pieces per season" },
  { k: "42h", v: "Per coat" },
  { k: "2,355m", v: "Atelier altitude" },
];

function AtelierPage() {
  return (
    <PageShell
      eyebrow="III · The Atelier"
      title="Made by Hand. Made to Endure."
      intro="Nine artisans, one atelier, one wooden loom. Nothing leaves this studio without a bronze tag stamped by the maker who made it."
    >
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

      <div className="mt-24 space-y-16">
        {CRAFT.map((c, i) => (
          <motion.div
            key={c.step}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-6 md:grid-cols-12"
          >
            <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)] md:col-span-2">
              {c.step}
            </span>
            <h3 className="font-serif text-3xl text-chrome md:col-span-4 md:text-4xl">
              {c.title}
            </h3>
            <p className="font-serif text-[color:var(--chrome)]/75 md:col-span-6">
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
