import Logo from "@/components/Logo";
import Nav from "./nav/Nav";
import AccountChange from "./accountChange/AccountChange";

const LeftSection = () => {
  return (
    <article className=" basis-[267px] px-6 py-7 background flex flex-col">
      <Logo />
      <AccountChange />
      <Nav />
      <p className="text-xs pt-3 border-t-[1px] border-text-gray mt-4">
        Alpha v0.0.2
      </p>
    </article>
  );
};

export default LeftSection;
