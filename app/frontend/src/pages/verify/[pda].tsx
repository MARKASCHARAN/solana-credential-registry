"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { motion } from "framer-motion";
import Head from "next/head";
import { getReadonlyProgram } from "@/lib/anchor";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CredentialAccount, ProfileAccount } from "@/lib/types";
import { fetchProfileByAuthority } from "@/lib/profile";
import { shortenAddress } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/animations/cardMotion";

export default function VerifyCredentialPage() {
  const router = useRouter();
  const { pda } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [credential, setCredential] = useState<CredentialAccount | null>(null);
  const [issuerProfile, setIssuerProfile] = useState<ProfileAccount | null>(null);
  const [subjectProfile, setSubjectProfile] = useState<ProfileAccount | null>(null);

  useEffect(() => {
    if (!pda) return;

    const verify = async () => {
      try {
        setLoading(true);
        const program = getReadonlyProgram();
        const pubkey = new PublicKey(pda as string);

        const account = await program.account.Credential.fetch(pubkey);
        setCredential(account);

        const [ip, sp] = await Promise.all([
          fetchProfileByAuthority(account.issuer),
          fetchProfileByAuthority(account.subject),
        ]);

        setIssuerProfile(ip);
        setSubjectProfile(sp);
      } catch (err) {
        console.error("Verification error:", err);
        setError("This credential could not be verified on-chain. It may have been revoked or the address is incorrect.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [pda]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Verifying Ledger Persistence</p>
      </div>
    );
  }

  if (error || !credential) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="max-w-md space-y-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive text-2xl border border-destructive/20">
            ✕
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">Verification Error</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">{error}</p>
          </div>
          <Button onClick={() => router.push("/")} variant="outline" className="w-full h-11">
            Return to Registry
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center py-20 px-6">
      <Head>
        <title>Proof of Credential | Solana Registry</title>
      </Head>

      {/* Hero background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl space-y-12"
      >
        {/* Verification Status */}
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(110,231,183,0.1)]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-1">
            <h1 className="text-sm font-bold tracking-[0.2em] text-primary uppercase">On-Chain Verified</h1>
            <p className="text-muted-foreground text-xs uppercase tracking-widest font-medium opacity-60">Verified by Solana Credential Registry</p>
          </div>
        </motion.div>

        {/* The Certificate UI */}
        <motion.div variants={fadeInUp}>
          <Card className="p-0 border-primary/20 bg-card/40 relative group">
            {/* Subtle light leak */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {(() => {
              const cred = credential as any;
              const type = cred.credential_type || cred.credentialType;
              const issuedAt = cred.issued_at || cred.issuedAt;

              return (
                <div className="p-10 md:p-14 space-y-12">
                  <div className="flex flex-col items-center text-center space-y-12">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Certificate of Proof</span>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground italic uppercase underline decoration-primary/30 decoration-8 underline-offset-4 line-clamp-2">
                        {type}
                      </h2>
                    </div>

                    {/* Participants */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                      <div className="space-y-4 text-left">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Subject</span>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 font-bold text-lg">
                            {subjectProfile?.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-bold text-sm tracking-tight">{subjectProfile?.username || "Anonymous User"}</p>
                            <p className="text-[10px] font-mono text-muted-foreground/60">{shortenAddress(new PublicKey(cred.subject).toBase58(), 8)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 text-left">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Issuer</span>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground border border-white/5 font-bold text-lg">
                            {issuerProfile?.username?.[0]?.toUpperCase() || "I"}
                          </div>
                          <div>
                            <p className="font-bold text-sm tracking-tight">{issuerProfile?.username || "Verified Issuer"}</p>
                            <p className="text-[10px] font-mono text-muted-foreground/60">{shortenAddress(new PublicKey(cred.issuer).toBase58(), 8)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="w-full border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold">
                      <div className="space-y-1 text-center md:text-left">
                        <p className="text-muted-foreground/40">Persistence Hash</p>
                        <p className="text-muted-foreground truncate max-w-[140px] font-mono">{shortenAddress(pda as string, 12)}</p>
                      </div>
                      <div className="space-y-1 text-center md:text-right">
                        <p className="text-muted-foreground/40">Timestamp</p>
                        <p className="text-muted-foreground">{new Date(Number(issuedAt) * 1000).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
          <Button
            className="flex-1 h-12 text-xs font-bold uppercase tracking-widest"
            onClick={() => window.open(`https://explorer.solana.com/address/${pda}?cluster=devnet`, '_blank')}
          >
            Explorer Receipt
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 text-xs font-bold uppercase tracking-widest"
            onClick={() => router.push("/")}
          >
            Registry Home
          </Button>
        </motion.div>

        <motion.p variants={fadeInUp} className="text-center text-[10px] font-medium tracking-widest text-muted-foreground/40 uppercase pt-12">
          Immutable Cryptographic Proof • No Centralized Authorities Involved
        </motion.p>
      </motion.div>
    </main>
  );
}