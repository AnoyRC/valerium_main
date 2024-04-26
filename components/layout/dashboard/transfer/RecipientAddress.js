"use client";

import ValeriumInput from "@/components/ui/input/ValeriumInput";
import { useRef, useState, useEffect } from "react";
import { Info, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import useWallet from "@/hooks/useWallet";
import { ethers } from "ethers";
import { useSelector } from "react-redux";

export default function RecipientAddress({
  input,
  setInput,
  isValid,
  setIsValid,
  disabled = false,
}) {
  const [isLoading, setIsLoading] = useState(false);
  var inputTimeout = null;
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const searchParams = useSearchParams();
  const { getValeriumAddress, getENSAddress } = useWallet();
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.addEventListener("keydown", function () {
      clearTimeout(inputTimeout);

      inputTimeout = setTimeout(function () {
        setIsTyping(false);
      }, 1000);

      setIsTyping(true);
    });
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLoading(true);
    } else {
      checkValerium();
    }
  }, [isTyping, input]);

  const checkValerium = async () => {
    setIsLoading(true);

    if (input.startsWith("0x") && input.length === 42) {
      if (walletAddresses.find((address) => address.address === input)) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      setIsValid(true);
      setIsLoading(false);
      return;
    }

    if (!input.includes(".valerium.id") && input.length >= 6) {
      const address = await getENSAddress(input);

      if (address !== ethers.constants.AddressZero && address !== null) {
        setInput(address);
        setIsValid(true);
        setIsLoading(false);
        return;
      }
    }

    if (input.length < 6) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    if (
      input.split(".valerium.id")[0]?.toLowerCase() ===
      searchParams.get("domain")?.toLowerCase()
    ) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    const address = await getValeriumAddress(
      currentChain,
      input?.toLowerCase()
    );

    if (address === ethers.constants.AddressZero) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    setInput(address);
    setIsValid(true);
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <ValeriumInput
          label="Recipient Address"
          id="recipient-transfer"
          type="text"
          placeholder="Enter Address or Valerium Domain"
          required={true}
          input={input}
          setInput={setInput}
          Ref={inputRef}
          disabled={disabled}
        />

        {!input && (
          <div className={"mt-2 text-sm flex text-gray-600 "}>
            <Info size={17} className="inline mt-0.5 mr-1" />
            Enter a valid Valerium/ENS domain or an arbitrary address.
          </div>
        )}

        {isLoading && input && (
          <div className={"mt-2 flex items-center "}>
            <Loader2 className="animate-spin -mt-0.5 mr-2" size={15} />
            <span className="text-sm">Checking domain...</span>
          </div>
        )}

        {!isLoading && input && !isValid && (
          <div className={"mt-2 text-sm flex text-red-600 "}>
            <Info size={17} className="inline mt-0.5 mr-1" />
            Valerium/ENS domain or address is invalid.
          </div>
        )}

        {!isLoading && input && isValid && (
          <div className={"mt-2 text-sm flex text-green-600 "}>
            <Info size={17} className="inline mt-0.5 mr-1" />
            The Address is valid.
          </div>
        )}
      </div>
    </>
  );
}
