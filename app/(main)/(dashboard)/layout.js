import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import WalletProvider from "@/provider/WalletProvider";

export const metadata = {
  title: "Valerium | Dashboard",
  description: "Valerium - ZK-based Smart Contract Wallet | Dashboard Page",
};

const LoginLayout = ({ children }) => {
  return (
    <WalletProvider>
      <div className="flex bg-white font-noto light-dashboard-background relative">
        <Sidebar />

        <main className="flex-1 space-y-4 mx-5 ml-10 flex flex-col">
          <Header />

          {children}
        </main>
      </div>
    </WalletProvider>
  );
};

export default LoginLayout;
