import ChainSwitchButton from "@/components/ui/buttons/ChainSwitchButton";
import ChainAddress from "@/components/ui/chains/ChainAddress";
import ChainName from "@/components/ui/chains/ChainName";
import CurrentChainImage from "@/components/ui/chains/CurrentChainImage";

const NetworkList = () => {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 overflow-hidden rounded-t-xl border border-border-light bg-gradient-light-linear/85 p-10 shadow">
      <div className="flex w-full items-center justify-between gap-10 overflow-hidden rounded-xl border border-border-light bg-gradient-light-linear/85 p-10 shadow">
        <div className="flex space-x-3">
          <CurrentChainImage size={48} />

          <div className="space-y-2">
            <ChainName style={"text-2xl font-bold text-black"} />
            <ChainAddress style={"text-sm"} />
          </div>
        </div>

        <ChainSwitchButton />
      </div>
    </div>
  );
};

export default NetworkList;
