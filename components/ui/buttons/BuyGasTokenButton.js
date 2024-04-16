"use client";

import { MoveUpRight } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import VerifyGasToken from "@/components/layout/dashboard/store/VerifyGasToken";

const BuyGasTokenButton = ({ price }) => {
  const { style } = useSelector((state) => state.chain.currentChain);

  return (
    <div className="space-y-2">
      <Button
        className="flex items-center justify-center gap-2 rounded-full"
        style={{
          background: style.gradientColorLight,
        }}
        fullWidth
      >
        Buy {price} Tokens <MoveUpRight size={16} />
      </Button>

      <VerifyGasToken color={style.colorLight} />
    </div>
  );
};

export default BuyGasTokenButton;
