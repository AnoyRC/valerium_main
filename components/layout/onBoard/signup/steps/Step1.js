"use client";

import SignupFooter from "@/components/ui/footer/SignupFooter";
import { Input, Button } from "@material-tailwind/react";

const Step1 = () => {
  return (
    <div className="flex flex-col">
      <h1 className="font-gloock text-4xl">Setup your new Wallet</h1>
      <p className="font-noto text-gray-600 text-sm mt-2">
        Find your Favorite Multi Chain Valerium Domain.
      </p>

      <p className="font-noto text-sm text-gray-600 mt-8">
        Your Valerium Domain
      </p>
      <div className="flex w-full mt-2">
        <Input
          label="Choose your domain"
          size="lg"
          className={"rounded-r-none font-noto"}
          labelProps={{
            className: "after:rounded-tr-none font-noto ",
          }}
        />
        <Button
          ripple={false}
          variant="text"
          color="blue-gray"
          className={
            "flex font-noto font-normal items-center rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10 normal-case px-3 text-sm py-0 "
          }
        >
          @valerium
        </Button>
      </div>

      <Button className="mt-8 font-noto font-normal normal-case w-fit bg-gradient-primary-light">
        Select Domain
      </Button>
      <SignupFooter />
    </div>
  );
};

export default Step1;
