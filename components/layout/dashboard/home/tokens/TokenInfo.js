"use client";

import { formatAmount } from "@/utils/formatAmount";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TokenInfo = ({ token }) => {
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );
  const [conversionData, setConversionData] = useState();

  useEffect(() => {
    if (tokenConversionData) {
      const conversionRate = tokenConversionData.find(
        (conversion) => conversion.address === token.address
      );
      setConversionData(conversionRate.usdValue);
    }
  }, [tokenConversionData]);

  return (
    <tr className="">
      <td className="pl-4 py-3 bg-bg-off-white rounded-l-xl">{token.name}</td>
      <td className="py-3 bg-bg-off-white">
        ${conversionData ? formatAmount(1 / conversionData) : "0"}
      </td>
      <td className="py-3 bg-bg-off-white">
        {formatAmount(token.balance / 10 ** token.decimals)}
      </td>
      <td className="py-3 bg-bg-off-white">
        $
        {conversionData
          ? formatAmount(token.balance / 10 ** token.decimals / conversionData)
          : "0"}
      </td>
      <td className="flex justify-end pr-5 py-3 bg-bg-off-white rounded-r-xl">
        <div className=" w-8 h-8 bg-bg-off-black rounded-full flex justify-center items-center p-2 cursor-pointer">
          <Send color="white" />
        </div>
      </td>
    </tr>
  );
};

export default TokenInfo;
