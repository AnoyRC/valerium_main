"use client";

import TokenHead from "./TokenHead";
import TokenList from "./TokenList";

const Tokens = () => {
  return (
    <section className="rounded-xl border border-border-light bg-gradient-light-linear/85 overflow-hidden p-4 shadow">
      <h3 className="border-b-2 border-text-gray border-solid text-xl pt-2 pb-4 font-bold text-black">
        Tokens
      </h3>

      <table
        className="w-full table-fixed text-left border-separate border-spacing-0 border-spacing-y-2 mt-1"
        style={{ tableLayout: "fixed" }}
      >
        <TokenHead />

        <TokenList />
      </table>
    </section>
  );
};

export default Tokens;
