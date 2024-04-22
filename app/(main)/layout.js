import { store } from "@/redux/store";

import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "sonner";
import InvalidDrawer from "@/components/drawer/InvalidDrawer";

export const metadata = {
  title: "Valerium",
  description: "Valerium - ZK-based Smart Contract Wallet",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider store={store}>
      <Toaster />
      <InvalidDrawer />
      {children}
    </ReduxProvider>
  );
}
