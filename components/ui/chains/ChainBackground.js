"use client";

import { useSelector } from "react-redux";

const ChainBackground = ({ children, width, height }) => {
  const { style } = useSelector((state) => state.chain.currentChain);

  return (
    <div
      className="flex items-center justify-center rounded-xl"
      style={{
        background: style.backgroundColorLight,
        width: width || "100%",
        height: height || "100%",
      }}
    >
      {children}
    </div>
  );
};

export default ChainBackground;
