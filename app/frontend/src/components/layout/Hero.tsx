"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/animations/cardMotion";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-6">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="premium-blur top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/20 animate-pulse" />
        <div className="premium-blur bottom-[10%] right-[10%] w-[400px] h-[400px] bg-secondary/10" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl text-center space-y-12"
      >
        {/* Animated Badge */}
        <motion.div variants={fadeInUp} className="flex justify-center">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/80 group-hover:text-primary transition-colors">
              Next-Gen Identity Protocol
            </span>
          </div>
        </motion.div>

        {/* Headline with Split Text Effect */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] flex flex-col">
            <span className="text-gradient">UNIVERSAL</span>
            <span className="text-gradient-primary">TRUST LAYER</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed">
            The institutional standard for blockchain-based verifiable credentials.
            Secure, immutable, and natively scalable on Solana.
          </p>
        </motion.div>

        {/* Premium CTAs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
        >
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:px-12 text-[12px] uppercase tracking-[0.2em] font-black h-16 rounded-2xl shadow-[0_20px_50px_rgba(100,100,255,0.2)] hover:shadow-[0_20px_50px_rgba(100,100,255,0.4)] transition-all">
              Initialize Registry
            </Button>
          </Link>

          <Link href="/verify" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:px-12 text-[12px] uppercase tracking-[0.2em] font-black h-16 rounded-2xl border-white/10 glass hover:bg-white/5 shadow-xl hover:shadow-secondary/5">
              Verify Credential
            </Button>
          </Link>
        </motion.div>

        {/* Feature Grid Spotlight */}
        <motion.div
          variants={fadeInUp}
          className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-lg font-bold">Immutability</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Permanent storage on the Solana ledger ensuring lifetime verification.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-lg font-bold">Scalability</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Powered by Solana's high-throughput architecture for instant issuance.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-lg font-bold">Privacy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Selective disclosure and cryptographic proofs protect user identity.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}