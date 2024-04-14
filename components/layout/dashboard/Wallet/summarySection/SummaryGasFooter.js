"use client";

import { Loader2 } from "lucide-react";

export default function SummaryGasFooter({
  gasToken,
  estimatedGas,
  isLoading,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-black">Estimated Gas Fee</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-black">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin -mr-2" />
            ) : estimatedGas ? (
              (estimatedGas / 10 ** gasToken.decimals).toFixed(6)
            ) : (
              "-.--"
            )}
          </p>
          <p className="text-sm text-black">
            {isLoading ? "" : gasToken?.symbol}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between mt-5">
        <p className="text-base font-normal text-text-gray">
          Total Amount to Pay:
        </p>
        <p className="text-2.5xl font-bold text-black">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : estimatedGas ? (
            (estimatedGas / 10 ** gasToken.decimals).toFixed(6)
          ) : (
            "-.--"
          )}
          <span> {isLoading ? "" : gasToken?.symbol}</span>
        </p>
      </div>
    </div>
  );
}
