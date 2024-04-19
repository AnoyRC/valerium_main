"use client";

import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleVerifyCreditDrawer } from "@/redux/slice/gasTokenSlice";
import useBuy from "@/hooks/useBuy";
import TokenButton from "../ui/buttons/TokenButton";
import { toast } from "sonner";

export default function VerifyCreditsDrawer() {
  const dispatch = useDispatch();
  const verifyCreditDrawer = useSelector(
    (state) => state.gasToken.verifyCreditDrawer
  );
  const [txHash, setTxHash] = useState("");
  const { verifyTransaction } = useBuy();
  const currentChain = useSelector((state) => state.chain.currentChain);
  const tokenDrawer = useSelector((state) => state.selector.tokenDrawer);
  const [selectedToken] = useSelector((state) => state.selector.token);

  const handleVerify = () => {
    toast.promise(() => verifyTransaction(txHash, selectedToken), {
      loading: "Verifying...",
    });
  };

  return (
    <>
      <Dialog
        size="xs"
        open={verifyCreditDrawer}
        handler={() => {
          if (!tokenDrawer) {
            dispatch(toggleVerifyCreditDrawer());
          }
        }}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4 mb-1 font-noto">
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
                Verify
              </Typography>
            </div>

            <TokenButton
              index={0}
              id="gas-token-transfer"
              label="Paid with"
              span=""
              value="Select Token"
              chainId={currentChain.chainId}
              style="flex items-center w-64 !3xl:space-y-0 !space-y-0"
            />

            <div className="flex flex-col -mt-9">
              <p className="mt-8 font-noto text-sm text-gray-600">
                Transaction Hash
              </p>
              <div className="mt-2">
                <Input
                  size="lg"
                  type="text"
                  value={txHash}
                  onChange={(e) => {
                    setTxHash(e.target.value);
                  }}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 font-noto"
                />
              </div>
              <Button
                className="mt-5 w-full flex items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
                onClick={() => {
                  handleVerify();
                  dispatch(toggleVerifyCreditDrawer());
                }}
              >
                Verify
              </Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
