"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function GAInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    window.gtag("config", GA_ID, { page_path: url });
  }, [pathname, searchParams, GA_ID]);

  return null;
}

export default function GAListener() {
  return (
    <Suspense fallback={null}>
      <GAInner />
    </Suspense>
  );
}
