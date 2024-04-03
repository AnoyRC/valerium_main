"use client";

import SignupFooter from "@/components/ui/footer/SignupFooter";
import { setDomain, setStep } from "@/redux/slice/SignupSlice";
import { Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import useSignup from "@/hooks/useSignup";
import { Info, Loader2 } from "lucide-react";

const Step1 = () => {
  const dispatch = useDispatch();
  const domain = useSelector((state) => state.signup.domain);
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const { isValidValerium } = useSignup();
  var timeout = null;

  const handleName = (e) => {
    if (e.target.value.length > 20) {
      dispatch(
        setDomain(e.target.value.slice(0, 20).replace(/[^a-zA-Z0-9]/g, ""))
      );
    } else {
      dispatch(setDomain(e.target.value.replace(/[^a-zA-Z0-9]/g, "")));
    }
  };

  const checkValerium = async () => {
    if (domain.length < 3) return;
    if (domain.length > 20) return;

    const isUsed = await isValidValerium(domain);

    setIsUsed(isUsed);
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
    <div className="flex flex-col">
      <h1 className="font-gloock text-4xl">Setup your new Wallet</h1>
      <p className="font-noto text-gray-600 text-sm mt-2">
        Find your Favorite Multi Chain Valerium Domain.
      </p>

      <p className="font-noto text-sm text-gray-600 mt-8">
        Your Valerium Domain
      </p>
      <div className="flex w-full mt-2">
        <Input
          label="Choose your domain"
          size="lg"
          className={"rounded-r-none font-noto"}
          labelProps={{
            className: "after:rounded-tr-none font-noto ",
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
            "flex font-noto font-normal items-center rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10 normal-case px-3 text-sm py-0 "
          }
        >
          @valerium
        </Button>
      </div>

      {isLoading && domain.length > 3 && (
        <p className="mt-2 text-sm flex text-gray-500">
          <Loader2 size={20} className="inline mr-1 animate-spin " />
          Checking availability...
        </p>
      )}

      {!isLoading && isUsed && (
        <p className="mt-2 text-sm flex text-red-500">
          <Info size={20} className="inline mr-1" />
          This domain is already taken.
        </p>
      )}

      {!isLoading && !isUsed && domain.length > 3 && (
        <p className="mt-2 text-sm flex text-green-500">
          <Info size={20} className="inline mr-1" />
          This domain is available.
        </p>
      )}

      <Button
        className="mt-8 font-noto font-normal normal-case w-fit bg-gradient-primary-light"
        onClick={() => {
          dispatch(setStep(1));
        }}
        disabled={
          domain.length <= 3 ||
          domain.length > 20 ||
          isUsed ||
          isLoading ||
          isTyping
        }
      >
        Select Domain
      </Button>
      <SignupFooter />
    </div>
  );
};

export default Step1;
