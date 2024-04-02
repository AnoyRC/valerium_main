import DesignSection from "@/component/layout/onBoard/DesignSection";
import MainSection from "@/component/layout/onBoard/MainSection";

export const metadata = {
  title: "Valerium | OnBoard",
  description: "Valerium - ZK-based Smart Contract Wallet | OnBoard Page",
};

const LoginLayout = ({ children }) => {
  return (
    <main className="h-screen w-screen">
      <DesignSection />
      <MainSection>{children}</MainSection>
    </main>
  );
};

export default LoginLayout;
