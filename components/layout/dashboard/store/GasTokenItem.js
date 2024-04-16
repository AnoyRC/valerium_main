"use client";

import { Button } from "@material-tailwind/react";

import Image from "next/image";

import TokenImage from "./GasTokenImage";

const GasTokenItem = ({ price }) => {
  return (
    <Button className="flex w-fit flex-col items-center space-y-2 bg-transparent p-4 shadow-none hover:bg-black/20">
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
