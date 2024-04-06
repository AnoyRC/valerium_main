import Alpha from "../ui/Alpha";
import SwitchNightMode from "../ui/SwitchNightMode";

const SidebarFooter = () => {
  return (
    <div className="flex border-t border-text-gray pt-2 justify-between items-center">
      <Alpha size="text-2xs" />
      <SwitchNightMode />
    </div>
  );
};

export default SidebarFooter;
