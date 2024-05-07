"use client";

import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import ValeriumForwarderABI from "@/lib/abi/ValeriumForwarder.json";
import axios from "axios";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import useWallet from "./useWallet";
import { setIsRunning } from "@/redux/slice/TxSlice";

export default function useExecute() {
  const currentChain = useSelector((state) => state.chain.currentChain);
  const searchParams = useSearchParams();
  const { loadGasCredit, initializeProofWallet } = useWallet();
  const dispatch = useDispatch();

  const estimateGas = async (
    walletAddresses,
    gasToken,
    proof,
    to,
    value,
    data,
    isGasless
  ) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const valeriumAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      if (!valeriumAddress) return 0;

      const forwarder = new ethers.Contract(
        currentChain.addresses.ValeriumForwarder,
        ValeriumForwarderABI,
        provider
      );

      const keypair = await initializeProofWallet();

      const message = {
        from: keypair.address,
        recipient: valeriumAddress,
        deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
        nonce: Number(await forwarder.nonces(keypair.address)),
        gas: 1000000,
        proof: proof,
        to: to,
        value: value,
        data: data,
      };

      const data712 = {
        types: {
          ForwardExecute: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "data", type: "bytes" },
          ],
        },
        domain: {
          name: "Valerium Forwarder",
          version: "1",
          chainId: currentChain.chainId,
          verifyingContract: currentChain.addresses.ValeriumForwarder,
        },
        message: message,
      };

      const signature = await keypair._signTypedData(
        data712.domain,
        data712.types,
        data712.message
      );

      const forwardRequest = {
        from: keypair.address,
        recipient: valeriumAddress,
        deadline: message.deadline,
        gas: message.gas,
        proof: message.proof,
        to: message.to,
        value: message.value,
        data: message.data,
        signature: signature,
      };

      if (isGasless) {
        const estimate = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/execute/estimate/gasless/${
            currentChain.chainId
          }?forwardRequest=${JSON.stringify(forwardRequest)}`
        );

        if (estimate.data.success) {
          return estimate.data.estimates.estimateFees;
        } else {
          return 0;
        }
      }

      if (gasToken.address == null) {
        const estimate = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/execute/estimate/native/${
            currentChain.chainId
          }?forwardRequest=${JSON.stringify(forwardRequest)}`
        );

        if (estimate.data.success) {
          return estimate.data.estimates.estimateFees;
        } else {
          return 0;
        }
      }

      const estimate = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/execute/estimate/erc20/${
          currentChain.chainId
        }?forwardRequest=${JSON.stringify(forwardRequest)}&address=${
          gasToken.address
        }`
      );

      if (estimate.data.success) {
        return estimate.data.estimates.estimateFees;
      }
      return 0;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const execute = async (
    walletAddresses,
    gasToken,
    proof,
    to,
    value,
    data,
    type
  ) => {
    try {
      dispatch(setIsRunning(true));
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const valeriumAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      if (!valeriumAddress) return 0;

      const forwarder = new ethers.Contract(
        currentChain.addresses.ValeriumForwarder,
        ValeriumForwarderABI,
        provider
      );

      const keypair = await initializeProofWallet();

      const message = {
        from: keypair.address,
        recipient: valeriumAddress,
        deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
        nonce: Number(await forwarder.nonces(keypair.address)),
        gas: 1000000,
        proof: proof,
        to: to,
        value: value,
        data: data,
      };

      const data712 = {
        types: {
          ForwardExecute: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "data", type: "bytes" },
          ],
        },
        domain: {
          name: "Valerium Forwarder",
          version: "1",
          chainId: currentChain.chainId,
          verifyingContract: currentChain.addresses.ValeriumForwarder,
        },
        message: message,
      };

      const signature = await keypair._signTypedData(
        data712.domain,
        data712.types,
        data712.message
      );

      const forwardRequest = {
        from: keypair.address,
        recipient: valeriumAddress,
        deadline: message.deadline,
        gas: message.gas,
        proof: message.proof,
        to: message.to,
        value: message.value,
        data: message.data,
        signature: signature,
      };

      if (gasToken.address == null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/execute/native/${currentChain.chainId}`,
          {
            forwardRequest,
            mode: "password",
          }
        );

        if (response.data.success) {
          toast.success("Transaction sent successfully");
          return true;
        } else {
          toast.error(response.data.error);
          return false;
        }
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/execute/erc20/${currentChain.chainId}?address=${gasToken.address}`,
        {
          forwardRequest,
          mode: "password",
        }
      );
      if (response.data.success) {
        toast.success("Transaction sent successfully");
        return true;
      } else {
        toast.error(response.data.error);
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error("Transaction failed");
      return false;
    } finally {
      dispatch(setIsRunning(false));
    }
  };

  const executeGasless = async (
    walletAddresses,
    proof,
    to,
    value,
    data,
    type
  ) => {
    try {
      dispatch(setIsRunning(true));
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const valeriumAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      if (!valeriumAddress) return 0;

      const forwarder = new ethers.Contract(
        currentChain.addresses.ValeriumForwarder,
        ValeriumForwarderABI,
        provider
      );

      const keypair = await initializeProofWallet();

      const message = {
        from: keypair.address,
        recipient: valeriumAddress,
        deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
        nonce: Number(await forwarder.nonces(keypair.address)),
        gas: 1000000,
        proof: proof,
        to: to,
        value: value,
        data: data,
      };

      const data712 = {
        types: {
          ForwardExecute: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "data", type: "bytes" },
          ],
        },
        domain: {
          name: "Valerium Forwarder",
          version: "1",
          chainId: currentChain.chainId,
          verifyingContract: currentChain.addresses.ValeriumForwarder,
        },
        message: message,
      };

      const signature = await keypair._signTypedData(
        data712.domain,
        data712.types,
        data712.message
      );

      const forwardRequest = {
        from: keypair.address,
        recipient: valeriumAddress,
        deadline: message.deadline,
        gas: message.gas,
        proof: message.proof,
        to: message.to,
        value: message.value,
        data: message.data,
        signature: signature,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/execute/gasless/${
          searchParams.get("domain")?.toLowerCase() + ".valerium.id"
        }/${currentChain.chainId}`,
        {
          forwardRequest,
          mode: "password",
        }
      );

      if (response.data.success) {
        await loadGasCredit(
          searchParams.get("domain")?.toLowerCase() + ".valerium.id"
        );
        toast.success("Transaction sent successfully");
        return true;
      } else {
        toast.error(response.data.error);
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error("Transaction failed");
      return false;
    } finally {
      dispatch(setIsRunning(false));
    }
  };

  return { estimateGas, execute, executeGasless };
}
