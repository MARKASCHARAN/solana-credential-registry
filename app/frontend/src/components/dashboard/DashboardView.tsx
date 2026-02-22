"use client";

import { motion, AnimatePresence } from "framer-motion";
import WalletStatus from "../wallet/WalletStatus";
import ProfileCard from "../profile/ProfileCard";
import CredentialList from "../credential/CredentialList";
import CreateProfile from "../profile/CreateProfile";
import { useProfile } from "@/hooks/useProfile";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useIsAdmin, useIssuerStatus } from "@/hooks/useRoles";
import AdminView from "../admin/AdminView";
import IssueCredentialView from "../issuer/IssueCredentialView";
import { fadeInUp, staggerContainer } from "@/animations/cardMotion";

type Tab = "dashboard" | "admin" | "issue";

export default function DashboardView() {
    const [mounted, setMounted] = useState(false);
    const { profile, loading: profileLoading, status, refetch } = useProfile();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");

    const isAdmin = useIsAdmin();
    const { isActive: isIssuer } = useIssuerStatus();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="mx-auto max-w-7xl px-4 md:px-6 py-20 space-y-12 animate-pulse">
                <div className="h-16 w-48 bg-white/5 rounded-2xl" />
                <div className="h-64 w-full bg-white/5 rounded-[2.5rem]" />
            </div>
        );
    }

    const tabs = [
        { id: "dashboard", label: "Identity", show: true },
        { id: "issue", label: "Issuance", show: isIssuer || isAdmin },
        { id: "admin", label: "Governance", show: isAdmin }
    ].filter(t => t.show);

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20 space-y-12 md:space-y-20 overflow-hidden"
        >
            {/* Background Glows Refined */}
            <div className="premium-blur top-[15%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5" />
            <div className="premium-blur bottom-[15%] right-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-secondary/5" />

            {/* Header Section - Refined for Mobile */}
            <motion.div variants={fadeInUp} className="space-y-10 md:space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
                    <div className="space-y-4">
                        <div className="glass px-4 py-1.5 rounded-full w-fit">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">System Dashboard</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                            Protocol <br className="hidden md:block" /> Operations
                        </h1>
                    </div>

                    {/* Centered/Balanced Wallet Status */}
                    <div className="glass p-4 rounded-3xl border-white/5 shadow-xl md:mb-2">
                        <WalletStatus />
                    </div>
                </div>

                {/* Tab Navigation - Liquid Design */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
                    <div className="glass p-1.5 rounded-2xl flex flex-wrap items-center gap-1 shadow-inner relative z-10">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.id}
                                variant={activeTab === tab.id ? "primary" : "ghost"}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex-1 sm:flex-none ${activeTab === tab.id ? "shadow-lg shadow-primary/20 bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white"
                                    }`}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-4 text-muted-foreground/40">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Network Authority</span>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-primary" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.99, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.01, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                >
                    {activeTab === "dashboard" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                            {/* Left Pane: Identity */}
                            <div className="lg:col-span-4 space-y-10">
                                <div className="flex items-center gap-3">
                                    <div className="h-1 w-8 bg-primary rounded-full" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Registry Profile</h2>
                                </div>

                                {profileLoading ? (
                                    <div className="h-[300px] w-full animate-pulse rounded-[2.5rem] bg-white/5 border border-white/5" />
                                ) : status === "exists" && profile ? (
                                    <ProfileCard
                                        username={profile.username}
                                        bio={profile.bio}
                                        authority={profile.authority.toBase58()}
                                        isIssuer={isIssuer}
                                    />
                                ) : (
                                    <div className="glass-card p-10 rounded-[2.5rem] border-dashed text-center space-y-8 group hover:border-primary/40 transition-all duration-500">
                                        <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto border border-white/5 group-hover:scale-110 transition-transform">
                                            <svg className="w-10 h-10 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">No Identity Detected</h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed max-w-[240px] mx-auto">
                                                To engage with the protocol registry, you must first initialize your on-chain node.
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => setIsCreateModalOpen(true)}
                                            className="w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-primary/20"
                                        >
                                            Initialize Protocol Node
                                        </Button>
                                    </div>
                                )}

                                <div className="glass p-8 rounded-[2rem] space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Infrastructure Status</h4>
                                    <div className="flex items-center justify-between text-xs font-mono">
                                        <span className="text-muted-foreground">Mainnet RPC</span>
                                        <span className="text-primary font-bold">CONNECTED</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full" />
                                </div>
                            </div>

                            {/* Right Pane: Inventory */}
                            <div className="lg:col-span-8 space-y-10">
                                <div className="flex items-center gap-3">
                                    <div className="h-1 w-8 bg-secondary rounded-full" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">On-Chain Asset Inventory</h2>
                                </div>
                                <div className="min-h-[400px]">
                                    <CredentialList />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "issue" && (
                        <div className="glass-card rounded-[3rem] p-6 md:p-12 overflow-hidden border-primary/10">
                            <IssueCredentialView />
                        </div>
                    )}

                    {activeTab === "admin" && (
                        <div className="glass-card rounded-[3rem] p-6 md:p-12 overflow-hidden border-secondary/10">
                            <AdminView />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Modal On-Top */}
            <CreateProfile
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={refetch}
            />
        </motion.div>
    );
}
