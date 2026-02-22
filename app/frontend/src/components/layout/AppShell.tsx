"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface AppShellProps {
  children: ReactNode;
  noPadding?: boolean;
}

export default function AppShell({ children, noPadding = false }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Universal Grain/Texture Overlay (Optional but premium) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />

      <Navbar />

      <main className={`flex-1 w-full relative z-10 ${noPadding ? "pb-0" : "pt-32 pb-20"}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
}