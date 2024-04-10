"use client";

import { useState } from "react";

import TransferAction from "./TransferAction";
import TransferSummary from "./TransferSummary";

const Transfer = () => {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [usdToggle, setUsdToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("gas");

  return (
    <>
      <TransferAction
        token={token}
        setToken={setToken}
        amount={amount}
        setAmount={setAmount}
        recipient={recipient}
        setRecipient={setRecipient}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        usdToggle={usdToggle}
        setUsdToggle={setUsdToggle}
      />

      <TransferSummary
        token={token}
        amount={amount}
        recipient={recipient}
        activeTab={activeTab}
      />
    </>
  );
};

export default Transfer;
