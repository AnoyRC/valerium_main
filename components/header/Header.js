import Heading from "./Heading";
import HeaderList from "./HeaderList";

const Header = () => {
  return (
    <div className="my-4 flex justify-between pt-1">
      <Heading />

      <HeaderList />
    </div>
  );
};

export default Header;
