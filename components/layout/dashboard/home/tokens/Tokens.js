import TokenHeader from "./TokenHeader";
import TokenItem from "./TokenItem";
import TokenList from "./TokenList";

const Tokens = () => {
  return (
    <section className="rounded-xl border border-border-light bg-gradient-light-linear/85 overflow-hidden p-4">
      <h3 className="border-b-2 border-[#444444] border-solid text-xl pb-4 font-bold">
        Tokens
      </h3>

      <TokenHeader />
      <TokenList />
    </section>
  );
};

export default Tokens;
