"use client";

import useSignup from "@/hooks/useSignup";
import { ClearAll, setStep } from "@/redux/slice/SignupSlice";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import OTPInput from "react-otp-input";

export default function Step4() {
  const dispatch = useDispatch();
  const { deployWallet } = useSignup();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const domain = useSelector((state) => state.signup.domain)?.toLowerCase();
  const [code, setCode] = useState("");
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
      <p className="mt-2 font-noto text-sm text-gray-600">
        {isSuccess
          ? "Your wallet has been deployed successfully."
          : isLoading
          ? "Hold tight, we are deploying your wallet."
          : "Your Wallet is ready to deploy. Click the button below to deploy your wallet."}
      </p>

      {!isLoading && !isSuccess && (
        <>
          <div className="w-[400px] mt-4 -mb-2">
            <p className="font-noto text-sm text-gray-600 mb-2">Invite Code</p>
            <OTPInput
              onChange={(e) => {
                setCode(e?.toLowerCase());
              }}
              value={code}
              inputStyle="inputStyle"
              numInputs={6}
              separator={<span></span>}
              containerStyle={{
                marginLeft: "-5px",
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    color: "black",
                    width: "100%",
                    outline: "2px solid transparent",
                    outlineOffset: "2px",
                    background: "transparent",
                    borderWidth: "1px",
                    borderColor: "black",
                    borderRadius: "10px",
                    textAlign: "center",
                    height: "60px",
                    margin: "0 5px",
                    opacity: "0.7",
                    fontSize: "30px",
                  }}
                  placeholder="-"
                />
              )}
            />
          </div>
          <Button
            className="mt-8 flex h-10 w-32 items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
            onClick={() =>
              deployWallet(setIsLoading, setIsSuccess, setMessage, code)
            }
            disabled={code.length !== 6}
          >
            Deploy Wallet
          </Button>
          <p className="mt-3 font-noto text-xs text-gray-600">
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
          <p className="mt-10 flex text-sm text-gray-500">
            <Loader2 size={20} className="mr-1 inline animate-spin " />
            {message}
          </p>
        </>
      )}

      {isSuccess && !isLoading && (
        <Button
          className="mt-8 flex h-10 w-48 items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
          onClick={() => {
            router.push(`/home?domain=${domain}`);
            dispatch(ClearAll());
          }}
        >
          Go to Dashboard
        </Button>
      )}
    </div>
  );
}
