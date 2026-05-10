"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { FloatingBranding } from "@/components/floating-branding";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SiteHeader />
      {children}
      <SiteFooter />
      <FloatingBranding />
    </div>
  );
}
