"use client";

import { useState } from "react";

import TransferAction from "./TransferAction";
import TransferSummary from "./TransferSummary";

const Transfer = () => {
  const [token, setToken] = useState();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [usdToggle, setUsdToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("gas");
  const [payWith, setPayWith] = useState("ETH");

  const handleAmount = (e) => {
    const decimalRegex = /^[0-9]*\.?[0-9]*$/;
    if (e.match(decimalRegex)) {
      setAmount(e);
    }
  };

  return (
    <>
      <TransferAction
        token={token}
        setToken={setToken}
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
        token={{
          tokenName: "Ether",
          tokenShort: "ETH",
          tokenQty: 2
        }}
        amount={amount}
        recipient={recipient}
        activeTab={activeTab}
        payWith={payWith}
      />
    </>
  );
};

export default Transfer;
