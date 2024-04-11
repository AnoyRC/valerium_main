"use client";

import { useEffect } from "react";
import useWallet from "@/hooks/useWallet";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function WalletProvider({ children }) {
  var currentTimeout = null;
  const { loadAllData, loadTokenData, loadPublicStorage } = useWallet();
  const searchParams = useSearchParams();
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);

  useEffect(() => {
    const domain = searchParams.get("domain");
    if (domain) {
      loadAllData(domain + ".valerium.id");
      loadTokenData(domain + ".valerium.id");
    }
  }, [currentChain]);

  useEffect(() => {
    if (currentChain && walletAddresses) {
      loadPublicStorage(currentChain, walletAddresses);
    }
  }, [currentChain, walletAddresses]);

  useEffect(() => {
    currentTimeout = setInterval(() => {
      const domain = searchParams.get("domain");
      if (domain) {
        loadTokenData(domain + ".valerium.id");
      }
    }, 10000);

    return () => {
      clearInterval(currentTimeout);
    };
  }, []);

  return <>{children}</>;
}
