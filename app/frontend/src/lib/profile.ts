import { PublicKey } from "@solana/web3.js";
import { getProgram } from "./anchor";
import { getProfilePda } from "./pdas";
import { ProfileAccount } from "./types";
import type { Wallet } from "@coral-xyz/anchor";

/**
 * Fetches matching profile for a given authority.
 * Optimized for both public and authenticated views.
 */
export const fetchProfileByAuthority = async (
    authority: PublicKey,
    wallet?: Wallet
): Promise<ProfileAccount | null> => {
    const program = getProgram(wallet);
    const [profilePda] = getProfilePda(authority);

    try {
        const accountNamespace = program.account as any;
        const profileAccount = accountNamespace.Profile || accountNamespace.profile;

        if (!profileAccount) return null;

        return await profileAccount.fetchNullable(profilePda);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
};

/**
 * Legacy wrapper for compatibility if needed.
 */
export const fetchProfile = fetchProfileByAuthority;
