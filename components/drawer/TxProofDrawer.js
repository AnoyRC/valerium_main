"use client";
import { toggleProofDrawer } from "@/redux/slice/proofSlice";

import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Check, Fingerprint, Loader2Icon } from "lucide-react";
import useGenerateProof from "@/hooks/useGenerateProof";
import { useState } from "react";

export function TxProofDrawer() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const proofDrawer = useSelector((state) => state.proof.proofDrawer);
  const type = useSelector((state) => state.proof.type);
  const isLoading = useSelector((state) => state.proof.isLoading);
  const txProof = useSelector((state) => state.proof.txProof);
  const { generatePasskeyProof, generatePasswordProof } = useGenerateProof();

  return (
    <>
      <Dialog
        size="xs"
        open={proofDrawer}
        handler={() => {
          if (!isLoading) {
            dispatch(toggleProofDrawer());
          }
        }}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4 mb-1">
            <div className="flex flex-col items-center gap-4 justify-center">
              <div className=" bg-black p-4 rounded-md">
                <Image
                  src="/valerium-logo.svg"
                  alt="Valerium Logo"
                  width={50}
                  height={50}
                />
              </div>
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-noto font-bold"
              >
                Authorize
              </Typography>
            </div>

            {type === "Password" && (
              <div className="flex flex-col -mt-9">
                <p className="mt-8 font-noto text-sm text-gray-600">
                  Your Password
                </p>
                <div className="mt-2">
                  <Input
                    label="*******"
                    size="lg"
                    className={"font-noto"}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="mt-5 w-full flex items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
                  onClick={() => {
                    generatePasswordProof(password);
                  }}
                  disabled={isLoading || !password || password.length < 8}
                >
                  {isLoading ? (
                    <Loader2Icon className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    "Authorize"
                  )}
                </Button>
              </div>
            )}

            {type === "Passkey" && (
              <Button
                color="white"
                className=" flex h-[5.7rem] w-full rounded-xl border-[1px] border-black bg-bg-off-white px-3"
                onClick={() => {
                  generatePasskeyProof();
                }}
                disabled={isLoading}
              >
                <div className="flex h-full w-16 items-center justify-center rounded-lg bg-black/90">
                  {txProof ? (
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
                    {txProof
                      ? "Passkey Added"
                      : isLoading
                      ? "Authorizing"
                      : "Passkey Needed"}
                  </h1>
                  <p className="mt-1 w-72 text-xs font-normal text-gray-500">
                    This will be used to execute transactions
                  </p>
                </div>
              </Button>
            )}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
