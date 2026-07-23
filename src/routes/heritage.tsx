import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "../components/SiteChrome";
import mountainsSrc from "../assets/mountains.jpg";

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

const CHAPTERS = [
  {
    year: "3,000 BC",
    title: "The Highlands",
    body: "The Simien range rises to 4,550 metres. Wind, silence, obsidian rock. It is here the Walia Ibex learned to stand alone.",
  },
  {
    year: "1970",
    title: "The Loom",
    body: "Our first weavers set up a wooden loom in a house in Addis Ababa. No electricity. One pattern. One promise: to make cloth that outlives us.",
  },
  {
    year: "2011",
    title: "The Atelier",
    body: "WALIYA is founded. A studio of nine artisans commits to six pieces per season — nothing more, nothing faster.",
  },
  {
    year: "Today",
    title: "The House",
    body: "Every garment carries a stamped bronze tag with the artisan's initials and the altitude of the atelier: 2,355m.",
  },
];

function HeritagePage() {
  return (
    <PageShell
      eyebrow="I · Heritage"
      title="Forged Above."
      intro="A house shaped by altitude. The Walia Ibex — solitary, silent, elevated — is our emblem. What follows is our lineage."
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] overflow-hidden opacity-40">
          <img
            src={mountainsSrc}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(1) contrast(1.2) brightness(0.4)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="relative space-y-24 md:space-y-32">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.year}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.3, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 border-t border-[color:var(--border)] pt-10 md:grid-cols-12"
            >
              <span className="tracking-luxe text-[0.65rem] text-[color:var(--bronze)] md:col-span-3">
                {c.year}
              </span>
              <h3 className="font-serif text-3xl text-chrome md:col-span-4 md:text-4xl">
                {c.title}
              </h3>
              <p className="font-serif text-[color:var(--chrome)]/75 md:col-span-5">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
