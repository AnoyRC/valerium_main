"use client";

import Image from "next/image";

import { useSelector } from "react-redux";

const CurrentChainInfo = ({ label = "Processing on the" }) => {
  const currentChain = useSelector((state) => state.chain.currentChain);

  return (
    <div className="flex w-fit items-center gap-1 rounded-full border border-border-light bg-gradient-light-linear px-4 py-2 font-semibold">
      <p className="text-text-gray">{label}</p>

      <div className="flex items-center gap-1">
        <Image
          src={`/tokens/${currentChain.style.logo}`}
          alt={`${currentChain.chainName} logo`}
          width={24}
          height={24}
        />

        <p
          className="uppercase"
          style={{
            color: currentChain.style.colorLight,
          }}
        >
          {currentChain.chainName}
        </p>
      </div>
    </div>
  );
};

export default CurrentChainInfo;
