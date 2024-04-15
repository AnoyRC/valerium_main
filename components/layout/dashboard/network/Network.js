import CurrentNetwork from "./CurrentNetworkInfo";
import NetworkList from "./NetworkList";

const Network = () => {
  return (
    <div className="relative flex flex-grow gap-5 overflow-hidden">
      <CurrentNetwork />
      <NetworkList />
    </div>
  );
};

export default Network;
