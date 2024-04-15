"use Client";

import ValeriumInput from "@/components/ui/input/ValeriumInput";
import GaslessToggle from "../../../Wallet/actionSection/GaslessToggle";
import RecoveryFooter from "@/components/ui/footer/RecoveryFooter";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { CircleHelp, MoveUpRight, CirclePlus } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setRecoveryProof,
  toggleRecoveryDrawer,
} from "@/redux/slice/proofSlice";
import validEmail from "@/components/ui/ValidEmail";
import { toast } from "sonner";
import useChange from "@/hooks/useChange";

export default function SecurityAction({
  input,
  setInput,
  activeTab,
  setActiveTab,
  currentChain,
  isConfirm,
  setIsConfirm,
  selectedToken,
}) {
  const { style } = currentChain;
  const recoveryProof = useSelector((state) => state.proof.recoveryProof);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.proof.email);
  const { changeRecovery } = useChange();

  const handleClick = async () => {
    try {
      if (!recoveryProof) {
        dispatch(toggleRecoveryDrawer());
        return;
      }
      if (!isConfirm) {
        setIsConfirm(true);
        return;
      }

      toast.promise(() => changeRecovery(input, selectedToken), {
        loading: "Processing Recovery...",
      });

      setIsConfirm(false);
      setInput("");
      dispatch(setRecoveryProof(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1">
      <section className="flex-1 space-y-6 py-6">
        <p className="text-nowrap text-2.5xl font-bold">Account Recovery</p>

        <ValeriumInput
          label="Email Address"
          id="recipient-transfer"
          type="text"
          placeholder="abc@xyz.com"
          required={true}
          input={input}
          setInput={setInput}
        />

        <GaslessToggle
          style={currentChain.style}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <RecoveryFooter disabled={isConfirm}>
          <div className="flex gap-4 ">
            <ActionButton
              style={style}
              label={
                recoveryProof
                  ? isConfirm
                    ? "Confirm"
                    : "Recover"
                  : "Authorize"
              }
              icon={
                isConfirm ? <CircleHelp size="24" /> : <MoveUpRight size="24" />
              }
              handleClick={() => {
                handleClick();
              }}
              disabled={
                !email || recoveryProof
                  ? !validEmail(input) || input === email
                  : false
              }
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
      </section>
    </div>
  );
}
