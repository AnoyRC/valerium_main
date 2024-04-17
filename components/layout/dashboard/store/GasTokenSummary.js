"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import SummaryMain from "../Wallet/summarySection/SummaryMain";
import SummaryHeading from "../Wallet/summarySection/SummaryHeading";
import SummaryGasFooter from "../Wallet/summarySection/SummaryGasFooter";

const GasTokenSummary = () => {
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const [gas, setGas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const handleEstimate = async () => {
  //   try {
  //     setIsLoading(true);
  //     const gas = await estimateGas(passkey, password, selectedToken);
  //     setGas(gas);
  //     setIsLoading(false);
  //   } catch (error) {
  //     if (error.name === "AbortError") {
  //       return;
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <section className="flex-1 space-y-5">
      <SummaryHeading paragraph="Review your selected number of tokens before proceeding with the transaction." />
      <hr className="border-border-light" />

      <SummaryMain
        amount={-1}
        token={{
          name: "Gas Token",
          logo: selectedToken?.logo || "/valerium-gas-token.png",
        }}
        usdToggle={false}
      />

      <hr className="border-border-light" />

      <SummaryGasFooter
        gasToken={selectedToken}
        estimatedGas={gas}
        isLoading={isLoading}
      />
    </section>
  );
};

export default GasTokenSummary;
