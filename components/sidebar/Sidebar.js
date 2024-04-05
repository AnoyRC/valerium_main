import Logo from "@/components/Logo";

import Nav from "./nav/Nav";
import SidebarFooter from "./SidebarFooter";
import ChainSwitcher from "../chainSwicher/ChainSwitcher";

const Sidebar = () => {
  return (
    <aside className="basis-[267px] px-4 py-5 bg-gradient-light-linear/85 flex flex-col justify-between rounded-e-xl border-r border-border-light">
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
