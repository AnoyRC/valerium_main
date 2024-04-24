"use client";

import AuthInput from "./AuthInput";

import SummaryProcessing from "../../../Wallet/summarySection/SummaryProcessing";
import GaslessToggle from "../../../Wallet/actionSection/GaslessToggle";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { CircleHelp, MoveUpRight, CirclePlus } from "lucide-react";
import RecoveryFooter from "@/components/ui/footer/RecoveryFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecoveryProof,
  toggleRecoveryDrawer,
} from "@/redux/slice/proofSlice";
import useRecovery from "@/hooks/useRecovery";
import { toast } from "sonner";

export default function AuthAction({
  currentChain,
  activeTab,
  setActiveTab,
  style,
  recoveryProof,
  isConfirm,
  setIsConfirm,
  password,
  handlePassword,
  passkey,
  setPasskey,
  isLoading,
  setIsLoading,
  selectedToken,
}) {
  const dispatch = useDispatch();
  const { executeRecovery, executeRecoveryGasless } = useRecovery();
  const email = useSelector((state) => state.proof.email);
  const isRunning = useSelector((state) => state.tx.isRunning);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (!recoveryProof) {
        dispatch(toggleRecoveryDrawer());
        return;
      }
      if (!isConfirm) {
        setIsConfirm(true);
        return;
      }

      if (isRunning) {
        toast.error("Transaction is already in progress.");
        return;
      }

      if (activeTab === "gas") {
        toast.promise(() => executeRecovery(passkey, password, selectedToken), {
          loading: "Processing Recovery...",
        });
      } else {
        toast.promise(() => executeRecoveryGasless(passkey, password), {
          loading: "Processing Recovery...",
        });
      }

      setIsConfirm(false);
      setPasskey("");
      handlePassword("");
      dispatch(setRecoveryProof(null));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 py-6">
      <h2 className="text-nowrap text-2.5xl font-bold">
        Authentication Update
      </h2>

      <div className="flex items-start gap-8">
        <SummaryProcessing />
      </div>

      <div>
        <AuthInput
          password={password}
          handlePassword={handlePassword}
          passkey={passkey}
          isLoading={isLoading}
          setPasskey={setPasskey}
          setIsLoading={setIsLoading}
          isConfirm={isConfirm}
        />

        <GaslessToggle
          style={currentChain.style}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          disabled={isConfirm}
        />

        <RecoveryFooter disabled={isConfirm}>
          <div className="flex gap-4 mt-6">
            <ActionButton
              style={style}
              label={
                recoveryProof ? (isConfirm ? "Confirm" : "Change") : "Authorize"
              }
              icon={
                isConfirm ? <CircleHelp size="24" /> : <MoveUpRight size="24" />
              }
              handleClick={() => {
                handleClick();
              }}
              disabled={!email || recoveryProof ? !passkey && !password : false}
            />
            {isConfirm && (
              <ActionButton
                style={style}
                label={"Cancel"}
                icon={<CirclePlus size="24" className="rotate-45" />}
                handleClick={() => {
                  setIsConfirm(false);
                }}
              />
            )}
          </div>
        </RecoveryFooter>
      </div>
    </div>
  );
}
