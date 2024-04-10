"use client";

import { formatAmount } from "@/utils/formatAmount";
import { useSelector } from "react-redux";

const TokenBalance = ({ balance }) => {
  const { symbol, style } = useSelector((state) => state.chain.currentChain);

  return (
    <p className="font-medium text-text-gray">
      {formatAmount(balance)}{" "}
      <span
        className="font-bold"
        style={{
          color: style.colorLight,
        }}
      >
        {" "}
        {symbol}
      </span>
    </p>
  );
};

export default TokenBalance;
