"use client";

import SignupFooter from "@/components/ui/footer/SignupFooter";
import { Input, Button } from "@material-tailwind/react";

const Step3 = () => {
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
        />
      </div>

      <Button className="mt-8 font-noto font-normal normal-case w-fit bg-gradient-primary-light">
        Verify Email
      </Button>
      <SignupFooter />
    </div>
  );
};

export default Step3;
