"use client";

import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ValeriumABI from "@/lib/abi/Valerium.json";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import useWallet from "./useWallet";
import { setIsDeploying } from "@/redux/slice/proofSlice";

export default function useDeploy() {
  const searchParams = useSearchParams();
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const { getPublicStorage, loadAllData } = useWallet();
  const dispatch = useDispatch();

  const deploy = async (chain, proof, currentChain) => {
    try {
      dispatch(setIsDeploying(true));
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const providerExternal = new ethers.providers.JsonRpcProvider(
        chain.rpcUrl
      );

      const walletAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      );

      if (
        !walletAddress ||
        walletAddress.address === ethers.constants.AddressZero
      ) {
        toast.error("No wallet address found");
      }

      const baseValerium = new ethers.Contract(
        walletAddress.address,
        ValeriumABI,
        provider
      );

      const valeriumExternal = new ethers.Contract(
        chain.addresses.Valerium,
        ValeriumABI,
        providerExternal
      );

      const TxHash = await baseValerium.TxHash();
      const recoveryHash = await baseValerium.RecoveryHash();

      const publicStorage = await getPublicStorage(
        currentChain,
        walletAddresses
      );

      const abiCoder = new ethers.utils.AbiCoder();
      const decoded = abiCoder.decode(["string", "string"], publicStorage);

      const type = decoded[0];

      if (!TxHash || !recoveryHash || !type) {
        toast.error("Failed to get data from Valerium");
        return;
      }

      const initializer = valeriumExternal.interface.encodeFunctionData(
        "setupValerium",
        [
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(
              searchParams.get("domain")?.toLowerCase() + ".valerium.id"
            )
          ),
          chain.addresses.PasswordVerifier,
          chain.addresses.SignatureVerifier,
          chain.addresses.ValeriumForwarder,
          chain.addresses.ValeriumGasTank,
          TxHash,
          recoveryHash,
          publicStorage,
        ]
      );

      const chainDeployRequest = {
        domain: searchParams.get("domain")?.toLowerCase() + ".valerium.id",
        proof,
        initializer,
        type: "password",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deploy/${chain.chainId}`,
        {
          chainDeployRequest,
        }
      );

      if (response.data.success) {
        toast.success("Successfully Deployed to chain");
        await loadAllData(
          searchParams.get("domain")?.toLowerCase() + ".valerium.id"
        );
      } else {
        toast.error("Failed to deploy to chain");
        console.log(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to deploy to chain");
      console.log(error);
    } finally {
      dispatch(setIsDeploying(false));
    }
  };

  return { deploy };
}
