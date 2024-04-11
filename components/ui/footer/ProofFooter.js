"use client";

import { setTxProof } from "@/redux/slice/proofSlice";
import { useSelector, useDispatch } from "react-redux";

export default function ProofFooter({ children }) {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const dispatch = useDispatch();
  const txProof = useSelector((state) => state.proof.txProof);
  return (
    <div className="flex flex-col gap-2">
      {children}

      {txProof && (
        <p className="text-gray-600 text-sm">
          Approval has been granted.{" "}
          <span
            className="hover:cursor-pointer hover:underline"
            style={{
              color: currentChain.style.colorLight,
            }}
            onClick={() => {
              dispatch(setTxProof(null));
            }}
          >
            Remove Approval
          </span>
        </p>
      )}
    </div>
  );
}
