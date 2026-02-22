import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "./constants";

/**
 * Derives the PDA for a user's Profile account.
 * Seed: ["profile", authority]
 */
export const getProfilePda = (authority: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("profile"), authority.toBuffer()],
        PROGRAM_ID
    );
};

/**
 * Derives the PDA for an Issuer account.
 * Seed: ["issuer", issuer_pubkey]
 */
export const getIssuerPda = (issuer: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("issuer"), issuer.toBuffer()],
        PROGRAM_ID
    );
};

/**
 * Derives the PDA for a specific Credential.
 * Seed: ["credential", issuer, subject, credential_type]
 */
export const getCredentialPda = (
    issuer: PublicKey,
    subject: PublicKey,
    credentialType: string
) => {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from("credential"),
            issuer.toBuffer(),
            subject.toBuffer(),
            Buffer.from(credentialType),
        ],
        PROGRAM_ID
    );
};
