"use client";

import TokenHead from "./TokenHead";
import TokenList from "./TokenList";

const Tokens = () => {
  return (
    <section className="overflow-hidden rounded-xl border border-border-light bg-gradient-light-linear/85 p-4 shadow">
      <h3 className="border-b-2 border-solid border-text-gray pb-4 pt-2 text-xl font-bold text-black">
        Tokens
      </h3>

      <table
        className="mt-1 w-full table-fixed border-separate border-spacing-0 border-spacing-y-2 text-left"
        style={{ tableLayout: "fixed" }}
      >
        <TokenHead />

        <TokenList />
      </table>
    </section>
  );
};

export default Tokens;
