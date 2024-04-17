"use client";

import { useSelector } from "react-redux";

import TokenButton from "@/components/ui/buttons/TokenButton";

const PayWithGas = () => {
  const currentChain = useSelector((state) => state.chain.currentChain);

  return (
    <TokenButton
      index={0}
      width="1"
      id="gas-token-transfer"
      label="Pay Gas With"
      span=""
      value="Select Token"
      chainId={currentChain.chainId}
      style="flex items-center w-full !3xl:space-y-0 !space-y-0"
    />
  );
};

export default PayWithGas;
