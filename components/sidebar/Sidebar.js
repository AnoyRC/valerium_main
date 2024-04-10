import Logo from "@/components/Logo";

import Nav from "./nav/Nav";
import SidebarFooter from "./SidebarFooter";
import ChainSwitcher from "../chainSwicher/ChainSwitcher";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 flex h-screen basis-[267px] flex-col justify-between rounded-e-xl border-r border-border-light bg-gradient-light-linear/85 px-4 py-5 shadow">
      <div className="space-y-6">
        <Logo />
        <ChainSwitcher />
      </div>

      <Nav />

      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
