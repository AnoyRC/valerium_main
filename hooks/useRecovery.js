"use client";

import useCircuit from "./useCircuit";
import { ethers } from "ethers";
import ValeriumForwarderABI from "@/lib/abi/ValeriumForwarder.json";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import useWallet from "./useWallet";
import { useSearchParams } from "next/navigation";
import { setIsRunning } from "@/redux/slice/TxSlice";

export default function useRecovery() {
  const { hashKey, hashPassword } = useCircuit();
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const email = useSelector((state) => state.proof.email);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const proof = useSelector((state) => state.proof.recoveryProof);
  const {
    loadPublicStorage,
    loadGasCredit,
    initializeProofWallet,
  } = useWallet();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const estimateGas = async (passkey, password, gasToken, isGasless) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const valeriumAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      if (!valeriumAddress) return 0;

      const abiCoder = new ethers.utils.AbiCoder();

      const publicInputs = abiCoder.encode(
        ["string", "string"],
        [passkey ? "Passkey" : "Password", email.toString()]
      );

      let TxHash;

      if (passkey) {
        TxHash = await hashPassword(passkey);
      } else {
        TxHash = await hashPassword(password);
      }

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
        newTxHash: TxHash,
        newTxVerifier: currentChain.addresses.PasswordVerifier,
        publicStorage: publicInputs,
      };

      const data712 = {
        types: {
          ForwardExecuteRecovery: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "newTxHash", type: "bytes32" },
            { name: "newTxVerifier", type: "address" },
            { name: "publicStorage", type: "bytes" },
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
        newTxHash: message.newTxHash,
        newTxVerifier: message.newTxVerifier,
        publicStorage: message.publicStorage,
        signature: signature,
      };

      if (isGasless) {
        const estimate = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/recovery/estimate/gasless/${
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
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/recovery/estimate/native/${
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recovery/estimate/erc20/${
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

  const executeRecovery = async (passkey, password, gasToken) => {
    try {
      dispatch(setIsRunning(true));
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const valeriumAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      if (!valeriumAddress) return 0;

      const abiCoder = new ethers.utils.AbiCoder();

      const publicInputs = abiCoder.encode(
        ["string", "string"],
        [passkey ? "Passkey" : "Password", email.toString()]
      );

      let TxHash;

      if (passkey) {
        TxHash = await hashPassword(passkey);
      } else {
        TxHash = await hashPassword(password);
      }

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
        newTxHash: TxHash,
        newTxVerifier: currentChain.addresses.PasswordVerifier,
        publicStorage: publicInputs,
      };

      const data712 = {
        types: {
          ForwardExecuteRecovery: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "newTxHash", type: "bytes32" },
            { name: "newTxVerifier", type: "address" },
            { name: "publicStorage", type: "bytes" },
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
        newTxHash: message.newTxHash,
        newTxVerifier: message.newTxVerifier,
        publicStorage: message.publicStorage,
        signature: signature,
      };

      if (gasToken.address == null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recovery/native/${currentChain.chainId}`,
          {
            forwardRequest,
            mode: "signature",
          }
        );

        if (response.data.success) {
          await loadPublicStorage(currentChain, walletAddresses);
          toast.success("Recovery successfully");
          return true;
        } else {
          toast.error(response.data.error);
          return false;
        }
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recovery/erc20/${currentChain.chainId}?address=${gasToken.address}`,
        {
          forwardRequest,
          mode: "signature",
        }
      );
      if (response.data.success) {
        await loadPublicStorage(currentChain, walletAddresses);
        toast.success("Recovery successfully");
        return true;
      } else {
        toast.error(response.data.error);
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to execute recovery");
      return 0;
    } finally {
      dispatch(setIsRunning(false));
    }
  };

  const executeRecoveryGasless = async (passkey, password) => {
    try {
      dispatch(setIsRunning(true));
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const valeriumAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      if (!valeriumAddress) return 0;

      const abiCoder = new ethers.utils.AbiCoder();

      const publicInputs = abiCoder.encode(
        ["string", "string"],
        [passkey ? "Passkey" : "Password", email.toString()]
      );

      let TxHash;

      if (passkey) {
        TxHash = await hashPassword(passkey);
      } else {
        TxHash = await hashPassword(password);
      }

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
        newTxHash: TxHash,
        newTxVerifier: currentChain.addresses.PasswordVerifier,
        publicStorage: publicInputs,
      };

      const data712 = {
        types: {
          ForwardExecuteRecovery: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "newTxHash", type: "bytes32" },
            { name: "newTxVerifier", type: "address" },
            { name: "publicStorage", type: "bytes" },
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
        newTxHash: message.newTxHash,
        newTxVerifier: message.newTxVerifier,
        publicStorage: message.publicStorage,
        signature: signature,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recovery/gasless/${
          searchParams.get("domain")?.toLowerCase() + ".valerium.id"
        }/${currentChain.chainId}`,
        {
          forwardRequest,
          mode: "signature",
        }
      );
      if (response.data.success) {
        await loadPublicStorage(currentChain, walletAddresses);
        await loadGasCredit(
          searchParams.get("domain")?.toLowerCase() + ".valerium.id"
        );
        toast.success("Recovery successfully");
        return true;
      } else {
        toast.error(response.data.error);
        return false;
      }
    } catch (error) {
      toast.error("Failed to execute recovery");
      return 0;
    } finally {
      dispatch(setIsRunning(false));
    }
  };

  return {
    estimateGas,
    executeRecovery,
    executeRecoveryGasless,
  };
}
