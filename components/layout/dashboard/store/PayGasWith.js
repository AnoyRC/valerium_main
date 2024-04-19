"use client";

import { useSelector } from "react-redux";

import TokenButton from "@/components/ui/buttons/TokenButton";

const PayGasWith = () => {
  const currentChain = useSelector((state) => state.chain.currentChain);

  return (
    <TokenButton
      index={1}
      id="gas-token-transfer"
      label="Pay Gas with"
      span=""
      value="Select Token"
      chainId={currentChain.chainId}
      style="flex items-center w-full !3xl:space-y-0 !space-y-0"
    />
  );
};

export default PayGasWith;
