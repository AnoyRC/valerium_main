"use client";

import { useSelector } from "react-redux";

import { formatAmount } from "@/utils/formatAmount";

import { Loader2 } from "lucide-react";
import Image from "next/image";

const SummaryFooter = ({
  token,
  amount,
  usdToggle,
  gas,
  isLoading,
  isGasless = false,
}) => {
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  const currentTokenConversion = selectedToken
    ? tokenConversionData
      ? 1 /
          tokenConversionData.find(
            (token) => token.address === selectedToken.address
          ).usdValue || 1
      : 0
    : 0;

  const txProof = useSelector((state) => state.proof.txProof);

  const currentChain = useSelector((state) => state.chain.currentChain);
  const updates = useSelector((state) => state.gasToken.updates);

  const selectedUpdates =
    currentChain &&
    updates &&
    updates.find((update) => update.chainId === currentChain.chainId);

  return (
    <ul className="w-full space-y-0.5">
      {amount >= 0 && (
        <li className="flex justify-between">
          <p className="text-base font-normal text-text-gray">Subtotal:</p>
          <p className="text-base font-bold text-black">
            {usdToggle
              ? formatAmount(amount / Number(currentTokenConversion))
              : amount || "0.00"}
            <span> {token[0]?.symbol}</span>
          </p>
        </li>
      )}

      {/* <li className="flex justify-between">
        <span className="text-sm font-normal text-text-gray/80">
          Service Charge:
        </span>
        <span className="text-sm text-text-gray">
          <span>+</span> {serviceCharge}
          <span> {token[1]?.symbol || token[0]?.symbol}</span>
        </span>
      </li> */}

      {!isGasless && (
        <li className="flex justify-between">
          <p className="text-sm font-normal text-text-gray/80">
            Estimated Gas:
          </p>
          <p className="text-sm text-text-gray">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span>{txProof ? "+" : ""}</span>{" "}
                {txProof ? (gas / 10 ** 18).toFixed(Math.abs(6)) : "-.--"}
                <span> {token[1]?.symbol || token[0]?.symbol}</span>
              </>
            )}
          </p>
        </li>
      )}

      {isGasless && selectedUpdates && (
        <li className="flex justify-between">
          <p className="text-sm font-normal text-text-gray/80">Credit Cost:</p>
          <div className="flex gap-1 items-center">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>{txProof ? (gas / 10 ** 18).toFixed(Math.abs(6)) : "-.--"}</>
            )}
            <Image
              src="/val-gas-front.png"
              alt="Valerium Gas Token"
              width={24}
              height={24}
            />
          </div>
        </li>
      )}
    </ul>
  );
};

export default SummaryFooter;
