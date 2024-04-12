
import NavHelp from "./NavHelp";
import NavHelpLink from "./NavHelpLink";
import ValeriumInfo from "./ValeriumInfo";

const gettingStartedLink = [{hyperlink: '/home', label: "Check your wallet", link: "Home"},{hyperlink: '/transfer', label: "Transfer funds ", link: "Transfer"},{hyperlink: '/deposit', label: "Buy ETH or tokens", link: "Deposit"},{hyperlink: '/swap', label: "Swap ETH or tokens", link: "Swap"},{hyperlink: '/deposit', label: "Deploy on other chains", link: "Network"}]

const crossChainLink = [{hyperlink: '/home', label: "Bridge Tokens", link: "Bridge"},{hyperlink: '/store', label: "Buy Gas Credits ", link: "Shop"},{hyperlink: '/deposit', label: "Switch Chain", link: "Network"},{hyperlink: '/swap', label: "Execute a Gasless Transaction", link: " Transfer / Swap / Bridge"},]

const DashboardGettingStarted = () => {
  return <div>
    <ValeriumInfo/>
    <div className="flex mt-7">
      <NavHelp title={"Getting Started"}>
        {gettingStartedLink.map(({label, link, hyperlink}, index)=>{
          return <NavHelpLink key={index} label={label} link={link} hyperlink={hyperlink}/>
        })}
      </NavHelp>
      <NavHelp title={"Cross Chain"}>
      {crossChainLink.map(({label, link, hyperlink}, index)=>{
          return <NavHelpLink key={index} label={label} link={link} hyperlink={hyperlink}/>
        })}
      </NavHelp>

    </div>
  </div>;
};

export default DashboardGettingStarted;
