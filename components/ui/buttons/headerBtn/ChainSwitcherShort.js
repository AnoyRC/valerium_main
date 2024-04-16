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
    <li class="relative">
      <div className="h-full">
        <Button
          className="flex items-center gap-3 h-full rounded-full border border-border-light bg-gradient-light-linear/85 px-4 py-2 font-noto font-bold"
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
        class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-2xl border-border-light bg-gradient-light-linear/85 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        style={{ display: active ? "block" : "none" }}
      >
        {config.map((chain) =>
          chain.chainId === currentChain.chainId ? null : (
            <div
              class="block px-4 py-3 text-sm transition-colors duration-300 rounded-2xl hover:cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => {
                switchChain(chain.chainId);
                setActive(false);
              }}
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

                <p className="capitalize font-bold">{chain.chainName}</p>
              </div>
            </div>
          )
        )}
      </div>
    </li>
  );
};

export default ChainSwitcherShort;
