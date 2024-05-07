"use client";

import {
  setLoading,
  setRecoveryProof,
  setTxProof,
  toggleProofDrawer,
  toggleRecoveryDrawer,
} from "@/redux/slice/proofSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Magic } from "magic-sdk";
import { WebAuthnExtension } from "@magic-ext/webauthn";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import useWallet from "./useWallet";
import useCircuit from "./useCircuit";
import useWebAuthn from "./useWebAuthn";

export default function useGenerateProof() {
  const dispatch = useDispatch();
  const currentChain = useSelector((state) => state.chain.currentChain);
  const searchParams = useSearchParams();
  const { getNonce } = useWallet();
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const { signature_prove, password_prove } = useCircuit();
  const { login } = useWebAuthn();
  const { initializeProofWallet } = useWallet();

  const generatePasskeyProof = async () => {
    try {
      dispatch(setLoading(true));

      const domain = searchParams.get("domain")?.toLowerCase();

      const wallet = await initializeProofWallet();

      if (!domain) {
        toast.error("Invalid Domain");
        return;
      }

      const id = await login();

      const nonce = Number(await getNonce(currentChain, walletAddresses));

      const proof = await password_prove(id, nonce, wallet.address);

      if (!proof) {
        toast.error("Error Generating Proof");
        return;
      }

      dispatch(setTxProof(proof));
      dispatch(toggleProofDrawer());
    } catch (error) {
      console.error(error);
      toast.error("Error Authorizing Transaction");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const generatePasswordProof = async (password) => {
    try {
      dispatch(setLoading(true));

      const wallet = await initializeProofWallet();

      const domain = searchParams.get("domain")?.toLowerCase();

      if (!domain) {
        toast.error("Invalid Domain");
        return;
      }
      const nonce = Number(await getNonce(currentChain, walletAddresses));

      const proof = await password_prove(password, nonce, wallet.address);

      if (!proof) {
        toast.error("Error Generating Proof");
        return;
      }

      dispatch(setTxProof(proof));
      dispatch(toggleProofDrawer());
    } catch (error) {
      console.error(error);
      toast.error("Error Authorizing Transaction");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const generateEmailProof = async (email) => {
    try {
      dispatch(setLoading(true));

      const domain = searchParams.get("domain")?.toLowerCase();

      if (!domain) {
        toast.error("Invalid Domain");
        return;
      }

      const wallet = await initializeProofWallet();

      const nonce = Number(await getNonce(currentChain, walletAddresses));

      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);
      await magic.auth.loginWithEmailOTP({ email });
      const userMetadata = await magic.user.isLoggedIn();
      if (!userMetadata) {
        toast.error("Error Logging In");
        return;
      }

      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      const signature = await signer.signMessage(nonce.toString());

      const pubKey_uncompressed = ethers.utils.recoverPublicKey(
        ethers.utils.hashMessage(ethers.utils.toUtf8Bytes(nonce.toString())),
        signature
      );

      const message = ethers.utils.hashMessage(nonce.toString());

      let pubKey = pubKey_uncompressed.slice(4);
      let pub_key_x = pubKey.substring(0, 64);
      let pub_key_y = pubKey.substring(64);

      const proof = await signature_prove(
        "0x" + pub_key_x,
        "0x" + pub_key_y,
        Array.from(ethers.utils.arrayify(signature)),
        Array.from(ethers.utils.arrayify(message)),
        wallet.address
      );

      if (!proof) {
        toast.error("Error Generating Proof");
        return;
      }

      dispatch(setRecoveryProof(proof));
      dispatch(toggleRecoveryDrawer());
    } catch (error) {
      console.error(error);
      toast.error("Error Authorizing Recovery");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { generatePasskeyProof, generatePasswordProof, generateEmailProof };
}
