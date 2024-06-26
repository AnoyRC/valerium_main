"use client";

import { ethers } from "ethers";
import ValeriumProxyFactoryABI from "@/lib/abi/ValeriumProxyFactory.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeployed,
  setGasCredit,
  setTokenBalanceData,
  setTokenConversionData,
  setWalletAddresses,
} from "@/redux/slice/UserSlice";
import config from "@/lib/config";
import ValeriumABI from "@/lib/abi/Valerium.json";
import {
  setEmail,
  setRecoveryProof,
  setTxProof,
  setType,
  setWallet,
} from "@/redux/slice/proofSlice";
import { toast } from "sonner";
import { setCurrentChain } from "@/redux/slice/chainSlice";
import { setUpdates } from "@/redux/slice/gasTokenSlice";
import baseChain from "@/lib/baseChain";
import { setToken } from "@/redux/slice/selectorSlice";

export default function useWallet() {
  const dispatch = useDispatch();
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const isRunning = useSelector((state) => state.tx.isRunning);
  const wallet = useSelector((state) => state.proof.wallet);

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

      const address = await factory.getValeriumProxy(domain?.toLowerCase());

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

      const address = await getValeriumAddress(
        currentChain,
        domain?.toLowerCase()
      );

      addresses.push({
        chainId: currentChain.chainId,
        address,
      });
    }

    const baseChainAddress = addresses.find(
      (address) => address.chainId === baseChain.chainId
    );

    if (
      baseChainAddress === undefined ||
      baseChainAddress.address === ethers.constants.AddressZero
    ) {
      dispatch(setDeployed(false));
    }

    dispatch(setWalletAddresses(addresses));
  };

  const loadTokenData = async (currentChain, domain) => {
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
    if (isRunning) {
      toast.error("Transaction in progress");
      return;
    }

    const chain = config.find((chain) => chain.chainId === chainId);

    const walletAddress =
      walletAddresses &&
      walletAddresses.find((address) => address.chainId === chainId);

    if (
      !walletAddress ||
      walletAddress.address === ethers.constants.AddressZero
    ) {
      toast.error("Wallet not deployed on this chain");
      return;
    }

    if (!chain) {
      toast.error("Chain not found");
      return;
    }

    dispatch(setTxProof(null));
    dispatch(setRecoveryProof(null));
    dispatch(setTokenConversionData(null));
    dispatch(setTokenBalanceData(null));
    dispatch(setCurrentChain(chain));
    dispatch(
      setToken({
        token: chain.tokens[0],
        index: 0,
      })
    );
    dispatch(
      setToken({
        token: chain.tokens[0],
        index: 1,
      })
    );
  };

  const loadGasCredit = async (domain) => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/gasCredit/balance/${domain?.toLowerCase()}`
      );

      if (response.data.success) {
        dispatch(setGasCredit(response.data.senderBalance.balance));
      } else {
        dispatch(setGasCredit(0));
      }
    } catch (error) {
      return 0;
    }
  };

  const getGasUpdates = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gasCredit/getPrice`
      );

      if (response.data.success) {
        dispatch(setUpdates(response.data.updates));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getENSAddress = async (domain) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_MAINNET_RPCURL
      );

      const address = await provider.resolveName(domain);

      return address;
    } catch (error) {
      return ethers.constants.AddressZero;
    }
  };

  const initializeProofWallet = async () => {
    if (!wallet) {
      const newWallet = ethers.Wallet.createRandom();

      dispatch(setWallet(newWallet));

      return newWallet;
    }

    return wallet;
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
    loadGasCredit,
    getGasUpdates,
    getENSAddress,
    initializeProofWallet,
  };
}
