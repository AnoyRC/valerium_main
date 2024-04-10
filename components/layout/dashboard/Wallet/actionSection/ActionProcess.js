import Image from "next/image";
import ActionSwitch from "./ActionSwitch";

const ActionProcess = ({ style, chainName, usdToggle, setUsdToggle }) => {
  return (
    <div className="flex justify-between">
      <div className="flex w-fit items-center gap-1 rounded-full border border-border-light bg-gradient-light-linear px-4 py-2 font-semibold">
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

      <ActionSwitch id="transfer-switch" label="Input USD" style={style}
        toggle={usdToggle} setToggle={setUsdToggle} />
    </div>
  );
};

export default ActionProcess;
