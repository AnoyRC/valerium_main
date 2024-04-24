"use client";

import { Button } from "@material-tailwind/react";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import TokenImage from "./GasTokenImage";

import { setQuantity } from "@/redux/slice/gasTokenSlice";

const GasTokenItem = ({ quantity }) => {
  const dispatch = useDispatch();

  const selectedQuantity = useSelector((state) => state.gasToken.quantity);
  const [selectedToken, ,] = useSelector((state) => state.selector.token);
  const updates = useSelector((state) => state.gasToken.updates);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const isRunning = useSelector((state) => state.tx.isRunning);

  const selectedUpdates =
    currentChain &&
    updates &&
    updates.find((update) => update.chainId === currentChain.chainId);

  const selectedPrice =
    selectedUpdates &&
    selectedUpdates.tokens.find(
      (token) => token.address === selectedToken.address
    );

  const handleGasTokenClick = () => {
    if (isRunning) {
      toast.error("Transaction is already in progress.");
      return;
    }
    dispatch(setQuantity(quantity));
  };

  return (
    <Button
      className={`flex w-fit flex-col items-center space-y-2 p-4 pb-3 rounded-2xl shadow-none hover:bg-black/10 hover:shadow-none ${
        quantity === selectedQuantity ? "bg-black/20" : "bg-transparent"
      }`}
      onClick={handleGasTokenClick}
    >
      <TokenImage price={quantity} />

      <h4 className="flex items-center gap-1.5 text-lg font-bold text-black">
        <p className="mt-1">
          {selectedPrice &&
            (selectedPrice.creditCost / 10 ** selectedToken.decimals) *
              quantity}{" "}
        </p>
        <div className="flex items-center justify-center gap-1">
          <Image
            src={`/tokens/${selectedToken.logo}`}
            alt="Valerium Gas Token Logo"
            width={20}
            height={20}
          />
          <p className="mt-1 text-lg">{selectedToken.name}</p>
        </div>
      </h4>
    </Button>
  );
};

export default GasTokenItem;
