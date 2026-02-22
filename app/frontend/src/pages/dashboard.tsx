"use client";

import AppShell from "@/components/layout/AppShell";
import DashboardView from "@/components/dashboard/DashboardView";
import Head from "next/head";

export default function Dashboard() {
  return (
    <AppShell>
      <Head>
        <title>Registry Dashboard | Solana Credential Registry</title>
      </Head>
      <DashboardView />
    </AppShell>
  );
}