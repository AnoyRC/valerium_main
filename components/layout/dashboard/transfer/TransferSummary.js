import SummaryHeading from "../Wallet/summarySection/SummaryHeading";
import SummaryMain from "../Wallet/summarySection/SummaryMain";
import SummaryFooter from "../Wallet/summarySection/SummaryFooter";
import SummaryTotal from "../Wallet/summarySection/SummaryTotal";

const TransferSummary = ({ token, amount, activeTab, recipient, payWith }) => {
  return (
    <section className="flex-1 space-y-5 p-6">
      <SummaryHeading />
      <hr className="border-border-light" />

      <SummaryMain token={token} />
      <hr className="border-border-light" />

      <SummaryFooter
        token={token}
        amount={amount}
        activeTab={activeTab}
        payWith={payWith}
      />
      <SummaryTotal token={token} />
    </section>
  );
};

export default TransferSummary;
