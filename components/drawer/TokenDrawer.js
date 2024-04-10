"use client"

import { setToken, toggleTokenDrawer } from "@/redux/slice/selectorSlice";
import config from "@/lib/config.json";
import {
    Dialog,
    Card,
    CardBody,
    Typography,
    Button
  } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
   
  export function TokenDrawer() {
    const tokenDrawer = useSelector((state) => state.selector.tokenDrawer);
    const dispatch = useDispatch();
    const drawerChain = useSelector((state) => state.selector.drawerChain);
    const currentChain = config.find((chain) => chain.chainId === drawerChain);
    const tokenIndex = useSelector((state) => state.selector.tokenIndex);

    let tokens = [
        {
            name: currentChain.symbol,
            logo: currentChain.logo,
            address: null,
        }
    ]; 

    currentChain.tokens.map((token) => {
        tokens.push({
            name: token.name,
            logo: token.logo,
            address: token.address,
        })
    })
   
    return (
      <>
        <Dialog
          size="xs"
          open={tokenDrawer}
          handler={() => {
            dispatch(toggleTokenDrawer())
          }}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray" className="font-noto">
                Select a Token
              </Typography>
            
                {tokens.map((token, index) => (
                    <Button
                    key={index}
                    className="w-full shadow-none normal-case font-noto text-left rounded-2xl border border-border-light bg-white px-4 py-3.5 text-base text-gray-600 outline-none"
                    onClick={() => {
                        dispatch(toggleTokenDrawer())
                        dispatch(setToken({
                            token: token,
                            index: tokenIndex
                        }))
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