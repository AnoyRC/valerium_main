import Image from "next/image";

import ActionSwitch from "./ActionSwitch";
import SummaryProcessing from "../summarySection/SummaryProcessing";

const ActionProcess = ({ style, usdToggle, setUsdToggle }) => {
  return (
    <div className="flex justify-between">
      <SummaryProcessing />

      <ActionSwitch
        id="transfer-switch"
        label="Input USD"
        style={style}
        toggle={usdToggle}
        setToggle={setUsdToggle}
      />
    </div>
  );
};

export default ActionProcess;
