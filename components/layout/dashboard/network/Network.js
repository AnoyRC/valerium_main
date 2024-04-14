import CurrentNetwork from "./CurrentNetworkInfo";
import NetworkList from "./NetworkList";

const Network = () => {
  return (
    <div className="flex flex-grow gap-5">
      <CurrentNetwork />
      <NetworkList />
    </div>
  );
};

export default Network;
