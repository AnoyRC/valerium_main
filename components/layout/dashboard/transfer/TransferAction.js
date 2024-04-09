"use client";

import { MoveUpRight, MousePointer2 } from "lucide-react";

import { useState } from "react";
import { useSelector } from "react-redux";

import ActionHeading from "../Wallet/actionSection/ActionHeading";
import ActionNote from "../Wallet/actionSection/ActionNote";
import ActionProcess from "../Wallet/actionSection/ActionProcess";
import GaslessToggle from "../Wallet/actionSection/GaslessToggle";

import TransferInput from "./TransferInput";

import ActionButton from "@/components/ui/buttons/ActionButton";

const TransferAction = () => {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const [activeTab, setActiveTab] = useState(false);

  const { chainName, style } = useSelector((state) => state.chain.currentChain);

  const handleClick = () => {
    console.log("Send button clicked");
  };

  return (
    <section className="p-6 flex flex-col justify-between flex-1">
      <ActionHeading
        style={style}
        icon={<MousePointer2 size="24" />}
        heading="Send"
        paragraph="Transfer tokens to any address on selected chain."
      />

      <ActionProcess chainName={chainName} style={style} />
      <TransferInput
        style={style}
        token={token}
        setToken={setToken}
        amount={amount}
        setAmount={setAmount}
        recipient={recipient}
        setRecipient={setRecipient}
      />

      <ActionNote chainName={chainName} style={style} />
      <GaslessToggle
        style={style}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ActionButton
        style={style}
        label="Send"
        icon={<MoveUpRight size={16} />}
        handleClick={handleClick}
      />
    </section>
  );
};

export default TransferAction;
