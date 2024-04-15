import QRcode from "./QRcode";

import DomainName from "@/components/ui/DomainName";
import ChainAddress from "@/components/ui/chains/ChainAddress";
import CurrentChainInfo from "@/components/ui/chains/CurrentChainInfo";

const CurrentNetwork = () => {
  return (
    <div className="flex flex-col items-center gap-6 overflow-hidden rounded-t-xl border border-border-light bg-gradient-light-linear/85 p-10 shadow">
      <QRcode />

      <div>
        <DomainName usernameSize={"32px"} domainSize={"24px"} />
        <ChainAddress style={"text-sm"} />
      </div>

      <div className="w-full">
        <CurrentChainInfo label="Deployed on" />
      </div>
    </div>
  );
};

export default CurrentNetwork;
