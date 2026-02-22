import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

// IDL types are generated only during SBF build.
// For local logic tests and interviews, we intentionally use `any`.
type SolanaCredentialRegistry = any;

describe("solana-credential-registry", () => {
  // Provider & program setup
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .SolanaCredentialRegistry as Program<SolanaCredentialRegistry>;

  // Actors
  const admin = provider.wallet; // provider wallet acts as admin
  const user = anchor.web3.Keypair.generate();
  const issuer = anchor.web3.Keypair.generate();

  // -----------------------------
  // PDA helpers (SYNC – correct)
  // -----------------------------

  const findProfilePda = (authority: anchor.web3.PublicKey) => {
    return anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("profile"), authority.toBuffer()],
      program.programId
    );
  };

  const findIssuerPda = (issuerPk: anchor.web3.PublicKey) => {
    return anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("issuer"), issuerPk.toBuffer()],
      program.programId
    );
  };

  const findCredentialPda = (
    issuerPk: anchor.web3.PublicKey,
    subjectPk: anchor.web3.PublicKey,
    credentialType: string
  ) => {
    return anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("credential"),
        issuerPk.toBuffer(),
        subjectPk.toBuffer(),
        Buffer.from(credentialType),
      ],
      program.programId
    );
  };

  // -----------------------------
  // Tests
  // -----------------------------

  it("Airdrops SOL to user and issuer", async () => {
    for (const kp of [user, issuer]) {
      const sig = await provider.connection.requestAirdrop(
        kp.publicKey,
        2 * anchor.web3.LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(sig);
    }
  });

  it("Initializes user profile", async () => {
    const [profilePda] = findProfilePda(user.publicKey);

    await program.methods
      .initializeProfile(
        "charan",
        "Solana builder",
        "ipfs://profile-metadata"
      )
      .accounts({
        profile: profilePda,
        authority: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    const profile = await (program.account as any).profile.fetch(profilePda);

    assert.equal(
      profile.authority.toBase58(),
      user.publicKey.toBase58()
    );
    assert.equal(profile.username, "charan");
  });

  it("Admin adds issuer", async () => {
    const [issuerPda] = findIssuerPda(issuer.publicKey);

    await program.methods
      .addIssuer()
      .accounts({
        issuerAccount: issuerPda,
        issuer: issuer.publicKey,
        admin: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      // admin (provider.wallet) is auto-signed by Anchor
      .signers([issuer])
      .rpc();

    const issuerAccount = await (program.account as any).issuer.fetch(issuerPda);
    assert.isTrue(issuerAccount.isActive);
  });

  it("Issuer issues credential to user", async () => {
    const credentialType = "DEV";

    const [credentialPda] = findCredentialPda(
      issuer.publicKey,
      user.publicKey,
      credentialType
    );

    const [issuerPda] = findIssuerPda(issuer.publicKey);

    await program.methods
      .issueCredential(credentialType, "ipfs://credential-metadata")
      .accounts({
        credential: credentialPda,
        issuerAccount: issuerPda,
        issuer: issuer.publicKey,
        subject: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([issuer])
      .rpc();

    const credential = await (program.account as any).credential.fetch(credentialPda);

    assert.equal(
      credential.subject.toBase58(),
      user.publicKey.toBase58()
    );
    assert.equal(credential.credentialType, credentialType);
  });
});