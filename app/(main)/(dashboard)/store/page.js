import { TokenDrawer } from "@/components/drawer/TokenDrawer";
import { TxProofDrawer } from "@/components/drawer/TxProofDrawer";
import VerifyCreditsDrawer from "@/components/drawer/VerifyCreditsDrawer";
import Store from "@/components/layout/dashboard/store/Store";

const StorePage = () => {
  return (
    <>
      <VerifyCreditsDrawer />
      <Store />
      <TxProofDrawer />
      <TokenDrawer />
    </>
  );
};

export default StorePage;
