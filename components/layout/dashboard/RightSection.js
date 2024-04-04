import TotalBalance from "./TotalBalance/TotalBalance";
import AccountBalance from "./accountBalance/AccountBalance";
import Tokens from "./tokens/Tokens";

const RightSection = () => {
  return (
    <article className="flex-1 px-10">
      <TotalBalance />
      <AccountBalance />
      <Tokens />
    </article>
  );
};

export default RightSection;
