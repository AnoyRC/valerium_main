import FormatNumber from "@/components/ui/FormatNumber";
import React from "react";

const TotalBalance = ({ totalBalance }) => {
  return (
    <section className="space-y-1.5">
      <h2 className="text-text-gray text-base">Total Balance</h2>

      <FormatNumber
        number={totalBalance}
        size="text-3xl"
        integerSize="text-5xl"
        decimalSize="text-4xl"
      />
    </section>
  );
};

export default TotalBalance;
