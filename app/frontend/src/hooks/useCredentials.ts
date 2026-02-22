import { useState, useEffect, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";
import { fetchCredentialsForSubject } from "@/lib/credentials";
import { CredentialAccount } from "@/lib/types";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

type CredentialWithKey = {
  publicKey: PublicKey;
  account: CredentialAccount;
};

export const useCredentials = (subjectPubkey?: PublicKey) => {
  const wallet = useAnchorWallet();

  const [credentials, setCredentials] = useState<CredentialWithKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCredentials = useCallback(async () => {
    const target = subjectPubkey ?? wallet?.publicKey;
    if (!target) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // ✅ NO wallet passed
      const data = await fetchCredentialsForSubject(target);
      setCredentials(data);
    } catch (err) {
      console.error("Failed to load credentials:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [subjectPubkey, wallet?.publicKey]);

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