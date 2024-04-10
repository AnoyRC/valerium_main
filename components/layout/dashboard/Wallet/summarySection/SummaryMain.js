"use client";

import { useSelector } from "react-redux";

import ChainBackground from "@/components/ui/chains/ChainBackground";
import TokenWithChainImage from "@/components/ui/chains/TokenWithChainImage";

import { formatAmount } from "@/utils/formatAmount";

const SummaryMain = ({ token, usdToggle, amount }) => {
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const currentBalanceData = useSelector(
    (state) => state.user.currentBalanceData,
  );

  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);

  const currentToken =
    tokenBalanceData &&
    tokenBalanceData.find((token) => token.address === selectedToken.address);

  return (
    <div className="flex items-center gap-2.5">
      <ChainBackground height={100} width={100}>
        <TokenWithChainImage
          tokenName={token?.name || null}
          tokenSrc={token?.logo || null}
        />
      </ChainBackground>

      <div className="flex flex-1 items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-black">
            <span className="font-normal text-text-gray">Token:</span>{" "}
            {token?.name || ""}
          </h3>

          <p className="text-base font-bold text-black">
            <span className="font-normal text-text-gray">Qty:</span>{" "}
            {selectedToken
              ? selectedToken.address
                ? formatAmount(
                    currentToken.balance / 10 ** currentToken.decimals,
                  )
                : formatAmount(currentBalanceData / 10 ** 18)
              : "0.00"}
          </p>
        </div>

        <p className="text-black">
          {amount || "0.00"}{" "}
          <span>{(usdToggle && "USDC") || token?.symbol || ""}</span>
        </p>
      </div>
    </div>
  );
};

export default SummaryMain;
