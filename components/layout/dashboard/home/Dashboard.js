import Tokens from "./tokens/Tokens";
import TotalBalance from "./TotalBalance";
import AccountBalance from "./accountBalance/AccountBalance";

const Dashboard = () => {
  return (
    <article className="flex-1 space-y-5">
      <TotalBalance />
      <AccountBalance />
      <Tokens />
    </article>
  );
};

export default Dashboard;
