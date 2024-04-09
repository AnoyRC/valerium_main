"use client";

import SignupFooter from "@/components/ui/footer/SignupFooter";
import useSignup from "@/hooks/useSignup";
import { setEmail } from "@/redux/slice/SignupSlice";
import { Input, Button } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Step3 = () => {
  const { handleEmail } = useSignup();
  const [isLoading, setIsLoading] = useState(false);
  const email = useSelector((state) => state.signup.email);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <h1 className="font-gloock text-4xl">Setup your new Wallet</h1>
      <p className="mt-2 font-noto text-sm text-gray-600">
        Verify your Email to Deploy your wallet.
      </p>

      <p className="mt-8 font-noto text-sm text-gray-600">Your Email Address</p>
      <div className="mt-2 flex w-full">
        <Input
          label="abc@gmail.com"
          size="lg"
          className={"font-noto"}
          labelProps={{
            className: "font-noto",
          }}
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
      </div>

      <Button
        className="mt-8 flex h-10 w-32 items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
        onClick={() => handleEmail(setIsLoading)}
        disabled={isLoading || !email}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Verify Email"
        )}
      </Button>
      <SignupFooter />
    </div>
  );
};

export default Step3;
