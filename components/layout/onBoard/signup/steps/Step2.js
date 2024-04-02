"use client";

import SignupFooter from "@/components/ui/footer/SignupFooter";
import { Input, Button } from "@material-tailwind/react";
import { Fingerprint } from "lucide-react";

const Step2 = () => {
  return (
    <div className="flex flex-col">
      <h1 className="font-gloock text-4xl">Setup your new Wallet</h1>
      <p className="font-noto text-gray-600 text-sm mt-2">
        Give your Password or Passkey to add Authentication to your wallet.
      </p>

      <p className="font-noto text-sm text-gray-600 mt-8">Your Password</p>
      <div className="mt-2">
        <Input label="*******" size="lg" className={"font-noto"} />
      </div>

      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="w-[45%] h-0.5 mt-2 bg-gray-400"></div>
        <p className="text-sm text-gray-600 mt-2">or</p>
        <div className="w-[45%] h-0.5 mt-2 bg-gray-400"></div>
      </div>

      <Button
        color="white"
        className="w-full flex mt-4 h-[5.7rem] px-3 border-[1px] bg-bg-off-white border-black rounded-xl"
      >
        <div className="flex items-center h-full bg-black/90 rounded-lg w-16 justify-center">
          <Fingerprint className="h-5 w-5 text-white" />
        </div>

        <div
          className={
            "flex flex-col ml-3 text-start h-full justify-center normal-case w-56 font-noto "
          }
        >
          <h1 className="text-xl">Add a passkey</h1>
          <p className="text-xs font-normal text-gray-500 w-72 mt-1">
            This will be used to execute transactions
          </p>
        </div>
      </Button>

      <Button className="mt-8 font-noto font-normal normal-case w-fit bg-gradient-primary-light">
        Continue
      </Button>
      <SignupFooter />
    </div>
  );
};

export default Step2;
