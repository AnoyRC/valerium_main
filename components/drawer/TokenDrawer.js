"use client";

import config from "@/lib/config";

import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { setToken, toggleTokenDrawer } from "@/redux/slice/selectorSlice";

export function TokenDrawer() {
  const dispatch = useDispatch();

  const tokenIndex = useSelector((state) => state.selector.tokenIndex);
  const tokenDrawer = useSelector((state) => state.selector.tokenDrawer);
  const drawerChain = useSelector((state) => state.selector.drawerChain);

  const currentChain = config.find((chain) => chain.chainId === drawerChain);

  return (
    <>
      <Dialog
        size="xs"
        open={tokenDrawer}
        handler={() => {
          dispatch(toggleTokenDrawer());
        }}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray" className="font-noto">
              Select a Token
            </Typography>

            {currentChain.tokens.map((token, index) => (
              <Button
                key={index}
                className="w-full rounded-2xl border border-border-light bg-white px-4 py-3.5 text-left font-noto text-base normal-case text-gray-600 shadow-none outline-none"
                onClick={() => {
                  dispatch(toggleTokenDrawer());
                  dispatch(
                    setToken({
                      token: token,
                      index: tokenIndex,
                    })
                  );
                }}
              >
                <div className="flex gap-3">
                  <Image
                    src={`/tokens/${token.logo}`}
                    alt={token.name + " logo"}
                    width={14}
                    height={14}
                    className="rounded-full"
                  />
                  {token.name}
                </div>
              </Button>
            ))}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
