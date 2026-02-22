"use client";

import dynamic from "next/dynamic";

// 👇 disable SSR for wallet button
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function WalletStatus() {
  return (
    <div className="flex items-center gap-4">
      <WalletMultiButton className="!bg-primary !text-primary-foreground hover:opacity-90" />
    </div>
  );
}