import { TokenDrawer } from "@/components/drawer/TokenDrawer";
import Setting from "@/components/layout/dashboard/setting/Setting";
import DashboardContainer from "@/components/ui/DashboardContainer";

const SettingPage = () => {
  return (
    <>
      <TokenDrawer />

      <DashboardContainer>
        <Setting />
      </DashboardContainer>
    </>
  );
};

export default SettingPage;
