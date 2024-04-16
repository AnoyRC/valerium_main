"use client";

import { ethers } from "ethers";
import ValeriumProxyFactoryABI from "@/lib/abi/ValeriumProxyFactory.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setTokenBalanceData,
  setTokenConversionData,
  setWalletAddresses,
} from "@/redux/slice/UserSlice";
import config from "@/lib/config";
import ValeriumABI from "@/lib/abi/Valerium.json";
import { setEmail, setType } from "@/redux/slice/proofSlice";
import { toast } from "sonner";
import { setCurrentChain } from "@/redux/slice/chainSlice";

export default function useWallet() {
  const dispatch = useDispatch();
  const currentChain = useSelector((state) => state.chain.currentChain);

  const getBalance = async (currentChain, address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
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
        currentChain.rpcUrl
      );

      const factory = new ethers.Contract(
        currentChain.addresses.ValeriumProxyFactory,
        ValeriumProxyFactoryABI,
        provider
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
        currentChain.rpcUrl
      );

      if (tokenAddress) {
        const erc20Contract = new ethers.Contract(
          tokenAddress,
          ["function balanceOf(address) view returns (uint256)"],
          provider
        );

        const balance = await erc20Contract.balanceOf(address);

        return balance;
      } else {
        const balance = await provider.getBalance(address);
        return balance;
      }
    } catch (error) {
      return 0;
    }
  };

  const convertBalance = async (convert_id, id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/public-conversion?convert_id=${convert_id}&id=${id}`
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
      currentChain.id
    );

    const tokensConversion = await Promise.all(
      currentChain.tokens.map(async (token) => {
        const rate = await convertBalance(token.convert_id, token.id);
        return {
          value: rate,
          address: token.address,
        };
      })
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
            await erc20Balance(currentChain, token.address, address)
          ),
          decimals: token.decimals,
          address: token.address,
        };
      })
    );

    return {
      chainId: currentChain.chainId,
      balance,
      erc20Balances,
    };
  };

  const loadAllData = async (domain) => {
    let addresses = [];

    for (const chain in config) {
      const currentChain = config[chain];

      const address = await getValeriumAddress(currentChain, domain);

      addresses.push({
        chainId: currentChain.chainId,
        address,
      });
    }

    dispatch(setWalletAddresses(addresses));
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
            await erc20Balance(currentChain, token.address, address)
          ),
          address: token.address,
          decimals: token.decimals,
          logo: token.logo,
        };
      })
    );

    const tokenConversionData = await Promise.all(
      currentChain.tokens.map(async (token) => {
        const rate = await convertBalance(token.convert_id, token.usd_id);
        return {
          usdValue: rate,
          address: token.address,
        };
      })
    );

    dispatch(setTokenBalanceData(tokenBalanceData));
    dispatch(setTokenConversionData(tokenConversionData));
  };

  const getPublicStorage = async (currentChain, walletAddresses) => {
    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    const walletAddress = walletAddresses.find(
      (address) => address.chainId === currentChain.chainId
    )?.address;

    const valerium = new ethers.Contract(walletAddress, ValeriumABI, provider);

    const publicStorage = await valerium.PublicStorage();

    if (publicStorage === "0x") {
      return null;
    }

    return publicStorage;
  };

  const getNonce = async (currentChain, walletAddresses) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const walletAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      const valerium = new ethers.Contract(
        walletAddress,
        ValeriumABI,
        provider
      );

      const nonce = await valerium.getNonce();

      return nonce;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const loadPublicStorage = async (currentChain, walletAddresses) => {
    try {
      const publicStorage = await getPublicStorage(
        currentChain,
        walletAddresses
      );
      const abiCoder = new ethers.utils.AbiCoder();
      const decoded = abiCoder.decode(["string", "string"], publicStorage);
      dispatch(setType(decoded[0]));
      dispatch(setEmail(decoded[1]));
    } catch (error) {
      console.log(error);
    }
  };

  const switchChain = (chainId) => {
    const chain = config.find((chain) => chain.chainId === chainId);

    if (!chain) {
      toast.error("Chain not found");
      return;
    }

    dispatch(setCurrentChain(chain));
  };

  return {
    getBalance,
    getValeriumAddress,
    erc20Balance,
    convertBalance,
    loadConversionData,
    loadBalanceData,
    loadAllData,
    loadTokenData,
    getPublicStorage,
    getNonce,
    loadPublicStorage,
    switchChain,
  };
}
