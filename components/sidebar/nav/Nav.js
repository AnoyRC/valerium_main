import NavItem from "./NavItem";

import { navItems } from "@/utils/data/NavListData";

const Nav = () => {
  const largeItems = navItems.filter((item) => item.size === "lg");
  const smallItems = navItems.filter((item) => item.size === "sm");

  return (
    <div className="my-5 flex flex-grow flex-col justify-between">
      <ul className="mt-1 space-y-1.5 px-3">
        {largeItems.map((item, index) => (
          <NavItem key={index} label={item.label} href={item.href}>
            {item.rotate ? (
              <span className="rotate-90">
                <item.icon size={20} />
              </span>
            ) : (
              <item.icon size={20} />
            )}
          </NavItem>
        ))}
      </ul>

      <ul className="space-y-1">
        {smallItems.map((item, index) => (
          <NavItem key={index} label={item.label} href={item.href}>
            {item.rotate ? (
              <span className="rotate-90">
                <item.icon size={16} />
              </span>
            ) : (
              <item.icon size={16} />
            )}
          </NavItem>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
