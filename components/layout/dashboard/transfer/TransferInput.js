"use client";

import { ContactRound } from "lucide-react";

import ValeriumInput from "@/components/ui/input/ValeriumInput";
import TokenButton from "@/components/ui/buttons/TokenButton";
import { useSelector } from "react-redux";
import { formatAmount } from "@/utils/formatAmount";
import { Button } from "@material-tailwind/react";

const TransferInput = ({
  style,
  amount,
  setAmount,
  recipient,
  setRecipient,
  usdToggle,
}) => {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const currentBalanceData = useSelector((state) => state.user.currentBalanceData);
  const currentConversionData = useSelector((state) => state.user.currentConversionData);
  const tokenConversionData = useSelector((state) => state.user.tokenConversionData);

  const currentToken = selectedToken && tokenBalanceData && tokenBalanceData.find((token) => token.address === selectedToken.address);
  const token = currentToken ?
    currentToken.balance / 10 ** currentToken.decimals : "0.00";

  const currentTokenConversion = selectedToken ? selectedToken.address ? tokenConversionData ? 1 /
    tokenConversionData.find((token) => token.address === selectedToken.address).usdValue || 1
    : 0 : currentConversionData : 0

  console.log(token / Number(currentTokenConversion))

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
            <p>{
              selectedToken ? selectedToken.address ?
                formatAmount(token) + " " + selectedToken.name
                : formatAmount(currentBalanceData / 10 ** 18) + " " + selectedToken.name : "Select Token"
            }</p>

            <Button
              className="rounded-xl px-2 py-1 text-xs font-bold capitalize"
              style={{
                background: style.gradientColorLight,
                color: style.baseTextColor,
              }}
              onClick={() => {
                if (selectedToken) {
                  setAmount(usdToggle ?
                    selectedToken.address ? (token * Number(currentTokenConversion)).toString() : (currentBalanceData / 10 ** 18 * Number(currentTokenConversion)).toString()
                    : selectedToken.address ? token.toString() : (currentBalanceData / 10 ** 18).toString())
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
            setInput={setAmount}
            icon={
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-semibold text-text-gray">
                <span className="">{usdToggle ? "" : "$"}</span>
                {
                  usdToggle ?
                    formatAmount(amount / Number(currentTokenConversion)) : formatAmount(amount * Number(currentTokenConversion))
                }
                <span className="">{usdToggle ? " " + selectedToken.name : ""} </span>
              </span>
            }
            isValid={
              !usdToggle ?
                selectedToken ? selectedToken.address ?
                  amount <= token : amount <= currentBalanceData / 10 ** 18 : "0.00"
                :
                selectedToken ? selectedToken.address ?
                  amount <= token * Number(currentTokenConversion) : amount <= currentBalanceData / 10 ** 18 * Number(currentConversionData) : "0.00"

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
