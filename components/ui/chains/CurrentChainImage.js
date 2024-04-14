"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

const CurrentChainImage = ({ size }) => {
  const { style, chainName } = useSelector((state) => state.chain.currentChain);

  return (
    <Image
      src={`/tokens/${style.logo}`}
      alt={`${chainName} Logo`}
      width={size}
      height={size}
    />
  );
};

export default CurrentChainImage;
