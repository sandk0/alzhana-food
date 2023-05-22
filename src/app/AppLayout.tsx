"use client";

import { NavMenu } from "@/components/navmenu/navmenu";
import { AppProvider } from "@/lib/appctx";
import { usePathname } from "next/navigation";
import React from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <AppProvider>
      {children}
      {!path.startsWith("/dashboard") && <NavMenu />}
    </AppProvider>
  );
}
