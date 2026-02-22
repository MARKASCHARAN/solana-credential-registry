"use client";

import { FC, ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { RPC_URL } from "../lib/constants";
import "@solana/wallet-adapter-react-ui/styles.css";

export const AppWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Wallets that implement Wallet Standard are instantiated automatically.
  // We can pass an empty array here since Phantom supports Wallet Standard.
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};