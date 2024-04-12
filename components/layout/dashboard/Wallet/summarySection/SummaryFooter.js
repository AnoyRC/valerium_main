"use client";

import { useSelector } from "react-redux";

import { formatAmount } from "@/utils/formatAmount";

import { Loader2 } from "lucide-react";

const SummaryFooter = ({ token, amount, usdToggle, gas, isLoading }) => {
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData,
  );

  const currentTokenConversion = selectedToken
    ? tokenConversionData
      ? 1 /
          tokenConversionData.find(
            (token) => token.address === selectedToken.address,
          ).usdValue || 1
      : 0
    : 0;

  const txProof = useSelector((state) => state.proof.txProof);

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

      <li className="flex justify-between">
        <p className="text-sm font-normal text-text-gray/80">Estimated Gas:</p>
        <p className="text-sm text-text-gray">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span>{txProof ? "+" : ""}</span>{" "}
              {txProof
                ? (gas / 10 ** token[1].decimals).toFixed(
                    parseInt(
                      (gas / 10 ** token[1].decimals)
                        .toExponential()
                        .split("e")[1],
                    ) * -1,
                  )
                : "-.--"}
              <span> {token[1]?.symbol || token[0]?.symbol}</span>
            </>
          )}
        </p>
      </li>
    </ul>
  );
};

export default SummaryFooter;
