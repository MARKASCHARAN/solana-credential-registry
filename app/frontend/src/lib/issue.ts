import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram } from "./anchor";
import { getIssuerPda, getCredentialPda } from "./pdas";
import type { Wallet } from "@coral-xyz/anchor";

/**
 * Issues a new credential to a subject.
 * 
 * @param issuerWallet - The wallet of the authorized issuer.
 * @param subject - The pubkey of the recipient.
 * @param credentialType - The string type of the credential (e.g. "ENGINEER").
 * @param metadataUri - Link to external metadata details.
 */
export const issueCredential = async (
    issuerWallet: Wallet,
    subject: PublicKey,
    credentialType: string,
    metadataUri: string
): Promise<string> => {
    const program = getProgram(issuerWallet);

    const [issuerAccountPda] = getIssuerPda(issuerWallet.publicKey);
    const [credentialPda] = getCredentialPda(
        issuerWallet.publicKey,
        subject,
        credentialType
    );

    return await (program.methods as any)
        .issueCredential(credentialType, metadataUri)
        .accounts({
            credential: credentialPda,
            issuerAccount: issuerAccountPda,
            issuer: issuerWallet.publicKey,
            subject: subject,
            systemProgram: SystemProgram.programId,
        } as any)
        .rpc();
};
