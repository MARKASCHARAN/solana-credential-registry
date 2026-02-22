import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { ADMIN_PUBKEY } from "@/lib/constants";
import { useState, useEffect } from "react";
import { fetchIssuer } from "@/lib/issuer";
import { IssuerAccount } from "@/lib/types";

/**
 * Hook to check if the current wallet is the system administrator.
 */
export const useIsAdmin = () => {
    const wallet = useAnchorWallet();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (wallet?.publicKey) {
            setIsAdmin(wallet.publicKey.equals(ADMIN_PUBKEY));
        } else {
            setIsAdmin(false);
        }
    }, [wallet]);

    return isAdmin;
};

/**
 * Hook to check if the current wallet is an active issuer.
 */
export const useIssuerStatus = () => {
    const wallet = useAnchorWallet();
    const [issuer, setIssuer] = useState<IssuerAccount | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkIssuer = async () => {
            if (!wallet?.publicKey) {
                setIssuer(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Cast to any to bypass strict AnchorWallet vs NodeWallet interface mismatch
                const data = await fetchIssuer(wallet.publicKey, wallet as any);
                setIssuer(data);
            } catch (err) {
                console.error("Error checking issuer status:", err);
                setIssuer(null);
            } finally {
                setLoading(false);
            }
        };

        checkIssuer();
    }, [wallet]);

    return {
        issuer,
        isActive: (issuer as any)?.is_active || (issuer as any)?.isActive || false,
        loading
    };
};
