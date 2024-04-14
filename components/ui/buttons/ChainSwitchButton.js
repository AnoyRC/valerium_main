"use client";

import { Button } from "@material-tailwind/react";
import { MoveUpRight } from "lucide-react";

import { useSelector } from "react-redux";

const ChainSwitchButton = () => {
  const { style } = useSelector((state) => state.chain.currentChain);

  return (
    <Button
      className="flex items-center gap-2 rounded-full"
      style={{
        background: style.gradientColorLight,
      }}
    >
      Switch <MoveUpRight size={16} />
    </Button>
  );
};

export default ChainSwitchButton;
