"use client";

import { Input, Button } from "@material-tailwind/react";
import { Check, Fingerprint, Info, Loader2Icon } from "lucide-react";

import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSignup from "@/hooks/useSignup";

import { setPasskey, setPassword, setStep } from "@/redux/slice/SignupSlice";

import SummaryMain from "../../Wallet/summarySection/SummaryMain";
import SummaryTotal from "../../Wallet/summarySection/SummaryTotal";
import GaslessToggle from "../../Wallet/actionSection/GaslessToggle";
import SummaryFooter from "../../Wallet/summarySection/SummaryFooter";
import SummaryHeading from "../../Wallet/summarySection/SummaryHeading";

import TokenButton from "@/components/ui/buttons/TokenButton";
import CurrentChainInfo from "@/components/ui/chains/CurrentChainInfo";

const AuthTab = () => {
  const dispatch = useDispatch();

  const { handlePasskey } = useSignup();

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("gas");

  const passkey = useSelector((state) => state.signup.passkey);
  const password = useSelector((state) => state.signup.password);

  const currentChain = useSelector((state) => state.chain.currentChain);
  const [selectedToken, ,] = useSelector((state) => state.selector.token);

  const handlePassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  return (
    <Suspense>
      <div className="mt-4">
        <p className="mt-3 text-base font-normal text-black">
          Update your old Authentication method to update you Valerium Account
          to have a Secured Transaction. An OTP will be sent to your registered
          Email Address to have a successful transaction.
        </p>

        <div className="flex gap-4">
          <div className="flex-1 space-y-4 p-6">
            <h2 className="text-nowrap text-2.5xl font-bold">
              Authentication Update
            </h2>

            <div className="flex items-start gap-8">
              <CurrentChainInfo />

              <TokenButton
                index={0}
                width="1"
                id="auth-recovery-token"
                label="Pay With"
                span=""
                value="Select Token"
                disabled={false}
                chainId={currentChain.chainId}
                style="flex items-center w-full !3xl:space-y-0 !space-y-0"
              />
            </div>

            <div>
              <p className="mt-6 font-noto text-sm font-normal text-black">
                Your Password
              </p>

              <div className="mt-2 text-black">
                <Input
                  label="*******"
                  size="lg"
                  className={"border-black font-noto text-black"}
                  type="password"
                  value={password}
                  disabled={passkey ? true : false}
                  onChange={(e) => handlePassword(e)}
                />

                <p className="mt-2 flex text-sm text-gray-500">
                  <Info size={20} className="mr-1 inline" />
                  Use at least 8 characters, one uppercase, one lowercase and
                  one number.
                </p>
              </div>

              <div className="mt-2 flex items-center justify-center gap-4">
                <div className="mt-2 h-0.5 w-[45%] bg-gray-400"></div>
                <p className="mt-2 text-sm text-gray-600">or</p>
                <div className="mt-2 h-0.5 w-[45%] bg-gray-400"></div>
              </div>

              <Button
                color="white"
                className="mb-5 mt-4 flex h-[5.7rem] w-full rounded-xl border-[1px] border-black bg-bg-off-white px-3"
                onClick={() => handlePasskey(setIsLoading)}
              >
                <div className="flex h-full w-16 items-center justify-center rounded-lg bg-black/90">
                  {passkey ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : isLoading ? (
                    <Loader2Icon className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    <Fingerprint className="h-5 w-5 text-white" />
                  )}
                </div>

                <div
                  className={
                    "ml-3 flex h-full w-56 flex-col justify-center text-start font-noto normal-case "
                  }
                >
                  <h1 className="text-xl">
                    {passkey
                      ? "Passkey Added"
                      : isLoading
                        ? "Adding Passkey"
                        : "Add Passkey"}
                  </h1>
                  <p className="mt-1 w-72 text-xs font-normal text-gray-500">
                    This will be used to execute transactions
                  </p>
                </div>
              </Button>

              {passkey && (
                <p
                  className="mt-2 text-xs text-gray-500 hover:cursor-pointer hover:underline"
                  onClick={() => {
                    dispatch(setPasskey(""));
                  }}
                >
                  Clear Passkey
                </p>
              )}

              <GaslessToggle
                style={currentChain.style}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <Button
                className="mt-8 w-fit bg-gradient-primary-light font-noto font-normal normal-case"
                onClick={() => {
                  dispatch(setStep(2));
                }}
                disabled={(passkey ? false : password.length < 8) || isLoading}
              >
                Recovery
              </Button>
            </div>
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

export default AuthTab;
