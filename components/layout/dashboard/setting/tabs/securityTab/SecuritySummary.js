"use client";

import useChange from "@/hooks/useChange";
import SummaryGasFooter from "../../../Wallet/summarySection/SummaryGasFooter";
import SummaryHeading from "../../../Wallet/summarySection/SummaryHeading";
import SummaryMain from "../../../Wallet/summarySection/SummaryMain";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import validEmail from "@/components/ui/ValidEmail";

export default function SecuritySummary({ selectedToken, input, activeTab }) {
  const { estimateGas } = useChange();
  const [isLoading, setIsLoading] = useState(false);
  const [gas, setGas] = useState(0);
  var timeout = null;
  const recoveryProof = useSelector((state) => state.proof.recoveryProof);
  const email = useSelector((state) => state.proof.email);

  const handleEstimate = async () => {
    try {
      setIsLoading(true);
      const gas = await estimateGas(input, selectedToken);
      setGas(gas);
      setIsLoading(false);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (
      selectedToken &&
      validEmail(input) &&
      input !== email &&
      recoveryProof &&
      activeTab === "gas"
    ) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      setIsLoading(true);
      timeout = setTimeout(() => handleEstimate(controller.signal), 2000);
    } else {
      setIsLoading(false);
      setGas(null);
    }
    return () => {
      // Abort the operation when the component unmounts or the dependencies change
      controller.abort();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [input, selectedToken, activeTab, recoveryProof]);

  return (
    <div className="flex-1">
      <section className="flex-1 space-y-5 p-6">
        <SummaryHeading />
        <hr className="border-border-light" />

        <SummaryMain amount={-1} token={selectedToken} usdToggle={false} />

        <hr className="border-border-light" />

        <SummaryGasFooter
          estimatedGas={gas}
          isLoading={isLoading}
          gasToken={selectedToken}
          isGasless={activeTab === "gasless"}
        />
      </section>
    </div>
  );
}
