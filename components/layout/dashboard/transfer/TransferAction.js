"use client";

import { MoveUpRight, MousePointer2 } from "lucide-react";

import { useSelector } from "react-redux";

import ActionNote from "../Wallet/actionSection/ActionNote";
import ActionHeading from "../Wallet/actionSection/ActionHeading";
import ActionProcess from "../Wallet/actionSection/ActionProcess";
import GaslessToggle from "../Wallet/actionSection/GaslessToggle";

import TransferInput from "./TransferInput";

import ActionButton from "@/components/ui/buttons/ActionButton";

const TransferAction = ({
  token,
  setToken,
  amount,
  setAmount,
  recipient,
  setRecipient,
  activeTab,
  setActiveTab,
  usdToggle,
  setUsdToggle,
  payWith,
  setPayWith,
}) => {
  const { chainName, style } = useSelector((state) => state.chain.currentChain);
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const handleClick = () => {
    console.log("Send button clicked");
  };

  return (
    <section className="flex flex-1 flex-col gap-8 p-6">
      <ActionHeading
        style={style}
        icon={<MousePointer2 size="24" className="rotate-90" />}
        heading="Send"
        paragraph="Transfer tokens to any address on selected chain."
      />

      <ActionProcess
        chainName={chainName}
        style={style}
        usdToggle={usdToggle}
        setUsdToggle={setUsdToggle}
      />
      <TransferInput
        style={style}
        token={token}
        setToken={setToken}
        amount={amount}
        setAmount={setAmount}
        recipient={recipient}
        setRecipient={setRecipient}
        usdToggle={usdToggle}
      />

      <ActionNote chainName={chainName} style={style} token={selectedToken} />
      <GaslessToggle
        style={style}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        payWith={payWith}
        setPayWith={setPayWith}
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
