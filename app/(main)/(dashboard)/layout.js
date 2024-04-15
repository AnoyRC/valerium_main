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
      <div className="light-dashboard-background relative flex bg-white font-noto">
        <Sidebar />

        <main className="relative mx-5 ml-10 flex flex-1 flex-col space-y-4">
          <Header />

          {children}
        </main>
      </div>
    </WalletProvider>
  );
};

export default LoginLayout;
