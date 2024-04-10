import ChainBackground from "@/components/ui/chains/ChainBackground";
import TokenWithChainImage from "@/components/ui/chains/TokenWithChainImage";

const SummaryMain = ({ token }) => {
  return (
    <div className="flex items-center gap-2.5">
      <ChainBackground height={100} width={100}>
        <TokenWithChainImage
          tokenName={token.tokenName}
          tokenSrc={token.tokenName.toLowerCase() + ".png"}
        />
      </ChainBackground>

      <div className="flex flex-1 items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-black">
            <span className="font-normal text-text-gray">Token:</span>{" "}
            {token.tokenName}
          </h3>

          <p className="text-base font-bold text-black">
            <span className="font-normal text-text-gray">Qty:</span>{" "}
            {token.tokenQty}
          </p>
        </div>

        <p className="text-black">
          0.0001{""}
          <span>{token.tokenShort}</span>
        </p>
      </div>
    </div>
  );
};

export default SummaryMain;
