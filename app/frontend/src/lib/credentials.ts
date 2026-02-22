import { PublicKey } from "@solana/web3.js";
import { getProgram } from "./anchor";
import { CredentialAccount } from "./types";
import type { Wallet } from "@coral-xyz/anchor";

/**
 * Constants for Credential account layout
 * Anchor Discriminator: 8 bytes
 * Issuer (Pubkey): 32 bytes
 * Subject (Pubkey): 32 bytes (starts at offset 40)
 */
export const CREDENTIAL_SUBJECT_OFFSET = 40;

/**
 * Fetches all credentials issued to a specific subject (user).
 * Uses memcmp filter to query on-chain data directly.
 * 
 * @param subject - The wallet public key of the credential receiver.
 * @param wallet - Optional wallet for signed requests (not strictly needed for fetching).
 */
export const fetchCredentialsForSubject = async (
    subject: PublicKey,
    wallet?: Wallet
): Promise<Array<{ publicKey: PublicKey; account: CredentialAccount }>> => {
    const program = getProgram(wallet);

    try {
        const accountNamespace = program.account as any;
        const credentialAccount = accountNamespace.Credential || accountNamespace.credential;

        if (!credentialAccount) {
            throw new Error("Credential account namespace not found in program.account");
        }

        // program.account.Credential.all uses getProgramAccounts with memcmp filter
        const credentials = await credentialAccount.all([
            {
                memcmp: {
                    offset: CREDENTIAL_SUBJECT_OFFSET,
                    bytes: subject.toBase58(),
                },
            },
        ]);

        return credentials;
    } catch (error) {
        console.error("Error fetching credentials:", error);
        throw error;
    }
};
