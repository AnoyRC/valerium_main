import SummaryProcessing from "../Wallet/summarySection/SummaryProcessing";
import GasTokenItem from "./GasTokenItem";
import BuyGasTokenButton from "@/components/ui/buttons/BuyGasTokenButton";
import PayWithGas from "./PayWithGas";

const GasTokenContainer = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <SummaryProcessing />
        <PayWithGas />
      </div>

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
