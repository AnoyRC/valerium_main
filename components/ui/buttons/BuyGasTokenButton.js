"use client";

import { MoveUpRight } from "lucide-react";
import { Button } from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";

import VerifyGasToken from "@/components/layout/dashboard/store/VerifyGasToken";
import { setTxProof, toggleProofDrawer } from "@/redux/slice/proofSlice";
import { useState } from "react";
import ProofFooter from "../footer/ProofFooter";
import { toast } from "sonner";
import useBuy from "@/hooks/useBuy";

const BuyGasTokenButton = () => {
  const price = useSelector((state) => state.gasToken.quantity);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const txProof = useSelector((state) => state.proof.txProof);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.proof.type);
  const [isConfirm, setIsConfirm] = useState(false);
  const { buy } = useBuy();
  const isRunning = useSelector((state) => state.tx.isRunning);

  const handleBuyGasToken = () => {
    if (!txProof) {
      dispatch(toggleProofDrawer());
      return;
    }

    if (!isConfirm) {
      setIsConfirm(true);
      return;
    }

    if (isRunning) {
      toast.error("Transaction is already in progress.");
      return;
    }

    toast.promise(() => buy(txProof), {
      loading: "Processing...",
    });

    setIsConfirm(false);
    dispatch(setTxProof(null));
  };

  return (
    <div className="space-y-3">
      <VerifyGasToken currentChain={currentChain} />
      <ProofFooter disabled={isConfirm}>
        <div className="flex items-center justify-between gap-3">
          <Button
            className="flex items-center p-4 normal-case font-noto text-base justify-center gap-1 rounded-full"
            style={{
              background: currentChain.style.gradientColorLight,
            }}
            fullWidth
            disabled={!type ? true : txProof ? price === 0 : false}
            onClick={handleBuyGasToken}
          >
            {txProof ? (
              !isConfirm ? (
                <>
                  <p>
                    {" "}
                    Buy <span>{price === 0 || price}</span>
                  </p>
                  <p>{price && Number(price) === 1 ? "Token" : "Tokens"} </p>
                </>
              ) : (
                "Confirm"
              )
            ) : (
              "Approve"
            )}
            <MoveUpRight size={16} />
          </Button>

          {isConfirm && (
            <Button
              className="flex items-center p-4 normal-case font-noto text-base justify-center gap-1 rounded-full"
              style={{
                background: currentChain.style.gradientColorLight,
              }}
              fullWidth
              onClick={() => setIsConfirm(false)}
            >
              Cancel
              <MoveUpRight size={16} />
            </Button>
          )}
        </div>
      </ProofFooter>
    </div>
  );
};

export default BuyGasTokenButton;
