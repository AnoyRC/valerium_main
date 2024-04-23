"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FormatNumber from "@/components/ui/FormatNumber";

const TotalBalance = () => {
  const [usdBalance, setUsdBalance] = useState(0);

  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  useEffect(() => {
    if (tokenBalanceData && tokenConversionData) {
      let totalUsdBalance = 0;
      for (let i = 0; i < tokenBalanceData.length; i++) {
        totalUsdBalance +=
          tokenBalanceData[i].balance /
          10 ** tokenBalanceData[i].decimals /
          tokenConversionData[i].usdValue;
      }
      setUsdBalance(totalUsdBalance);
    }

    return () => {
      setUsdBalance(0);
    };
  }, [tokenBalanceData, tokenConversionData]);

  return (
    <section className="space-y-1.5">
      <h2 className="text-base text-text-gray">Total Balance</h2>

      <FormatNumber
        number={usdBalance}
        size="text-3xl"
        integerSize="text-5xl"
        decimalSize="text-4xl"
      />
    </section>
  );
};

export default TotalBalance;
