import SummaryHeading from "../Wallet/summarySection/SummaryHeading";
import SummaryMain from "../Wallet/summarySection/SummaryMain";
import SummaryFooter from "../Wallet/summarySection/SummaryFooter";
import SummaryTotal from "../Wallet/summarySection/SummaryTotal";

const TransferSummary = ({ selectedToken, amount, usdToggle }) => {
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
      />

      <SummaryTotal token={selectedToken[1]} usdToggle={usdToggle} />
    </section>
  );
};

export default TransferSummary;
