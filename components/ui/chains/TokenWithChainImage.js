"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

const TokenWithChainImage = ({ tokenName, tokenSrc }) => {
  const { style, chainName } = useSelector((state) => state.chain.currentChain);

  return (
    <div className="relative">
      {tokenName ? (
        <>
          <Image
            src={`/tokens/${tokenSrc}`}
            alt={`${tokenName} Logo`}
            width={48}
            height={48}
            className="rounded-full"
          />

          <div className="absolute bottom-0 right-0">
            <Image
              src={`/tokens/${style.logo}`}
              alt={`${chainName} Logo`}
              width={16}
              height={16}
            />
          </div>
        </>
      ) : (
        <Image
          src={`/tokens/${style.logo}`}
          alt={`${chainName} Logo`}
          width={48}
          height={48}
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default TokenWithChainImage;
