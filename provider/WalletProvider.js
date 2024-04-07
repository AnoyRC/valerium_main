"use client";

import { useEffect } from "react";
import useWallet from "@/hooks/useWallet";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function WalletProvider({ children }) {
  var currentTimeout = null;
  const { loadAllData, loadCurrentChainData, loadTokenData } = useWallet();
  const searchParams = useSearchParams();
  const currentChain = useSelector((state) => state.chain.currentChain);

  useEffect(() => {
    const domain = searchParams.get("domain");
    if (domain) {
      loadCurrentChainData(domain + "@valerium");
      loadTokenData(domain + "@valerium");
      loadAllData(domain + "@valerium");
    }
  }, [currentChain]);

  useEffect(() => {
    currentTimeout = setInterval(() => {
      const domain = searchParams.get("domain");
      if (domain) {
        loadCurrentChainData(domain + "@valerium");
        loadTokenData(domain + "@valerium");
        loadAllData(domain + "@valerium");
      }
    }, 10000);

    return () => {
      clearInterval(currentTimeout);
    };
  }, []);

  return <>{children}</>;
}
