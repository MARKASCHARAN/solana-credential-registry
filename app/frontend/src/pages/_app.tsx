import type { AppProps } from "next/app";
import Head from "next/head";
import { AppWalletProvider } from "../components/WalletProvider";
import { ToastProvider } from "../hooks/useToast";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Solana Credential Registry | Immutable Reputation</title>
        <meta name="description" content="An on-chain, verifiable credential system on Solana. Secure your digital reputation forever." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppWalletProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </AppWalletProvider>
    </>
  );
}