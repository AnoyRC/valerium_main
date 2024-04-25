"use client";

import { Input, Button } from "@material-tailwind/react";
import { useRef, useState, useEffect } from "react";
import useLogin from "@/hooks/useLogin";
import { Info, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ethers } from "ethers";
import OnBoardSection from "../OnBoardSection";

const Login = () => {
  const inputRef = useRef();

  const [domain, setDomain] = useState("");

  const [isUsed, setIsUsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  var timeout = null;
  const router = useRouter();
  const { getValerium } = useLogin();

  const handleName = (e) => {
    if (e.target.value.length > 20) {
      setDomain(
        e.target.value
          .slice(0, 20)
          .replace(/[^a-zA-Z0-9]/g, "")
          ?.toLowerCase()
      );
    } else {
      setDomain(e.target.value.replace(/[^a-zA-Z0-9]/g, "")?.toLowerCase());
    }
  };

  const checkValerium = async () => {
    if (domain.length < 3) return;
    if (domain.length > 20) return;

    const address = await getValerium(domain.toLowerCase());

    if (address === ethers.constants.AddressZero) {
      setIsUsed(false);
      setIsLoading(false);
      return;
    }

    setIsUsed(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.addEventListener("keydown", function () {
      clearTimeout(timeout);

      timeout = setTimeout(function () {
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
  }, [isTyping, domain]);

  return (
    <OnBoardSection
      heading="Access your Account"
      paragaph="Fill your Valerium Domain name to Login."
    >
      <p className="mt-8 font-noto text-sm text-text-gray">
        Your Valerium Domain
      </p>

      <div className="mt-2 flex w-full">
        <Input
          label="Domain"
          size="lg"
          className={"rounded-r-none font-noto"}
          labelProps={{
            className: "after:rounded-tr-none font-noto",
          }}
          ref={inputRef}
          value={domain}
          onChange={(e) => handleName(e)}
        />

        <Button
          ripple={false}
          variant="text"
          color="blue-gray"
          className={
            "flex items-center rounded-l-none border border-l-0 border-blue-gray-200 bg-gray-100/60 px-3 py-0 font-noto text-sm font-normal normal-case"
          }
        >
          .valerium.id
        </Button>
      </div>

      {isLoading && domain.length > 3 && (
        <p className="mt-2 flex text-sm text-text-gray">
          <Loader2 size={20} className="mr-1 inline animate-spin " />
          Checking availability...
        </p>
      )}

      {!isLoading && !isUsed && domain.length > 3 && (
        <p className="mt-2 flex text-sm text-red-500">
          <Info size={20} className="mr-1 inline" />
          This domain is not registered.
        </p>
      )}

      <Button
        className="mt-8 w-fit bg-gradient-primary-light font-noto font-normal normal-case disabled:cursor-not-allowed"
        onClick={() => {
          router.push(`/home?domain=${domain?.toLowerCase()}`);
        }}
        disabled={
          domain.length <= 3 ||
          domain.length > 20 ||
          !isUsed ||
          isLoading ||
          isTyping
        }
      >
        Access Account
      </Button>

      <p className="mt-3 text-xs text-black">
        Don't have an account?{" "}
        <Link
          className="bg-gradient-primary-light font-semibold gradient-text hover:cursor-pointer"
          href="/signUp"
        >
          Sign Up
        </Link>
      </p>
    </OnBoardSection>
  );
};

export default Login;
