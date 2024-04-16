import GasTokenSummary from "./GasTokenSummary";
import StoreInfo from "./StoreInfo";

import DashboardContainer from "@/components/ui/DashboardContainer";

const Store = () => {
  return (
    <DashboardContainer>
      <StoreInfo />
      <GasTokenSummary />
    </DashboardContainer>
  );
};

export default Store;
