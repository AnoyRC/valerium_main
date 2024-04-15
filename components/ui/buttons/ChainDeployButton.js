"use client";

import { MoveUpRight } from "lucide-react";
import { Button } from "@material-tailwind/react";

const ChainDeployButton = ({ onClick, backgroundColor }) => {
  return (
    <Button
      className="flex items-center gap-2 rounded-full"
      style={{
        background: backgroundColor,
      }}
    >
      Deploy <MoveUpRight size={16} />
    </Button>
  );
};

export default ChainDeployButton;
