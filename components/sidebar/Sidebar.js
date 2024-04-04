import Logo from "@/components/Logo";

import Alpha from "../ui/Alpha";
import AccountChange from "../layout/dashboard/accountChange/AccountChange";
import ChainSwitcher from "../chainSwicher/ChainSwitcher";
import SidebarFooter from "./SidebarFooter";
import Nav from "./nav/Nav";

const Sidebar = () => {
  return (
    <aside className="basis-[267px] px-4 py-5 background flex flex-col justify-between">
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
