"use client";

import { Fuel } from "lucide-react";

const Gas = () => {
  return (
    <li className="flex items-center gap-2 rounded-full border border-border-light bg-gradient-light-linear/85 px-4 py-2 font-noto font-bold">
      <div className="flex items-center gap-1 text-base font-semibold capitalize text-text-gray">
        <Fuel size={24} />
        Gas:
      </div>

      <p className="text-xs">
        <span className="mr-0.5 text-base">71</span>
        Wai
      </p>
    </li>
  );
};
export default Gas;
