"use client";

import {
  MoveUpRight,
  MousePointer2,
  CircleHelp,
  CirclePlus,
} from "lucide-react";

import { useSelector } from "react-redux";
import { useState } from "react";
import ActionNote from "../Wallet/actionSection/ActionNote";
import ActionHeading from "../Wallet/actionSection/ActionHeading";
import ActionProcess from "../Wallet/actionSection/ActionProcess";
import GaslessToggle from "../Wallet/actionSection/GaslessToggle";

import TransferInput from "./TransferInput";

import ActionButton from "@/components/ui/buttons/ActionButton";
import { setTxProof, toggleProofDrawer } from "@/redux/slice/proofSlice";
import { useDispatch } from "react-redux";
import ProofFooter from "@/components/ui/footer/ProofFooter";
import useExecute from "@/hooks/useExecute";
import { toast } from "sonner";
import { ethers } from "ethers";

const TransferAction = ({
  amount,
  setAmount,
  recipient,
  setRecipient,
  activeTab,
  setActiveTab,
  usdToggle,
  setUsdToggle,
  isValid,
  setIsValid,
}) => {
  const [selectedToken, gasToken] = useSelector(
    (state) => state.selector.token
  );
  const { chainName, style } = useSelector((state) => state.chain.currentChain);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const dispatch = useDispatch();
  const txProof = useSelector((state) => state.proof.txProof);
  const [isLoading, setIsLoading] = useState(false);
  const type = useSelector((state) => state.proof.type);
  const tokenBalanceData = useSelector((state) => state.user.tokenBalanceData);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );
  const isRunning = useSelector((state) => state.tx.isRunning);
  const [isConfirm, setIsConfirm] = useState(false);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const { execute, executeGasless } = useExecute();
  const gasCredit = useSelector((state) => state.user.gasCredit);

  const currentToken =
    selectedToken &&
    tokenBalanceData &&
    tokenBalanceData.find((token) => token.address === selectedToken.address);

  const token = currentToken
    ? currentToken.balance / 10 ** currentToken.decimals
    : "0.00";

  const currentTokenConversion = selectedToken
    ? tokenConversionData !== null
      ? 1 /
          tokenConversionData.find(
            (token) => token.address === selectedToken.address
          ).usdValue || 1
      : 0
    : 0;

  const handleExecute = async () => {
    if (isRunning) {
      toast.error("Transaction is already in progress.");
      return;
    }

    if (selectedToken.address === null) {
      if (!usdToggle) {
        if (activeTab === "gasless")
          toast.promise(
            () =>
              executeGasless(
                walletAddresses,
                txProof,
                recipient,
                Number(amount * 10 ** selectedToken.decimals).toFixed(0),
                "0x",
                type
              ),
            {
              loading: "Sending...",
            }
          );
        else
          toast.promise(
            () =>
              execute(
                walletAddresses,
                gasToken,
                txProof,
                recipient,
                Number(amount * 10 ** selectedToken.decimals).toFixed(0),
                "0x",
                type
              ),
            {
              loading: "Sending...",
            }
          );
      } else {
        if (activeTab === "gasless")
          toast.promise(
            () =>
              executeGasless(
                walletAddresses,
                txProof,
                recipient,
                Number(
                  (amount / currentTokenConversion) *
                    10 ** selectedToken.decimals
                ).toFixed(0),
                "0x",
                type
              ),
            {
              loading: "Sending...",
            }
          );
        else
          toast.promise(
            () =>
              execute(
                walletAddresses,
                gasToken,
                txProof,
                recipient,
                Number(
                  (amount / currentTokenConversion) *
                    10 ** selectedToken.decimals
                ).toFixed(0),
                "0x",
                type
              ),
            {
              loading: "Sending...",
            }
          );
      }
    } else {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );
      const erc20Token = new ethers.Contract(
        selectedToken.address,
        ["function transfer(address to, uint256 value) returns (bool)"],
        provider
      );
      let data;
      if (!usdToggle) {
        data = erc20Token.interface.encodeFunctionData("transfer", [
          recipient,
          ethers.utils.parseUnits(amount, selectedToken.decimals),
        ]);
      } else {
        data = erc20Token.interface.encodeFunctionData("transfer", [
          recipient,
          ethers.utils.parseUnits(
            (amount / currentTokenConversion).toFixed(selectedToken.decimals),
            selectedToken.decimals
          ),
        ]);
      }
      if (activeTab === "gasless") {
        toast.promise(
          () =>
            executeGasless(
              walletAddresses,
              txProof,
              selectedToken.address,
              0,
              data,
              type
            ),
          {
            loading: "Sending...",
          }
        );
      } else {
        toast.promise(
          () =>
            execute(
              walletAddresses,
              gasToken,
              txProof,
              selectedToken.address,
              0,
              data,
              type
            ),
          {
            loading: "Sending...",
          }
        );
      }
    }

    setIsConfirm(false);
    setAmount("");
    setRecipient("");
    setIsValid(false);
    dispatch(setTxProof(null));
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (!txProof) {
        dispatch(toggleProofDrawer());
        return;
      }
      if (!isConfirm) {
        setIsConfirm(true);
        return;
      }

      handleExecute();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-1 flex-col gap-8 p-6">
      <ActionHeading
        style={style}
        icon={<MousePointer2 size="24" className="rotate-90" />}
        heading="Send"
        paragraph="Transfer tokens to any address on selected chain."
      />

      <ActionProcess
        chainName={chainName}
        style={style}
        usdToggle={usdToggle}
        setUsdToggle={setUsdToggle}
        disabled={isConfirm}
      />

      <TransferInput
        style={style}
        amount={amount}
        setAmount={setAmount}
        recipient={recipient}
        setRecipient={setRecipient}
        usdToggle={usdToggle}
        isValid={isValid}
        setIsValid={setIsValid}
        isConfirm={isConfirm}
      />

      <ActionNote chainName={chainName} style={style} token={selectedToken} />

      <GaslessToggle
        style={style}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        disabled={isConfirm}
      />
      <ProofFooter disabled={isConfirm}>
        <div className="flex gap-4">
          <ActionButton
            style={style}
            label={txProof ? (isConfirm ? "Confirm" : "Send") : "Authorize"}
            icon={
              isConfirm ? <CircleHelp size="24" /> : <MoveUpRight size="24" />
            }
            handleClick={handleClick}
            disabled={
              txProof
                ? (activeTab === "gasless" && !gasCredit) ||
                  !isValid ||
                  isLoading ||
                  Number(amount) === 0 ||
                  !(!usdToggle
                    ? selectedToken
                      ? amount <= token
                      : "0.00"
                    : selectedToken
                    ? amount <= token * Number(currentTokenConversion)
                    : "0.00")
                : isLoading || !type
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
      </ProofFooter>
    </section>
  );
};

export default TransferAction;
