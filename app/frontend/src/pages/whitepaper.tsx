import AppShell from "@/components/layout/AppShell";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations/cardMotion";

export default function Whitepaper() {
  return (
    <AppShell>
      <section className="relative min-h-screen px-6 py-40 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] bg-primary/5 blur-[180px] rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-secondary/5 blur-[180px] rounded-full" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-40"
        >
          {/* HERO */}
          <motion.header variants={fadeInUp} className="text-center space-y-10">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
              Solana Credential Registry · Whitepaper v1
            </span>

            <h1 className="text-[clamp(3rem,6vw,6rem)] font-black leading-[0.95] tracking-tight">
              Identity,
              <br />
              Without Permission.
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              A protocol for issuing, owning, and verifying credentials on-chain —
              without centralized authorities, opaque databases, or revocation risk.
            </p>
          </motion.header>

          {/* PROBLEM */}
          <motion.section variants={fadeInUp} className="space-y-16">
            <SectionTitle index="01" title="The Problem" />

            <GlassCard>
              <h3 className="text-2xl font-semibold">Digital Trust Is Broken</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identity today is fragmented across platforms, locked behind
                centralized databases, and vulnerable to censorship, data loss,
                and forgery. Credentials expire, disappear, or change without
                user consent.
              </p>

              <ul className="grid md:grid-cols-2 gap-8 pt-8">
                <ProblemItem title="Centralized Failure">
                  Single points of control create systemic risk.
                </ProblemItem>
                <ProblemItem title="No Verifiable Origin">
                  Claims cannot be independently verified.
                </ProblemItem>
              </ul>
            </GlassCard>
          </motion.section>

          {/* SOLUTION */}
          <motion.section variants={fadeInUp} className="space-y-16">
            <SectionTitle index="02" title="The Solution" />

            <GlassCard>
              <h3 className="text-2xl font-semibold">An On-Chain Credential Primitive</h3>
              <p className="text-muted-foreground leading-relaxed">
                The Solana Credential Registry is a protocol-level primitive
                that allows trusted issuers to mint immutable credentials
                directly to a user’s wallet — verifiable by anyone, forever.
              </p>

              <ul className="space-y-6 pt-6">
                <Bullet title="Immutable by Design">
                  Credentials cannot be altered or revoked once issued.
                </Bullet>
                <Bullet title="Permissioned Issuance">
                  Only authorized issuers can mint credentials.
                </Bullet>
                <Bullet title="Public Verification">
                  Proofs are readable without wallets or signatures.
                </Bullet>
              </ul>
            </GlassCard>
          </motion.section>

          {/* TRUST MODEL */}
          <motion.section variants={fadeInUp} className="space-y-16">
            <SectionTitle index="03" title="Trust Model" />

            <GlassCard>
              <p className="text-muted-foreground leading-relaxed">
                The protocol does not decide truth. Instead, it makes trust
                explicit. Verifiers choose which issuers they trust, and the
                blockchain guarantees the authenticity of the claim.
              </p>

              <div className="grid md:grid-cols-3 gap-6 pt-8 text-sm">
                <TrustRole title="Admin">
                  Governs issuer eligibility.
                </TrustRole>
                <TrustRole title="Issuer">
                  Issues claims within their domain.
                </TrustRole>
                <TrustRole title="Verifier">
                  Independently evaluates trust.
                </TrustRole>
              </div>
            </GlassCard>
          </motion.section>

          {/* TECH */}
          <motion.section variants={fadeInUp} className="grid md:grid-cols-2 gap-10">
            <GlassCard>
              <h4 className="text-xs uppercase tracking-widest text-secondary">
                Architecture
              </h4>
              <p className="text-sm text-muted-foreground">
                Built with Anchor on Solana, leveraging deterministic PDAs,
                parallel execution, and low-latency finality.
              </p>
            </GlassCard>

            <GlassCard>
              <h4 className="text-xs uppercase tracking-widest text-secondary">
                Performance
              </h4>
              <div className="flex justify-between pt-4">
                <Metric label="Finality" value="~400ms" />
                <Metric label="Cost" value="~$0.0001" />
              </div>
            </GlassCard>
          </motion.section>

          {/* CTA */}
          <motion.footer variants={fadeInUp} className="text-center space-y-8">
            <p className="text-muted-foreground">
              Trust should be verifiable — not assumed.
            </p>
            <button className="h-14 px-10 rounded-xl bg-primary text-primary-foreground font-semibold tracking-wide hover:opacity-90 transition">
              Open Protocol Dashboard
            </button>
          </motion.footer>
        </motion.div>
      </section>
    </AppShell>
  );
}

/* ---------- Helper Components ---------- */

const SectionTitle = ({ index, title }: { index: string; title: string }) => (
  <div className="flex items-center gap-6">
    <span className="text-xs font-semibold tracking-widest text-primary">
      {index}
    </span>
    <div className="flex-1 h-px bg-white/10" />
    <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
      {title}
    </h2>
  </div>
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-3xl p-12 bg-white/5 backdrop-blur-md border border-white/10 space-y-6">
    {children}
  </div>
);

const ProblemItem = ({ title, children }: any) => (
  <div className="space-y-2">
    <p className="font-semibold">{title}</p>
    <p className="text-sm text-muted-foreground">{children}</p>
  </div>
);

const Bullet = ({ title, children }: any) => (
  <li className="flex gap-4">
    <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  </li>
);

const TrustRole = ({ title, children }: any) => (
  <div className="rounded-xl border border-white/10 p-6 bg-black/30">
    <p className="font-semibold">{title}</p>
    <p className="text-xs text-muted-foreground">{children}</p>
  </div>
);

const Metric = ({ label, value }: any) => (
  <div>
    <p className="text-2xl font-semibold">{value}</p>
    <p className="text-xs text-muted-foreground uppercase">{label}</p>
  </div>
);