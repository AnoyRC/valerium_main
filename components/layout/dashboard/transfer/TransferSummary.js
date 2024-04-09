import SummaryHeading from "../Wallet/summarySection/SummaryHeading";
import SummaryMain from "../Wallet/summarySection/SummaryMain";
import SummaryFooter from "../Wallet/summarySection/SummaryFooter";
import SummaryTotal from "../Wallet/summarySection/SummaryTotal";

const TransferSummary = () => {
  return (
    <section className="p-6 flex-1">
      <SummaryHeading />
      <SummaryMain />
      <SummaryFooter />
      <SummaryTotal />
    </section>
  );
};

export default TransferSummary;
