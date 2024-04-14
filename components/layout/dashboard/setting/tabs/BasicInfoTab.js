"use client";

import Image from "next/image";
import { Info, SquareArrowOutUpRight } from "lucide-react";

import Alpha from "@/components/ui/Alpha";
import DomainName from "@/components/ui/DomainName";
import CopyButton from "@/components/ui/buttons/CopyButton";

import { useEffect, useState } from "react";
import useWallet from "@/hooks/useWallet";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import ChainItem from "./ChainItem";

// Complete Settings
// Complete Dashboard header
// Network switcher

const BasicInfoTab = () => {
  const [nonce, setNonce] = useState(0);
  const { getNonce } = useWallet();
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNonce = async () => {
      setIsLoading(true);
      const nonce = await getNonce(currentChain, walletAddresses);
      setNonce(nonce);
      setIsLoading(false);
    };

    if (walletAddresses && currentChain) {
      fetchNonce();
    }
  }, [currentChain, walletAddresses]);

  return (
    <section className="mt-4 w-full space-y-8">
      <div className="mx-2 space-y-3">
        <DomainName usernameSize={"20px"} domainSize={"16px"} />

        <div className="flex gap-3 text-5xl font-bold text-black">
          <p>Valerium</p> <Alpha size="text-5xl" />
        </div>
      </div>

      <hr className="border-text-light-gray" />

      <div className="mx-2 space-y-2">
        <h3 className="flex items-center gap-2 text-xl font-medium text-black">
          Valerium Account Nonce:{" "}
          <span>
            <Info size={20} />
          </span>
        </h3>

        <p className="text-base font-normal text-text-gray flex  items-center ">
          Current Nonce:
          <span className="ml-1">
            {isLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              Number(nonce)
            )}
          </span>
        </p>
      </div>

      <hr className="border-text-light-gray" />

      <div className="mx-2 flex gap-4">
        <h3 className="text-xl font-medium text-black">
          Valerium Accounts on Chains:
        </h3>

        <div className="flex-1 items-start space-y-3 text-base">
          <p className="font-normal">
            Your list of every currently deployed Valerium wallets on chains
            with your wallet address and the chain it’s deployed upon.
          </p>

          <table
            className="mt-1 w-full table-fixed border-separate border-spacing-0 text-left"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th className="border-b border-black pb-2">Name</th>
              </tr>
            </thead>

            <tbody>
              {walletAddresses?.map((address, index) => (
                <ChainItem key={index} walletAddress={address} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BasicInfoTab;
