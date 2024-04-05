import TotalBalance from "./TotalBalance";
import AccountBalance from "./accountBalance/AccountBalance";
import Tokens from "./tokens/Tokens";

const Dashboard = () => {
  return (
    <article className="flex-1 px-10 space-y-5">
      <TotalBalance totalBalance={34.567189} />
      <AccountBalance />
      <Tokens />
    </article>
  );
};

export default Dashboard;
