import { PublicKey } from "@solana/web3.js";
import { IdlAccounts } from "@coral-xyz/anchor";
import { IDL } from "./idl";

// Helper to remove readonly recursively
type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>;
};

// Ensure the type satisfies the base Idl constraint while keeping our strict literal structure
export type SolanaCredentialRegistry = DeepMutable<typeof IDL>;

export type ProfileAccount = IdlAccounts<SolanaCredentialRegistry>["Profile"];
export type IssuerAccount = IdlAccounts<SolanaCredentialRegistry>["Issuer"];
export type CredentialAccount = IdlAccounts<SolanaCredentialRegistry>["Credential"];

export interface Profile {
  authority: PublicKey;
  username: string;
  bio: string;
  metadata_uri: string;
  created_at: number;
  bump: number;
}

export interface Issuer {
  issuer: PublicKey;
  is_active: boolean;
  added_at: number;
  bump: number;
}

export interface Credential {
  issuer: PublicKey;
  subject: PublicKey;
  credential_type: string;
  metadata_uri: string;
  issued_at: number;
  bump: number;
}