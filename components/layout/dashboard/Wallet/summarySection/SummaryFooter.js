"use client";

import { useSelector } from "react-redux";

import { formatAmount } from "@/utils/formatAmount";

const SummaryFooter = ({ token, amount, usdToggle }) => {
  const estimatedGas = 0.002;
  const serviceCharge = 0.002;

  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const currentConversionData = useSelector(
    (state) => state.user.currentConversionData
  );
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

  return (
    <ul className="w-full space-y-0.5">
      <li className="flex justify-between">
        <p className="text-base text-text-gray">Subtotal:</p>
        <p className="text-base font-bold text-black">
          {usdToggle
            ? formatAmount(amount / Number(currentTokenConversion))
            : amount || "0.00"}
          <span> {token[0]?.symbol}</span>
        </p>
      </li>

      <li className="flex justify-between">
        <p className="text-sm text-text-gray/80">Estimated Gas:</p>
        <p className="text-sm text-text-gray">
          <span>+</span> {estimatedGas}
          <span> {token[1]?.symbol || token[0]?.symbol}</span>
        </p>
      </li>

      <li className="flex justify-between">
        <span className="text-sm text-text-gray/80">Service Charge:</span>
        <span className="text-sm text-text-gray">
          <span>+</span> {serviceCharge}
          <span> {token[1]?.symbol || token[0]?.symbol}</span>
        </span>
      </li>
    </ul>
  );
};

export default SummaryFooter;
