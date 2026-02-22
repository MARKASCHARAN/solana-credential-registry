"use client";

import { shortenAddress } from "@/lib/utils";

type CredentialCardProps = {
  credentialType: string;
  issuer: string;
  issuedAt: string;
  onVerify: () => void;
};

export default function CredentialCard({
  credentialType,
  issuer,
  issuedAt,
  onVerify,
}: CredentialCardProps) {
  return (
    <div
      onClick={onVerify}
      className="glass-card p-8 rounded-[2rem] cursor-pointer group active:scale-[0.98] transition-all"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="glass px-3 py-1 rounded-full">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/80">On-Chain Asset</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white group-hover:text-primary transition-colors leading-none">
            {credentialType}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Issuer: {shortenAddress(issuer, 8)}
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Persistence Hook</span>
            <span className="block text-[10px] font-bold text-muted-foreground/60 uppercase">{issuedAt}</span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}