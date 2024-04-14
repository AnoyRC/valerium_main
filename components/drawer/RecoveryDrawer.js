"use client";
import { toggleRecoveryDrawer } from "@/redux/slice/proofSlice";

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
import { Loader2Icon } from "lucide-react";
import useGenerateProof from "@/hooks/useGenerateProof";

export function RecoveryDrawer() {
  const dispatch = useDispatch();
  const recoveryDrawer = useSelector((state) => state.proof.recoveryDrawer);
  const email = useSelector((state) => state.proof.email);
  const isLoading = useSelector((state) => state.proof.isLoading);
  const { generateEmailProof } = useGenerateProof();

  return (
    <>
      <Dialog
        size="xs"
        open={recoveryDrawer}
        handler={() => {
          if (!isLoading) {
            dispatch(toggleRecoveryDrawer());
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

            <div className="flex flex-col -mt-9">
              <p className="mt-8 font-noto text-sm text-gray-600">Your Email</p>
              <div className="mt-2">
                <Input
                  size="lg"
                  type="text"
                  value={email}
                  onChange={() => {}}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 font-noto"
                />
              </div>
              <Button
                className="mt-5 w-full flex items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
                onClick={() => {
                  generateEmailProof(email);
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2Icon className="h-5 w-5 animate-spin text-white" />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
