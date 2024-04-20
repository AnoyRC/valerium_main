"use client";

import { useSelector } from "react-redux";
import { Suspense, useState } from "react";
import SecuritySummary from "./securityTab/SecuritySummary";
import SecurityAction from "./securityTab/SecurityAction";

const SecurityTab = () => {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("gas");
  const [isConfirm, setIsConfirm] = useState(false);

  const currentChain = useSelector((state) => state.chain.currentChain);
  const [, selectedToken] = useSelector((state) => state.selector.token);

  return (
    <Suspense>
      <div className="mt-4">
        <p className="mt-3 text-base font-normal text-black">
          Update your Email address to add recovery to your Valerium Account if
          you ever lose access. Updating the Account email address will require
          a OTP.
        </p>

        <div className="flex gap-4">
          <SecurityAction
            input={input}
            setInput={setInput}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentChain={currentChain}
            isConfirm={isConfirm}
            setIsConfirm={setIsConfirm}
            selectedToken={selectedToken}
          />
          <SecuritySummary
            selectedToken={selectedToken}
            input={input}
            activeTab={activeTab}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default SecurityTab;
