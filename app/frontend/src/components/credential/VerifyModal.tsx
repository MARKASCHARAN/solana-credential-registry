"use client";

import Modal from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { shortenAddress } from "@/lib/utils";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/useToast";

type VerifyModalProps = {
  open: boolean;
  onClose: () => void;
  credential: {
    type: string;
    issuer: string;
    subject: string;
    issuedAt: string;
    pda: string;
  };
};

export default function VerifyModal({
  open,
  onClose,
  credential,
}: VerifyModalProps) {
  const { showToast } = useToast();
  if (!open) return null;

  const handleShare = () => {
    const url = `${window.location.origin}/verify/${credential.pda}`;
    navigator.clipboard.writeText(url);
    showToast("Verification link copied!");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-black italic tracking-tight text-gradient uppercase">
              Instance Proof
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Verified Cryptographic Signal</p>
          </div>
          <Badge variant="trust">Active</Badge>
        </div>

        <div className="space-y-3 rounded-xl bg-white/[0.03] border border-white/5 p-6">
          <div className="flex justify-between items-center py-1">
            <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">Type</span>
            <span className="text-sm font-bold text-primary italic">{credential.type}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">Issuer</span>
            <span className="text-xs font-mono font-bold">{shortenAddress(credential.issuer, 8)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">Issue Date</span>
            <span className="text-xs font-bold text-muted-foreground">{credential.issuedAt}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
            Ledger Address (PDA)
          </p>
          <div className="rounded-lg border border-white/5 bg-black/20 p-3 font-mono text-[9px] text-muted-foreground/60 break-all select-all">
            {credential.pda}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            className="flex-1 h-12 text-[10px] font-black uppercase tracking-[0.2em] border-white/10"
            onClick={() => window.open(`https://explorer.solana.com/address/${credential.pda}?cluster=devnet`, '_blank')}
          >
            Explorer
          </Button>
          <Button
            className="flex-1 h-12 text-[10px] font-black uppercase tracking-[0.2em]"
            onClick={handleShare}
          >
            Share Proof
          </Button>
        </div>
      </div>
    </Modal>
  );
}