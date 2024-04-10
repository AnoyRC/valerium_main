import Tokens from "./tokens/Tokens";
import TotalBalance from "./TotalBalance";
import AccountBalance from "./accountBalance/AccountBalance";

const Dashboard = () => {
  /* 
      "baseTextColor": "#FFFFFF",
      "colorDark": "#0052FF",
      "colorLight": "#0052FF",
      "gradientColorDark": "linear-gradient(93deg, rgba(0, 82, 255, 0.40) 0%, rgba(0, 49, 153, 0.40) 100%)",
      "gradientColorLight": "linear-gradient(93deg, rgba(0, 82, 255, 0.80) 0%, rgba(0, 49, 153, 0.80) 100%)",
      "backgroundColorDark": "rgba(0, 82, 255, 0.40)",
      "backgroundColorLight": "rgba(0, 82, 255, 0.20)",
      "backgroundShadowEffect": "linear-gradient(40deg, rgba(255, 255, 255, 0.00) 60%, rgba(85, 140, 255, 0.00) 60%, rgba(0, 82, 255, 0.9) 100%)",
      "logo": "/base-logo.svg"
      */

  return (
    <article className="flex-1 space-y-5">
      <TotalBalance />
      <AccountBalance />
      <Tokens />
    </article>
  );
};

export default Dashboard;
