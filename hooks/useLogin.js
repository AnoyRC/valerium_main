"use client";

import baseChain from "@/lib/baseChain";
import ValeriumProxyFactoryABI from "@/lib/abi/ValeriumProxyFactory.json";
import { ethers } from "ethers";

export default function useLogin() {
  const getValerium = async (domain) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(baseChain.rpcUrl);

      const factory = new ethers.Contract(
        baseChain.addresses.ValeriumProxyFactory,
        ValeriumProxyFactoryABI,
        provider
      );

      const valeriumAddress = await factory.getValeriumProxy(
        domain + "@valerium"
      );

      return valeriumAddress;
    } catch (error) {
      return ethers.constants.AddressZero;
    }
  };

  return { getValerium };
}
