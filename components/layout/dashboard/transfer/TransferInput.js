"use client";

import { ContactRound } from "lucide-react";

import ValeriumInput from "@/components/ui/input/ValeriumInput";

const TransferInput = ({
  style,
  token,
  setToken,
  amount,
  setAmount,
  recipient,
  setRecipient,
}) => {
  return (
    <>
      <div className="flex gap-4">
        <ValeriumInput
          label="Token"
          id="token-transfer"
          type="text"
          placeholder="Token"
          required={true}
          input={token}
          setInput={setToken}
          width="1"
        />

        <div className="relative flex-[2]">
          <div className="flex absolute top-0 right-0 gap-3">
            <p>Token</p>

            <button
              className="px-2 text-xs py-1 rounded capitalize font-bold"
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
              <span className="absolute text-base text-text-gray font-semibold top-1/2 right-4 -translate-y-1/2">
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
        icon={
          <ContactRound
            size={24}
            className="absolute text-base text-text-gray font-semibold top-1/2 right-4 -translate-y-1/2"
          />
        }
      />
    </>
  );
};

export default TransferInput;
