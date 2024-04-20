"use client";

import { Suspense, useState } from "react";
import { useSelector } from "react-redux";

import AuthAction from "./authTab/AuthAction";
import AuthSummary from "./authTab/AuthSummary";

const AuthTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("gas");

  const [password, setPassword] = useState("");
  const [passkey, setPasskey] = useState("");

  const currentChain = useSelector((state) => state.chain.currentChain);
  const [, selectedToken] = useSelector((state) => state.selector.token);

  const { style } = currentChain;
  const recoveryProof = useSelector((state) => state.proof.recoveryProof);

  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <Suspense>
      <div className="mt-4">
        <p className="mt-3 text-base font-normal text-black">
          Update your old Authentication method to update you Valerium Account
          to have a Secured Transaction. An OTP will be sent to your registered
          Email Address to have a successful transaction.
        </p>

        <div className="flex gap-4">
          <AuthAction
            currentChain={currentChain}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            style={style}
            recoveryProof={recoveryProof}
            isConfirm={isConfirm}
            setIsConfirm={setIsConfirm}
            password={password}
            handlePassword={setPassword}
            passkey={passkey}
            setPasskey={setPasskey}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedToken={selectedToken}
          />
          <AuthSummary
            selectedToken={selectedToken}
            password={password}
            passkey={passkey}
            activeTab={activeTab}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default AuthTab;
