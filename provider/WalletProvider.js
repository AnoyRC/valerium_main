"use client";

import { useEffect } from "react";
import useWallet from "@/hooks/useWallet";
import { useSearchParams } from "next/navigation";

export default function WalletProvider({ children }) {
  var currentTimeout = null;
  const { loadAllData } = useWallet();
  const searchParams = useSearchParams();

  useEffect(() => {
    const domain = searchParams.get("domain");
    if (domain) {
      loadAllData(domain + "@valerium");
    }
  }, []);

  useEffect(() => {
    currentTimeout = setInterval(() => {
      const domain = searchParams.get("domain");
      if (domain) {
        loadAllData(domain + "@valerium");
      }
    }, 10000);

    return () => {
      clearInterval(currentTimeout);
    };
  }, []);

  return <>{children}</>;
}
