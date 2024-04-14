"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ContainerButton from "./ContainerButton";
import TokenBalance from "./AccountTokenBalance";

import DomainName from "@/components/ui/DomainName";
import FormatNumber from "@/components/ui/FormatNumber";
import ChainName from "@/components/ui/chains/ChainName";
import ChainGradientContainer from "@/components/ui/chains/ChainGradientContainer";

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);

  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData,
  );
  const currentChain = useSelector((state) => state.chain.currentChain);

  useEffect(() => {
    if (tokenBalanceData) {
      setBalance(tokenBalanceData[0].balance / 10 ** 18);
    }

    if (tokenBalanceData && tokenConversionData) {
      setUsdBalance(
        tokenBalanceData[0].balance /
          10 ** 18 /
          tokenConversionData[0].usdValue,
      );
    }
  }, [tokenBalanceData, tokenConversionData, currentChain]);

  return (
    <div className="overflow-hidden rounded-xl border border-border-light bg-gradient-light-linear/85 shadow">
      <ChainGradientContainer>
        <div className="space-y-2">
          <DomainName usernameSize={"20px"} domainSize={"16px"} />

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

        <div className="flex flex-col justify-between text-right">
          <ChainName style={"text-xl font-bold text-white"} />

          <ContainerButton />
        </div>
      </ChainGradientContainer>
    </div>
  );
};

export default AccountBalance;
