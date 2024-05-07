"use client";

import { ethers } from "ethers";
import ValeriumForwarderABI from "@/lib/abi/ValeriumForwarder.json";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Magic } from "magic-sdk";
import useCircuit from "./useCircuit";
import useWallet from "./useWallet";
import { useSearchParams } from "next/navigation";
import { setIsRunning } from "@/redux/slice/TxSlice";

export default function useChange() {
  const type = useSelector((state) => state.proof.type);
  const recoveryProof = useSelector((state) => state.proof.recoveryProof);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const { hashKey } = useCircuit();
  const {
    loadPublicStorage,
    loadGasCredit,
    initializeProofWallet,
  } = useWallet();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const estimateGas = async (email, gasToken, isGasless) => {
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
        [type, email.toString()]
      );

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
        proof: recoveryProof,
        newRecoveryHash:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        newRecoveryVerifier: currentChain.addresses.SignatureVerifier,
        publicStorage: publicInputs,
      };

      const data712 = {
        types: {
          ForwardChangeRecovery: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "newRecoveryHash", type: "bytes32" },
            { name: "newRecoveryVerifier", type: "address" },
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
        newRecoveryHash: message.newRecoveryHash,
        newRecoveryVerifier: message.newRecoveryVerifier,
        publicStorage: message.publicStorage,
        signature: signature,
      };

      if (isGasless) {
        const estimate = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/change/estimate/gasless/${
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/change/estimate/native/${
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/change/estimate/erc20/${
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

  const changeRecovery = async (email, gasToken) => {
    try {
      dispatch(setIsRunning(true));
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        await magic.user.logout();
      }
      await magic.auth.loginWithEmailOTP({ email });
      const userMetadata = await magic.user.isLoggedIn();
      if (!userMetadata) {
        toast.error("Email verification failed");
        return;
      }

      const mprovider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = mprovider.getSigner();

      const msignature = await signer.signMessage("Valerium_Recovery_Change");

      const pubKey_uncompressed = ethers.utils.recoverPublicKey(
        ethers.utils.hashMessage(
          ethers.utils.toUtf8Bytes("Valerium_Recovery_Change")
        ),
        msignature
      );

      let pubKey = pubKey_uncompressed.slice(4);
      let pub_key_x = pubKey.substring(0, 64);

      const newRecoveryHash = await hashKey("0x" + pub_key_x);

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
        [type, email.toString()]
      );

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
        proof: recoveryProof,
        newRecoveryHash: newRecoveryHash,
        newRecoveryVerifier: currentChain.addresses.SignatureVerifier,
        publicStorage: publicInputs,
      };

      const data712 = {
        types: {
          ForwardChangeRecovery: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "newRecoveryHash", type: "bytes32" },
            { name: "newRecoveryVerifier", type: "address" },
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
        newRecoveryHash: message.newRecoveryHash,
        newRecoveryVerifier: message.newRecoveryVerifier,
        publicStorage: message.publicStorage,
        signature: signature,
      };

      if (gasToken.address == null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/change/native/${currentChain.chainId}`,
          {
            forwardRequest,
            mode: "signature",
          }
        );

        if (response.data.success) {
          await loadPublicStorage(currentChain, walletAddresses);
          toast.success("Successfully changed recovery");
          return true;
        } else {
          toast.error(response.data.error);
          return false;
        }
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/change/erc20/${currentChain.chainId}?address=${gasToken.address}`,
        {
          forwardRequest,
          mode: "signature",
        }
      );
      if (response.data.success) {
        await loadPublicStorage(currentChain, walletAddresses);
        toast.success("Successfully changed recovery");
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

  const changeRecoveryGasless = async (email) => {
    try {
      dispatch(setIsRunning(true));
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        await magic.user.logout();
      }
      await magic.auth.loginWithEmailOTP({ email });
      const userMetadata = await magic.user.isLoggedIn();
      if (!userMetadata) {
        toast.error("Email verification failed");
        return;
      }

      const mprovider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = mprovider.getSigner();

      const msignature = await signer.signMessage("Valerium_Recovery_Change");

      const pubKey_uncompressed = ethers.utils.recoverPublicKey(
        ethers.utils.hashMessage(
          ethers.utils.toUtf8Bytes("Valerium_Recovery_Change")
        ),
        msignature
      );

      let pubKey = pubKey_uncompressed.slice(4);
      let pub_key_x = pubKey.substring(0, 64);

      const newRecoveryHash = await hashKey("0x" + pub_key_x);

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
        [type, email.toString()]
      );

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
        proof: recoveryProof,
        newRecoveryHash: newRecoveryHash,
        newRecoveryVerifier: currentChain.addresses.SignatureVerifier,
        publicStorage: publicInputs,
      };

      const data712 = {
        types: {
          ForwardChangeRecovery: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "newRecoveryHash", type: "bytes32" },
            { name: "newRecoveryVerifier", type: "address" },
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
        newRecoveryHash: message.newRecoveryHash,
        newRecoveryVerifier: message.newRecoveryVerifier,
        publicStorage: message.publicStorage,
        signature: signature,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/change/gasless/${
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
        toast.success("Successfully changed recovery");
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

  return { estimateGas, changeRecovery, changeRecoveryGasless };
}
