"use client";

import { Power } from "lucide-react";
import { Button } from "@material-tailwind/react";

const Logout = () => {
  const handleLogoutClick = () => {
    console.log("Logout");
  };

  return (
    <li>
      <Button
        className="flex items-center gap-3 rounded-full border border-border-light bg-gradient-light-linear/85 px-4 py-2 font-noto font-bold"
        onClick={handleLogoutClick}
        color="white"
      >
        <div className="text-base font-semibold capitalize">Logout</div>

        <Power size={24} />
      </Button>
    </li>
  );
};
export default Logout;
