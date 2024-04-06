"use client";

import { Send } from "lucide-react";
import { Button } from "@material-tailwind/react";

import Link from "next/link";

import FormatNumber from "@/components/ui/FormatNumber";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const AccountBalance = () => {
  const searchParams = useSearchParams();
  const currentChain = useSelector((state) => state.chain.currentChain);
  const balanceData = useSelector((state) => state.user.balanceData);
  const conversionData = useSelector((state) => state.user.conversionData);
  const [balance, setBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);

  useEffect(() => {
    if (balanceData && balanceData.length > 0) {
      let totalEth = 0;
      const selectedBalanceData = balanceData.find((data) => {
        return data.chainId === currentChain.chainId;
      });
      const selectedConversionData = conversionData.find((data) => {
        return data.chainId === currentChain.chainId;
      });

      totalEth += selectedBalanceData.balance / 10 ** 18;

      for (let i = 0; i < selectedBalanceData.erc20Balances.length; i++) {
        const erc20Balance =
          selectedBalanceData.erc20Balances[i].balance /
          10 ** selectedBalanceData.erc20Balances[i].decimals;
        const conversionRate = selectedConversionData.tokens[i].value;

        totalEth += Number(erc20Balance) / Number(conversionRate);
      }

      setBalance(totalEth);
      setUsdBalance(Number(totalEth) * Number(selectedConversionData.value));
    }
  }, [balanceData, currentChain, conversionData]);

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
            {searchParams.get("domain")}
            <span className=" bg-gradient-primary-light bg-clip-text text-transparent">
              @valerium
            </span>
          </h2>

          <div className="space-y-0.5">
            <FormatNumber
              number={usdBalance}
              size="text-4xl"
              integerSize="text-6xl"
              decimalSize="text-5xl"
            />

            <p className="text-text-gray font-medium">
              {balance.toFixed(4)}{" "}
              <span className={`font-bold text-[#0052FF]`}>
                {" "}
                {currentChain.symbol}
              </span>
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
