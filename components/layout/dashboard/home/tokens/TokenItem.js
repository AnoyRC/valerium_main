import { Send } from "lucide-react";

const TokenItem = ({ tokenName, tokenPrice, tokenQty, tokenCap }) => {
  return (
    <div className="flex justify-between items-center bg-bg-off-white p-4 rounded-lg even:bg-text-off-white mb-2 last-of-type:mb-0 [&>p]:flex-1 [&>p:last-child]:flex-none ">
      <p>{tokenName}</p>
      <p>${tokenPrice}</p>
      <p>{tokenQty}</p>
      <p>${tokenCap}</p>
      <p className="w-[55.04px] flex justify-center">
        <span className="w-8 h-8 bg-bg-off-black rounded-full flex justify-center items-center p-2 cursor-pointer">
          <Send color="white" />
        </span>
      </p>
    </div>
  );
};

export default TokenItem;
