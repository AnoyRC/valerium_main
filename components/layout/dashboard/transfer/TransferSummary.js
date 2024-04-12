import SummaryHeading from "../Wallet/summarySection/SummaryHeading";
import SummaryMain from "../Wallet/summarySection/SummaryMain";
import SummaryFooter from "../Wallet/summarySection/SummaryFooter";
import SummaryTotal from "../Wallet/summarySection/SummaryTotal";
import useExecute from "@/hooks/useExecute";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const TransferSummary = ({
  recipient,
  selectedToken,
  amount,
  usdToggle,
  isValid,
}) => {
  const txProof = useSelector((state) => state.proof.txProof);
  const { estimateGas } = useExecute();
  const walletAddresses = useSelector((state) => state.user.walletAddresses);
  const [isLoading, setIsLoading] = useState(false);
  const [gas, setGas] = useState(0);
  const tokenConversionData = useSelector(
    (state) => state.user.tokenConversionData
  );
  var GasTimeout = null;
  const currentChain = useSelector((state) => state.chain.currentChain);

  const currentTokenConversion = selectedToken
    ? tokenConversionData
      ? 1 /
          tokenConversionData.find(
            (token) => token.address === selectedToken[0].address
          ).usdValue || 1
      : 0
    : 0;

  const handleEstimateGas = async () => {
    try {
      let gas;

      if (selectedToken[0].address === null) {
        if (!usdToggle) {
          gas = await estimateGas(
            walletAddresses,
            selectedToken[1],
            txProof,
            recipient,
            Number(amount * 10 ** selectedToken[0].decimals).toFixed(0),
            "0x"
          );
        } else {
          gas = await estimateGas(
            walletAddresses,
            selectedToken[1],
            txProof,
            recipient,
            Number(
              (amount / currentTokenConversion) *
                10 ** selectedToken[0].decimals
            ).toFixed(0),
            "0x"
          );
        }
      } else {
        const provider = new ethers.providers.JsonRpcProvider(
          currentChain.rpcUrl
        );
        const erc20Token = new ethers.Contract(
          selectedToken[0].address,
          ["function transfer(address to, uint256 value) returns (bool)"],
          provider
        );
        let data;
        if (!usdToggle) {
          data = erc20Token.interface.encodeFunctionData("transfer", [
            recipient,
            ethers.utils.parseUnits(amount, selectedToken[0].decimals),
          ]);
        } else {
          data = erc20Token.interface.encodeFunctionData("transfer", [
            recipient,
            ethers.utils.parseUnits(
              (amount / currentTokenConversion).toFixed(
                selectedToken[0].decimals
              ),
              selectedToken[0].decimals
            ),
          ]);
        }
        gas = await estimateGas(
          walletAddresses,
          selectedToken[1],
          txProof,
          selectedToken[0].address,
          0,
          data
        );
      }
      setGas(gas);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      amount &&
      amount !== "0" &&
      selectedToken &&
      recipient &&
      isValid &&
      txProof
    ) {
      clearTimeout(GasTimeout);
      setIsLoading(true);
      GasTimeout = setTimeout(() => {
        handleEstimateGas();
      }, 1000);
    }
  }, [
    amount,
    selectedToken,
    recipient,
    usdToggle,
    isValid,
    txProof,
    currentChain,
  ]);

  return (
    <section className="flex-1 space-y-5 p-6">
      <SummaryHeading />
      <hr className="border-border-light" />

      <SummaryMain
        amount={amount}
        token={selectedToken[0]}
        usdToggle={usdToggle}
      />

      <hr className="border-border-light" />

      <SummaryFooter
        token={selectedToken}
        amount={amount}
        usdToggle={usdToggle}
        gas={gas}
        isLoading={isLoading}
      />

      <SummaryTotal
        token={selectedToken}
        usdToggle={usdToggle}
        gas={gas}
        isLoading={isLoading}
        amount={amount}
      />
    </section>
  );
};

export default TransferSummary;
