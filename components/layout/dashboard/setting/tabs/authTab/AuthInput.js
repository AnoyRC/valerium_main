"use client";

import useAuth from "@/hooks/useAuth";
import { Input, Button } from "@material-tailwind/react";
import { Check, Fingerprint, Info, Loader2Icon } from "lucide-react";

export default function AuthInput({
  password,
  handlePassword,
  passkey,
  isLoading,
  setPasskey,
  setIsLoading,
  isConfirm,
}) {
  const { handlePasskey } = useAuth();

  return (
    <div className=" mb-8">
      <p className="mt-6 font-noto text-sm font-normal text-black">
        Your Password
      </p>

      <div className="mt-2 text-black">
        <Input
          label="*******"
          size="lg"
          className={"border-black font-noto text-black"}
          type="password"
          value={password}
          disabled={isConfirm || passkey ? true : false}
          onChange={(e) => handlePassword(e.target.value)}
        />

        <p className="mt-2 flex text-sm text-gray-500">
          <Info size={20} className="mr-1 inline" />
          Use at least 8 characters, one uppercase, one lowercase and one
          number.
        </p>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <div className="mt-2 h-0.5 w-[45%] bg-gray-400"></div>
        <p className="mt-2 text-sm text-gray-600">or</p>
        <div className="mt-2 h-0.5 w-[45%] bg-gray-400"></div>
      </div>

      <Button
        color="white"
        className="mb-5 mt-4 flex h-[5.7rem] w-full rounded-xl border-[1px] border-black bg-bg-off-white px-3"
        onClick={() => {
          handlePasskey(setIsLoading, setPasskey, handlePassword);
        }}
        disabled={isLoading || passkey || isConfirm}
      >
        <div className="flex h-full w-16 items-center justify-center rounded-lg bg-black/90">
          {passkey ? (
            <Check className="h-5 w-5 text-white" />
          ) : isLoading ? (
            <Loader2Icon className="h-5 w-5 animate-spin text-white" />
          ) : (
            <Fingerprint className="h-5 w-5 text-white" />
          )}
        </div>

        <div
          className={
            "ml-3 flex h-full w-56 flex-col justify-center text-start font-noto normal-case "
          }
        >
          <h1 className="text-xl">
            {passkey
              ? "Passkey Added"
              : isLoading
              ? "Adding Passkey"
              : "Add Passkey"}
          </h1>
          <p className="mt-1 w-72 text-xs font-normal text-gray-500">
            This passkey will replace your current authentication method.
          </p>
        </div>
      </Button>

      {passkey && (
        <p
          className="-mt-3 text-xs text-gray-700 hover:cursor-pointer hover:underline"
          onClick={() => {
            setPasskey("");
          }}
        >
          Clear Passkey
        </p>
      )}
    </div>
  );
}
