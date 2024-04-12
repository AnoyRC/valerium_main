import ActionSwitch from "./ActionSwitch";
import SummaryProcessing from "../summarySection/SummaryProcessing";

const ActionProcess = ({
  style,
  chainName,
  usdToggle,
  setUsdToggle,
  disabled = false,
}) => {
  return (
    <div className="flex justify-between">
      <SummaryProcessing />

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
