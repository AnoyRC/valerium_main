import { InfoIcon } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="w-fit border-border-light border bg-gray-300 rounded-xl">
      <div className="flex justify-center h-full p-3 px-5">
        <InfoIcon className="w-6 h-6 mr-2" />
        <p>
          1 Gas Credit will fund approximately 34 transactions on any chain.
        </p>
      </div>
    </div>
  );
}
