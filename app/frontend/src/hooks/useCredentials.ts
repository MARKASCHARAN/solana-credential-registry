import { useState, useEffect, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";
import { fetchCredentialsForSubject } from "@/lib/credentials";
import { CredentialAccount } from "@/lib/types";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export const useCredentials = (subjectPubkey?: PublicKey) => {
    const wallet = useAnchorWallet();
    const [credentials, setCredentials] = useState<Array<{ publicKey: PublicKey; account: CredentialAccount }>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const loadCredentials = useCallback(async () => {
        // We need a subject to fetch for. If not provided, we check for a connected wallet.
        const target = subjectPubkey || wallet?.publicKey;

        if (!target) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await fetchCredentialsForSubject(target, wallet);
            setCredentials(data);
        } catch (err) {
            console.error("Failed to load credentials:", err);
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    }, [subjectPubkey, wallet]);

    useEffect(() => {
        loadCredentials();
    }, [loadCredentials]);

    return {
        credentials,
        loading,
        error,
        refetch: loadCredentials,
    };
};
