import { Power } from "lucide-react";

const HeaderItems = () => {
  return (
    <li className="px-4 py-2 rounded-3xl bg-gradient-light-linear/85 border-border-light border flex items-center font-bold ml-3 ">
      Logout
      <span className="ml-3 cursor-pointer">
        <Power height={24} width={24} />
      </span>
    </li>
  );
};

export default HeaderItems;
