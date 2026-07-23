import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { PageShell } from "../components/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WALIYA" },
      {
        name: "description",
        content:
          "Request a private appointment, join the atelier list, or reach the WALIYA house directly.",
      },
      { property: "og:title", content: "Contact — WALIYA" },
      {
        property: "og:description",
        content: "Private appointments and enquiries at the WALIYA atelier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell
      eyebrow="V · Contact"
      title="Enter the Atelier"
      intro="Private fittings by appointment. The atelier receives twelve guests per week. Leave a note and we will reply within two days."
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="md:col-span-7 space-y-8"
        >
          {[
            { label: "Name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
            { label: "City", type: "text", name: "city" },
          ].map((f) => (
            <label key={f.name} className="block">
              <span className="tracking-luxe text-[0.6rem] text-[color:var(--steel)]">
                {f.label}
              </span>
              <input
                required
                type={f.type}
                name={f.name}
                className="mt-3 w-full border-b border-[color:var(--border)] bg-transparent py-3 font-serif text-lg text-chrome outline-none transition-colors focus:border-[color:var(--bronze)]"
              />
            </label>
          ))}
          <label className="block">
            <span className="tracking-luxe text-[0.6rem] text-[color:var(--steel)]">
              Message
            </span>
            <textarea
              required
              name="message"
              rows={4}
              className="mt-3 w-full border-b border-[color:var(--border)] bg-transparent py-3 font-serif text-lg text-chrome outline-none transition-colors focus:border-[color:var(--bronze)]"
            />
          </label>
          <button type="submit" className="btn-luxe">
            <span className="dot" />
            {sent ? "Received" : "Send Enquiry"}
          </button>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 space-y-10"
        >
          <div>
            <p className="tracking-luxe text-[0.6rem] text-[color:var(--bronze)]">
              Atelier
            </p>
            <p className="font-serif mt-3 text-xl text-chrome">
              Kazanchis Quarter
              <br />
              Addis Ababa · Ethiopia
            </p>
            <p className="mt-2 text-[0.62rem] tracking-[0.28em] uppercase text-[color:var(--steel)]">
              Altitude · 2,355m
            </p>
          </div>
          <div>
            <p className="tracking-luxe text-[0.6rem] text-[color:var(--bronze)]">
              Direct
            </p>
            <p className="font-serif mt-3 text-lg text-chrome">
              atelier@waliya.house
            </p>
            <p className="font-serif text-lg text-chrome">+251 11 000 0000</p>
          </div>
          <div>
            <p className="tracking-luxe text-[0.6rem] text-[color:var(--bronze)]">
              Hours
            </p>
            <p className="font-serif mt-3 text-[color:var(--chrome)]/75">
              Tuesday – Saturday
              <br />
              10:00 – 18:00 EAT
            </p>
          </div>
        </motion.aside>
      </div>
    </PageShell>
  );
}
