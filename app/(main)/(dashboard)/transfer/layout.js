import { TokenDrawer } from "@/components/drawer/TokenDrawer";
import { TxProofDrawer } from "@/components/drawer/TxProofDrawer";

const TransferLayout = ({ children }) => {
  return (
    <>
      {children}
      <TokenDrawer />
      <TxProofDrawer />
    </>
  );
};

export default TransferLayout;
