"use client";

import { useEffect } from "react";
import useWallet from "@/hooks/useWallet";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setGasCredit,
  setTokenBalanceData,
  setTokenConversionData,
} from "@/redux/slice/UserSlice";

export default function WalletProvider({ children }) {
  var currentTimeout = null;
  const {
    loadAllData,
    loadTokenData,
    loadPublicStorage,
    loadGasCredit,
    getGasUpdates,
  } = useWallet();
  const searchParams = useSearchParams();
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const isDeploying = useSelector((state) => state.proof.isDeploying);
  const dispatch = useDispatch();

  useEffect(() => {
    const domain = searchParams.get("domain")?.toLowerCase();
    if (domain) {
      loadAllData(domain + ".valerium.id");
      loadTokenData(currentChain, domain + ".valerium.id");
      loadGasCredit(domain + ".valerium.id");
    }
  }, [currentChain, isDeploying]);

  useEffect(() => {
    if (currentChain && walletAddresses) {
      loadPublicStorage(currentChain, walletAddresses);
      getGasUpdates();
    }
  }, [currentChain, walletAddresses, isDeploying]);

  useEffect(() => {
    currentTimeout = setInterval(() => {
      const domain = searchParams.get("domain")?.toLowerCase();
      if (domain) {
        loadTokenData(currentChain, domain + ".valerium.id");
        loadGasCredit(domain + ".valerium.id");
      }
    }, 10000);

    return () => {
      dispatch(setTokenBalanceData(null));
      dispatch(setTokenConversionData(null));
      dispatch(setGasCredit(null));
      clearInterval(currentTimeout);
    };
  }, [currentChain]);

  return <>{children}</>;
}
