"use client";

import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import ValeriumForwarderABI from "@/lib/abi/ValeriumForwarder.json";
import ValeriumVaultABI from "@/lib/abi/ValeriumVault.json";
import axios from "axios";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import useWallet from "./useWallet";
import { setIsRunning } from "@/redux/slice/TxSlice";

export default function useBuy() {
  const txProof = useSelector((state) => state.proof.txProof);
  const [selectedToken, gasToken] = useSelector(
    (state) => state.selector.token
  );
  const updates = useSelector((state) => state.gasToken.updates);
  const quantity = useSelector((state) => state.gasToken.quantity);
  const currentChain = useSelector((state) => state.chain.currentChain);
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const searchParams = useSearchParams();
  const { loadGasCredit } = useWallet();
  const type = useSelector((state) => state.proof.type);
  const dispatch = useDispatch();

  const selectedUpdates =
    currentChain &&
    updates &&
    updates.find((update) => update.chainId === currentChain.chainId);

  const selectedPrice =
    selectedUpdates &&
    selectedUpdates.tokens.find(
      (token) => token.address === selectedToken.address
    );

  const estimateGas = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const valeriumAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      if (!valeriumAddress) return 0;

      const forwarder = new ethers.Contract(
        currentChain.addresses.ValeriumForwarder,
        ValeriumForwarderABI,
        provider
      );

      const ValeriumVault = new ethers.Contract(
        currentChain.addresses.ValeriumVault,
        ValeriumVaultABI,
        provider
      );

      const keypair = ethers.Wallet.createRandom();

      if (selectedToken.address === null) {
        const deposit = ValeriumVault.interface.encodeFunctionData("deposit", [
          ethers.constants.AddressZero,
          Number(quantity * selectedPrice?.creditCost).toFixed(0),
        ]);

        const message = {
          from: keypair.address,
          recipient: valeriumAddress,
          deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
          nonce: Number(await forwarder.nonces(keypair.address)),
          gas: 1000000,
          proof: txProof,
          to: ValeriumVault.address,
          value: Number(quantity * selectedPrice?.creditCost).toFixed(0),
          data: deposit,
        };

        const data712 = {
          types: {
            ForwardExecute: [
              { name: "from", type: "address" },
              { name: "recipient", type: "address" },
              { name: "deadline", type: "uint256" },
              { name: "nonce", type: "uint256" },
              { name: "gas", type: "uint256" },
              { name: "proof", type: "bytes" },
              { name: "to", type: "address" },
              { name: "value", type: "uint256" },
              { name: "data", type: "bytes" },
            ],
          },
          domain: {
            name: "Valerium Forwarder",
            version: "1",
            chainId: currentChain.chainId,
            verifyingContract: currentChain.addresses.ValeriumForwarder,
          },
          message: message,
        };

        const signature = await keypair._signTypedData(
          data712.domain,
          data712.types,
          data712.message
        );

        const forwardRequest = {
          from: keypair.address,
          recipient: valeriumAddress,
          deadline: message.deadline,
          gas: message.gas,
          proof: message.proof,
          to: message.to,
          value: message.value,
          data: message.data,
          signature: signature,
        };

        if (gasToken.address == null) {
          const estimate = await axios.get(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/api/execute/estimate/native/${
              currentChain.chainId
            }?forwardRequest=${JSON.stringify(forwardRequest)}`
          );

          if (estimate.data.success) {
            return estimate.data.estimates.estimateFees;
          } else {
            return 0;
          }
        }

        const estimate = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/execute/estimate/erc20/${
            currentChain.chainId
          }?forwardRequest=${JSON.stringify(forwardRequest)}&address=${
            gasToken.address
          }`
        );

        if (estimate.data.success) {
          return estimate.data.estimates.estimateFees;
        }
        return 0;
      } else {
        const to = [selectedToken.address, ValeriumVault.address];
        let toHash = ethers.constants.HashZero;
        for (let i = 0; i < to.length; i++) {
          toHash = ethers.utils.keccak256(
            ethers.utils.solidityPack(["bytes32", "address"], [toHash, to[i]])
          );
        }

        const value = [0, 0];
        let valueHash = ethers.constants.HashZero;
        for (let i = 0; i < value.length; i++) {
          valueHash = ethers.utils.keccak256(
            ethers.utils.solidityPack(
              ["bytes32", "uint256"],
              [valueHash, value[i]]
            )
          );
        }

        const erc20Contract = new ethers.Contract(
          selectedToken.address,
          [
            "function approve(address spender, uint256 amount) public returns (bool)",
          ],
          provider
        );

        const approveData = erc20Contract.interface.encodeFunctionData(
          "approve",
          [
            ValeriumVault.address,
            Number(quantity * selectedPrice?.creditCost).toFixed(0),
          ]
        );

        const depositData = ValeriumVault.interface.encodeFunctionData(
          "deposit",
          [
            selectedToken.address,
            Number(quantity * selectedPrice?.creditCost).toFixed(0),
          ]
        );

        const dataArray = [approveData, depositData];

        let dataHash = ethers.constants.HashZero;
        for (let i = 0; i < dataArray.length; i++) {
          dataHash = ethers.utils.keccak256(
            ethers.utils.solidityPack(
              ["bytes32", "bytes32"],
              [dataHash, ethers.utils.keccak256(dataArray[i])]
            )
          );
        }

        const message = {
          from: keypair.address,
          recipient: valeriumAddress,
          deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
          nonce: Number(await forwarder.nonces(keypair.address)),
          gas: 1000000,
          proof: txProof,
          to: toHash,
          value: valueHash,
          data: dataHash,
        };

        const data712 = {
          types: {
            ForwardExecuteBatch: [
              { name: "from", type: "address" },
              { name: "recipient", type: "address" },
              { name: "deadline", type: "uint256" },
              { name: "nonce", type: "uint256" },
              { name: "gas", type: "uint256" },
              { name: "proof", type: "bytes" },
              { name: "to", type: "bytes32" },
              { name: "value", type: "bytes32" },
              { name: "data", type: "bytes32" },
            ],
          },
          domain: {
            name: "Valerium Forwarder",
            version: "1",
            chainId: currentChain.chainId,
            verifyingContract: currentChain.addresses.ValeriumForwarder,
          },
          message: message,
        };

        const signature = await keypair._signTypedData(
          data712.domain,
          data712.types,
          data712.message
        );

        const forwardRequest = {
          from: keypair.address,
          recipient: valeriumAddress,
          deadline: message.deadline,
          gas: message.gas,
          proof: message.proof,
          to: to,
          value: value,
          data: dataArray,
          signature: signature,
        };

        if (gasToken.address == null) {
          const estimate = await axios.get(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/api/executeBatch/estimate/native/${
              currentChain.chainId
            }?forwardRequest=${JSON.stringify(forwardRequest)}`
          );

          if (estimate.data.success) {
            return estimate.data.estimates.estimateFees;
          } else {
            return 0;
          }
        }

        const estimate = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/executeBatch/estimate/erc20/${
            currentChain.chainId
          }?forwardRequest=${JSON.stringify(forwardRequest)}&address=${
            gasToken.address
          }`
        );

        if (estimate.data.success) {
          return estimate.data.estimates.estimateFees;
        }
        return 0;
      }
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const buy = async (proof) => {
    try {
      dispatch(setIsRunning(true));
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const valeriumAddress = walletAddresses.find(
        (address) => address.chainId === currentChain.chainId
      )?.address;

      if (!valeriumAddress) return 0;

      const forwarder = new ethers.Contract(
        currentChain.addresses.ValeriumForwarder,
        ValeriumForwarderABI,
        provider
      );

      const ValeriumVault = new ethers.Contract(
        currentChain.addresses.ValeriumVault,
        ValeriumVaultABI,
        provider
      );

      const keypair = ethers.Wallet.createRandom();

      if (selectedToken.address === null) {
        const deposit = ValeriumVault.interface.encodeFunctionData("deposit", [
          ethers.constants.AddressZero,
          Number(quantity * selectedPrice?.creditCost).toFixed(0),
        ]);

        const message = {
          from: keypair.address,
          recipient: valeriumAddress,
          deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
          nonce: Number(await forwarder.nonces(keypair.address)),
          gas: 1000000,
          proof: proof,
          to: ValeriumVault.address,
          value: Number(quantity * selectedPrice?.creditCost).toFixed(0),
          data: deposit,
        };

        const data712 = {
          types: {
            ForwardExecute: [
              { name: "from", type: "address" },
              { name: "recipient", type: "address" },
              { name: "deadline", type: "uint256" },
              { name: "nonce", type: "uint256" },
              { name: "gas", type: "uint256" },
              { name: "proof", type: "bytes" },
              { name: "to", type: "address" },
              { name: "value", type: "uint256" },
              { name: "data", type: "bytes" },
            ],
          },
          domain: {
            name: "Valerium Forwarder",
            version: "1",
            chainId: currentChain.chainId,
            verifyingContract: currentChain.addresses.ValeriumForwarder,
          },
          message: message,
        };

        const signature = await keypair._signTypedData(
          data712.domain,
          data712.types,
          data712.message
        );

        const forwardRequest = {
          from: keypair.address,
          recipient: valeriumAddress,
          deadline: message.deadline,
          gas: message.gas,
          proof: message.proof,
          to: message.to,
          value: message.value,
          data: message.data,
          signature: signature,
        };

        if (gasToken.address == null) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/execute/native/${currentChain.chainId}`,
            {
              forwardRequest,
              mode: type === "Password" ? "password" : "signature",
            }
          );

          if (response.data.success) {
            toast.promise(
              () =>
                verifyTransaction(
                  response.data.receipt.transactionHash,
                  selectedToken
                ),
              {
                loading: "Verifying...",
              }
            );
            return true;
          } else {
            toast.error(response.data.error);
            return false;
          }
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/execute/erc20/${currentChain.chainId}?address=${gasToken.address}`,
          {
            forwardRequest,
            mode: type === "Password" ? "password" : "signature",
          }
        );
        if (response.data.success) {
          toast.promise(
            () =>
              verifyTransaction(
                response.data.receipt.transactionHash,
                selectedToken
              ),
            {
              loading: "Verifying...",
            }
          );
          return true;
        } else {
          toast.error(response.data.error);
          return false;
        }
      } else {
        const to = [selectedToken.address, ValeriumVault.address];
        let toHash = ethers.constants.HashZero;
        for (let i = 0; i < to.length; i++) {
          toHash = ethers.utils.keccak256(
            ethers.utils.solidityPack(["bytes32", "address"], [toHash, to[i]])
          );
        }

        const value = [0, 0];
        let valueHash = ethers.constants.HashZero;
        for (let i = 0; i < value.length; i++) {
          valueHash = ethers.utils.keccak256(
            ethers.utils.solidityPack(
              ["bytes32", "uint256"],
              [valueHash, value[i]]
            )
          );
        }

        const erc20Contract = new ethers.Contract(
          selectedToken.address,
          [
            "function approve(address spender, uint256 amount) public returns (bool)",
          ],
          provider
        );

        const approveData = erc20Contract.interface.encodeFunctionData(
          "approve",
          [
            ValeriumVault.address,
            Number(quantity * selectedPrice?.creditCost).toFixed(0),
          ]
        );

        const depositData = ValeriumVault.interface.encodeFunctionData(
          "deposit",
          [
            selectedToken.address,
            Number(quantity * selectedPrice?.creditCost).toFixed(0),
          ]
        );

        const dataArray = [approveData, depositData];

        let dataHash = ethers.constants.HashZero;
        for (let i = 0; i < dataArray.length; i++) {
          dataHash = ethers.utils.keccak256(
            ethers.utils.solidityPack(
              ["bytes32", "bytes32"],
              [dataHash, ethers.utils.keccak256(dataArray[i])]
            )
          );
        }

        const message = {
          from: keypair.address,
          recipient: valeriumAddress,
          deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
          nonce: Number(await forwarder.nonces(keypair.address)),
          gas: 1000000,
          proof: proof,
          to: toHash,
          value: valueHash,
          data: dataHash,
        };

        const data712 = {
          types: {
            ForwardExecuteBatch: [
              { name: "from", type: "address" },
              { name: "recipient", type: "address" },
              { name: "deadline", type: "uint256" },
              { name: "nonce", type: "uint256" },
              { name: "gas", type: "uint256" },
              { name: "proof", type: "bytes" },
              { name: "to", type: "bytes32" },
              { name: "value", type: "bytes32" },
              { name: "data", type: "bytes32" },
            ],
          },
          domain: {
            name: "Valerium Forwarder",
            version: "1",
            chainId: currentChain.chainId,
            verifyingContract: currentChain.addresses.ValeriumForwarder,
          },
          message: message,
        };

        const signature = await keypair._signTypedData(
          data712.domain,
          data712.types,
          data712.message
        );

        const forwardRequest = {
          from: keypair.address,
          recipient: valeriumAddress,
          deadline: message.deadline,
          gas: message.gas,
          proof: message.proof,
          to: to,
          value: value,
          data: dataArray,
          signature: signature,
        };

        if (gasToken.address == null) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/executeBatch/native/${currentChain.chainId}`,
            {
              forwardRequest,
              mode: type === "Password" ? "password" : "signature",
            }
          );

          if (response.data.success) {
            toast.promise(
              () =>
                verifyTransaction(
                  response.data.receipt.transactionHash,
                  selectedToken
                ),
              {
                loading: "Verifying...",
              }
            );
            return true;
          } else {
            toast.error(response.data.error);
            return false;
          }
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/executeBatch/erc20/${currentChain.chainId}?address=${gasToken.address}`,
          {
            forwardRequest,
            mode: type === "Password" ? "password" : "signature",
          }
        );
        if (response.data.success) {
          toast.promise(
            () =>
              verifyTransaction(
                response.data.receipt.transactionHash,
                selectedToken
              ),
            {
              loading: "Verifying...",
            }
          );
          return true;
        } else {
          toast.error(response.data.error);
          return false;
        }
      }
    } catch (error) {
      console.log(error);
      return 0;
    } finally {
      dispatch(setIsRunning(false));
    }
  };

  const verifyTransaction = async (txHash, selectedToken) => {
    try {
      dispatch(setIsRunning(true));
      if (selectedToken.address === null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gasCredit/native/verify/${
            currentChain.chainId
          }?tx=${txHash}&domain=${searchParams.get("domain") + ".valerium.id"}`
        );

        if (response.data.success) {
          await loadGasCredit(searchParams.get("domain") + ".valerium.id");
          toast.success("Transaction verified");
        } else {
          toast.error("Failed to verify transaction");
        }
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gasCredit/erc20/verify/${
            currentChain.chainId
          }?tx=${txHash}&domain=${
            searchParams.get("domain") + ".valerium.id"
          }&address=${selectedToken.address}`
        );

        if (response.data.success) {
          await loadGasCredit(searchParams.get("domain") + ".valerium.id");
          toast.success("Transaction verified");
        } else {
          toast.error("Failed to verify transaction");
        }
      }
    } catch (error) {
      toast.error("Failed to verify transaction");
      console.log(error);
    } finally {
      dispatch(setIsRunning(false));
    }
  };

  return {
    estimateGas,
    buy,
    verifyTransaction,
  };
}
