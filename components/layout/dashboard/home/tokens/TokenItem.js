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
    token.address && (
      <tr className="overflow-hidden rounded-xl bg-white shadow even:bg-text-off-white">
        <td className="rounded-l-xl py-3 pl-4 font-medium">
          <div className="flex items-center gap-3">
            <Image
              src={`/tokens/${token.logo}`}
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
            ? formatAmount(
                token.balance / 10 ** token.decimals / conversionData
              )
            : "0"}
        </td>

        <td className="rounded-r-xl py-3">
          <div className="mx-auto flex h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-text-gray p-2">
            <Send color="white" />
          </div>
        </td>
      </tr>
    )
  );
};

export default TokenItem;
