"use client";

import { useSelector } from "react-redux";

const ChainGradientContainer = ({ children }) => {
  const { style } = useSelector((state) => state.chain.currentChain);

  return (
    <section
      className="flex justify-between px-5 py-6 "
      style={{
        background: style.backgroundShadowEffect,
      }}
    >
      {children}
    </section>
  );
};

export default ChainGradientContainer;
