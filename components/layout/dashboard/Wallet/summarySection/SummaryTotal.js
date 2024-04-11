const SummaryTotal = ({ token, usdToggle }) => {
  return (
    <div className="flex w-full justify-between">
      <p className="text-text-gray">Total Amount to Pay:</p>

      <p className="text-2.5xl font-bold text-black">
        0.0001
        <span> {(usdToggle && "USDC") || token?.symbol}</span>
      </p>
    </div>
  );
};

export default SummaryTotal;
