"use client";

import { useSelector } from "react-redux";

const ChainName = () => {
  const { chainName } = useSelector((state) => state.chain.currentChain);

  return <p className="text-white text-xl font-bold">{chainName}</p>;
};

export default ChainName;
