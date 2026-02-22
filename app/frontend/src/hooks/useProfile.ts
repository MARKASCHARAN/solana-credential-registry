import { useState, useEffect, useCallback, useMemo } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { fetchProfile } from "@/lib/profile";
import { getProfilePda } from "@/lib/pdas";
import { ProfileAccount } from "@/lib/types";

export type ProfileStatus = "loading" | "not_created" | "exists" | "error";

export const useProfile = () => {
    const wallet = useAnchorWallet();
    const [profile, setProfile] = useState<ProfileAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<ProfileStatus>("loading");
    const [error, setError] = useState<Error | null>(null);

    // Memoize the PDA derivation based on the connected wallet
    const pda = useMemo(() => {
        if (!wallet?.publicKey) return null;
        const [profilePda] = getProfilePda(wallet.publicKey);
        return profilePda;
    }, [wallet?.publicKey]);

    const loadProfile = useCallback(async () => {
        if (!wallet?.publicKey) {
            setLoading(false);
            setStatus("not_created");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await fetchProfile(wallet.publicKey, wallet);

            setProfile(data);
            setStatus(data ? "exists" : "not_created");
        } catch (err) {
            console.error("Failed to load profile:", err);
            setError(err instanceof Error ? err : new Error("Unknown error"));
            setStatus("error");
        } finally {
            setLoading(false);
        }
    }, [wallet]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return {
        profile,
        pda,
        loading,
        status,
        error,
        refetch: loadProfile,
    };
};
