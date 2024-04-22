"use client";

import { useSelector } from "react-redux";

const ChainName = ({ style }) => {
  const { chainName, style: sty } = useSelector(
    (state) => state.chain.currentChain,
  );

  return (
    <p
      className={style}
      style={{
        color: sty.baseTextColor,
      }}
    >
      {chainName}
    </p>
  );
};

export default ChainName;
