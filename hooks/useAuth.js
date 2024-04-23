"use client";

import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import { WebAuthnExtension } from "@magic-ext/webauthn";
import { useSearchParams } from "next/navigation";

export default function useAuth() {
  const searchParams = useSearchParams();

  const handlePasskey = async (setIsLoading, setPasskey, setPassword) => {
    try {
      setIsLoading(true);

      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY, {
        extensions: [new WebAuthnExtension()],
      });

      try {
        await magic.webauthn.login({
          username: searchParams.get("domain") + ".valerium.id",
        });
      } catch (error) {
        console.log(error.message);
        await magic.webauthn.registerNewUser({
          username: searchParams.get("domain") + ".valerium.id",
        });
      }

      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();

      const signature = await signer.signMessage("Valerium_Auth_Change");

      const pubKey_uncompressed = ethers.utils.recoverPublicKey(
        ethers.utils.hashMessage(
          ethers.utils.toUtf8Bytes("Valerium_Auth_Change")
        ),
        signature
      );

      let pubKey = pubKey_uncompressed.slice(4);
      let pub_key_x = pubKey.substring(0, 64);

      setPassword("");
      setPasskey(pub_key_x);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePasskey };
}
