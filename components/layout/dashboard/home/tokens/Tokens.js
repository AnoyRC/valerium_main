"use client";

import TokenInfo from "./TokenInfo";
import { useSelector } from "react-redux";

const Tokens = () => {
  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);

  return (
    <section className="rounded-xl border border-border-light bg-gradient-light-linear/85 overflow-hidden p-4">
      <h3 className="border-b-2 border-[#444444] border-solid text-xl pb-4 font-bold">
        Tokens
      </h3>

      <table className="w-full table-fixed text-left border-separate border-spacing-0 border-spacing-y-3 mt-1">
        <thead>
          <tr>
            <th className="pl-4">Token</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Value</th>
            <th className="text-right pr-5">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {tokenBalanceData &&
            tokenBalanceData.map((token, index) => (
              <TokenInfo key={index} token={token} />
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Tokens;
