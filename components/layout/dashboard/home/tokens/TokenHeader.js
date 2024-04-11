const TokenHeader = () => {
  return (
    <div className="flex justify-between mt-4 px-4 [&>p]:flex-1  [&>p:last-child]:flex-none  ">
      <p>Token</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Value</p>
      <p>Actions</p>
    </div>
  );
};

export default TokenHeader;
