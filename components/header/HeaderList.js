import HeaderItems from "./HeaderItems";
import Logout from "../ui/buttons/headerBtn/Logout";
import Gas from "../ui/buttons/headerBtn/Gas";
import ChainSwitcherShort from "../ui/buttons/headerBtn/ChainSwitcherShort";
import ValToken from "../ui/buttons/headerBtn/ValToken";

const HeaderList = () => {
  return (
    <ul className="flex gap-3">
      <ChainSwitcherShort />
      <ValToken />
      <Gas />
      <Logout />
    </ul>
  );
};

export default HeaderList;
