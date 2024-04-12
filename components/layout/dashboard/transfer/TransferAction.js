"use client";

import { MoveUpRight, MousePointer2 } from "lucide-react";

import { useSelector } from "react-redux";
import { useState } from "react";
import ActionNote from "../Wallet/actionSection/ActionNote";
import ActionHeading from "../Wallet/actionSection/ActionHeading";
import ActionProcess from "../Wallet/actionSection/ActionProcess";
import GaslessToggle from "../Wallet/actionSection/GaslessToggle";

import TransferInput from "./TransferInput";

import ActionButton from "@/components/ui/buttons/ActionButton";
import { setType, toggleProofDrawer } from "@/redux/slice/proofSlice";
import { useDispatch } from "react-redux";
import useWallet from "@/hooks/useWallet";
import ProofFooter from "@/components/ui/footer/ProofFooter";

const TransferAction = ({
  amount,
  setAmount,
  recipient,
  setRecipient,
  activeTab,
  setActiveTab,
  usdToggle,
  setUsdToggle,
  isValid,
  setIsValid,
}) => {
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const { chainName, style } = useSelector((state) => state.chain.currentChain);
  const dispatch = useDispatch();
  const txProof = useSelector((state) => state.proof.txProof);
  const [isLoading, setIsLoading] = useState(false);
  const type = useSelector((state) => state.proof.type);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (!txProof) {
        dispatch(toggleProofDrawer());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        amount={amount}
        setAmount={setAmount}
        recipient={recipient}
        setRecipient={setRecipient}
        usdToggle={usdToggle}
        isValid={isValid}
        setIsValid={setIsValid}
      />

      <ActionNote chainName={chainName} style={style} token={selectedToken} />

      <GaslessToggle
        style={style}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ProofFooter>
        <ActionButton
          style={style}
          label={txProof ? "Send" : "Authorize"}
          icon={<MoveUpRight size={16} />}
          handleClick={handleClick}
          disabled={isLoading || !type}
        />
      </ProofFooter>
    </section>
  );
};

export default TransferAction;
