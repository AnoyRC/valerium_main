"use client";

import { Fuel } from "lucide-react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Gas = () => {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const [gasPrice, setGasPrice] = useState(0);

  async function getGasPrice() {
    try {
      setGasPrice(0);

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );
      const gasPrice = await provider.getGasPrice();

      setGasPrice(ethers.utils.formatUnits(gasPrice, "gwei"));
    } catch (error) {
      setGasPrice(0);
    }
  }

  useEffect(() => {
    getGasPrice();
  }, [currentChain]);

  return (
    <li className="flex items-center gap-2 rounded-full border border-border-light bg-gradient-light-linear/85 px-4 py-2 font-noto font-bold">
      <div className="flex items-center gap-1 text-base font-semibold capitalize text-text-gray">
        <Fuel size={16} />
        Gas:
      </div>

      <p className="text-xs">
        <span className="mr-0.5 text-base">{Number(gasPrice).toFixed(3)}</span>
        gwei
      </p>
    </li>
  );
};
export default Gas;
