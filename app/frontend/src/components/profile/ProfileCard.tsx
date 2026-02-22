"use client";

import { motion } from "framer-motion";
import { shortenAddress } from "@/lib/utils";

type ProfileCardProps = {
  username: string;
  bio: string;
  authority: string;
  isIssuer?: boolean;
};

export default function ProfileCard({
  username,
  bio,
  authority,
  isIssuer = false,
}: ProfileCardProps) {
  return (
    <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-[80px] -z-10 rounded-full group-hover:bg-primary/30 transition-all duration-700" />

      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">{username}</h2>
            <div className="flex flex-wrap gap-2">
              <span className="glass px-3 py-1 rounded-full text-[10px] font-mono text-primary border-primary/20 tracking-wider">
                {shortenAddress(authority, 8)}
              </span>
              {isIssuer && (
                <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  System Trustee
                </span>
              )}
            </div>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
            <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin-slow" />
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
          {bio}
        </p>

        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Registration</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Active Node</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Network</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Mainnet-Beta</span>
          </div>
        </div>
      </div>
    </div>
  );
}