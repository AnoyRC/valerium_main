const SummaryFooter = ({ token, amount }) => {
  return (
    <ul className="w-full space-y-0.5">
      <li className="flex justify-between">
        <p className="text-base text-text-gray">Subtotal:</p>
        <p className="text-base font-bold text-black">
          {amount || "0.00"}
          <span> {token[0]?.symbol}</span>
        </p>
      </li>

      <li className="flex justify-between">
        <p className="text-sm text-text-gray/80">Estimated Gas:</p>
        <p className="text-sm text-text-gray">
          <span>+</span> 0.0002
          <span> {token[1]?.symbol || token[0]?.symbol}</span>
        </p>
      </li>

      <li className="flex justify-between">
        <span className="text-sm text-text-gray/80">Service Charge:</span>
        <span className="text-sm text-text-gray">
          <span>+</span> 0.0002
          <span> {token[1]?.symbol || token[0]?.symbol}</span>
        </span>
      </li>
    </ul>
  );
};

export default SummaryFooter;
