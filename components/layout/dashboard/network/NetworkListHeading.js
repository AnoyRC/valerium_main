import ChainName from "@/components/ui/chains/ChainName";
import ChainAddress from "@/components/ui/chains/ChainAddress";
import CurrentChainImage from "@/components/ui/chains/CurrentChainImage";
import ChainApproveButton from "@/components/ui/buttons/ChainApproveButton";

const NetworkListHeading = () => {
  return (
    <div className="flex w-full items-center justify-between gap-10 overflow-hidden rounded-xl border border-border-light bg-gradient-light-linear/85 p-10 shadow">
      <div className="flex space-x-3">
        <CurrentChainImage size={48} />

        <div className="space-y-1">
          <ChainName style={"text-2xl font-bold text-black"} />
          <ChainAddress style={"text-sm"} />
        </div>
      </div>

      <ChainApproveButton />
    </div>
  );
};

export default NetworkListHeading;
