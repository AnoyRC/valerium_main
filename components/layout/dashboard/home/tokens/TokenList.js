"use client";

import { useSelector } from "react-redux";

import TokenItem from "./TokenItem";

const TokenList = () => {
  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);

  return (
    <tbody className="">
      {tokenBalanceData &&
        tokenBalanceData.map((token, index) => (
          <TokenItem key={index} token={token} />
        ))}
    </tbody>
  );
};

export default TokenList;
