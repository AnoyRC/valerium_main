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
      <p className="font-noto text-gray-600 text-sm mt-2">
        Verify your Email to Deploy your wallet.
      </p>

      <p className="font-noto text-sm text-gray-600 mt-8">Your Email Address</p>
      <div className="flex w-full mt-2">
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
        className="mt-8 w-32 h-10 font-noto font-normal normal-case bg-gradient-primary-light flex items-center justify-center"
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
