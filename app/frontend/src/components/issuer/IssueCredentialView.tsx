"use client";

import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { issueCredential } from "@/lib/issue";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";

export default function IssueCredentialView() {
    const wallet = useAnchorWallet();
    const { showToast } = useToast();
    const [subject, setSubject] = useState("");
    const [type, setType] = useState("");
    const [metadata, setMetadata] = useState("https://arweave.net/...");
    const [loading, setLoading] = useState(false);
    const [txId, setTxId] = useState<string | null>(null);

    const handleIssue = async () => {
        if (!wallet || !subject || !type) return;

        try {
            setLoading(true);
            setTxId(null);

            const subjectPubkey = new PublicKey(subject);
            const signature = await issueCredential(wallet as any, subjectPubkey, type, metadata);

            showToast("Credential issued successfully!");
            console.log("Credential issued!", signature);
            setTxId(signature);

            // Reset form
            setSubject("");
            setType("");
        } catch (err: any) {
            console.error("Issuance failed:", err);
            showToast(err.message || "Failed to issue credential", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-8 max-w-2xl mx-auto space-y-8 bg-card/30 backdrop-blur-sm border-primary/10">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Issue New Credential</h2>
                <p className="text-muted-foreground">Certified on-chain proof of reputation.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Subject Wallet Address</label>
                    <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Recipient Solana Address"
                        className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Credential Type</label>
                    <input
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="e.g. CORE_DEVELOPER, HACKATHON_WINNER"
                        className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Metadata URI (Arweave/IPFS)</label>
                    <input
                        value={metadata}
                        onChange={(e) => setMetadata(e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <Button
                className="w-full h-12 text-lg font-bold"
                onClick={handleIssue}
                disabled={loading || !subject || !type}
            >
                {loading ? "Issuing Proof..." : "Sign & Issue Credential"}
            </Button>

            <motion.div
                animate={txId ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                className="overflow-hidden"
            >
                {txId && (
                    <div className="mt-6 rounded-lg bg-green-500/10 p-4 border border-green-500/20 text-center">
                        <p className="text-sm font-medium text-green-500">Credential successfully issued!</p>
                        <a
                            href={`https://explorer.solana.com/tx/${txId}?cluster=devnet`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-xs text-primary underline truncate max-w-full"
                        >
                            View Transaction: {txId}
                        </a>
                    </div>
                )}
            </motion.div>
        </Card>
    );
}
