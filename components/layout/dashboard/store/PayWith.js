"use client";

import { useSelector } from "react-redux";

import TokenButton from "@/components/ui/buttons/TokenButton";

const PayWith = () => {
  const currentChain = useSelector((state) => state.chain.currentChain);

  return (
    <TokenButton
      index={0}
      id="gas-token-transfer"
      label="Pay with"
      span=""
      value="Select Token"
      chainId={currentChain.chainId}
      style="flex items-center w-64 !3xl:space-y-0 !space-y-0"
    />
  );
};

export default PayWith;
