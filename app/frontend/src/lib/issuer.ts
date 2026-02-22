import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram, getReadonlyProgram } from "./anchor";
import { getIssuerPda } from "./pdas";
import { IssuerAccount } from "./types";
import type { Wallet } from "@coral-xyz/anchor";

/**
 * Fetches an issuer account for a given wallet.
 */
export const fetchIssuer = async (
    issuerPubkey: PublicKey,
    wallet?: Wallet
): Promise<IssuerAccount | null> => {
    const program = getProgram(wallet);
    const [issuerPda] = getIssuerPda(issuerPubkey);

    try {
        const accountNamespace = program.account as any;
        const issuerAccount = accountNamespace.Issuer || accountNamespace.issuer;
        return await issuerAccount.fetchNullable(issuerPda);
    } catch (error) {
        console.error("Error fetching issuer:", error);
        return null;
    }
};

/**
 * Fetches all registered issuers on the platform.
 */
export const fetchAllIssuers = async (): Promise<Array<{ publicKey: PublicKey; account: IssuerAccount }>> => {
    const program = getReadonlyProgram();
    try {
        const accountNamespace = program.account as any;
        const issuerAccount = accountNamespace.Issuer || accountNamespace.issuer;
        return await issuerAccount.all();
    } catch (error) {
        console.error("Error fetching all issuers:", error);
        return [];
    }
};

/**
 * Adds a new issuer (Admin only).
 */
export const addIssuer = async (
    adminWallet: Wallet,
    issuerPubkey: PublicKey
): Promise<string> => {
    const program = getProgram(adminWallet);
    const [issuerAccountPda] = getIssuerPda(issuerPubkey);

    return await (program.methods as any)
        .addIssuer()
        .accounts({
            issuerAccount: issuerAccountPda,
            issuer: issuerPubkey,
            admin: adminWallet.publicKey,
            systemProgram: SystemProgram.programId,
        } as any)
        .rpc();
};

/**
 * Toggles an issuer's active status (Admin only).
 */
export const toggleIssuer = async (
    adminWallet: Wallet,
    issuerPubkey: PublicKey,
    isActive: boolean
): Promise<string> => {
    const program = getProgram(adminWallet);
    const [issuerAccountPda] = getIssuerPda(issuerPubkey);

    return await (program.methods as any)
        .toggleIssuer(isActive)
        .accounts({
            issuerAccount: issuerAccountPda,
            admin: adminWallet.publicKey,
        } as any)
        .rpc();
};
