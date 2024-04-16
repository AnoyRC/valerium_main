"use client";

import { Power } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogoutClick = () => {
    router.push("/login");
  };

  return (
    <li>
      <Button
        className="flex items-center gap-3 rounded-full border border-border-light bg-gradient-light-linear/85 px-4 py-2 font-noto font-bold"
        onClick={handleLogoutClick}
        color="white"
      >
        {/* <div className="text-base font-semibold capitalize">Logout</div> */}

        <Power size={24} className="text-red-500" />
      </Button>
    </li>
  );
};
export default Logout;
