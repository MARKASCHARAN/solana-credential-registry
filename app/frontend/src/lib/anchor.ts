import * as anchor from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import type { Wallet } from "@coral-xyz/anchor";
import { RPC_URL, PROGRAM_ID } from "./constants";
import { IDL } from "./idl";
import { SolanaCredentialRegistry } from "./types";

/* ---------------------------
   Shared connection
---------------------------- */
export const connection = new Connection(RPC_URL, "confirmed");

/**
 * Returns a typed Anchor Program instance for the registry.
 * If a wallet is provided, it returns a program with a provider that can sign transactions.
 * Otherwise, it returns a readonly program instance.
 */
export const getProgram = (wallet?: Wallet): anchor.Program<SolanaCredentialRegistry> => {
  const idl = IDL as any as SolanaCredentialRegistry;

  if (wallet) {
    const provider = new anchor.AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
    return new anchor.Program(idl, provider);
  }

  return new anchor.Program(idl, {
    connection,
  });
};

/**
 * Type-safe access to the Program type
 */
export type RegistryProgram = anchor.Program<SolanaCredentialRegistry>;

/* ---------------------------
   READONLY program (public)
   Used for:
   - verify credential
   - public views
---------------------------- */
export const getReadonlyProgram = (): anchor.Program<SolanaCredentialRegistry> => {
  const idl = IDL as any as SolanaCredentialRegistry;
  return new anchor.Program(idl, {
    connection,
  });
};