"use client";

import SignupFooter from "@/components/ui/footer/SignupFooter";
import useSignup from "@/hooks/useSignup";
import { setPasskey, setPassword, setStep } from "@/redux/slice/SignupSlice";
import { Input, Button } from "@material-tailwind/react";
import { Check, Fingerprint, Info, Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CurrentChainInfo from "@/components/ui/chains/CurrentChainInfo";

const Step2 = () => {
  const dispatch = useDispatch();
  const password = useSelector((state) => state.signup.password);
  const { handlePasskey } = useSignup();
  const passkey = useSelector((state) => state.signup.passkey);
  const [isLoading, setIsLoading] = useState(false);

  const handlePassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  return (
    <div className="flex flex-col">
      <CurrentChainInfo label="Deploying on" />
      <h1 className="font-gloock text-4xl mt-5">Setup your new Wallet</h1>
      <p className="mt-2 font-noto text-sm text-gray-600">
        Give your Password or Passkey to add Authentication to your wallet.
      </p>

      <p className="mt-8 font-noto text-sm text-gray-600">Your Password</p>
      <div className="mt-2">
        <Input
          label="*******"
          size="lg"
          className={"font-noto"}
          type="password"
          value={password}
          disabled={passkey ? true : false}
          onChange={(e) => handlePassword(e)}
        />
        <p className="mt-2 flex text-sm text-gray-500">
          <Info size={20} className="mr-1 inline" />
          Use at least 8 characters, one uppercase, one lowercase and one
          number.
        </p>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <div className="mt-2 h-0.5 w-[45%] bg-gray-400"></div>
        <p className="mt-2 text-sm text-gray-600">or</p>
        <div className="mt-2 h-0.5 w-[45%] bg-gray-400"></div>
      </div>

      <Button
        color="white"
        className="mt-4 flex h-[5.7rem] w-full rounded-xl border-[1px] border-black bg-bg-off-white px-3"
        onClick={() => handlePasskey(setIsLoading)}
      >
        <div className="flex h-full w-16 items-center justify-center rounded-lg bg-black/90">
          {passkey ? (
            <Check className="h-5 w-5 text-white" />
          ) : isLoading ? (
            <Loader2Icon className="h-5 w-5 animate-spin text-white" />
          ) : (
            <Fingerprint className="h-5 w-5 text-white" />
          )}
        </div>

        <div
          className={
            "ml-3 flex h-full w-56 flex-col justify-center text-start font-noto normal-case "
          }
        >
          <h1 className="text-xl">
            {passkey
              ? "Passkey Added"
              : isLoading
              ? "Adding Passkey"
              : "Add Passkey"}
          </h1>
          <p className="mt-1 w-72 text-xs font-normal text-gray-500">
            This will be used to execute transactions
          </p>
        </div>
      </Button>
      {passkey && (
        <p
          className="mt-2 text-xs text-gray-500 hover:cursor-pointer hover:underline"
          onClick={() => {
            dispatch(setPasskey(""));
          }}
        >
          Clear Passkey
        </p>
      )}

      <Button
        className="mt-8 w-fit bg-gradient-primary-light font-noto font-normal normal-case"
        onClick={() => {
          dispatch(setStep(2));
        }}
        disabled={(passkey ? false : password.length < 8) || isLoading}
      >
        Continue
      </Button>
      <SignupFooter />
    </div>
  );
};

export default Step2;
