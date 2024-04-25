"use client";

import { useSearchParams } from "next/navigation";
import useWebAuthn from "./useWebAuthn";

export default function useAuth() {
  const searchParams = useSearchParams();
  const { register } = useWebAuthn();

  const handlePasskey = async (setIsLoading, setPasskey, setPassword) => {
    try {
      setIsLoading(true);

      const domain = searchParams.get("domain")?.toLowerCase();

      const id = await register(domain + ".valerium.id");

      setPasskey(id);
      setPassword("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePasskey };
}
