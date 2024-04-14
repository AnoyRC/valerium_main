"use client";

import { toast } from "sonner";
import { useSelector } from "react-redux";

const ChainAddress = ({ style }) => {
  const { addresses } = useSelector((state) => state.chain.currentChain);

  const handleClick = () => {
    navigator.clipboard.writeText(addresses.Valerium);
    toast.info("Address copied to clipboard");
  };

  return (
    <p className={style + " cursor-pointer"} onClick={handleClick}>
      {addresses.Valerium}
    </p>
  );
};

export default ChainAddress;
