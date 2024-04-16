"use client";

import SummaryHeading from "../../../Wallet/summarySection/SummaryHeading";
import SummaryGasFooter from "../../../Wallet/summarySection/SummaryGasFooter";
import SummaryMain from "../../../Wallet/summarySection/SummaryMain";
import useRecovery from "@/hooks/useRecovery";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AuthSummary({ selectedToken, password, passkey }) {
  const { estimateGas } = useRecovery();
  const [isLoading, setIsLoading] = useState(false);
  var timeout = null;
  const [gas, setGas] = useState(0);
  const recoveryProof = useSelector((state) => state.proof.recoveryProof);

  const handleEstimate = async () => {
    try {
      setIsLoading(true);
      const gas = await estimateGas(passkey, password, selectedToken);
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
    if (selectedToken && (password || passkey) && recoveryProof) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      setIsLoading(true);
      timeout = setTimeout(() => handleEstimate(controller.signal), 2000);
    }
    return () => {
      // Abort the operation when the component unmounts or the dependencies change
      controller.abort();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [password, passkey, selectedToken, recoveryProof]);

  return (
    <div className="flex-1">
      <section className="flex-1 space-y-5 p-6">
        <SummaryHeading paragraph="Review your Authentication details before proceeding with the transaction." />
        <hr className="border-border-light" />

        <SummaryMain amount={-1} token={selectedToken} usdToggle={false} />

        <hr className="border-border-light" />

        <SummaryGasFooter
          gasToken={selectedToken}
          estimatedGas={gas}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
}
