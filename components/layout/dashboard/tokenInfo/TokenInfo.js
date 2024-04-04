import { Send } from "lucide-react";

const TokenInfo = () => {
  return (
    <div className="flex justify-between items-center bg-bg-off-white p-4 rounded-lg even:bg-text-off-white mb-2 last-of-type:mb-0">
      <p>Base</p>
      <p>$1.4</p>
      <p>18607</p>
      <p>$26,050</p>
      <p className=" w-8 h-8 bg-bg-off-black rounded-full flex justify-center items-center p-2 cursor-pointer">
        <Send color="white" />
      </p>
    </div>
  );
};

export default TokenInfo;
