import ActionSwitch from "./ActionSwitch";

import CurrentChainInfo from "@/components/ui/chains/CurrentChainInfo";

const ActionProcess = ({
  style,
  usdToggle,
  setUsdToggle,
  disabled = false,
}) => {
  return (
    <div className="flex justify-between">
      <CurrentChainInfo />

      <ActionSwitch
        id="transfer-switch"
        label="Input USD"
        style={style}
        toggle={usdToggle}
        setToggle={setUsdToggle}
        disabled={disabled}
      />
    </div>
  );
};

export default ActionProcess;
