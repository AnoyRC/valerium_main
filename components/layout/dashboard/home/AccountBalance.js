"use client";

import { Send } from "lucide-react";
import { Button } from "@material-tailwind/react";

import Link from "next/link";

import FormatNumber from "@/components/ui/FormatNumber";

const AccountBalance = () => {
  return (
    <div className="rounded-xl border border-border-light bg-gradient-light-linear/85 overflow-hidden">
      <section
        className="px-5 py-6 flex justify-between "
        style={{
          background:
            "linear-gradient(40deg, rgba(255, 255, 255, 0.00) 60%, rgba(85, 140, 255, 0.00) 60%, rgba(0, 82, 255, 0.9) 100%)",
        }}
      >
        <div className="space-y-2">
          <h2 className="font-medium">
            nooberBoy
            <span className=" bg-gradient-primary-light bg-clip-text text-transparent">
              @valerium
            </span>
          </h2>

          <div className="space-y-0.5">
            <FormatNumber
              number={0.4947}
              size="text-4xl"
              integerSize="text-6xl"
              decimalSize="text-5xl"
            />

            <p className="text-text-gray font-medium">
              ~ 0.4947
              <span className={`font-bold text-[#0052FF]`}> ETH</span>
            </p>
          </div>
        </div>

        <div className="text-right flex flex-col justify-between">
          <p className="text-white text-xl font-semibold">Base</p>

          <div className="space-x-5">
            <Button className="bg-gradient-primary-light text-white border-2 border-black p-3 rounded-full">
              <Link href="/transfer">
                <Send size={24} className="-translate-x-0.5 translate-y-0.5" />
              </Link>
            </Button>

            <Button className="bg-gradient-primary-light text-white border-2 border-black p-3 rounded-full">
              <Link href="/deposit">
                <Send
                  size={24}
                  className="rotate-180 translate-x-0.5 -translate-y-0.5"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountBalance;
