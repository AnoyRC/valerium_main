"use client";

import baseChain from "@/lib/baseChain";
import ValeriumProxyFactoryABI from "@/lib/abi/ValeriumProxyFactory.json";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import { WebAuthnExtension } from "@magic-ext/webauthn";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPasskey,
  setPassword,
  setRecoveryAddress,
  setStep,
} from "@/redux/slice/SignupSlice";
import useCircuit from "./useCircuit";
import ValeriumABI from "@/lib/abi/Valerium.json";
import FactoryForwarderABI from "@/lib/abi/FactoryForwarder.json";
import axios from "axios";
import { toast } from "sonner";

export default function useSignup() {
  const domain = useSelector((state) => state.signup.domain);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signup.email);
  const { hashKey, hashPassword } = useCircuit();
  const password = useSelector((state) => state.signup.password);
  const passkey = useSelector((state) => state.signup.passkey);
  const recoveryAddress = useSelector((state) => state.signup.recoveryAddress);

  const isValidValerium = async (domain) => {
    const provider = new ethers.providers.JsonRpcProvider(baseChain.rpcUrl);

    const factory = new ethers.Contract(
      baseChain.addresses.ValeriumProxyFactory,
      ValeriumProxyFactoryABI,
      provider,
    );

    const isValid = await factory.domainExists(domain + "@valerium");

    return isValid;
  };

  const handlePasskey = async (setIsLoading) => {
    try {
      setIsLoading(true);

      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY, {
        extensions: [new WebAuthnExtension()],
      });

      try {
        await magic.webauthn.registerNewUser({
          username: domain + "@valerium",
        });
      } catch (error) {
        console.log(error.message);
        await magic.webauthn.login({
          username: domain + "@valerium",
        });
      }

      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      const signature = await signer.signMessage("Valerium_New_User_Sign_Up");

      const pubKey_uncompressed = ethers.utils.recoverPublicKey(
        ethers.utils.hashMessage(
          ethers.utils.toUtf8Bytes("Valerium_New_User_Sign_Up"),
        ),
        signature,
      );

      let pubKey = pubKey_uncompressed.slice(4);
      let pub_key_x = pubKey.substring(0, 64);

      dispatch(setPassword(""));
      dispatch(setPasskey(pub_key_x));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmail = async (setIsLoading) => {
    try {
      setIsLoading(true);
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);
      await magic.auth.loginWithEmailOTP({ email });
      const userMetadata = await magic.user.isLoggedIn();
      if (!userMetadata) {
        throw new Error("Error logging in");
      }

      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      const signature = await signer.signMessage("Valerium_New_User_Sign_Up");

      const pubKey_uncompressed = ethers.utils.recoverPublicKey(
        ethers.utils.hashMessage(
          ethers.utils.toUtf8Bytes("Valerium_New_User_Sign_Up"),
        ),
        signature,
      );

      let pubKey = pubKey_uncompressed.slice(4);
      let pub_key_x = pubKey.substring(0, 64);

      dispatch(setEmail(email));
      dispatch(setRecoveryAddress(pub_key_x));
      dispatch(setStep(3));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deployWallet = async (setIsLoading, setSuccess, setMessage) => {
    try {
      setIsLoading(true);
      setMessage("Hashing Inputs");

      let TxHash;

      if (passkey) {
        TxHash = await hashKey("0x" + passkey);
      } else {
        TxHash = await hashPassword(password);
      }

      const recoveryHash = await hashKey("0x" + recoveryAddress);

      setMessage("Deploying Wallet");

      const provider = new ethers.providers.JsonRpcProvider(baseChain.rpcUrl);

      const masterCopy = new ethers.Contract(
        baseChain.addresses.Valerium,
        ValeriumABI,
        provider,
      );

      const abiCoder = new ethers.utils.AbiCoder();

      const publicInputs = abiCoder.encode(
        ["string", "string"],
        [passkey ? "Passkey" : "Password", email.toString()],
      );

      const initializer = masterCopy.interface.encodeFunctionData(
        "setupValerium",
        [
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(domain + "@valerium"),
          ),
          passkey
            ? baseChain.addresses.SignatureVerifier
            : baseChain.addresses.PasswordVerifier,
          baseChain.addresses.SignatureVerifier,
          baseChain.addresses.ValeriumForwarder,
          baseChain.addresses.ValeriumGasTank,
          TxHash,
          recoveryHash,
          publicInputs,
        ],
      );

      const keypair = ethers.Wallet.createRandom();

      const forwarder = new ethers.Contract(
        baseChain.addresses.FactoryForwarder,
        FactoryForwarderABI,
        provider,
      );

      const message = {
        from: keypair.address,
        recipient: baseChain.addresses.ValeriumProxyFactory,
        deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
        nonce: Number(await forwarder.nonces(keypair.address)),
        gas: 1000000,
        domain: domain + "@valerium",
        initializer: initializer,
        salt: 1,
      };

      const data712 = {
        types: {
          ForwardDeploy: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint48" },
            { name: "nonce", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "domain", type: "string" },
            { name: "initializer", type: "bytes" },
            { name: "salt", type: "uint256" },
          ],
        },
        domain: {
          name: "Valerium Forwarder",
          version: "1",
          chainId: baseChain.chainId,
          verifyingContract: baseChain.addresses.FactoryForwarder,
        },
        message: message,
      };

      const signature = await keypair._signTypedData(
        data712.domain,
        data712.types,
        data712.message,
      );

      const forwardRequest = {
        from: message.from,
        recipient: message.recipient,
        deadline: message.deadline,
        gas: message.gas,
        domain: message.domain,
        initializer: message.initializer,
        salt: message.salt,
        signature: signature,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deploy/${baseChain.chainId}`,
        {
          forwardRequest,
        },
      );

      if (response.data.success === true) {
        const factory = new ethers.Contract(
          baseChain.addresses.ValeriumProxyFactory,
          ValeriumProxyFactoryABI,
          provider,
        );

        const proxy = await factory.getValeriumProxy(domain + "@valerium");

        if (proxy === ethers.constants.AddressZero) {
          throw new Error("Failed to deploy wallet");
        }

        setSuccess(true);
      } else {
        setSuccess(false);
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to deploy wallet");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isValidValerium,
    handlePasskey,
    handleEmail,
    deployWallet,
  };
}
