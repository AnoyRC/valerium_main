"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function SummaryGasFooter({
  gasToken,
  estimatedGas,
  isLoading,
  isGasless = false,
}) {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const updates = useSelector((state) => state.gasToken.updates);

  const selectedUpdates =
    currentChain &&
    updates &&
    updates.find((update) => update.chainId === currentChain.chainId);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-black">
            {!isGasless ? "Estimated Gas Fee" : "Credit cost"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isGasless && (
            <>
              <p className="text-sm text-black">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin -mr-2" />
                ) : estimatedGas ? (
                  (estimatedGas / 10 ** 18).toFixed(6)
                ) : (
                  "-.--"
                )}
              </p>
              <p className="text-sm text-black">
                {isLoading ? "" : gasToken?.symbol}
              </p>
            </>
          )}
          {isGasless && (
            <>
              <p>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : estimatedGas ? (
                  (estimatedGas / 10 ** 18).toFixed(6)
                ) : (
                  "-.--"
                )}
              </p>
              <Image
                src="/val-gas-front.png"
                alt="Valerium Gas Token"
                width={24}
                height={24}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex w-full justify-between mt-5">
        <p className="text-base font-normal text-text-gray">
          Total Amount to Pay:
        </p>
        {!isGasless ? (
          <p className="text-2.5xl font-bold text-black">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : estimatedGas ? (
              (estimatedGas / 10 ** 18).toFixed(6)
            ) : (
              "-.--"
            )}
            <span> {isLoading ? "" : gasToken?.symbol}</span>
          </p>
        ) : (
          <p className="text-2.5xl font-bold text-black">
            0<span> {gasToken?.symbol}</span>
          </p>
        )}
      </div>
    </div>
  );
}
