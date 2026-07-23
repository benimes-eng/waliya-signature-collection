import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "../components/SiteChrome";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — WALIYA" },
      {
        name: "description",
        content:
          "Field notes from the WALIYA atelier — dispatches on craft, altitude, and Ethiopian luxury.",
      },
      { property: "og:title", content: "Journal — WALIYA" },
      {
        property: "og:description",
        content: "Dispatches from the atelier and the highlands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

const ENTRIES = [
  {
    date: "22 · III · 2026",
    tag: "Field Notes",
    title: "A Week Above the Cloud Line",
    excerpt:
      "Four days in the Simien range with the head weaver. Wind at 2,900 metres teaches you what a seam needs to hold.",
  },
  {
    date: "14 · II · 2026",
    tag: "Craft",
    title: "The Weight of Silence",
    excerpt:
      "Why the Ascension Coat weighs 2.4kg — and why removing a single gram would change everything.",
  },
  {
    date: "05 · I · 2026",
    tag: "Portrait",
    title: "Meet Almaz, Master Weaver",
    excerpt:
      "Twenty-nine years at the loom. A pattern inherited from her grandmother. Her initials are on every bronze tag from Bay 3.",
  },
  {
    date: "17 · XI · 2025",
    tag: "House",
    title: "Six Pieces. No More.",
    excerpt:
      "Why our seasons are short and our runs are shorter. A quiet manifesto against volume.",
  },
];

function JournalPage() {
  return (
    <PageShell
      eyebrow="IV · Journal"
      title="Dispatches from Altitude"
      intro="Notes from the studio floor, the loom, and the highlands. Published rarely, read slowly."
    >
      <div className="space-y-12">
        {ENTRIES.map((e, i) => (
          <motion.a
            key={e.title}
            href="#"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group block border-t border-[color:var(--border)] pt-8"
          >
            <div className="flex flex-wrap items-center gap-6">
              <span className="tracking-luxe text-[0.62rem] text-[color:var(--steel)]">
                {e.date}
              </span>
              <span className="tracking-luxe text-[0.62rem] text-[color:var(--bronze)]">
                {e.tag}
              </span>
            </div>
            <h3 className="font-serif mt-4 text-3xl text-chrome transition-colors md:text-5xl group-hover:text-[color:var(--bronze)]">
              {e.title}
            </h3>
            <p className="font-serif mt-4 max-w-2xl text-[color:var(--chrome)]/75">
              {e.excerpt}
            </p>
            <span className="tracking-luxe mt-6 inline-block text-[0.6rem] text-chrome">
              Read →
            </span>
          </motion.a>
        ))}
      </div>
    </PageShell>
  );
}
