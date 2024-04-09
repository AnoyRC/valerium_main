import SummaryHeading from "../Wallet/summarySection/SummaryHeading";
import SummaryMain from "../Wallet/summarySection/SummaryMain";
import SummaryFooter from "../Wallet/summarySection/SummaryFooter";
import SummaryTotal from "../Wallet/summarySection/SummaryTotal";

const TransferSummary = () => {
  return (
    <section className="flex-1 space-y-5 p-6">
      <SummaryHeading />
      <hr className="border-border-light" />

      <SummaryMain />
      <hr className="border-border-light" />

      <SummaryFooter />
      <SummaryTotal />
    </section>
  );
};

export default TransferSummary;
