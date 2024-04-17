"use client";

import { Button } from "@material-tailwind/react";

import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import config from "@/lib/config";
import useWallet from "@/hooks/useWallet";

const ChainSwitcherShort = () => {
  const [active, setActive] = useState(false);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const { switchChain } = useWallet();

  return (
    <li className="relative">
      <div className="h-full">
        <Button
          className="flex h-full items-center gap-3 rounded-full border border-border-light bg-gradient-light-linear/85 px-4 py-2 font-noto font-bold"
          color="white"
          onClick={() => {
            setActive(!active);
          }}
        >
          <Image
            src={`/tokens/${currentChain.style.logo}`}
            width={20}
            height={20}
            alt={
              currentChain.chainName
                ? currentChain.chainName + " Logo"
                : "Chain Logo"
            }
          />

          {currentChain.chainName}

          <ChevronDown size={16} />
        </Button>
      </div>

      <div
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-2xl border-border-light bg-gradient-light-linear/85 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        style={{ display: active ? "block" : "none" }}
      >
        {config.map((chain) =>
          chain.chainId === currentChain.chainId ? null : (
            <div
              className="block rounded-2xl px-4 py-3 text-sm text-gray-700 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              onClick={() => {
                switchChain(chain.chainId);
                setActive(false);
              }}
              key={chain.chainId}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`/tokens/${chain.style.logo}`}
                  width={20}
                  height={20}
                  alt={
                    chain.chainName ? chain.chainName + " Logo" : "Chain Logo"
                  }
                />

                <p className="font-bold capitalize">{chain.chainName}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </li>
  );
};

export default ChainSwitcherShort;
