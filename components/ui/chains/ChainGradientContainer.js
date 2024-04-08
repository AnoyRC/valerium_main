"use client";

import { useSelector } from "react-redux";

const ChainGradientContainer = ({ children }) => {
  const { style } = useSelector((state) => state.chain.currentChain);

  return (
    <section
      className="px-5 py-6 flex justify-between "
      style={{
        background: style.backgroundShadowEffect,
      }}
    >
      {children}
    </section>
  );
};

export default ChainGradientContainer;
