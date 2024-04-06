"use client";

import useSignup from "@/hooks/useSignup";
import { ClearAll, setStep } from "@/redux/slice/SignupSlice";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Step4() {
  const dispatch = useDispatch();
  const { deployWallet } = useSignup();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <h1 className="font-gloock text-4xl">
        {isSuccess
          ? "Wallet Deployed"
          : isLoading
          ? "Deploying Wallet"
          : "Ready to Deploy"}
      </h1>
      <p className="font-noto text-gray-600 text-sm mt-2">
        {isSuccess
          ? "Your wallet has been deployed successfully."
          : isLoading
          ? "Hold tight, we are deploying your wallet."
          : "Your Wallet is ready to deploy. Click the button below to deploy your wallet."}
      </p>

      {!isLoading && !isSuccess && (
        <>
          {" "}
          <Button
            className="mt-8 w-32 h-10 font-noto font-normal normal-case bg-gradient-primary-light flex items-center justify-center"
            onClick={() => deployWallet(setIsLoading, setIsSuccess, setMessage)}
          >
            Deploy Wallet
          </Button>
          <p className="font-noto text-xs text-gray-600 mt-3">
            Don't like your domain?{" "}
            <span
              className="text-highlight-pink hover:cursor-pointer"
              onClick={() => dispatch(setStep(0))}
            >
              Update
            </span>
          </p>
        </>
      )}

      {isLoading && (
        <>
          <p className="mt-10 text-sm flex text-gray-500">
            <Loader2 size={20} className="inline mr-1 animate-spin " />
            {message}
          </p>
        </>
      )}

      {isSuccess && !isLoading && (
        <Button
          className="mt-8 w-48 h-10 font-noto font-normal normal-case bg-gradient-primary-light flex items-center justify-center"
          onClick={() => {
            dispatch(ClearAll());
            router.push("/home");
          }}
        >
          Go to Dashboard
        </Button>
      )}
    </div>
  );
}
