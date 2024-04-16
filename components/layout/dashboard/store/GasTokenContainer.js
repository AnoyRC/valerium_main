import SummaryProcessing from "../Wallet/summarySection/SummaryProcessing";
import GasTokenItem from "./GasTokenItem";
import BuyGasTokenButton from "@/components/ui/buttons/BuyGasTokenButton";

const GasTokenContainer = () => {
  return (
    <section className="space-y-4">
      <SummaryProcessing />

      <div className="flex">
        <GasTokenItem price="1" />
        <GasTokenItem price="2" />
        <GasTokenItem price="5" />
      </div>

      <BuyGasTokenButton price="1" />
    </section>
  );
};

export default GasTokenContainer;
