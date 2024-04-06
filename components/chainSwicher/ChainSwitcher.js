"use client";
import { ChevronRight, Copy } from "lucide-react";
import Image from "next/image";

import { compressEthAddress } from "@/utils/pubKey";
import CopyButton from "../ui/buttons/CopyButton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChainSwitcher = () => {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const [address, setAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const walletAddresses = useSelector((state) => state.user.walletAddresses);

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
    <section className="flex items-center bg-linear-blue px-2 py-2.5 rounded-lg text-white cursor-pointer gap-8 border border-light">
      <div className="flex">
        <div className="mr-2">
          <Image
            src={"/tokens/base-token.png"}
            width={36}
            height={36}
            alt="Base Logo"
          />
        </div>

        <div>
          <div className="flex text-xs items-center gap-1">
            <p>{compressEthAddress(address, 8, 4)}</p>

            <CopyButton text={address} />
          </div>

          <p className="text-sm font-bold">BASE</p>
        </div>
      </div>

      <ChevronRight size={20} />
    </section>
  );
};

export default ChainSwitcher;
