"use client";
import { ChevronRight } from "lucide-react";

import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CopyButton from "../ui/buttons/CopyButton";

import { compressEthAddress } from "@/utils/pubKey";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ChainSwitcher = () => {
  const [address, setAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (currentChain && walletAddresses) {
      const walletAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      );

      if (walletAddress) {
        setAddress(walletAddress.address);
      }
    }
  }, [currentChain, walletAddresses]);

  return (
    <section
      className="flex cursor-pointer items-center gap-8 rounded-lg border border-border-light px-2 py-2.5 shadow-sm"
      style={{
        color: currentChain.style.baseTextColor,
        background: currentChain.style.gradientColorLight,
      }}
      onClick={() => {
        router.push(
          `/network?domain=${searchParams.get("domain")?.toLowerCase()}`
        );
      }}
    >
      <div className="flex">
        <div className="mr-2 h-9 w-9 rounded-full border border-black">
          <Image
            src={`/tokens/${currentChain.style.logo}`}
            width={36}
            height={36}
            alt={
              currentChain.chainName
                ? currentChain.chainName + " Logo"
                : "Chain Logo"
            }
          />
        </div>

        <div>
          <div className="flex items-center gap-1 text-xs">
            <p>{compressEthAddress(address, 8, 4)}</p>

            <CopyButton text={address} />
          </div>

          <p className="text-sm font-bold">{currentChain.chainName}</p>
        </div>
      </div>

      <ChevronRight size={20} />
    </section>
  );
};

export default ChainSwitcher;
