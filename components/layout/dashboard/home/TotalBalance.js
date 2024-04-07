"use client";

import FormatNumber from "@/components/ui/FormatNumber";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TotalBalance = () => {
  const balanceData = useSelector((state) => state.user.balanceData);
  const conversionData = useSelector((state) => state.user.conversionData);
  const [usdBalance, setUsdBalance] = useState(0);

  useEffect(() => {
    if (balanceData && balanceData.length > 0) {
      let totalUsd = 0;
      for (let i = 0; i < balanceData.length; i++) {
        let totalEth = 0;
        totalEth += balanceData[i].balance / 10 ** 18;
        for (let j = 0; j < balanceData[i].erc20Balances.length; j++) {
          const erc20Balance =
            balanceData[i].erc20Balances[j].balance /
            10 ** balanceData[i].erc20Balances[j].decimals;
          const conversionRate = conversionData[i].tokens[j].value;

          totalEth += Number(erc20Balance) / Number(conversionRate);
        }
        totalUsd += Number(totalEth) * Number(conversionData[i].value);
      }

      setUsdBalance(totalUsd);
    }
  }, [balanceData, conversionData]);

  return (
    <section className="space-y-1.5">
      <h2 className="text-text-gray text-base">Total Balance</h2>

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
