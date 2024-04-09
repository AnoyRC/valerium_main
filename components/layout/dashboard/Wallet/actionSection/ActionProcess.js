import Image from "next/image";
import ActionSwitch from "./ActionSwitch";

const ActionProcess = ({ style, chainName }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-1 items-center bg-gradient-light-linear w-fit font-semibold py-2 px-4 rounded-full border border-border-light">
        <p className="text-text-gray">Processing on the</p>

        <div className="flex items-center gap-1">
          <Image
            src={`/tokens/${style.logo}`}
            alt={`${chainName} logo`}
            width={24}
            height={24}
          />

          <p
            className="uppercase"
            style={{
              color: style.colorLight,
            }}
          >
            {chainName}
          </p>
        </div>
      </div>

      <ActionSwitch id="transfer-switch" label="Input USD" style={style} />
    </div>
  );
};

export default ActionProcess;
