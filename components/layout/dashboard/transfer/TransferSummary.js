import SummaryHeading from "../Wallet/summarySection/SummaryHeading";
import SummaryMain from "../Wallet/summarySection/SummaryMain";
import SummaryFooter from "../Wallet/summarySection/SummaryFooter";
import SummaryTotal from "../Wallet/summarySection/SummaryTotal";

const TransferSummary = ({ selectedToken, amount, activeTab, payWith }) => {
  console.log(selectedToken);
  return (
    <section className="flex-1 space-y-5 p-6">
      <SummaryHeading />
      <hr className="border-border-light" />

      <SummaryMain token={selectedToken[0]} />

      <hr className="border-border-light" />

      <SummaryFooter
        token={selectedToken}
        amount={amount}
        activeTab={activeTab}
        payWith={payWith}
      />

      <SummaryTotal token={selectedToken[0]} />
    </section>
  );
};

export default TransferSummary;
