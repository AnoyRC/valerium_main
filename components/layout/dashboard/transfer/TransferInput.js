"use client";

import { ContactRound } from "lucide-react";

import ValeriumInput from "@/components/ui/input/ValeriumInput";
import TokenButton from "@/components/ui/buttons/TokenButton";
import { useSelector } from "react-redux";

const TransferInput = ({
  style,
  amount,
  setAmount,
  recipient,
  setRecipient,
}) => {
  const currentChain = useSelector((state) => state.chain.currentChain);
  return (
    <>
      <div className="flex gap-4">
        <TokenButton
          width="1"
          id="token-transfer"
          label="Token"
          required={true}
          span=""
          value="Select Token"
          disabled={false}
          chainId={currentChain.chainId}
        />

        <div className="relative flex-[2]">
          <div className="absolute right-0 top-0 flex gap-2 mr-1">
            <p>Token</p>

            <button
              className="rounded-xl px-2 py-1 text-xs font-bold capitalize"
              style={{
                background: style.gradientColorLight,
                color: style.baseTextColor,
              }}
            >
              MAX
            </button>
          </div>

          <ValeriumInput
            label="Amount"
            id="amount-transfer"
            type="text"
            placeholder="Enter Amount"
            required={true}
            input={amount}
            setInput={setAmount}
            icon={
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-semibold text-text-gray">
                <span className="">$</span>
                0.00
              </span>
            }
          />
        </div>
      </div>

      <ValeriumInput
        label="Recipient Address"
        id="recipient-transfer"
        type="text"
        placeholder="Enter Address or Valerium Domain"
        required={true}
        input={recipient}
        setInput={setRecipient}
        // icon={
        //   <ContactRound
        //     size={24}
        //     className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-semibold text-text-gray"
        //   />
        // }
      />
    </>
  );
};

export default TransferInput;
