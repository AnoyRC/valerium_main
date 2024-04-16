"use client";

import { MoveUpRight, X } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const ChainDeployButton = ({
  onClick,
  backgroundColor,
  text,
  isConfirm,
  setIsConfirm,
}) => {
  const isDeploying = useSelector((state) => state.proof.isDeploying);

  return (
    <div className="flex gap-2">
      <Button
        className="flex items-center gap-2 rounded-full"
        style={{
          background: backgroundColor,
        }}
        onClick={onClick}
        disabled={isDeploying}
      >
        {text} <MoveUpRight size={16} />
      </Button>

      {isConfirm && (
        <Button
          className="flex items-center gap-2 rounded-full"
          style={{
            background: backgroundColor,
          }}
          onClick={() => {
            setIsConfirm(false);
          }}
        >
          Cancel <X size={16} />
        </Button>
      )}
    </div>
  );
};

export default ChainDeployButton;
