"use client";

import Image from "next/image";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { formatAmount } from "@/utils/formatAmount";

const TokenItem = ({ token }) => {
  const [conversionData, setConversionData] = useState();

  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );

  useEffect(() => {
    if (tokenConversionData) {
      const conversionRate = tokenConversionData.find(
        (conversion) => conversion.address === token.address
      );
      setConversionData(conversionRate.usdValue);
    }
  }, [tokenConversionData]);

  return (
    <tr className="bg-white even:bg-text-off-white rounded-xl overflow-hidden shadow">
      <td className="pl-4 py-3 rounded-l-xl font-medium">
        <div className="flex items-center gap-3">
          <Image
            src="/tokens/base-logo.svg"
            alt={token.name + " logo"}
            width={24}
            height={24}
            className="rounded-full"
          />

          <p>{token.name}</p>
        </div>
      </td>

      <td className="py-3">
        ${conversionData ? formatAmount(1 / conversionData) : "0"}
      </td>

      <td className="py-3">
        {formatAmount(token.balance / 10 ** token.decimals)}
      </td>

      <td className="py-3">
        $
        {conversionData
          ? formatAmount(token.balance / 10 ** token.decimals / conversionData)
          : "0"}
      </td>

      <td className="py-3 rounded-r-xl">
        <div className="mx-auto -translate-x-1/2 w-8 h-8 bg-text-gray rounded-full flex justify-center items-center p-2 cursor-pointer">
          <Send color="white" />
        </div>
      </td>
    </tr>
  );
};

export default TokenItem;
