"use client";

import Image from "next/image";

import ChainDeployButton from "@/components/ui/buttons/ChainDeployButton";
import { useSelector } from "react-redux";

const NetworkItem = ({ chain }) => {
  const currentChain = useSelector((state) => state.chain.currentChain);

  if (currentChain.chainName === chain.chainName) {
    return null;
  }

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <li>
      <div className="border-gray flex items-center justify-between border-b px-10 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <Image
              src={`/tokens/${chain.style.logo}`}
              alt={`${chain.chainName} Logo`}
              width={40}
              height={40}
            />
          </div>

          <h3 className="text-lg font-semibold">{chain.chainName}</h3>
        </div>

        <ChainDeployButton
          onClick={handleClick}
          backgroundColor={chain.style.gradientColorLight}
        />
      </div>
    </li>
  );
};

export default NetworkItem;
