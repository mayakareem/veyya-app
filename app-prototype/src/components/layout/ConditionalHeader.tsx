"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Don't show SiteHeader on provider pages
  // Provider pages have their own ProviderHeader
  if (pathname?.startsWith("/providers")) {
    return null;
  }

  return <SiteHeader />;
}
