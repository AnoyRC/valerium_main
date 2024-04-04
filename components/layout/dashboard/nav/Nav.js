import {
  ArrowLeftRight,
  HandCoins,
  Home,
  Images,
  RefreshCcw,
  Send,
  Store,
} from "lucide-react";
import NavItem from "../navItem/NavItem";

const Nav = () => {
  return (
    <section className="flex flex-1 flex-col justify-between mt-6">
      <div>
        <NavItem label={"Home"}>
          <Home />
        </NavItem>
        <NavItem label={"Transcations"}>
          <span className=" rotate-90">
            <ArrowLeftRight />
          </span>
        </NavItem>
        <NavItem label={"Transfer"}>
          <Send />
        </NavItem>
        <NavItem label={"Deposit"}>
          <HandCoins />
        </NavItem>
        <NavItem label={"Swap"}>
          <RefreshCcw />
        </NavItem>
        <NavItem label={"NFts"}>
          <Images />
        </NavItem>
        <NavItem label={"Market"}>
          <Store />
        </NavItem>
      </div>
      <div className="">
        <NavItem label={"News"}>
          <RefreshCcw />
        </NavItem>
        <NavItem label={"Help"}>
          <Images />
        </NavItem>
        <NavItem label={"Setting"}>
          <Store />
        </NavItem>
      </div>
    </section>
  );
};

export default Nav;
