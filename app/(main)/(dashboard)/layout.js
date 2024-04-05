import Sidebar from "@/components/sidebar/Sidebar";

export const metadata = {
  title: "Valerium | Dashboard",
  description: "Valerium - ZK-based Smart Contract Wallet | Dashboard Page",
};

const LoginLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex bg-white font-noto light-dashboard-background">
      <Sidebar />

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default LoginLayout;
