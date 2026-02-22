import AppShell from "@/components/layout/AppShell";
import { motion } from "framer-motion";

import { Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <AppShell>
      <section className="bg-white min-h-screen px-6 py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto space-y-24"
        >
          {/* HEADER */}
          <motion.header variants={item} className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Marka Sai Charan
            </h1>

            <p className="text-sm uppercase tracking-widest text-blue-600 font-medium">
              Protocol Engineer · Solana
            </p>

            <p className="text-gray-600 max-w-xl leading-relaxed">
              I build decentralized identity and verification systems focused
              on explicit trust, deterministic authority, and long-term
              reliability.
            </p>

            {/* Socials */}
            <div className="flex gap-4 pt-2">
              {[
                { label: "GitHub", href: "https://github.com/tech-nidhi" },
                { label: "LinkedIn", href: "#" },
                { label: "Twitter", href: "#" },
                { label: "Whitepaper", href: "/whitepaper" },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-xs font-medium text-gray-700 border border-gray-200 px-4 py-2 rounded-md hover:border-blue-600 hover:text-blue-600 transition"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.header>

          {/* DIVIDER */}
          <motion.div
            variants={item}
            className="h-px w-full bg-gray-200"
          />

          {/* PHILOSOPHY */}
          <motion.section variants={item} className="space-y-6">
            <h2 className="text-sm uppercase tracking-widest text-gray-500">
              Philosophy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I believe identity systems should be transparent by default.
              Authority should be visible, verification should be public, and
              users should never need to trust opaque intermediaries.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My work focuses on building protocol primitives that enforce these
              guarantees at the lowest possible layer — the blockchain.
            </p>
          </motion.section>

          {/* CORE AREAS */}
          <motion.section variants={item} className="space-y-10">
            <h2 className="text-sm uppercase tracking-widest text-gray-500">
              Core Focus
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Protocol Engineering",
                  desc: "Anchor, Rust, PDAs, deterministic on-chain models.",
                },
                {
                  title: "Trust Architecture",
                  desc: "Issuer governance, role-based authority, public proofs.",
                },
                {
                  title: "Developer UX",
                  desc: "Typed clients, predictable flows, zero hidden magic.",
                },
              ].map((x) => (
                <div
                  key={x.title}
                  className="border border-gray-200 rounded-lg p-6 bg-gray-50 space-y-3"
                >
                  <p className="text-sm font-medium text-blue-600">
                    {x.title}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {x.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* PRINCIPLES */}
          <motion.section variants={item} className="space-y-6">
            <h2 className="text-sm uppercase tracking-widest text-gray-500">
              Engineering Principles
            </h2>

            <ul className="space-y-3 text-sm text-gray-700">
              {[
                "Explicit authority over implicit trust",
                "Immutable data over convenience",
                "On-chain truth as the source of reality",
                "Minimal assumptions, maximal clarity",
              ].map((rule, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {rule}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* FOOTER */}
          <motion.footer
            variants={item}
            className="pt-16 border-t border-gray-200 space-y-4"
          >
            <p className="text-sm text-gray-600">
              Currently building{" "}
              <span className="font-medium text-gray-900">
                Solana Credential Registry
              </span>
              .
            </p>

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Marka Sai Charan
            </p>
          </motion.footer>
        </motion.div>
      </section>
    </AppShell>
  );
}