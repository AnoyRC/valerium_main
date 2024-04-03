"use client";

import SignupFooter from "@/components/ui/footer/SignupFooter";
import useSignup from "@/hooks/useSignup";
import { setPasskey, setPassword, setStep } from "@/redux/slice/SignupSlice";
import { Input, Button } from "@material-tailwind/react";
import { Check, Fingerprint, Info, Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

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
      <h1 className="font-gloock text-4xl">Setup your new Wallet</h1>
      <p className="font-noto text-gray-600 text-sm mt-2">
        Give your Password or Passkey to add Authentication to your wallet.
      </p>

      <p className="font-noto text-sm text-gray-600 mt-8">Your Password</p>
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
        <p className="mt-2 text-sm flex text-gray-500">
          <Info size={20} className="inline mr-1" />
          Use at least 8 characters, one uppercase, one lowercase and one
          number.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="w-[45%] h-0.5 mt-2 bg-gray-400"></div>
        <p className="text-sm text-gray-600 mt-2">or</p>
        <div className="w-[45%] h-0.5 mt-2 bg-gray-400"></div>
      </div>

      <Button
        color="white"
        className="w-full flex mt-4 h-[5.7rem] px-3 border-[1px] bg-bg-off-white border-black rounded-xl"
        onClick={() => handlePasskey(setIsLoading)}
      >
        <div className="flex items-center h-full bg-black/90 rounded-lg w-16 justify-center">
          {passkey ? (
            <Check className="text-white h-5 w-5" />
          ) : isLoading ? (
            <Loader2Icon className="text-white h-5 w-5 animate-spin" />
          ) : (
            <Fingerprint className="text-white h-5 w-5" />
          )}
        </div>

        <div
          className={
            "flex flex-col ml-3 text-start h-full justify-center normal-case w-56 font-noto "
          }
        >
          <h1 className="text-xl">
            {passkey
              ? "Passkey Added"
              : isLoading
              ? "Adding Passkey"
              : "Add Passkey"}
          </h1>
          <p className="text-xs font-normal text-gray-500 w-72 mt-1">
            This will be used to execute transactions
          </p>
        </div>
      </Button>
      {passkey && (
        <p
          className="text-xs mt-2 text-gray-500 hover:cursor-pointer hover:underline"
          onClick={() => {
            dispatch(setPasskey(""));
          }}
        >
          Clear Passkey
        </p>
      )}

      <Button
        className="mt-8 font-noto font-normal normal-case w-fit bg-gradient-primary-light"
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
