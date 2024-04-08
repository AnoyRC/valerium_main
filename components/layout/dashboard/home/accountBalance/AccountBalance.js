"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ContainerButton from "./ContainerButton";
import TokenBalance from "./AccountTokenBalance";

import FormatNumber from "@/components/ui/FormatNumber";
import ChainName from "@/components/ui/chains/ChainName";
import ChainGradientContainer from "@/components/ui/chains/ChainGradientContainer";

const AccountBalance = () => {
  const searchParams = useSearchParams();

  const [balance, setBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);

  const currentBalanceData = useSelector(
    (state) => state.user.currentBalanceData
  );
  const currentConversionData = useSelector(
    (state) => state.user.currentConversionData
  );
  const currentChain = useSelector((state) => state.chain.currentChain);

  useEffect(() => {
    if (currentBalanceData && currentConversionData) {
      setBalance(Number(currentBalanceData) / 10 ** 18);
      setUsdBalance(
        (Number(currentBalanceData) / 10 ** 18) * Number(currentConversionData)
      );
    }
  }, [currentBalanceData, currentConversionData, currentChain]);

  return (
    <div className="rounded-xl border border-border-light bg-gradient-light-linear/85 overflow-hidden shadow">
      <ChainGradientContainer>
        <div className="space-y-2">
          <h2 className="font-medium">
            {searchParams.get("domain")}
            <span className=" bg-gradient-primary-light gradient-text">
              @valerium
            </span>
          </h2>

          <div className="space-y-0.5">
            <FormatNumber
              number={usdBalance}
              size="text-4xl"
              integerSize="text-6xl"
              decimalSize="text-5xl"
            />

            <TokenBalance balance={balance} />
          </div>
        </div>

        <div className="text-right flex flex-col justify-between">
          <ChainName />

          <ContainerButton />
        </div>
      </ChainGradientContainer>
    </div>
  );
};

export default AccountBalance;
