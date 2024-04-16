"use client";

import { Button } from "@material-tailwind/react";
import { MoveUpRight, X } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import baseChain from "@/lib/baseChain";
import { setTxProof, toggleProofDrawer } from "@/redux/slice/proofSlice";

const ChainApproveButton = () => {
  const { style } = useSelector((state) => state.chain.currentChain);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const txProof = useSelector((state) => state.proof.txProof);
  const dispatch = useDispatch();

  return (
    currentChain.chainId === baseChain.chainId && (
      <Button
        className="flex items-center gap-2 rounded-full"
        style={{
          background: style.gradientColorLight,
        }}
        onClick={() => {
          if (!txProof) {
            dispatch(toggleProofDrawer());
          } else {
            dispatch(setTxProof(null));
          }
        }}
      >
        {txProof ? (
          <>
            Remove Approval <X size={16} />
          </>
        ) : (
          <>
            Approve <MoveUpRight size={16} />
          </>
        )}
      </Button>
    )
  );
};

export default ChainApproveButton;
