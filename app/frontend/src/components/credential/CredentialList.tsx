"use client";

import { useState } from "react";
import CredentialCard from "./CredentialCard";
import VerifyModal from "./VerifyModal";
import { useCredentials } from "@/hooks/useCredentials";
import { PublicKey } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";

interface CredentialListProps {
  subject?: PublicKey;
}

export default function CredentialList({ subject }: CredentialListProps) {
  const { credentials, loading, error } = useCredentials(subject);
  const [selected, setSelected] = useState<any | null>(null);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/[0.03] border border-white/5" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center text-xs font-bold uppercase tracking-widest text-destructive">
        Connectivity Error: Unable to fetch on-chain assets.
      </div>
    );
  }

  if (credentials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-16 text-center space-y-2">
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/40">Inventory Empty</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/20">Awaiting initial issuance context.</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        layout
        className="grid gap-6 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {credentials.map((item) => {
            const acc = item.account as any;
            const cType = acc.credential_type || acc.credentialType;
            const issuer = acc.issuer;
            const subject = acc.subject;
            const issuedAtRaw = acc.issued_at || acc.issuedAt;

            return (
              <motion.div
                key={item.publicKey.toBase58()}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <CredentialCard
                  credentialType={cType}
                  issuer={issuer.toBase58()}
                  issuedAt={new Date(Number(issuedAtRaw) * 1000).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  onVerify={() => setSelected(item)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {selected && (
        <VerifyModal
          open={!!selected}
          onClose={() => setSelected(null)}
          credential={{
            type: (selected.account as any).credential_type || (selected.account as any).credentialType,
            issuer: selected.account.issuer.toBase58(),
            subject: selected.account.subject.toBase58(),
            issuedAt: new Date(Number((selected.account as any).issued_at || (selected.account as any).issuedAt) * 1000).toLocaleDateString(undefined, { dateStyle: 'long' }),
            pda: selected.publicKey.toBase58()
          }}
        />
      )}
    </>
  );
}