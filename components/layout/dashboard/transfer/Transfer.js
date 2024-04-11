"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import TransferAction from "./TransferAction";
import TransferSummary from "./TransferSummary";

const Transfer = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [usdToggle, setUsdToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("gas");

  const selectedToken = useSelector((state) => state.selector.token);

  const handleAmount = (e) => {
    const decimalRegex = /^[0-9]*\.?[0-9]*$/;
    if (e.match(decimalRegex)) {
      setAmount(e);
    }
  };

  return (
    <>
      <TransferAction
        amount={amount}
        setAmount={handleAmount}
        recipient={recipient}
        setRecipient={setRecipient}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        usdToggle={usdToggle}
        setUsdToggle={setUsdToggle}
      />

      <TransferSummary
        selectedToken={selectedToken}
        amount={amount}
        recipient={recipient}
        activeTab={activeTab}
        usdToggle={usdToggle}
      />
    </>
  );
};

export default Transfer;
