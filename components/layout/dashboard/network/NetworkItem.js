"use client";

import Image from "next/image";

import ChainDeployButton from "@/components/ui/buttons/ChainDeployButton";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { useState } from "react";
import { toast } from "sonner";
import baseChain from "@/lib/baseChain";
import useWallet from "@/hooks/useWallet";
import useDeploy from "@/hooks/useDeploy";
import { setTxProof } from "@/redux/slice/proofSlice";

const NetworkItem = ({ chain }) => {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const [isConfirm, setIsConfirm] = useState(false);
  const txProof = useSelector((state) => state.proof.txProof);
  const { switchChain } = useWallet();
  const { deploy } = useDeploy();
  const dispatch = useDispatch();

  const address =
    walletAddresses &&
    walletAddresses.find((address) => address.chainId === chain.chainId);

  if (currentChain.chainId === chain.chainId) {
    return null;
  }

  const handleClick = () => {
    if (address.address !== ethers.constants.AddressZero) {
      switchChain(address.chainId);
      return;
    }

    if (currentChain.chainId !== baseChain.chainId) {
      toast("You can only deploy from the base chain : Optimism", {
        action: {
          label: "Switch to Optimism",
          onClick: () => {
            switchChain(baseChain.chainId);
          },
        },
      });
      return;
    }

    if (!txProof) {
      toast.info("Approval is required to deploy to this chain");
      return;
    }

    if (txProof && !isConfirm) {
      setIsConfirm(true);
    }

    if (txProof && isConfirm) {
      toast.promise(() => deploy(chain, txProof, currentChain), {
        loading: "Deploying...",
      });
      dispatch(setTxProof(null));
      setIsConfirm(false);
    }
  };

  return (
    address && (
      <li>
        <div className="border-gray flex items-center justify-between border-b px-10 py-10">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
              <Image
                src={`/tokens/${chain.style.logo}`}
                alt={`${chain.chainName} Logo`}
                width={40}
                height={40}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{chain.chainName}</h3>
              {address.address !== ethers.constants.AddressZero && (
                <p className="text-sm text-gray-500">{address.address}</p>
              )}
            </div>
          </div>

          <ChainDeployButton
            onClick={handleClick}
            backgroundColor={chain.style.gradientColorLight}
            text={
              !isConfirm
                ? address.address !== ethers.constants.AddressZero
                  ? "Switch"
                  : "Deploy"
                : "Confirm"
            }
            isConfirm={isConfirm}
            setIsConfirm={setIsConfirm}
          />
        </div>
      </li>
    )
  );
};

export default NetworkItem;
