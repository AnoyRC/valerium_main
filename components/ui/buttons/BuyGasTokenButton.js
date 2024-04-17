"use client";

import { MoveUpRight } from "lucide-react";
import { Button } from "@material-tailwind/react";

import { useSelector } from "react-redux";

import VerifyGasToken from "@/components/layout/dashboard/store/VerifyGasToken";

const BuyGasTokenButton = () => {
  const price = useSelector((state) => state.gasToken.price);
  const currentChain = useSelector((state) => state.chain.currentChain);

  return (
    <div className="space-y-2">
      <Button
        className="flex items-center justify-center gap-2 rounded-full"
        style={{
          background: currentChain.style.gradientColorLight,
        }}
        fullWidth
        disabled={price === 0}
      >
        <p> Buy {price === 0 || price}</p> Tokens <MoveUpRight size={16} />
      </Button>

      <VerifyGasToken color={currentChain.style.colorLight} />
    </div>
  );
};

export default BuyGasTokenButton;
