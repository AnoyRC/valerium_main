import SummaryProcessing from "../Wallet/summarySection/SummaryProcessing";
import GasTokenItem from "./GasTokenItem";
import BuyGasTokenButton from "@/components/ui/buttons/BuyGasTokenButton";
import PayWith from "./PayWith";
import PayGasWith from "./PayGasWith";

const GasTokenContainer = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <SummaryProcessing />
        <PayWith />
      </div>

      <div className="flex w-full justify-between">
        <GasTokenItem quantity={1} />
        <GasTokenItem quantity={2} />
        <GasTokenItem quantity={5} />
      </div>

      <PayGasWith />
      <BuyGasTokenButton />
    </section>
  );
};

export default GasTokenContainer;
