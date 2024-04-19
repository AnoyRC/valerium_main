"use client";

import { toggleVerifyCreditDrawer } from "@/redux/slice/gasTokenSlice";
import { useDispatch } from "react-redux";

const VerifyGasToken = ({ currentChain }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex space-x-2 text-gray-600 text-sm">
      <p>Didn’t receive your token?</p>
      <span
        className="hover:cursor-pointer hover:underline"
        style={{
          color: currentChain.style.colorLight,
        }}
        onClick={() => {
          dispatch(toggleVerifyCreditDrawer());
        }}
      >
        Verify Transaction
      </span>
    </div>
  );
};

export default VerifyGasToken;
