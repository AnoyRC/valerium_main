import TokenInfo from "../tokenInfo/TokenInfo";

const Tokens = () => {
  return (
    <section className="font-noto p-4 bg-white bg-opacity rounded-xl mt-5">
      <h2 className="border-b-2 border-[#444444] border-solid text-xl pb-4 font-bold">
        Tokens
      </h2>
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
