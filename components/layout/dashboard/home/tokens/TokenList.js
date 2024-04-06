const { default: TokenItem } = require("./TokenItem");

const tokenList = [
  { tokenName: "Base", tokenPrice: 1.4, tokenQty: 18607, tokenCap: 26050 },
  { tokenName: "USDC", tokenPrice: 1, tokenQty: 6000, tokenCap: 6000 },
  { tokenName: "BANK", tokenPrice: 0.00417, tokenQty: 239808, tokenCap: 1000 },
];
const TokenList = () => {
  return (
    <div className="mt-6">
      {tokenList.map((item, index) => {
        return (
          <TokenItem
            tokenName={item.tokenName}
            tokenPrice={item.tokenPrice}
            tokenQty={item.tokenQty}
            tokenCap={item.tokenCap}
          />
        );
      })}
    </div>
  );
};

export default TokenList;
