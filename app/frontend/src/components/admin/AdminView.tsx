"use client";

import { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { fetchAllIssuers, addIssuer, toggleIssuer } from "@/lib/issuer";
import { IssuerAccount } from "@/lib/types";
import { PublicKey } from "@solana/web3.js";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { shortenAddress } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/useToast";

export default function AdminView() {
    const wallet = useAnchorWallet();
    const { showToast } = useToast();
    const [issuers, setIssuers] = useState<Array<{ publicKey: PublicKey; account: IssuerAccount }>>([]);
    const [newIssuerPubkey, setNewIssuerPubkey] = useState("");
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const loadIssuers = async () => {
        setLoading(true);
        const data = await fetchAllIssuers();
        setIssuers(data);
        setLoading(false);
    };

    useEffect(() => {
        loadIssuers();
    }, []);

    const handleAddIssuer = async () => {
        if (!wallet || !newIssuerPubkey) return;
        try {
            setActionLoading("adding");
            const pubkey = new PublicKey(newIssuerPubkey);
            await addIssuer(wallet as any, pubkey);
            showToast("Issuer added successfully!");
            setNewIssuerPubkey("");
            await loadIssuers();
        } catch (err: any) {
            console.error("Failed to add issuer:", err);
            showToast(err.message || "Error adding issuer", "error");
        } finally {
            setActionLoading(null);
        }
    };

    const handleToggle = async (issuerPubkey: PublicKey, currentStatus: boolean) => {
        if (!wallet) return;
        try {
            setActionLoading(issuerPubkey.toBase58());
            await toggleIssuer(wallet as any, issuerPubkey, !currentStatus);
            showToast(`Issuer ${currentStatus ? 'deactivated' : 'activated'}!`);
            await loadIssuers();
        } catch (err: any) {
            console.error("Failed to toggle issuer:", err);
            showToast(err.message || "Failed to toggle issuer", "error");
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Issuer Management</h2>
                <div className="flex gap-4">
                    <input
                        value={newIssuerPubkey}
                        onChange={(e) => setNewIssuerPubkey(e.target.value)}
                        placeholder="Issuer Wallet Address"
                        className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button
                        onClick={handleAddIssuer}
                        disabled={!newIssuerPubkey || !!actionLoading}
                    >
                        {actionLoading === "adding" ? "Adding..." : "Add Issuer"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
                        ))
                    ) : issuers.length === 0 ? (
                        <p className="col-span-full text-center text-muted-foreground py-10">No issuers registered.</p>
                    ) : (
                        issuers.map((item) => (
                            <motion.div
                                key={item.publicKey.toBase58()}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <Card className="p-5 space-y-4">
                                    {(() => {
                                        const account = item.account as any;
                                        const isActive = account.is_active !== undefined ? account.is_active : account.isActive;
                                        const issuerPubkey = account.issuer;
                                        const timestamp = account.added_at || account.addedAt;

                                        return (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <Badge variant={isActive ? "default" : "secondary"}>
                                                        {isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/40">
                                                        {(() => {
                                                            if (!timestamp) return 'N/A';
                                                            try {
                                                                const val = typeof timestamp === 'object' ? timestamp.toNumber() : Number(timestamp);
                                                                return new Date(val * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                                                            } catch (e) {
                                                                return 'N/A';
                                                            }
                                                        })()}
                                                    </span>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-bold truncate">{issuerPubkey?.toBase58 ? issuerPubkey.toBase58() : issuerPubkey}</p>
                                                    <p className="text-xs text-muted-foreground">Issuer Account</p>
                                                </div>

                                                <Button
                                                    variant={isActive ? "outline" : "primary"}
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => handleToggle(issuerPubkey, isActive)}
                                                    disabled={!!actionLoading}
                                                >
                                                    {actionLoading === (issuerPubkey?.toBase58 ? issuerPubkey.toBase58() : issuerPubkey)
                                                        ? "Updating..."
                                                        : isActive ? "Deactivate" : "Activate"}
                                                </Button>
                                            </>
                                        );
                                    })()}
                                </Card>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
