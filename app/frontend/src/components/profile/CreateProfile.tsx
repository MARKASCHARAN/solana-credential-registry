"use client";

import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "@/lib/anchor";
import { getProfilePda } from "@/lib/pdas";
import { SystemProgram } from "@solana/web3.js";
import { RegistryProgram } from "@/lib/anchor";
import { useToast } from "@/hooks/useToast";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function CreateProfile({ open, onClose, onSuccess }: Props) {
  const wallet = useAnchorWallet();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = username.trim().length > 0 && !!wallet;

  const handleSubmit = async () => {
    if (!wallet || !canSubmit) return;

    try {
      setLoading(true);
      setError(null);

      // Using cast to any for the wallet as AnchorWallet and NodeWallet have slight discrepancies in some versions
      const program = getProgram(wallet as any) as RegistryProgram;
      const [profilePda] = getProfilePda(wallet.publicKey);

      // Call the initialize_profile instruction
      // Note: Current IDL naming suggests snake_case for methods and args
      const tx = await (program.methods as any)
        .initializeProfile(
          username,
          bio,
          "https://example.com/metadata" // placeholder metadata_uri
        )
        .accounts({
          profile: profilePda,
          authority: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        } as any) // Type safe enough with the instruction call
        .rpc();

      console.log("Profile created! Transaction:", tx);
      showToast("Profile created successfully!");

      if (onSuccess) {
        await onSuccess();
      }
      onClose();
    } catch (err: any) {
      console.error("Failed to create profile:", err);
      const msg = err.message || "";
      const isCancel = msg.includes("User rejected") || msg.includes("Transaction cancelled");
      const displayMsg = isCancel ? "Transaction cancelled." : (msg || "Failed to create profile. Try again.");

      setError(displayMsg);
      if (!isCancel) showToast(displayMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Create On-Chain Profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your profile is a permanent on-chain identity.
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="charan"
              disabled={loading}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Solana builder, hackathon winner..."
              rows={3}
              disabled={loading}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            disabled={!canSubmit || loading}
            onClick={handleSubmit}
            className="min-w-[120px]"
          >
            {loading ? "Creating..." : "Create Profile"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}