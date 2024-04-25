"use client";

import { useSelector } from "react-redux";

const ChainName = ({ style }) => {
  const { chainName } = useSelector((state) => state.chain.currentChain);

  return <p className={style}>{chainName}</p>;
};

export default ChainName;
