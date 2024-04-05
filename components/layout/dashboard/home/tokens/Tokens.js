import TokenInfo from "./TokenInfo";

const Tokens = () => {
  return (
    <section className="rounded-xl border border-border-light bg-gradient-light-linear/85 overflow-hidden p-4">
      <h3 className="border-b-2 border-[#444444] border-solid text-xl pb-4 font-bold">
        Tokens
      </h3>

      <div className="flex justify-between mt-4 px-4">
        <p>Token</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Value</p>
        <p>Actions</p>
      </div>

      <div className="mt-6">
        <TokenInfo />
        <TokenInfo />
      </div>
    </section>
  );
};

export default Tokens;
