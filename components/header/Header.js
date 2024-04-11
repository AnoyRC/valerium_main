import HeaderList from "./HeaderList";
import Heading from "./Heading";

const Header = () => {
  return (
    // Header component
    <div className="flex justify-between mb-4">
      <Heading />

      <HeaderList />
    </div>
  );
};

export default Header;
