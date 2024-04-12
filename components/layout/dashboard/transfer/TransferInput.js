"use client";

import { ContactRound } from "lucide-react";

import ValeriumInput from "@/components/ui/input/ValeriumInput";
import TokenButton from "@/components/ui/buttons/TokenButton";
import { useSelector } from "react-redux";
import { formatAmount } from "@/utils/formatAmount";
import { Button } from "@material-tailwind/react";
import RecipientAddress from "./RecipientAddress";

const TransferInput = ({
  style,
  amount,
  setAmount,
  recipient,
  setRecipient,
  usdToggle,
  isValid,
  setIsValid,
  isConfirm,
}) => {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData,
  );

  const currentToken =
    selectedToken &&
    tokenBalanceData &&
    tokenBalanceData.find((token) => token.address === selectedToken.address);
  const token = currentToken
    ? currentToken.balance / 10 ** currentToken.decimals
    : "0.00";

  const currentTokenConversion = selectedToken
    ? tokenConversionData
      ? 1 /
          tokenConversionData.find(
            (token) => token.address === selectedToken.address,
          ).usdValue || 1
      : 0
    : 0;

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
          disabled={isConfirm}
          chainId={currentChain.chainId}
        />

        <div className="relative flex-[2]">
          <div className="absolute right-0 top-0 mr-1 flex gap-2">
            <p>
              {selectedToken
                ? formatAmount(token) + " " + selectedToken.name
                : "Select Token"}
            </p>

            <Button
              className="rounded-xl px-2 py-1 text-xs font-bold capitalize"
              style={{
                background: style.gradientColorLight,
                color: style.baseTextColor,
              }}
              disabled={isConfirm}
              onClick={() => {
                if (selectedToken) {
                  setAmount(
                    usdToggle
                      ? (token * Number(currentTokenConversion)).toString()
                      : token.toString(),
                  );
                }
              }}
            >
              MAX
            </Button>
          </div>

          <ValeriumInput
            label="Amount"
            id="amount-transfer"
            type="text"
            placeholder="Enter Amount"
            required={true}
            input={amount}
            disabled={isConfirm}
            setInput={setAmount}
            icon={
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-semibold text-text-gray">
                <span className="">{usdToggle ? "" : "$"}</span>
                {usdToggle
                  ? formatAmount(amount / Number(currentTokenConversion))
                  : formatAmount(amount * Number(currentTokenConversion))}
                <span className="">
                  {usdToggle ? " " + selectedToken.name : ""}{" "}
                </span>
              </span>
            }
            isValid={
              Number(amount) !== 0 &&
              (!usdToggle
                ? selectedToken
                  ? amount <= token
                  : "0.00"
                : selectedToken
                  ? amount <= token * Number(currentTokenConversion)
                  : "0.00")
            }
          />
        </div>
      </div>

      <RecipientAddress
        input={recipient}
        setInput={setRecipient}
        isValid={isValid}
        setIsValid={setIsValid}
        disabled={isConfirm}
      />
    </>
  );
};

export default TransferInput;
