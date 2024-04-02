import DesignSection from "@/components/layout/onBoard/DesignSection";
import MainSection from "@/components/layout/onBoard/MainSection";

export const metadata = {
  title: "Valerium | OnBoard",
  description: "Valerium - ZK-based Smart Contract Wallet | OnBoard Page",
};

const LoginLayout = ({ children }) => {
  return (
    <main className="h-screen w-screen flex">
      <DesignSection />
      <MainSection>{children}</MainSection>
    </main>
  );
};

export default LoginLayout;
