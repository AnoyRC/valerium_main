"use client";

import { ethers } from "ethers";
import ValeriumProxyFactoryABI from "@/lib/abi/ValeriumProxyFactory.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setBalanceData,
  setConversionData,
  setCurrentBalanceData,
  setCurrentConversionData,
  setTokenBalanceData,
  setTokenConversionData,
  setWalletAddresses,
} from "@/redux/slice/UserSlice";
import config from "@/lib/config.json";

export default function useWallet() {
  const dispatch = useDispatch();
  const currentChain = useSelector((state) => state.chain.currentChain);

  const getBalance = async (currentChain, address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl,
      );

      const balance = await provider.getBalance(address);

      return balance;
    } catch (error) {
      return 0;
    }
  };

  const getValeriumAddress = async (currentChain, domain) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl,
      );

      const factory = new ethers.Contract(
        currentChain.addresses.ValeriumProxyFactory,
        ValeriumProxyFactoryABI,
        provider,
      );

      const address = await factory.getValeriumProxy(domain);

      return address;
    } catch (error) {
      return ethers.constants.AddressZero;
    }
  };

  const erc20Balance = async (currentChain, tokenAddress, address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl,
      );

      const erc20Contract = new ethers.Contract(
        tokenAddress,
        ["function balanceOf(address) view returns (uint256)"],
        provider,
      );

      const balance = await erc20Contract.balanceOf(address);

      return balance;
    } catch (error) {
      return 0;
    }
  };

  const convertBalance = async (convert_id, id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/public-conversion?convert_id=${convert_id}&id=${id}`,
      );

      if (response.data.status.error_code !== "0") {
        return 0;
      }

      return response.data.data.quote[0].price;
    } catch (error) {
      return 0;
    }
  };

  const loadConversionData = async (currentChain) => {
    const mainConversion = await convertBalance(
      currentChain.convert_id,
      currentChain.id,
    );

    const tokensConversion = await Promise.all(
      currentChain.tokens.map(async (token) => {
        const rate = await convertBalance(token.convert_id, token.id);
        return {
          value: rate,
          address: token.address,
        };
      }),
    );

    return {
      chainId: currentChain.chainId,
      value: mainConversion,
      tokens: tokensConversion,
    };
  };

  const loadBalanceData = async (currentChain, address) => {
    const balance = Number(await getBalance(currentChain, address));
    const erc20Balances = await Promise.all(
      currentChain.tokens.map(async (token) => {
        return {
          balance: Number(
            await erc20Balance(currentChain, token.address, address),
          ),
          decimals: token.decimals,
          address: token.address,
        };
      }),
    );

    return {
      chainId: currentChain.chainId,
      balance,
      erc20Balances,
    };
  };

  const loadAllData = async (domain) => {
    let AllBalanceData = [];
    let AllConversionData = [];
    let addresses = [];

    for (const chain in config) {
      const currentChain = config[chain];

      const address = await getValeriumAddress(currentChain, domain);

      addresses.push({
        chainId: currentChain.chainId,
        address,
      });

      if (address === ethers.constants.AddressZero) {
        continue;
      }

      const conversionData = await loadConversionData(currentChain);
      const balanceData = await loadBalanceData(currentChain, address);

      AllConversionData.push(conversionData);
      AllBalanceData.push(balanceData);
    }

    dispatch(setWalletAddresses(addresses));
    dispatch(setConversionData(AllConversionData));
    dispatch(setBalanceData(AllBalanceData));
  };

  const loadCurrentChainData = async (domain) => {
    const address = await getValeriumAddress(currentChain, domain);

    if (address === ethers.constants.AddressZero) {
      dispatch(setCurrentBalanceData(null));
      dispatch(setCurrentConversionData(null));
      return;
    }

    const mainConversion = await convertBalance(
      currentChain.convert_id,
      currentChain.id,
    );
    const balance = Number(await getBalance(currentChain, address));

    dispatch(setCurrentBalanceData(balance));
    dispatch(setCurrentConversionData(mainConversion));
  };

  const loadTokenData = async (domain) => {
    const address = await getValeriumAddress(currentChain, domain);

    if (address === ethers.constants.AddressZero) {
      return;
    }

    const tokenBalanceData = await Promise.all(
      currentChain.tokens.map(async (token) => {
        return {
          name: token.name,
          balance: Number(
            await erc20Balance(currentChain, token.address, address),
          ),
          address: token.address,
          decimals: token.decimals,
        };
      }),
    );

    const tokenConversionData = await Promise.all(
      currentChain.tokens.map(async (token) => {
        const rate = await convertBalance(token.convert_id, token.usd_id);
        return {
          usdValue: rate,
          address: token.address,
        };
      }),
    );

    dispatch(setTokenBalanceData(tokenBalanceData));
    dispatch(setTokenConversionData(tokenConversionData));
  };

  return {
    getBalance,
    getValeriumAddress,
    erc20Balance,
    convertBalance,
    loadConversionData,
    loadBalanceData,
    loadAllData,
    loadCurrentChainData,
    loadTokenData,
  };
}
