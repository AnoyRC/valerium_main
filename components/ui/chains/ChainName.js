"use client";

import { useSelector } from "react-redux";

const ChainName = () => {
  const { chainName } = useSelector((state) => state.chain.currentChain);

  return <p className="text-xl font-bold text-white">{chainName}</p>;
};

export default ChainName;
