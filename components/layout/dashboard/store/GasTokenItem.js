"use client";

import { Button } from "@material-tailwind/react";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import TokenImage from "./GasTokenImage";

import { setGasToken } from "@/redux/slice/gasTokenSlice";

const GasTokenItem = ({ price }) => {
  const dispatch = useDispatch();

  const gasTokenPrice = useSelector((state) => state.gasToken.price);

  const handleGasTokenClick = () => {
    dispatch(setGasToken(price));
  };

  return (
    <Button
      className={`flex w-fit flex-col items-center space-y-2 p-4 shadow-none hover:bg-black/10 hover:shadow-none ${gasTokenPrice === price ? "bg-black/20" : "bg-transparent"}`}
      onClick={handleGasTokenClick}
    >
      <TokenImage price={price} />

      <h4 className="flex items-center gap-1.5 text-xl font-semibold text-black">
        {price}
        <div className="= flex gap-0.5">
          <Image
            src="/valerium-gas-token.png"
            alt="Valerium Gas Token Logo"
            width={24}
            height={24}
          />
          <p>USDC</p>
        </div>
      </h4>
    </Button>
  );
};

export default GasTokenItem;
