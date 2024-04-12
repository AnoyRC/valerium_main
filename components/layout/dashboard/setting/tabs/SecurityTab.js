"use client";

import { Button } from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { Suspense, useState } from "react";

import SummaryMain from "../../Wallet/summarySection/SummaryMain";
import SummaryTotal from "../../Wallet/summarySection/SummaryTotal";
import GaslessToggle from "../../Wallet/actionSection/GaslessToggle";
import SummaryFooter from "../../Wallet/summarySection/SummaryFooter";
import SummaryHeading from "../../Wallet/summarySection/SummaryHeading";

import ValeriumInput from "@/components/ui/input/ValeriumInput";

const SecurityTab = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("gas");

  const currentChain = useSelector((state) => state.chain.currentChain);
  const [, selectedToken] = useSelector((state) => state.selector.token);

  const handleEmail = () => {
    console.log("Email Updated");
  };

  return (
    <Suspense>
      <div className="mt-4">
        <p className="mt-3 text-base font-normal text-black">
          Update your Email address to add recovery to your Valerium Account if
          you ever lose access. Updating the Account email address will require
          a OTP.
        </p>

        <div className="flex gap-4">
          <div className="flex-1">
            <section className="flex-1 space-y-6 p-6">
              <p className="text-nowrap text-2.5xl font-bold">
                Account Recovery
              </p>

              <ValeriumInput
                label="Email Address"
                id="recipient-transfer"
                type="text"
                placeholder="noober@valerium.id"
                required={true}
                input={input}
                setInput={setInput}
              />

              <GaslessToggle
                style={currentChain.style}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <Button
                className="mt-8 flex h-10 w-32 items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
                onClick={handleEmail}
                disabled={isLoading || !input}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Verify Email"
                )}
              </Button>
            </section>
          </div>

          <div className="flex-1">
            <section className="flex-1 space-y-5 p-6">
              <SummaryHeading />
              <hr className="border-border-light" />

              <SummaryMain
                amount={-1}
                token={selectedToken}
                usdToggle={false}
              />

              <hr className="border-border-light" />

              <SummaryFooter
                token={selectedToken}
                amount={-1}
                usdToggle={false}
              />

              <SummaryTotal token={selectedToken} usdToggle={false} />
            </section>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SecurityTab;
