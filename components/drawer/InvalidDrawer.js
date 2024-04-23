"use client";
import { setDeployed } from "@/redux/slice/UserSlice";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function InvalidDrawer() {
  const router = useRouter();
  const isDeployed = useSelector((state) => state.user.isDeployed);
  const dispatch = useDispatch();

  return (
    <>
      <Dialog
        size="xs"
        open={!isDeployed}
        handler={() => {}}
        className="bg-transparent shadow-none outline-none"
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
                Valerium
              </Typography>
            </div>

            <div className="flex flex-col ">
              <Typography
                variant="h6"
                color="blue-gray"
                className="font-noto font-bold text-center"
              >
                Valerium is not Deployed
              </Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-noto text-center"
              >
                Please deploy Valerium to use the wallet.
              </Typography>
            </div>

            <div className=" flex flex-col mt-2">
              <Button
                className=" w-full flex items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
                onClick={() => {
                  dispatch(setDeployed(true));
                  router.push("/login");
                }}
              >
                Login
              </Button>

              <div className="mt-2 mb-2 flex items-center justify-center gap-4">
                <div className="mt-2 mb-2 h-0.5 w-[45%] bg-gray-400"></div>
                <p className="mt-2 mb-2 text-sm text-gray-600">or</p>
                <div className="mt-2 mb-2 h-0.5 w-[45%] bg-gray-400"></div>
              </div>

              <Button
                className=" w-full flex items-center justify-center bg-gradient-primary-light font-noto font-normal normal-case"
                onClick={() => {
                  dispatch(setDeployed(true));
                  router.push("/signUp");
                }}
              >
                Sign Up
              </Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
