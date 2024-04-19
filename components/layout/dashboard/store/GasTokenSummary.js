"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import SummaryMain from "../Wallet/summarySection/SummaryMain";
import SummaryHeading from "../Wallet/summarySection/SummaryHeading";
import SummaryFooter from "../Wallet/summarySection/SummaryFooter";
import SummaryTotal from "../Wallet/summarySection/SummaryTotal";
import useBuy from "@/hooks/useBuy";
import { useEffect } from "react";

const GasTokenSummary = () => {
  const [selectedToken, gasToken] = useSelector(
    (state) => state.selector.token
  );
  const tokens = useSelector((state) => state.selector.token);
  const [gas, setGas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const quantity = useSelector((state) => state.gasToken.quantity);
  const updates = useSelector((state) => state.gasToken.updates);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const txProof = useSelector((state) => state.proof.txProof);
  var Timeout = null;
  const { estimateGas } = useBuy();

  const selectedUpdates =
    currentChain &&
    updates &&
    updates.find((update) => update.chainId === currentChain.chainId);

  const selectedPrice =
    selectedUpdates &&
    selectedUpdates.tokens.find(
      (token) => token.address === selectedToken.address
    );

  const handleEstimateGas = async () => {
    try {
      const gas = await estimateGas();
      setGas(gas);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (quantity && selectedToken && txProof && gasToken) {
      clearTimeout(Timeout);
      setIsLoading(true);
      Timeout = setTimeout(() => {
        handleEstimateGas(abortController.signal);
      }, 1000);
    }
    return () => {
      abortController.abort();
      clearTimeout(Timeout);
    };
  }, [quantity, selectedToken, gasToken, txProof, currentChain]);

  return (
    <section className="flex-1 space-y-5">
      <SummaryHeading paragraph="Review your selected number of tokens before proceeding with the transaction." />
      <hr className="border-border-light" />

      <SummaryMain
        amount={-1}
        token={{
          name: selectedToken.name,
          logo: selectedToken?.logo || "/valerium-gas-token.png",
        }}
        usdToggle={false}
        isVault={true}
      />

      <hr className="border-border-light" />

      <SummaryFooter
        token={tokens}
        amount={
          (quantity * selectedPrice?.creditCost) / 10 ** selectedToken.decimals
        }
        usdToggle={false}
        gas={gas}
        isLoading={isLoading}
      />

      <SummaryTotal
        token={tokens}
        usdToggle={false}
        gas={gas}
        isLoading={isLoading}
        amount={
          (quantity * selectedPrice?.creditCost) / 10 ** selectedToken.decimals
        }
      />
    </section>
  );
};

export default GasTokenSummary;
